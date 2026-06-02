package com.getmyhousing.rental.serviceimpl;

import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.getmyhousing.common.api.EasebuzzAPIService;
import com.getmyhousing.common.cache.UserCache;
import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.EasebuzzOrderConverter;
import com.getmyhousing.common.converter.PackagePaymentConverter;
import com.getmyhousing.common.converter.PackagesConverter;
import com.getmyhousing.common.converter.UserPackageConverter;
import com.getmyhousing.common.dao.EasebuzzOrderDao;
import com.getmyhousing.common.dao.PackagesDao;
import com.getmyhousing.common.dao.UserDao;
import com.getmyhousing.common.dao.UserPackagesDao;
import com.getmyhousing.common.dao.UserRoleDao;
import com.getmyhousing.common.domain.EasebuzzOrder;
import com.getmyhousing.common.domain.PackagePayment;
import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;
import com.getmyhousing.common.dto.PackagePaymentDTO;
import com.getmyhousing.common.dto.PackagesDTO;
import com.getmyhousing.common.dto.UserPackagesDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.exception.InterruptExitException;
import com.getmyhousing.common.exception.UnAuthorizedException;
import com.getmyhousing.common.repository.PackagePaymentRepository;
import com.getmyhousing.common.repository.PackagesRepository;
import com.getmyhousing.common.repository.PropertiesRepository;
import com.getmyhousing.common.repository.UserPackagesRepository;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.validator.RoleEnum;
import com.getmyhousing.rental.service.PackageService;

@Service("PackageServiceImpl")
public class PackageServiceImpl implements PackageService {

	private static SimpleDateFormat sdf = new SimpleDateFormat(Constant.DATE_FORAMT);

	private Logger LOGGER = LoggerFactory.getLogger(PackageServiceImpl.class);

	private LinkedHashMap<String, String> map = null;

	@Resource(name = "PackagesDaoImpl")
	private PackagesDao packagesDao;

	@Resource(name = "UserDaoImpl")
	private UserDao userDao;

	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;

	@Resource(name = "UserPackagesDaoImpl")
	private UserPackagesDao userPackagesDao;

	@Resource(name = "UserRoleDaoImpl")
	private UserRoleDao userRoleDao;

	@Resource(name = "EasebuzzAPIServiceImpl")
	private EasebuzzAPIService easebuzzAPIService;

	@Resource(name = "EasebuzzOrderDaoImpl")
	private EasebuzzOrderDao easebuzzOrderDao;

	@Autowired
	ObjectMapper mapper;
	
	@Autowired
	PackagesRepository packageRepo;
	
	@Autowired
	PackagePaymentRepository packagePaymentRepo;

	@Autowired
	private UserCache userCache;
	
	@Autowired
	UserPackagesRepository userPackageRepo;
	
	@Autowired
	PropertiesRepository propertiesRepository;

	@Override
	public Packages savePackage(PackagesDTO packagesDTO) {
		List<String> roleLists = Arrays.asList(RoleEnum.ADMIN.getRole());
		boolean adminAccess = loginService.isUserAccessible(packagesDTO.getUpdatedBy(), roleLists);
		if (!adminAccess)
			throw new UnAuthorizedException("Loged in user don't have permissions  to update user details");

		LOGGER.info("Saving the package " + packagesDTO.getPackageName() + " by " + packagesDTO.getCreatedBy());
		return packagesDao.savePackages(packagesDTO);
	}

	@Override
	public List<Packages> getAllPackages(PackagesDTO packagesDTO) {
//		List<Packages> allPackages = packagesDao.getAllPackages(packagesDTO);

		List<Packages> allPackages = packageRepo.findAll();
		
		
		// Filter out packages for Admin
		List<Packages> filteredPackages = allPackages.stream()
				.filter(packages -> !("Admin".equalsIgnoreCase(packages.getPackageFor()))).collect(Collectors.toList());

		return filteredPackages;
	}

	@Override
	public Packages getPackageById(PackagesDTO packagesDTO) {
		return packagesDao.getPackagesById(packagesDTO.getId());
	}

	@Override
	public void updatePackage(PackagesDTO packagesDTO) {
		List<String> roleLists = Arrays.asList(RoleEnum.ADMIN.getRole());
		boolean adminAccess = loginService.isUserAccessible(packagesDTO.getUpdatedBy(), roleLists);
		if (!adminAccess)
			throw new UnAuthorizedException("Loged in user don't have permissions  to update user details");

		Packages dbPackages = packagesDao.getPackagesById(packagesDTO.getId());
		PackagesDTO dbPackagesDTO = PackagesConverter.getPackagesDTOByPackages(dbPackages);

		if (null != packagesDTO.getPackageName())
			dbPackagesDTO.setPackageName(packagesDTO.getPackageName());

		if (null != packagesDTO.getPackageFor())
			dbPackagesDTO.setPackageFor(packagesDTO.getPackageFor());

		if (null != packagesDTO.getPackageName())
			dbPackagesDTO.setListingType(packagesDTO.getListingType());

		if (null != packagesDTO.getDurationInDays())
			dbPackagesDTO.setDurationInDays(packagesDTO.getDurationInDays());

		if (null != packagesDTO.getNoOfListings())
			dbPackagesDTO.setNoOfListings(packagesDTO.getNoOfListings());

		if (null != packagesDTO.getCountry())
			dbPackagesDTO.setCountry(packagesDTO.getCountry());

		if (null != packagesDTO.getState())
			dbPackagesDTO.setState(packagesDTO.getState());

		if (null != packagesDTO.getDistrict())
			dbPackagesDTO.setDistrict(packagesDTO.getDistrict());

		if (null != packagesDTO.getDescription())
			dbPackagesDTO.setDescription(packagesDTO.getDescription());

		if (null != packagesDTO.getMrp())
			dbPackagesDTO.setMrp(packagesDTO.getMrp());

		if (null != packagesDTO.getDiscount())
			dbPackagesDTO.setDiscount(packagesDTO.getDiscount());

		if (null != packagesDTO.getSellingPrice())
			dbPackagesDTO.setSellingPrice(packagesDTO.getSellingPrice());

		dbPackagesDTO.setUpdatedBy(packagesDTO.getUpdatedBy());
		dbPackagesDTO.setUpdatedDate(packagesDTO.getUpdatedDate());
		packagesDao.savePackages(dbPackagesDTO);
		LOGGER.info("Package " + packagesDTO.getId() + " updated successfullt by " + packagesDTO.getUpdatedBy());

	}

	@Override
	public Packages deletePackage(PackagesDTO packagesDTO) {
		Packages dbPackages = packagesDao.getPackagesById(packagesDTO.getId());
		PackagesDTO dbPackagesDTO = PackagesConverter.getPackagesDTOByPackages(dbPackages);

		dbPackagesDTO.setStatus(Constant.STATUS_DELETED);
		return packagesDao.savePackages(dbPackagesDTO);

	}

	@Override
	public UserPackages saveUserPackage(UserPackagesDTO userPackagesDTO) {

		// Step:: 1.checking user id is there or not.
		userDao.getUserById(userPackagesDTO.getUserId());

		// Step:: 2.checking package id is there or not.
		Packages dbPackage = packagesDao.getPackagesById(userPackagesDTO.getPackageId());

		// Step:: 3.if package status is active then only create a package for user.
		if (!Constant.STATUS_ACTIVE.equals(dbPackage.getStatus()))
			throw new FieldException("Given package is not in Active state");

		// Step:: 5.save the package activeDate and expiryDates
		try {
			String currentDate = sdf.format(new Date());
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(sdf.parse(currentDate));
			calendar.add(Calendar.DATE, dbPackage.getDurationInDays());
			String packageExpiryDate = sdf.format(calendar.getTime());

			userPackagesDTO.setPackageActiveDate(currentDate);
			userPackagesDTO.setPackageExpiryDate(packageExpiryDate);

		} catch (ParseException e) {
			LOGGER.info("Expection while taking active and expiry dates to save userPackges::" + e.getMessage());
		}

		// Step:: 6.get rolesList of the userRoles of the same user
		List<UserRole> roles = loginService.getAllUserRoles(userPackagesDTO.getUserId());
		List<String> roleList = roles.stream().map(UserRole::getRole).collect(Collectors.toList());

		if (!roleList.contains(dbPackage.getPackageFor()))
			throw new FieldException("Given packges has only acces for role::" + dbPackage.getPackageFor());

		LOGGER.info("User package saved successfully.");
		return userPackagesDao.saveUserPackages(userPackagesDTO);

	}

	@Override
	public List<UserPackagesDTO> getAllUserPackages(UserPackagesDTO userPackagesDTO) {
		
		Long userId2 = userPackagesDTO.getUserId();
		List<Properties> properties = propertiesRepository.findPropertiesByUserId(userId2);

		int propertiesCounting = properties.size();
		String NoOfPosting =String.valueOf(propertiesCounting) ;
		List<UserPackagesDTO> dbUserPackageList = new ArrayList();
		
		
		List<UserPackages> userPackages = userPackageRepo.findPackageByUserId(userPackagesDTO.getUserId());
		
		for (UserPackages userPackage :userPackages) {
			
			UserPackagesDTO userPackageDTO = new UserPackagesDTO();

			Long userId = userPackage.getUserId();
			Long packageId = userPackage.getPackageId();
			
			Packages packages = packageRepo.findById(packageId).get();
			userPackageDTO.setPackageName(packages.getPackageName());
			userPackageDTO.setListingType(packages.getListingType());
			userPackageDTO.setDurationInDays(packages.getDurationInDays().toString());
			userPackageDTO.setNoOfListings(packages.getNoOfListings().toString());
			userPackageDTO.setNoOfPostings(NoOfPosting);
			userPackageDTO.setPackageActiveDate(userPackage.getPackageActiveDate());
			userPackageDTO.setPackageExpiryDate(userPackage.getPackageExpiryDate());
			userPackageDTO.setStatus(userPackage.getStatus());
			
			dbUserPackageList.add(userPackageDTO);

		}
		
		return dbUserPackageList;
	}

	@Override
	public void verifyUserPackage(PackagesDTO packagesDTO) {

		// Step 1:: check user have userPackage or not and take list
		UserPackagesDTO dbUserPackage = new UserPackagesDTO();
		dbUserPackage.setUserId(packagesDTO.getUpdatedBy());
		List<UserPackages> userPackageList = userPackagesDao.getAllUserPackages(dbUserPackage);

		boolean isActivePackage = userPackageList.stream()
				.anyMatch(userPackage -> Constant.STATUS_ACTIVE.equals(userPackage.getStatus()));

		if (!isActivePackage)
			throw new FieldException("Given user doesn't have package or not in Active state");

	}

	@Override
	public void verifyUserPackageByListingType(PackagesDTO packagesDTO) {

		// Step 1:: check user have userPackage or not and take list
		UserPackagesDTO dbUserPackage = new UserPackagesDTO();
		dbUserPackage.setUserId(packagesDTO.getUpdatedBy());
		List<UserPackages> userPackageList = userPackagesDao.getAllUserPackages(dbUserPackage);

		boolean isActivePackage = userPackageList.stream()
				.anyMatch(userPackage -> Constant.STATUS_ACTIVE.equals(userPackage.getStatus()));

		if (!isActivePackage)
			throw new FieldException("Given user package is not in Active state");

		// getting roles of the user
		List<UserRole> roles = loginService.getAllUserRoles(dbUserPackage.getUserId());
		List<String> roleList = roles.stream().map(UserRole::getRole).collect(Collectors.toList());

		String userRole = "";
		for (String role : roleList) {

			userRole = role;

			if (!userRole.equals("Admin")) {

				Packages dbPackages = packagesDao.getPackagesById(userPackageList.get(0).getPackageId());
				List<Packages> packageList = packagesDao.getAllPackages(packagesDTO);

				List<String> listingTypes = packageList.stream().map(Packages::getListingType)
						.collect(Collectors.toList());

				if (!listingTypes.contains(dbPackages.getListingType()))
					throw new FieldException(
							"Given listingtype has only acces for role::" + dbPackages.getListingType());

				// user role is matched with packageFor in packageDTO
				if (!roleList.contains(dbPackages.getPackageFor()))
					throw new FieldException("Given packges has only acces for role::" + dbPackages.getPackageFor());

				if (null == packageList || packageList.size() == 0) {
					LinkedHashMap<String, String> errorMap = new LinkedHashMap<String, String>();
					errorMap.put(Constant.RESPONSE_CODE_KEY, "PB002-2");
					errorMap.put(Constant.RESPONSE_MSG_KEY, "User don't have valid packages found");
					throw new InterruptExitException(errorMap);

				}

			}

		}

	}

	@Override
	public Long verifyUserPackageByCity(PackagesDTO packagesDTO) {

		// Step 1:: check user have userPackage or not and take list
		UserPackagesDTO dbUserPackage = new UserPackagesDTO();
		dbUserPackage.setUserId(packagesDTO.getUpdatedBy());
		List<UserPackages> userPackageList = userPackagesDao.getAllUserPackages(dbUserPackage);

		boolean isActivePackage = userPackageList.stream()
				.anyMatch(userPackage -> Constant.STATUS_ACTIVE.equals(userPackage.getStatus()));

		if (!isActivePackage)
			throw new FieldException("Given user package is not in Active state");

		// getting roles of the user
		List<UserRole> roles = loginService.getAllUserRoles(dbUserPackage.getUserId());
		List<String> roleList = roles.stream().map(UserRole::getRole).collect(Collectors.toList());

		String userRole = "";
		for (String role : roleList) {

			userRole = role;

			if (!userRole.equals("Admin")) {

				Packages dbPackages = packagesDao.getPackagesById(userPackageList.get(0).getPackageId());
				List<Packages> packageList = packagesDao.getAllPackages(packagesDTO);

				List<String> listingTypes = packageList.stream().map(Packages::getListingType)
						.collect(Collectors.toList());

				List<String> cityTypes = packageList.stream().map(Packages::getDistrict).collect(Collectors.toList());

				if (!listingTypes.contains(dbPackages.getListingType())
						&& !cityTypes.contains(dbPackages.getDistrict()))
					throw new FieldException("Please Contact admin 9686522212 ");
//						throw new FieldException("Given listingtype and city  doesn't have valid package::"
//								+ dbPackages.getListingType() + dbPackages.getDistrict());

				// user role is matched with packageFor in packageDTO
				if (!roleList.contains(dbPackages.getPackageFor()))
					throw new FieldException("Given packges has only acces for role::" + dbPackages.getPackageFor());

				if (null == packageList || packageList.size() == 0) {
					LinkedHashMap<String, String> errorMap = new LinkedHashMap<String, String>();
					errorMap.put(Constant.RESPONSE_CODE_KEY, "PB002-2");
					errorMap.put(Constant.RESPONSE_MSG_KEY, "User don't have valid packages found");
					throw new InterruptExitException(errorMap);

				}

			}
		}

		return userPackageList.get(0).getId();
	}

	@Override
	public LinkedHashMap<String, String> purchasePackage(PackagesDTO packagesDTO) {
		map = new LinkedHashMap<String, String>();

		// Check package present id db or not
		Packages dbPackage = packagesDao.getPackagesById(packagesDTO.getId());

		// Check amount match with db sellingPrice or not/Active
		if (!dbPackage.getSellingPrice().equals(packagesDTO.getAmount().setScale(2, RoundingMode.UNNECESSARY))
				|| !Constant.STATUS_ACTIVE.equals(dbPackage.getStatus()))
			throw new FieldException("Given amount mismatch with package price/not in active state");

//		Long easebuzzSeq = easebuzzOrderDao.getNextSeriesId();

		// Get the current date and time
		LocalDateTime currentDateTime = LocalDateTime.now();

		// Define a custom date and time format
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");

		// Format the current date and time using the defined format EBZTestTxn
		String formattedDateTime = currentDateTime.format(formatter).replace("-", "").replace(":", "").replace(" ", "");

		User user = userCache.getUser(packagesDTO.getUpdatedBy());
		Long userId = user.getId();
		String userId2 = String.valueOf(userId);
		Long packageId = packagesDTO.getId();
		String packageId2 = String.valueOf(packageId);

		String easebuzzSeq = "Txn" + formattedDateTime + packageId2 + userId2;

//		MultiValueMap<String, String> easebuzzMap = easebuzzAPIService.createEaseBuzzOrder(packagesDTO,
//				easebuzzSeq.toString());

		MultiValueMap<String, String> easebuzzMap = easebuzzAPIService.createEaseBuzzOrder(packagesDTO, easebuzzSeq);

		EasebuzzOrderDTO dto = new EasebuzzOrderDTO();
		dto.setPackageId(packagesDTO.getId());
		dto.setUserId(packagesDTO.getUpdatedBy());
		dto.setAmount(packagesDTO.getAmount());
		dto.setEasebuzzTxnId(easebuzzSeq.toString());
		dto.setEmail(easebuzzMap.getFirst("email"));
		dto.setMobileNumber(easebuzzMap.getFirst("phone"));
		dto.setOrderStatus(Constant.PAYMENT_PENDING_STATUS);
		dto.setFullName(easebuzzMap.getFirst("firstname"));
		dto.setStatus(Constant.STATUS_ACTIVE);
		dto.setCreatedBy(packagesDTO.getUpdatedBy());
		dto.setCreatedDate(packagesDTO.getUpdatedDate());

		// Save easebuzz order details
		EasebuzzOrder easebuzzOrder = easebuzzOrderDao.saveEasebuzzOrder(dto);

		map.put("accessKey", easebuzzMap.getFirst("data"));
		map.put("id", easebuzzOrder.getId().toString());
		LOGGER.info("Easebuzz aceeskey generated Successfully from initiateLink::" + easebuzzMap.getFirst("data"));

		return map;
	}

	@Override
	public void updatePurchasePkgSuccess(EasebuzzOrderDTO easebuzzOrderDTO) {
		EasebuzzOrder dbEasebuzz = easebuzzOrderDao.getEasebuzzOrderById(easebuzzOrderDTO.getId());
		EasebuzzOrderDTO dbEasebuzzDTO = EasebuzzOrderConverter.getEasebuzzOrderDTOByEasebuzzOrder(dbEasebuzz);

		// Check payment status success or not
		String easebuzzResponse = easebuzzAPIService.getEaseBuzzOrderInfo(dbEasebuzzDTO);

		try {
			JsonNode node = mapper.readTree(easebuzzResponse);
			if (node.get("status").asBoolean()
					&& Constant.EASEBUZZ_TXN_SUCCESS_STATUS.equals(node.get("msg").get("status").asText())) {

				// if txn is success update the easebuzz order details
				dbEasebuzzDTO.setOrderStatus(Constant.PAYMENT_SUCCESS_STATUS);
				dbEasebuzzDTO.setBankName(easebuzzOrderDTO.getBankName());
				dbEasebuzzDTO.setCardNum(easebuzzOrderDTO.getCardNum());
				dbEasebuzzDTO.setCardType(easebuzzOrderDTO.getCardType());
				dbEasebuzzDTO.setNameOnCard(easebuzzOrderDTO.getNameOnCard());
				dbEasebuzzDTO.setEasepayId(easebuzzOrderDTO.getEasepayId());
				dbEasebuzzDTO.setMode(easebuzzOrderDTO.getMode());
				dbEasebuzzDTO.setUpiVa(easebuzzOrderDTO.getUpiVa());
				dbEasebuzzDTO.setMessage(easebuzzOrderDTO.getMessage());
				dbEasebuzzDTO.setBankRefNum(easebuzzOrderDTO.getBankRefNum());
				dbEasebuzzDTO.setUpdatedBy(easebuzzOrderDTO.getUpdatedBy());
				dbEasebuzzDTO.setUpdatedDate(easebuzzOrderDTO.getUpdatedDate());
				easebuzzOrderDao.saveEasebuzzOrder(dbEasebuzzDTO);
				LOGGER.info("Payment for the given id " + easebuzzOrderDTO.getId()
						+ " is success, so we are updating the payment as success");
			} else {
				LOGGER.info("Payment for the given id " + easebuzzOrderDTO.getId() + " is not success.EasepayId "
						+ dbEasebuzzDTO.getEasepayId());
				throw new FieldException("Payment for the given id " + easebuzzOrderDTO.getId()
						+ " is not success.EasepayId " + dbEasebuzzDTO.getEasepayId());

			}

		} catch (JsonMappingException e) {
			LOGGER.info("Exception while taking deatils from easebuzz getTxn::" + e.getMessage());
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			LOGGER.info("Exception while taking deatils from easebuzz getTxn::" + e.getMessage());
			e.printStackTrace();
		}
		LOGGER.info("Response::" + easebuzzResponse);

	}

	@Override
	public void updatePurchasePkgFailure(EasebuzzOrderDTO easebuzzOrderDTO) {
		EasebuzzOrder dbEasebuzz = easebuzzOrderDao.getEasebuzzOrderById(easebuzzOrderDTO.getId());
		EasebuzzOrderDTO dbEasebuzzDTO = EasebuzzOrderConverter.getEasebuzzOrderDTOByEasebuzzOrder(dbEasebuzz);

		dbEasebuzzDTO.setOrderStatus(Constant.PAYMENT_FAILURE_STATUS);
		dbEasebuzzDTO.setUpdatedBy(easebuzzOrderDTO.getUpdatedBy());
		dbEasebuzzDTO.setUpdatedDate(easebuzzOrderDTO.getUpdatedDate());
		easebuzzOrderDao.saveEasebuzzOrder(dbEasebuzzDTO);

		LOGGER.info("Payment for the given id " + easebuzzOrderDTO.getId()
				+ " is failure, so we are updating the payment as failure");

	}
	
	@Override
    public List<PackagePaymentDTO> getPackagePayments(PackagePaymentDTO packagePaymentDto) {
        String status = packagePaymentDto.getStatus();
//        List<PackagePayment> packagePayments = packagePaymentRepo.findByStatus();
        

        List<PackagePayment> packagePayments = packagePaymentRepo.findByStatus();
                
        return packagePayments.stream()
                .map(PackagePaymentConverter::getPackagePaymentDtoByPackagePayment)
                .collect(Collectors.toList());
    }

	@Override
	public void savePackagePayment(PackagePaymentDTO packagePaymentDto) {
		UserPackagesDTO userPackagedto = new UserPackagesDTO();
		
		userPackagedto.setUserId(packagePaymentDto.getUserId());
		userPackagedto.setPackageId(packagePaymentDto.getPackageId());
		userPackagedto.setStatus(Constant.STATUS_PENDING);
		userPackagedto.setCreatedDate(DateUtils.currentDate());
		userPackagedto.setCreatedBy(packagePaymentDto.getUserId());
		userPackagedto.setUpdatedBy(packagePaymentDto.getUserId());
		userPackagedto.setUpdatedDate(DateUtils.currentDate());
		
		packagePaymentDto.setCreatedBy(packagePaymentDto.getUserId());
		packagePaymentDto.setUpdatedBy(packagePaymentDto.getUserId());
		packagePaymentDto.setUpdatedDate(DateUtils.currentDate());
		
		PackagePayment packagePayment = PackagePaymentConverter.getPackagePaymentByPackagePaymentDto(packagePaymentDto);
		
		UserPackages userPackage = UserPackageConverter.getUserPackagesByUserPackagesDTO(userPackagedto);
		
		userPackageRepo.save(userPackage);
		
		packagePaymentRepo.save(packagePayment);
		
	}

	@Override
	public boolean updatePackagePaymentStatus(Long packagePaymentId, String status) {
		
		Optional<PackagePayment> packagePaymentOpt = packagePaymentRepo.findById(packagePaymentId);
		
		if (packagePaymentOpt.isPresent()) {
            PackagePayment packagePayment = packagePaymentOpt.get();
            packagePayment.setStatus(status); // Update the status
            packagePaymentRepo.save(packagePayment); // Save the updated entity
           
            
            Long userId = packagePayment.getUserId();
            Long packageId = packagePayment.getPackageId();
            
            Optional<UserPackages> userPackageOpt = userPackageRepo.findByUserIdAndPackageId(userId, packageId);
            
            
            
            if (userPackageOpt.isPresent()) {
                UserPackages userPackage = userPackageOpt.get();
                userPackage.setStatus(status); // Update the status
                
                Optional<Packages> packagesOpt = packageRepo.findById(packageId);
                
                if (packagesOpt.isPresent()) {
                    Packages packagesDetail = packagesOpt.get();
                    int durationInDays = packagesDetail.getDurationInDays();

                    // Calculate the expiry date
                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime expiryDate = now.plusDays(durationInDays);

                    // Format the expiry date
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    String formattedExpiryDate = expiryDate.format(formatter);
                    String formattedActiveDate = now.format(formatter);

                    // Set the formatted expiry date in the userPackage
                    userPackage.setPackageExpiryDate(formattedExpiryDate);
                    userPackage.setPackageActiveDate(formattedActiveDate);
                }
                
                userPackageRepo.save(userPackage); // Save the updated entity
                return true; // Indicate that the update was successful
            }
        }
		
		return false;
	}

}
