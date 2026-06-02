package com.getmyhousing.common.daoimpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.UserConverter;
import com.getmyhousing.common.dao.UserDao;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.PropertySearchDto;
import com.getmyhousing.common.dto.UserDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.UserRepository;
import com.getmyhousing.common.repository.UserRoleRepository;
import com.getmyhousing.common.service.LoginService;

@Transactional
@Service("UserDaoImpl")
public class UserDaoImpl implements UserDao {

	private Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRoleRepository userRoleRepository;

	@Autowired
	LoginService loginService;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public User saveUser(UserDTO userDTO) {
		User user = UserConverter.getUserByUserDTO(userDTO);
		return userRepository.save(user);
	}
	
	@Override
	public User changeStatus(User user) {
		
		return userRepository.save(user);
	}

	@Override
	public User getUserById(Long id) {
		Optional<User> db = userRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user id not found in the system. id:" + id);
		return db.get();
	}
	
//	@Override
//	public User getAssociateUserById(Long id) {
//		Optional<User> db = userRepository.findById(id);
//		if (!db.isPresent())
//			throw new ResourceNotFoundException("The user id not found in the system. id:" + id);
//		return db.get();
//	}
	

	@Override
	public User getUserByEmail(String email) {
		return userRepository.getUserByEmail(email);
	}


	
	
	@Override
	public List<UserDTO> getAllUser(UserDTO userDTO) {

		List<UserDTO> userList = new ArrayList<>();
		List<User> AllUser;
		
		LOGGER.info("Pincode dao impl: {}", userDTO.getPincode());
		
		// Check if ids are provided in the userDTO
	    if (userDTO.getIds() != null && !userDTO.getIds().isEmpty()) {
	    	AllUser = userRepository.findAllById(userDTO.getIds());
	    } else {
	    	AllUser = userRepository.findAll();
	    }

		for (User user : AllUser) {
			UserDTO dto = new UserDTO();
			Long userId = user.getId();
			dto.setId(user.getId());
			dto.setEmail(user.getEmail());
			dto.setFullName(user.getFullName());
			dto.setMobileNumber(user.getMobileNumber());
			dto.setWhatsappNumber(user.getWhatsappNumber());
			dto.setCountry(user.getCountry());
			dto.setState(user.getState());
			dto.setPincode(user.getPincode());
			dto.setDistrict(user.getDistrict());
			dto.setStatus(user.getStatus());

			List<UserRole> findByUserId = userRoleRepository.findByUserId(userId);
			List<String> userRoles = new ArrayList<>();

			for (UserRole userRole : findByUserId) {
				userRoles.add(userRole.getRole());
			}
			
			dto.setRoles(userRoles);
			userList.add(dto);
		}
		
		// If userDTO contains a pincode, filter users by that pincode
	    if (userDTO.getPincode() != null && !userDTO.getPincode().isEmpty()) {
	        userList = userList.stream()
	                .filter(user -> userDTO.getPincode().equals(user.getPincode()))
	                .collect(Collectors.toList());
	    }
		
		LOGGER.info("Number of users fetched: {}", userList.size());

		return userList;
	}
	
	@Override
	public List<UserDTO> getAllUserForOperator(UserDTO dto) {
	    // Fetch user details for the operator
	    User userDetail = getUserById(dto.getId());
	    String operatorPincode = userDetail.getPincode();

	    // Get all users with the same pincode as the operator
	    List<User> usersWithPincode = userRepository.findAllByPincode(operatorPincode);

	    // Convert users to DTOs based on the required role
	    List<UserDTO> userToDto = usersWithPincode.stream()
	            .filter(user -> !user.getId().equals(userDetail.getId())) // Exclude the operator
	            .map(user -> {
	                // Fetch roles for each user
	                List<UserRole> roles = userRoleRepository.findByUserId(user.getId());

	                // Check if the user has the required role
	                boolean hasRequiredRole = roles.stream()
	                        .anyMatch(role -> dto.getRole().equals(role.getRole()));

	                // If the user has the required role, convert to UserDTO and set roles
	                if (hasRequiredRole) {
	                    UserDTO userDto = UserConverter.getUserDTOByUser(user);
	                    List<String> userRoles = roles.stream()
	                            .map(UserRole::getRole)
	                            .collect(Collectors.toList());
	                    userDto.setRoles(userRoles);
	                    return userDto;
	                } else {
	                    return null;
	                }
	            })
	            .filter(Objects::nonNull) // Filter out null values
	            .collect(Collectors.toList());

	    return userToDto;
	}

	
	
	@Override
	public List<UserDTO> getAllUserForAssign(UserDTO userDTO) {

		List<UserDTO> userList = new ArrayList<>();
		
		// Ensure we filter users based on userDTO.getIds()
	    List<Long> userIds = userDTO.getIds(); // Get filtered user IDs
	    if (userIds == null || userIds.isEmpty()) {
	        return userList; // Return empty list if no valid IDs
	    }	

		List<User> AllUser = userRepository.findAll();
		
		// Fetch only required users instead of fetching all
	    List<User> filteredUsers = userRepository.findAllById(userIds);
	    
	 // Fetch all roles in a single query for efficiency
	    List<UserRole> allRoles = userRoleRepository.findByUserIdIn(userIds);
	    Map<Long, List<String>> userRolesMap = allRoles.stream()
	        .collect(Collectors.groupingBy(UserRole::getUserId, 
	                 Collectors.mapping(UserRole::getRole, Collectors.toList())));

	    for (User user : filteredUsers) {
	        Long userId = user.getId();
	        List<String> roles = userRolesMap.getOrDefault(userId, new ArrayList<>());

	        if (!roles.isEmpty()) {
	            UserDTO dto = new UserDTO();
	            dto.setId(userId);
	            dto.setEmail(user.getEmail());
	            dto.setFullName(user.getFullName());
	            dto.setMobileNumber(user.getMobileNumber());
	            dto.setWhatsappNumber(user.getWhatsappNumber());
	            dto.setCountry(user.getCountry());
	            dto.setState(user.getState());
	            dto.setDistrict(user.getDistrict());
	            dto.setStatus(user.getStatus());
	            dto.setPincode(user.getPincode());
	            dto.setRoles(roles);

	            userList.add(dto);
	        }
	    }

		return userList;
	}
	
	@Override
	public List<UserDTO> getAllOperators(UserDTO userDTO) {

		List<UserDTO> userList = new ArrayList<>();
		
			for(Long userId : userDTO.getIds()) {
				User user = userRepository.findById(userId).get();
				
				UserDTO dto = new UserDTO();
				Long userId1 = user.getId();
				dto.setId(user.getId());
				dto.setEmail(user.getEmail());
				dto.setFullName(user.getFullName());
				dto.setMobileNumber(user.getMobileNumber());
				dto.setWhatsappNumber(user.getWhatsappNumber());
				dto.setCountry(user.getCountry());
				dto.setState(user.getState());
				dto.setDistrict(user.getDistrict());
				dto.setStatus(user.getStatus());
				dto.setPincode(user.getPincode());
	
				List<UserRole> findByUserId = userRoleRepository.findByUserId(userId1);
				List<String> userRoles = new ArrayList<>();
	
				for (UserRole userRole : findByUserId) {
	
					userRoles.add(userRole.getRole());
	
				}
				dto.setRoles(userRoles);

			userList.add(dto);
		}

//		List<User> AllUser = userRepository.findAll();
//
//		for (User user : AllUser) {
//			UserDTO dto = new UserDTO();
//			Long userId = user.getId();
//			dto.setId(user.getId());
//			dto.setEmail(user.getEmail());
//			dto.setFullName(user.getFullName());
//			dto.setMobileNumber(user.getMobileNumber());
//			dto.setWhatsappNumber(user.getWhatsappNumber());
//			dto.setCountry(user.getCountry());
//			dto.setState(user.getState());
//			dto.setDistrict(user.getDistrict());
//			dto.setStatus(user.getStatus());
//
//			List<UserRole> findByUserId = userRoleRepository.findByUserId(userId);
//			List<String> userRoles = new ArrayList<>();
//
//			for (UserRole userRole : findByUserId) {
//
//				userRoles.add(userRole.getRole());
//
//			}
//			dto.setRoles(userRoles);
//
//			userList.add(dto);
//
//		}

		return userList;
	}

	@Override
	public Long getReferedCount(Long id) {
		
		return userRepository.countByCreatedBy(id);
	}

	

	
	
	
	

}
