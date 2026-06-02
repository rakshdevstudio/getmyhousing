package com.getmyhousing.rental.serviceimpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.UserConverter;
import com.getmyhousing.common.dao.UserDao;
import com.getmyhousing.common.dao.UserRoleDao;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.UserDTO;
import com.getmyhousing.common.dto.UserRoleDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.exception.InterruptExitException;
import com.getmyhousing.common.exception.UnAuthorizedException;
import com.getmyhousing.common.repository.UserRepository;
import com.getmyhousing.common.repository.UserRoleRepository;
import com.getmyhousing.common.service.EmailService;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.RandomGeneratorUtil;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.RoleEnum;
import com.getmyhousing.rental.config.JwtTokenUtil;
import com.getmyhousing.rental.service.UserService;

@Service("UserServiceImpl")
public class UserServiceImpl implements UserService {

	private Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	LinkedHashMap<String, Object> returnMap = null;

	@Resource(name = "EmailServiceImpl")
	private EmailService emailService;

	@Resource(name = "UserDaoImpl")
	private UserDao userDao;

	@Resource(name = "UserRoleDaoImpl")
	private UserRoleDao userRoleDao;

	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserUtils userUtils;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRoleRepository userRoleRepository;

	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	@Override
	public void signUp(UserDTO userDTO) {

		// Step 1:: Check email already exists or not
		checkUserEmail(userDTO);

		// Step 2:: save user with password encrypted
		userDTO.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));

		User user = userDao.saveUser(userDTO);

		LOGGER.info("User signup successful with email::" + userDTO.getEmail());

		// Step 3:: create role for the user
		saveUserRole(user, userDTO, userDTO.getRole());

	}

	@Override
	public User saveUser(UserDTO userDTO) {

		LocalDateTime currentDateTime = LocalDateTime.now();

		// Define a custom date-time format
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

		// Format the current date and time as a string
		String formattedDateTime = currentDateTime.format(formatter);

		userDTO.setCreatedDate(formattedDateTime);
		userDTO.setStatus("Active");
		userDTO.setPasswordChangeOnLogin("Yes");

		userDTO.setCreatedBy(userDTO.getCreatedBy());
		userDTO.setUpdatedBy(userDTO.getCreatedBy());
		userDTO.setUpdatedDate(formattedDateTime);

		// Only admin can access
		List<UserRole> roles = loginService.getAllUserRoles(userDTO.getCreatedBy());
		boolean adminAccess = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()) || x.getRole().equals(RoleEnum.OPERATOR.getRole()));

		if (!adminAccess)
			throw new UnAuthorizedException("Loged in user don't have permissions  to save user details");


		// Step 1:: Check email already exists in db or not
		checkUserEmail(userDTO);

		// Step 2:: Generate a random password
		//		String password = RandomGeneratorUtil.getRandomPassword();
		String password = userDTO.getPassword(); // static password is coming from frontend  , password : Welcome@123
		
		
		
		// Step 3:: save user with password encrypted
		userDTO.setPassword(bCryptPasswordEncoder.encode(password));
		User user = userDao.saveUser(userDTO);
		
		// Step 4:: send mail to user login credential and role
		String subjectMail = "Welcome to Our Platform";
		String rolesComma = String.join(", ", userDTO.getRoles());
        String text = String.format("Hello %s,\n\nYour account has been created.\n\nUsername: %s\nPassword: %s\nRole: %s\n\nBest Regards,\nGet My Property Company",
        		userDTO.getFullName(), userDTO.getEmail(), password, rolesComma);
        
        // Send the email
        emailService.sendLoginEmail(userDTO.getEmail(), subjectMail, text);

		LOGGER.info("User added successfully by admin::" + userDTO.getCreatedBy());

		// Step 4:: save user roles
		for (String role : userDTO.getRoles())
			saveUserRole(user, userDTO, role);

		// Step 5:: send password in mail
		String subject = "Password for your mail";
		String body = "Login with the password " + password + " for the mail " + userDTO.getEmail()
				+ ".\n\n-PropertyBrokerTeam";

//		emailService.sendSimpleMessage(userDTO.getEmail(), subject, body);

		return user;
	}
	
	@Override
	public void changeUserStatus(UserDTO userDTO) {
		
		// Step 1:Get user details
		User dbUser = userDao.getUserById(userDTO.getId());
		UserDTO dbUserDTO = UserConverter.getUserDTOByUser(dbUser);
		
		// Step 2: Check LogedInUser is Admin or own user
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole());
		
		boolean adminAccess = loginService.isUserAccessible(userDTO.getUpdatedBy(), roleList);
		
		if (!adminAccess) {
			if (!dbUserDTO.getId().equals(userDTO.getUpdatedBy()))
				throw new UnAuthorizedException("Loged in user don't have permissions  to update user details");
		}
		
		User user = UserConverter.getUserByUserDTO(dbUserDTO);
		
		// Step 3: Giving access for Admin to update the user role
		if (adminAccess) {
			
			user.setStatus(userDTO.getStatus());
			user.setUpdatedBy(userDTO.getUpdatedBy());
			user.setUpdatedDate(userDTO.getUpdatedDate());
		}
		
		userDao.changeStatus(user);
		LOGGER.info("User deatails for the user " + userDTO.getId() + " updated successfully.");
		
	}

	@Override
	public void updateUser(UserDTO userDTO) {

		// Step 1:Get user details
		User dbUser = userDao.getUserById(userDTO.getId());
		UserDTO dbUserDTO = UserConverter.getUserDTOByUser(dbUser);
		
		
		// Step 2: Check LogedInUser is Admin or own user
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole());
				
		boolean adminAccess = loginService.isUserAccessible(userDTO.getUpdatedBy(), roleList);
				
		if (!adminAccess) {
			if (!dbUserDTO.getId().equals(userDTO.getUpdatedBy()))
				throw new UnAuthorizedException("Loged in user don't have permissions  to update user details");
		}

		if (null != userDTO.getEmail())
			dbUserDTO.setEmail(userDTO.getEmail());

		if (null != userDTO.getFullName())
			dbUserDTO.setFullName(userDTO.getFullName());

		if (null != userDTO.getMobileNumber())
			dbUserDTO.setMobileNumber(userDTO.getMobileNumber());

		if (null != userDTO.getWhatsappNumber())
			dbUserDTO.setWhatsappNumber(userDTO.getWhatsappNumber());

		if (null != userDTO.getCountry())
			dbUserDTO.setCountry(userDTO.getCountry());

		if (null != userDTO.getState())
			dbUserDTO.setState(userDTO.getState());

		if (null != userDTO.getDistrict())
			dbUserDTO.setDistrict(userDTO.getDistrict());

		if (null != userDTO.getCity())
			dbUserDTO.setCity(userDTO.getCity());

		if (null != userDTO.getPincode())
			dbUserDTO.setPincode(userDTO.getPincode());

		// Step 3: Giving access for Admin to update the user role
		if (adminAccess) {

			List<String> userRoles = userDTO.getRoles();

			// Step 2: Insert a new user role (only one role)
		
			Long id = userDTO.getId();
			userRoleRepository.deleteByUserId(id);
			
				for (String userRole : userRoles) {

				UserRoleDTO dbUserRoleDTO = new UserRoleDTO();
				dbUserRoleDTO.setUserId(userDTO.getId());
				dbUserRoleDTO.setRole(userRole);
				dbUserRoleDTO.setStatus(Constant.STATUS_ACTIVE);
				dbUserRoleDTO.setCreatedBy(userDTO.getUpdatedBy());
				dbUserRoleDTO.setCreatedDate(userDTO.getUpdatedDate());
				dbUserRoleDTO.setUpdatedBy(userDTO.getUpdatedBy());
				dbUserRoleDTO.setUpdatedDate(userDTO.getUpdatedDate());

				userRoleDao.saveUserRole(dbUserRoleDTO);
			}
		}

		dbUserDTO.setUpdatedBy(userDTO.getUpdatedBy());
		dbUserDTO.setUpdatedDate(userDTO.getUpdatedDate());
				
		userDao.saveUser(dbUserDTO);
		LOGGER.info("User deatails for the user " + userDTO.getId() + " updated successfully.");

	}

	@Override
	public void updateUserRole(UserDTO userDTO) {

		// Step 1:: check user exist or not
		userDao.getUserById(userDTO.getId());

		List<String> roleLists = Arrays.asList(RoleEnum.ADMIN.getRole());
		boolean adminAccess = loginService.isUserAccessible(userDTO.getUpdatedBy(), roleLists);
		if (!adminAccess)
			throw new UnAuthorizedException("Loged in user don't have permissions  to update user details");

		// Step 2:: delete exiting userRoles
		userRoleDao.deleteUserRoleByUserId(userDTO.getId());
		LOGGER.info("Deleted existing roles for userId::" + userDTO.getId());

		// Step 2: Insert new user roles
		List<UserRoleDTO> roleList = new ArrayList<>();
		UserRoleDTO dbUserRoleDTO = null;
		if (null != userDTO.getRoles() && userDTO.getRoles().size() > 0) {
			for (String role : userDTO.getRoles()) {
				dbUserRoleDTO = new UserRoleDTO();
				dbUserRoleDTO.setUserId(userDTO.getId());
				dbUserRoleDTO.setRole(role);
				dbUserRoleDTO.setStatus(Constant.STATUS_ACTIVE);
				dbUserRoleDTO.setCreatedBy(userDTO.getUpdatedBy());
				dbUserRoleDTO.setCreatedDate(userDTO.getUpdatedDate());
				dbUserRoleDTO.setUpdatedBy(userDTO.getUpdatedBy());
				dbUserRoleDTO.setUpdatedDate(userDTO.getUpdatedDate());
				roleList.add(dbUserRoleDTO);
			}
		}
		userRoleDao.saveAllUserRole(roleList);
		LOGGER.info("New userroles " + userDTO.getRoles() + " are added for the user " + userDTO.getId());
	}

	public LinkedHashMap<String, Object> login(UserDTO usersDTO) {
		returnMap = new LinkedHashMap<String, Object>();

		// Step 1:: check given email exits in DB or not
		User dbUser = userDao.getUserByEmail(usersDTO.getEmail());
		if (null == dbUser)
			throw new UnAuthorizedException("No user found with this email::" + usersDTO.getEmail());
		
		
		// Step 1:: check given email exits in DB or not
//				User dbUser = userDao.getUserByEmail(usersDTO.getEmail());
		if (dbUser.getStatus().equalsIgnoreCase("Deleted")) {
					throw new UnAuthorizedException(" This user has been deleted. ");

		}			
		// Step 2:: Given password matches with DB password or not
		if (!bCryptPasswordEncoder.matches(usersDTO.getPassword(), dbUser.getPassword()))
			throw new UnAuthorizedException("Password missMatch for email::" + usersDTO.getEmail());

		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);

		// return JWT token
		final String token = jwtTokenUtil.generateCustomeToken(dbUser);
		returnMap.put("userId", dbUser.getId());
		returnMap.put("token", token);
		LOGGER.info("User login successful with email::" + usersDTO.getEmail());

		return returnMap;

	}

	@Override
	public UserDTO getUserById(UserDTO userDTO) {
		
		List<UserRole> roles = loginService.getAllUserRoles(userDTO.getUpdatedBy());
		
		boolean adminAccess = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()));

		// If logedIn user is admin giving all details
		if (!adminAccess) {
			if (!userDTO.getId().equals(userDTO.getUpdatedBy()))
				throw new UnAuthorizedException("LogedIn User does't have permissions to get User Details.");
		}

		// Step 1: get user information
		User user = userDao.getUserById(userDTO.getId());
		
		Long count = userDao.getReferedCount(userDTO.getId());
		
		UserDTO returnDTO = UserConverter.getUserDTOByUser(user);

		returnDTO.setTotalRefered(count);
		// 2. Get User Roles
		UserRoleDTO roleDTO = new UserRoleDTO();
		roleDTO.setUserId(user.getId());
		roleDTO.setStatus(Constant.STATUS_ACTIVE);
		List<UserRole> userRoles = userRoleDao.getAllRoles(roleDTO);
		List<String> rolsList = new ArrayList<String>();
		for (UserRole role : userRoles)
			rolsList.add(role.getRole());
		
		returnDTO.setRoles(rolsList);
		returnDTO.setPassword(null);

		return returnDTO;

	}

	@Override
	public UserRole saveUserRole(UserRoleDTO userRoleDTO) {
		UserRole userRole = userRoleDao.saveUserRole(userRoleDTO);
		return userRole;
	}

	@Override
	public User deleteUser(UserDTO userDTO) {
		List<UserRole> roles = loginService.getAllUserRoles(userDTO.getUpdatedBy());
		boolean adminAccess = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()));
		User dbUser = userDao.getUserById(userDTO.getId());
		UserDTO dbUserDTO = UserConverter.getUserDTOByUser(dbUser);

		if (!adminAccess) {
			if (!dbUserDTO.getId().equals(userDTO.getUpdatedBy()))
				throw new UnAuthorizedException("User does not have permissions to deleteUser.");
		}

		dbUserDTO.setStatus(Constant.STATUS_DELETED);

		// Step 1:: delete exiting userRoles
//		userRoleDao.deleteUserRoleByUserId(userDTO.getId());

		// Step 2:: delete user details
		return userDao.saveUser(dbUserDTO);
	}

	public List<UserDTO> getAllUsers(UserDTO userDTO) {
		
		LOGGER.info("Pincode service impl: {}", userDTO.getPincode());
		
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.OPERATOR.getRole());
		
		boolean userAcccess = loginService.isUserAccessible(userDTO.getUpdatedBy(), roleList);
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to update user Details.");

		// Step 1::Get user roles
		UserRoleDTO roleDTO = new UserRoleDTO();
		
//		roleDTO.setStatus(Constant.STATUS_ACTIVE);
		
		roleDTO.setRoles(userDTO.getRoles());
		
		LOGGER.info("Roles received: {}", userDTO.getRoles());
		
		List<UserRole> userRoles = userRoleDao.getAllRoles(roleDTO);

		// Step 2::Get userIds list
		Set<Long> userIds = userRoles.stream().map(UserRole::getUserId).collect(Collectors.toSet());

		// Step 3::Get user details
		UserDTO dto = new UserDTO();
		dto.setIds(new ArrayList<Long>(userIds));
		dto.setLimit(1000);
		dto.setPincode(userDTO.getPincode());
		return userDao.getAllUser(dto);

	}

	@Override
	public void changePassword(UserDTO userDTO) {

		// Step 1:Get user details
//		User dbUser = userDao.getUserById(userDTO.getUpdatedBy());
		
		User dbUser = userDao.getUserByEmail(userDTO.getEmail());


		UserDTO dbUserDTO = UserConverter.getUserDTOByUser(dbUser);

		// check the condition to change the password
		if (!Constant.CONSTANT_YES.equals(dbUserDTO.getPasswordChangeOnLogin()))
			throw new FieldException("You cannot reset/change the password");

		// check the password is equal
		if (!bCryptPasswordEncoder.matches(userDTO.getPassword(), dbUserDTO.getPassword()))
			throw new UnAuthorizedException("Entered password does not match with old Password .");

		// check the new password and old password equal or not
		if (bCryptPasswordEncoder.matches(userDTO.getNewPassword(), dbUserDTO.getPassword()))
			throw new UnAuthorizedException("Entered password is same please give correct password .");

		// Save password with encrypted
		dbUserDTO.setPassword(bCryptPasswordEncoder.encode(userDTO.getNewPassword()));
		dbUserDTO.setPasswordChangeOnLogin(Constant.CONSTANT_YES);
		dbUserDTO.setUpdatedBy(userDTO.getUpdatedBy());
//		dbUserDTO.setUpdatedDate(userDTO.getUpdatedDate());
		
		dbUserDTO.setUpdatedDate(DateUtils.currentDate());

		userDao.saveUser(dbUserDTO);
		LOGGER.info("User password changes successfully::" + dbUserDTO.getEmail());

	}

	/**
	 * To check email already exists in db or not
	 * 
	 * @param userDTO
	 */
	private void checkUserEmail(UserDTO userDTO) {
		User dbUser = userDao.getUserByEmail(userDTO.getEmail());
		if (null != dbUser) {
			LinkedHashMap<String, String> errorMap = new LinkedHashMap<String, String>();
			errorMap.put(Constant.RESPONSE_CODE_KEY, "PB001-1");
			errorMap.put(Constant.RESPONSE_MSG_KEY, "Email already exists");
			throw new InterruptExitException(errorMap);
		}
	}

	private void saveUserRole(User user, UserDTO userDTO, String role) {
		UserRoleDTO roleDTO = new UserRoleDTO();
		roleDTO.setUserId(user.getId());
		roleDTO.setRole(role);
		roleDTO.setStatus(Constant.STATUS_ACTIVE);
		roleDTO.setCreatedBy(userDTO.getUpdatedBy());
		roleDTO.setCreatedDate(DateUtils.currentDate());
		roleDTO.setUpdatedBy(userDTO.getUpdatedBy());
		roleDTO.setUpdatedDate(DateUtils.currentDate());
		userRoleDao.saveUserRole(roleDTO);
	}

	
//	@Override
//	public List<UserDTO> getAllUsersForAssign(UserDTO userDTO) {
//		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.TEAM_LEADER.getRole(),
//				RoleEnum.TELECALLER.getRole());
//		boolean userAcccess = loginService.isUserAccessible(userDTO.getUpdatedBy(), roleList);
//		if (!userAcccess)
//			throw new UnAuthorizedException("LogedIn User does't have permissions to update user Details.");
//
//		// Step 1::Get user roles
//		UserRoleDTO roleDTO = new UserRoleDTO();
//		roleDTO.setStatus(Constant.STATUS_ACTIVE);
//		roleDTO.setRoles(userDTO.getRoles());
//		List<UserRole> userRoles = userRoleDao.getAllRoles(roleDTO);
//
//		// Step 2::Get userIds list
//		Set<Long> userIds = userRoles.stream().map(UserRole::getUserId).collect(Collectors.toSet());
//
//		// Step 3::Get user details
//		UserDTO dto = new UserDTO();
//		dto.setIds(new ArrayList<Long>(userIds));
//		dto.setLimit(1000);
//		return userDao.getAllUserForAssign(dto);
//
//	}

	
	@Override
	public List<UserDTO> getAllUsersForAssign(UserDTO userDTO) {
		
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.TEAM_LEADER.getRole());
		boolean userAcccess = loginService.isUserAccessible(userDTO.getUpdatedBy(), roleList);
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to update user Details.");

		UserRoleDTO roleDTO = new UserRoleDTO();
		roleDTO.setStatus(Constant.STATUS_ACTIVE);
		roleDTO.setRoles(userDTO.getRoles());
		List<UserRole> userRoles = userRoleDao.getAllRoles(roleDTO);
		LOGGER.info("User Roles: {}", userRoles);

		Set<Long> userIds = userRoles.stream().map(UserRole::getUserId).collect(Collectors.toSet());

		UserDTO dto = new UserDTO();
		dto.setIds(new ArrayList<Long>(userIds));
		dto.setLimit(1000);
		return userDao.getAllUserForAssign(dto);

	}
	
	@Override
	public void resetPassword(UserDTO userDTO) {

		// Step 1:Get user details
//		User dbUser = userDao.getUserById(userDTO.getUpdatedBy());
		
		User dbUser = userDao.getUserByEmail(userDTO.getEmail());


		UserDTO dbUserDTO = UserConverter.getUserDTOByUser(dbUser);

		// check the condition to change the password
		if (!Constant.CONSTANT_YES.equals(dbUserDTO.getPasswordChangeOnLogin()))
			throw new FieldException("You cannot reset/change the password");

		// check the new password and old password equal or not
		if (bCryptPasswordEncoder.matches(userDTO.getNewPassword(), dbUserDTO.getPassword()))
			throw new UnAuthorizedException("Entered password is same please give correct password .");

		// Save password with encrypted
		dbUserDTO.setPassword(bCryptPasswordEncoder.encode(userDTO.getNewPassword()));
		dbUserDTO.setPasswordChangeOnLogin(Constant.CONSTANT_YES);
		dbUserDTO.setUpdatedBy(dbUserDTO.getId());
		dbUserDTO.setUpdatedDate(DateUtils.currentDate());

		userDao.saveUser(dbUserDTO);
		LOGGER.info("User password changes successfully::" + dbUserDTO.getEmail());

	}
	
	public List<UserDTO> getAllOperators(UserDTO userDTO) {
		
		List<String> roleList = Arrays.asList(RoleEnum.OPERATOR.getRole());
		
		boolean userAcccess = loginService.isUserAccessible(userDTO.getUpdatedBy(), roleList);
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to view operators user Details.");

		// Step 1::Get user roles
		UserRoleDTO roleDTO = new UserRoleDTO();
		
		roleDTO.setStatus(Constant.STATUS_ACTIVE);
		
		roleDTO.setRoles(userDTO.getRoles());
		
		List<UserRole> userRoles = userRoleDao.getAllRoles(roleDTO);

		// Step 2::Get userIds list
		Set<Long> userIds = userRoles.stream().map(UserRole::getUserId).collect(Collectors.toSet());

		// Step 3::Get user details
		UserDTO dto = new UserDTO();
		dto.setIds(new ArrayList<Long>(userIds));
		dto.setLimit(1000);
		return userDao.getAllOperators(dto);

	}

	@Override
	public User findByEmail(String email) {
		
		return userDao.getUserByEmail(email);
	}

	@Override
	public List<UserDTO> getAllUsersForOperator(UserDTO userDTO) {
		
		Long userId = userUtils.getLogedInUser();
		
		userDTO.setId(userId);
		
		List<String> roleList = Arrays.asList(RoleEnum.OPERATOR.getRole());
		
		boolean userAcccess = loginService.isUserAccessible(userDTO.getId(), roleList);
		
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to get users List.");
		
		List<UserDTO> listOfUsers = userDao.getAllUserForOperator(userDTO);
		
		return listOfUsers;
	}


}
