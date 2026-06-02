package com.getmyhousing.rental.serviceimpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.AdditionalDetailsConverter;
import com.getmyhousing.common.converter.AmenitiesConverter;
import com.getmyhousing.common.converter.DefinePropertyConverter;
import com.getmyhousing.common.converter.FurnishingStatusConverter;
import com.getmyhousing.common.converter.LandMarkConverter;
import com.getmyhousing.common.converter.PgDetailsConverter;
import com.getmyhousing.common.converter.PgOwnerDetailsConverter;
import com.getmyhousing.common.converter.PgRegulationConverter;
import com.getmyhousing.common.converter.PgRoomDetailsConverter;
import com.getmyhousing.common.converter.PricingDetailsConverter;
import com.getmyhousing.common.converter.PropertyAreaDetailsConverter;
import com.getmyhousing.common.converter.PropertyConverter;
import com.getmyhousing.common.converter.PropertyFloorRoomConverter;
import com.getmyhousing.common.converter.PropertyGroupConverter;
import com.getmyhousing.common.converter.PropertyMediaConverter;
import com.getmyhousing.common.converter.PropertyStatusConverter;
import com.getmyhousing.common.converter.ReraStatusConverter;
import com.getmyhousing.common.converter.TenantStatusConverter;
import com.getmyhousing.common.dao.AdditionalDetailsDao;
import com.getmyhousing.common.dao.AmenitiesDao;
import com.getmyhousing.common.dao.DefinePropertyDao;
import com.getmyhousing.common.dao.FurnishingStatusDao;
import com.getmyhousing.common.dao.IncludedGroupPropertyDao;
import com.getmyhousing.common.dao.LandMarkDao;
import com.getmyhousing.common.dao.OwnerDao;
import com.getmyhousing.common.dao.PackagesDao;
import com.getmyhousing.common.dao.PgDetailsDao;
import com.getmyhousing.common.dao.PgOwnerDetailsDao;
import com.getmyhousing.common.dao.PgRegulationsDao;
import com.getmyhousing.common.dao.PgRoomDetailsDao;
import com.getmyhousing.common.dao.PricingDetailsDao;
import com.getmyhousing.common.dao.PropertiesDao;
import com.getmyhousing.common.dao.PropertyAreaDetailsDao;
import com.getmyhousing.common.dao.PropertyFloorRoomsDao;
import com.getmyhousing.common.dao.PropertyImageGalleryDao;
import com.getmyhousing.common.dao.PropertyMediaDao;
import com.getmyhousing.common.dao.PropertyStatusDao;
import com.getmyhousing.common.dao.ReraStatusDao;
import com.getmyhousing.common.dao.TenantStatusDao;
import com.getmyhousing.common.dao.UserPackagesDao;
import com.getmyhousing.common.domain.AdditionalDetails;
import com.getmyhousing.common.domain.Amenities;
import com.getmyhousing.common.domain.DefineProperty;
import com.getmyhousing.common.domain.FurnishingStatus;
import com.getmyhousing.common.domain.LandMark;
import com.getmyhousing.common.domain.Owner;
import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.domain.PgDetails;
import com.getmyhousing.common.domain.PgOwnerDetails;
import com.getmyhousing.common.domain.PgRegulations;
import com.getmyhousing.common.domain.PgRoomDetails;
import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.PropertyAreaDetails;
import com.getmyhousing.common.domain.PropertyFloorRooms;
import com.getmyhousing.common.domain.PropertyGroup;
import com.getmyhousing.common.domain.PropertyImageGallery;
import com.getmyhousing.common.domain.PropertyMedia;
import com.getmyhousing.common.domain.PropertyStatus;
import com.getmyhousing.common.domain.ReraStatus;
import com.getmyhousing.common.domain.TenantStatus;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.AdditionalDetailsDTO;
import com.getmyhousing.common.dto.AmenitiesDTO;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.dto.DefinePropertyDTO;
import com.getmyhousing.common.dto.FurnishingStatusDTO;
import com.getmyhousing.common.dto.IncludedGroupPropertyDTO;
import com.getmyhousing.common.dto.LandMarkDTO;
import com.getmyhousing.common.dto.PgDetailsDTO;
import com.getmyhousing.common.dto.PgOwnerDetailsDTO;
import com.getmyhousing.common.dto.PgRegulationsDTO;
import com.getmyhousing.common.dto.PgRoomDetailsDTO;
import com.getmyhousing.common.dto.PricingDetailsDTO;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.PropertyAreaDetailsDTO;
import com.getmyhousing.common.dto.PropertyFloorRoomsDTO;
import com.getmyhousing.common.dto.PropertyGroupDTO;
import com.getmyhousing.common.dto.PropertyImageGalleryDTO;
import com.getmyhousing.common.dto.PropertyMediaDTO;
import com.getmyhousing.common.dto.PropertyResponse;
import com.getmyhousing.common.dto.PropertySearchDto;
import com.getmyhousing.common.dto.PropertyStatusDTO;
import com.getmyhousing.common.dto.ReraStatusDTO;
import com.getmyhousing.common.dto.TenantStatusDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.exception.UnAuthorizedException;
import com.getmyhousing.common.repository.FurnishingStatusRepository;
import com.getmyhousing.common.repository.PackagesRepository;
import com.getmyhousing.common.repository.PricingDetailsRepository;
import com.getmyhousing.common.repository.PropertiesRepository;
import com.getmyhousing.common.repository.PropertyAreaDetailsRepository;
import com.getmyhousing.common.repository.PropertyFloorRoomsRepository;
import com.getmyhousing.common.repository.PropertyGroupRepository;
import com.getmyhousing.common.repository.PropertyImageGalleryRepository;
import com.getmyhousing.common.repository.PropertyStatusRepository;
import com.getmyhousing.common.repository.UserPackagesRepository;
import com.getmyhousing.common.repository.UserRepository;
import com.getmyhousing.common.repository.UserRoleRepository;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.utils.PropertyUtility;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.RoleEnum;
import com.getmyhousing.rental.service.RentalService;

@Service
public class RentalServiceImpl implements RentalService {

	private Logger LOGGER = LoggerFactory.getLogger(RentalServiceImpl.class);

	@Resource(name = "PropertiesDaoImpl")
	private PropertiesDao propertiesDao;

	@Resource(name = "PropertyStatusDaoImpl")
	private PropertyStatusDao propertyStatusDao;

	@Resource(name = "PropertyAreaDetailsDaoImpl")
	private PropertyAreaDetailsDao propertyAreaDetailsDao;

	@Resource(name = "TenantStatusDaoImpl")
	private TenantStatusDao tenantStatusDao;

	@Resource(name = "PricingDetailsDaoImpl")
	private PricingDetailsDao pricingDetailsDao;

	@Resource(name = "ReraStatusDaoImpl")
	private ReraStatusDao reraStatusDao;

	@Resource(name = "AdditionalDetailsDaoImpl")
	private AdditionalDetailsDao additionalDetailsDao;

	@Resource(name = "LandMarkDaoImpl")
	private LandMarkDao landMarkDao;

	@Resource(name = "DefinePropertyDaoImpl")
	private DefinePropertyDao definePropertyDao;

	@Resource(name = "FurnishingStatusDaoImpl")
	private FurnishingStatusDao furnishingStatusDao;

	@Resource(name = "AmenitiesDaoImpl")
	private AmenitiesDao amenitiesDao;

	@Resource(name = "PgDetailsDaoImpl")
	private PgDetailsDao pgDetailsDao;

	@Resource(name = "PgRoomDetailsDaoImpl")
	private PgRoomDetailsDao pgRoomDetailsDao;

	@Resource(name = "PgRegulationsDaoImpl")
	private PgRegulationsDao pgRegulationsDao;

	@Resource(name = "PgOwnerDetailsDaoImpl")
	private PgOwnerDetailsDao pgOwnerDetailsDao;

	@Resource(name = "PropertyFloorRoomsDaoImpl")
	private PropertyFloorRoomsDao propertyFloorRoomsDao;

	@Resource(name = "PropertyMediaDaoImpl")
	private PropertyMediaDao propertyMediaDao;

	@Resource(name = "UserPackagesDaoImpl")
	private UserPackagesDao userPackagesDao;

	@Resource(name = "PackagesDaoImpl")
	private PackagesDao packagesDao;
	
	@Resource(name = "OwnerDaoImpl")
	private OwnerDao ownerDao;

	@Resource(name = "PropertyImageGalleryDaoImpl")
	private PropertyImageGalleryDao propertyImageGalleryDao;

	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;
	
	@Autowired
	private IncludedGroupPropertyDao includedGroupPropertyDao;

	@Autowired
	private PropertiesRepository propertiesRepository;
	
	@Autowired
	private PricingDetailsRepository pricingDetailsRepository;
	
	@Autowired
	private PropertyAreaDetailsRepository propertyAreaDetailsRepository;
	
	@Autowired
	private PropertyImageGalleryRepository propertyImageGalleryRepository;
	
	@Autowired
	private FurnishingStatusRepository furnishingStatusRepository;
	
	@Autowired
	private PropertyStatusRepository propertyStatusRepository;

	@Autowired
	private UserPackagesRepository userPackagesRepository;
	
	@Autowired
	private UserUtils userUtils;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@Autowired
	private PropertyGroupRepository propertyGroupRepository;
	
	

	@Override
	public void saveProperty(PropertiesDTO propertiesDTO) {
		

		List<UserRole> userRoles = loginService.getAllUserRoles(propertiesDTO.getCreatedBy());
		
		boolean userFlag = false;
		for (UserRole userRole : userRoles) {
		    // Check for both "Associate" and "Agent" roles
		    if (userRole.getRole().equals("Associate") || userRole.getRole().equals("Agent")) {
		        userFlag = true;
		        break; // Exit the loop early if either condition is met
		    }
		}
		 
		boolean adminFlag = false;
		for (UserRole userRole : userRoles) {
		    // Null check for RoleEnum.ADMIN
		    if (userRole.getRole().equals("Admin")) {
		        adminFlag = true;
		        break; // Exit the loop early if the condition is met
		    }
		}

		// need to ask Admin
		if (!(userFlag || adminFlag))
			throw new UnAuthorizedException("LogedIn User does't have roles to save property details.");

		
		if (!adminFlag) {

//			UserPackages userPackage = userPackagesDao.getUserPackageById(propertiesDTO.getUserPackageId());

//			if (!Constant.STATUS_ACTIVE.equals(userPackage.getStatus()))
//				throw new FieldException("user doesn't have active user packages " + userPackage.getId());

			// Check user have any active package or not
//			Packages dbPackage = packagesDao.getPackagesById(userPackage.getPackageId());

//			if (!Constant.STATUS_ACTIVE.equals(userPackage.getStatus()))
//				throw new FieldException("user doesn't have active packages " + dbPackage.getId());

			// Get count active and pending preview properties for user
//			int propertyCount = propertiesDao.getPropertyCountByStatusList(propertiesDTO.getCreatedBy(),
//					Arrays.asList(Constant.STATUS_ACTIVE, Constant.STATUS_PENDING_REVIEW),
//					propertiesDTO.getUserPackageId());

			// Check the condition count of posted properties
//			if (propertyCount >= dbPackage.getNoOfListings())
//				throw new FieldException("you can't add properties  more than " + dbPackage.getNoOfListings()
//						+ " properties " + " for this package id:" + dbPackage.getId());

		}


		// Step 1:: Save properties details.
		Properties properties = propertiesDao.saveProperty2(propertiesDTO, adminFlag);
		
		// Step 2:: Save areaDeatils
		if (null != propertiesDTO.getPropertyAreaDetails()) {                

			PropertyAreaDetailsDTO propertyAreaDetailsDTO = propertiesDTO.getPropertyAreaDetails();
			propertyAreaDetailsDTO.setPropertyId(properties.getId());  
			
			propertyAreaDetailsDTO.setCreatedBy(properties.getCreatedBy());                                       
			
			// taking list from AdditionalRoomlist
			if (null != propertyAreaDetailsDTO.getAdditionalRoomsList()
					&& propertyAreaDetailsDTO.getAdditionalRoomsList().size() > 0)
				propertyAreaDetailsDTO
						.setAdditionalRooms(String.join(",", propertyAreaDetailsDTO.getAdditionalRoomsList()));

			propertyAreaDetailsDao.saveAreaDetails(propertyAreaDetailsDTO);
			LOGGER.info("PropertyAreaDetails added successfully for propertyId::" + properties.getId());
		}


		// Step 3:: Save tenant status
		if (null != propertiesDTO.getTenantStatus()) {

			TenantStatusDTO tenantDTO = propertiesDTO.getTenantStatus();
			tenantDTO.setPropertyId(properties.getId());
			// taking list from bachelorsAllowedlist
			if (null != tenantDTO.getBachelorsAllowedList() && tenantDTO.getBachelorsAllowedList().size() > 0)
				tenantDTO.setBachelorsAllowed(String.join(",", tenantDTO.getBachelorsAllowedList()));

			// taking list from sprinstersAllowedList
			if (null != tenantDTO.getSprinstersAllowedList() && tenantDTO.getSprinstersAllowedList().size() > 0)
				tenantDTO.setSprinstersAllowed(String.join(",", tenantDTO.getSprinstersAllowedList()));

			// taking list from tenantTypeList
			if (null != tenantDTO.getTenantTypeList() && tenantDTO.getTenantTypeList().size() > 0)
				tenantDTO.setTenantType(String.join(",", tenantDTO.getTenantTypeList()));

			tenantStatusDao.saveTenantStatus(tenantDTO);
			LOGGER.info("Tenant status added successfully for propertyId::" + properties.getId());
		}

		// Step 4:: Save property status
		if (null != propertiesDTO.getPropertyStatus()) {

			PropertyStatusDTO propertystatusDTO = propertiesDTO.getPropertyStatus();
			propertystatusDTO.setPropertyId(properties.getId());
			propertyStatusDao.savePropertyStatus(propertystatusDTO);
			LOGGER.info("Property status Details added successfully for proertyId::" + properties.getId());
		}

		// Step 5:: Save pricing details

		if (null != propertiesDTO.getPricingDetails()) {

			PricingDetailsDTO pricingDetailsDTO = propertiesDTO.getPricingDetails();
			pricingDetailsDTO.setPropertyId(properties.getId());			
			pricingDetailsDao.savePricingDetails(pricingDetailsDTO);

			LOGGER.info("Property pricing Details added successfully for propertyId::" + properties.getId());
		}

		// Step 6:: Save reraStatus details
		if (null != propertiesDTO.getReraStatus()) {

			ReraStatusDTO reraStatusDTO = propertiesDTO.getReraStatus();
			reraStatusDTO.setPropertyId(properties.getId());
			reraStatusDao.saveReraStatus(reraStatusDTO);
			LOGGER.info("rera status Details added successfully for propertyId::" + properties.getId());
		}

		// Step 7:: Save additional Details
		if (null != propertiesDTO.getAdditionalDetails()) {

			AdditionalDetailsDTO additionalDetailsDTO = propertiesDTO.getAdditionalDetails();
			additionalDetailsDTO.setPropertyId(properties.getId());

			additionalDetailsDao.saveAdditionalDetails(additionalDetailsDTO);
			LOGGER.info("Additional  Details added successfully for propertyId::" + properties.getId());
			
		}

		
		// Step 8:: Save landmark Details
		if (null != propertiesDTO.getLandMarks()) {

			LandMarkDTO landMarkDTO = propertiesDTO.getLandMarks();
			landMarkDTO.setPropertyId(properties.getId());
			
			landMarkDao.saveLandMark(landMarkDTO);
			LOGGER.info("LandMark Details added successfully for propertyId::" + properties.getId());
		}

		// Step 9:: Save defineProperty Details
		if (null != propertiesDTO.getDefineProperty()) {

			DefinePropertyDTO definePropertyDTO = propertiesDTO.getDefineProperty();
			definePropertyDTO.setPropertyId(properties.getId());
			definePropertyDao.saveDefineProperty(definePropertyDTO);
			LOGGER.info("Define Details added successfully for propertyId::" + properties.getId());

		}

		// Step 10:: Save furnishing status
		if (null != propertiesDTO.getFurnishingStatus()) {

			FurnishingStatusDTO furnishingStatusDTO = propertiesDTO.getFurnishingStatus();
			furnishingStatusDTO.setPropertyId(properties.getId());
			furnishingStatusDao.saveFurnishingStatus(furnishingStatusDTO);
			LOGGER.info("Furnidhing Details added successfully for propertyId::" + properties.getId());
		}

		// Step 11:: Save Amenities
		if (null != propertiesDTO.getAmenities()) {
			List<String> amenities = propertiesDTO.getAmenities().getAmenity();

			for (String amenity : amenities) {

				// Get the current date and time
				LocalDateTime dateTime = LocalDateTime.now();
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				String currentDateTime = dateTime.format(formatter);

				AmenitiesDTO amenitiesDTO = new AmenitiesDTO();
				amenitiesDTO.setAmenities(amenity);
				amenitiesDTO.setCreatedDate(currentDateTime);
				amenitiesDTO.setUpdatedDate(currentDateTime);
				amenitiesDTO.setCreatedBy(properties.getCreatedBy());
				amenitiesDTO.setUpdatedBy(properties.getCreatedBy());
				amenitiesDTO.setPropertyId(properties.getId());
				amenitiesDTO.setStatus(Constant.STATUS_ACTIVE);

				amenitiesDao.saveAmenities(amenitiesDTO);
				LOGGER.info("Amenneties Details added successfully for propertyId::" + properties.getId());

			}

		}

		// Step 12:: Save pgDetials
		if (null != propertiesDTO.getPgDetails()) {

			PgDetailsDTO pgDetailsDTO = propertiesDTO.getPgDetails();
			pgDetailsDTO.setPropertyId(properties.getId());
			pgDetailsDao.savePgDetails(pgDetailsDTO);
			LOGGER.info("Property pricing Details added successfully for propertyId::" + properties.getId());

		}


		// Step 13:: Save pgRoomDetails
		if (null != propertiesDTO.getPgRoomDetails()) {
			PgRoomDetailsDTO pgRoomDetailsDTO = propertiesDTO.getPgRoomDetails();
			pgRoomDetailsDTO.setPropertyId(properties.getId());
			pgRoomDetailsDao.savePgRoomDetails(pgRoomDetailsDTO);
			LOGGER.info("pg room Details added successfully for propertyId::" + properties.getId());
		}

		// Step 14:: Save pgRegualtions
		if (null != propertiesDTO.getPgRegulations()) {
			PgRegulationsDTO pgRegulationsDTO = propertiesDTO.getPgRegulations();
			pgRegulationsDTO.setPropertyId(properties.getId());
			pgRegulationsDao.savePgRegualtions(pgRegulationsDTO);
			LOGGER.info("pgRegulations Details added successfully for propertyId::" + properties.getId());
		}

		// Step 15:: Save pgOwnerdetails
		if (null != propertiesDTO.getPgOwnerDetails()) {
			PgOwnerDetailsDTO pgOwnerDetailsDTO = propertiesDTO.getPgOwnerDetails();
			pgOwnerDetailsDTO.setPropertyId(properties.getId());
			pgOwnerDetailsDao.savePgOwnerDetails(pgOwnerDetailsDTO);
			LOGGER.info("Pg owner details added successfully for propertyId::" + properties.getId());

		}

		// Step 16:: Save Property Floor Rooms
		if (null != propertiesDTO.getPropertyFloorRooms() && propertiesDTO.getPropertyFloorRooms().size() > 0) {
			for (PropertyFloorRoomsDTO floorRoomsDTO : propertiesDTO.getPropertyFloorRooms()) {
				floorRoomsDTO.setPropertyId(properties.getId());

				propertyFloorRoomsDao.savePropertyFloorRooms(floorRoomsDTO);
			
				LOGGER.info("Property floor Details added successfully for propertyId::" + properties.getId());
			}
		}
		

		// Step 17:: Save PropertyMedia
		if (null != propertiesDTO.getPropertyMedia() && propertiesDTO.getPropertyMedia().size() > 0) {
			for (PropertyMediaDTO propertyMediaDTO : propertiesDTO.getPropertyMedia()) {
				propertyMediaDTO.setPropertyId(properties.getId());
				propertyMediaDao.savePropertyMedia(propertyMediaDTO);
				LOGGER.info("Property media Details added successfully for propertyId::" + properties.getId());
			}
		}


		// Step 18:: add property images
		for (PropertyImageGalleryDTO propertyImageGalleryDTO : propertiesDTO.getPropertyImages()) {
		
		// Get the current date and time
			LocalDateTime dateTime = LocalDateTime.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
			String currentDateTime = dateTime.format(formatter);

			PropertyImageGalleryDTO propertyImageGalleryDTO2 = new PropertyImageGalleryDTO();
			propertyImageGalleryDTO2.setPropertyId(properties.getId());
			propertyImageGalleryDTO2.setImagePath(propertyImageGalleryDTO.getImagePath());
			propertyImageGalleryDTO2.setImageType(propertyImageGalleryDTO.getImageType());
			propertyImageGalleryDTO2.setCreatedBy(propertiesDTO.getCreatedBy());
			propertyImageGalleryDTO2.setCreatedDate(currentDateTime);
			propertyImageGalleryDTO2.setId(propertyImageGalleryDTO.getId());
			propertyImageGalleryDTO2.setImagesList(propertyImageGalleryDTO.getImagesList());
			propertyImageGalleryDTO2.setUpdatedBy(propertiesDTO.getUpdatedBy());
			propertyImageGalleryDTO2.setUpdatedDate(currentDateTime);
//			propertyImageGalleryDTO2.setStatus(propertyImageGalleryDTO.getStatus());
			propertyImageGalleryDTO2.setStatus(Constant.STATUS_ACTIVE);

			propertyImageGalleryDao.savePropertyImageGallery(propertyImageGalleryDTO2);
			LOGGER.info("Property image gallery Details added successfully for propertyId::" + properties.getId());

		}
	}

	@Override
	public PropertiesDTO getCompleteProperty(PropertiesDTO poropertiesDto) {

		Properties properties = propertiesDao.getPropertyById(poropertiesDto.getId());
		PropertiesDTO returnDTO = PropertyConverter.getPropertyDTOIntoProperties(properties);
		
		// step :: 1 fetching areaDetails
		PropertyAreaDetails areaDetails = propertyAreaDetailsDao.getAreaDetailsByPropertyId(poropertiesDto.getId());
		if (null != areaDetails) {
			PropertyAreaDetailsDTO areaDetailsDTO = PropertyAreaDetailsConverter
					.getAreaDetailsDTOByAreaDetails(areaDetails);
			returnDTO.setPropertyAreaDetails(areaDetailsDTO);
		}

		// step :: 2 fetching additionalDetails
		AdditionalDetails additionalDetails = additionalDetailsDao
				.getAdditionalDetailsByPropertyId(poropertiesDto.getId());
		if (null != additionalDetails) {
			AdditionalDetailsDTO additionalDetailsDTO = AdditionalDetailsConverter
					.getAdditionalDetailsDTOByAdditionalDetails(additionalDetails);
			returnDTO.setAdditionalDetails(additionalDetailsDTO);
		}
		// step :: 3 fetching DefineProperty
		DefineProperty defineProperty = definePropertyDao.getDefinePropertyByPropertyId(poropertiesDto.getId());
		if (null != defineProperty) {
			DefinePropertyDTO definePropertyDTO = DefinePropertyConverter
					.getDefinePropertyDTOByDefineProperty(defineProperty);
			returnDTO.setDefineProperty(definePropertyDTO);
		}

		// step :: 4 fetching FurnishingStatus
		FurnishingStatus furnishingStatus = furnishingStatusDao.getFurnishingStatusByPropertyId(poropertiesDto.getId());
		if (null != furnishingStatus) {
			FurnishingStatusDTO furnishingStatusDTO = FurnishingStatusConverter
					.getFurnishingDTOIntoFurnishingStatus(furnishingStatus);
			returnDTO.setFurnishingStatus(furnishingStatusDTO);
		}

		// step :: 5 fetching LandMark
		LandMark landMarks = landMarkDao.getLandMarkByPropertyId(poropertiesDto.getId());
		if (null != landMarks) {
			LandMarkDTO landMarkDTO = LandMarkConverter.getLandMarkDTOByLandMark(landMarks);
			returnDTO.setLandMarks(landMarkDTO);
		}
		

		// step :: 6 fetching PgDetails
		PgDetails pgDetails = pgDetailsDao.getPgDetailsByPropertyId(poropertiesDto.getId());
		if (null != pgDetails) {
			PgDetailsDTO pgDetailsDTO = PgDetailsConverter.getPgDetailsDTOIntoPgDetails(pgDetails);
			returnDTO.setPgDetails(pgDetailsDTO);
		}

		// step :: 7 fetching PgOwnerDetails
		PgOwnerDetails pgOwnerDetails = pgOwnerDetailsDao.getPgOwnerDetailsByPropertyId(poropertiesDto.getId());
		if (null != pgOwnerDetails) {
			PgOwnerDetailsDTO pgOwnerDetailsDTO = PgOwnerDetailsConverter
					.getPgDetailsDTOIntoPgOwnerDetails(pgOwnerDetails);
			returnDTO.setPgOwnerDetails(pgOwnerDetailsDTO);
		}

		// step :: 8 fetching PgRegulations
		PgRegulations pgRegulations = pgRegulationsDao.getPgRegulationsByPropertyId(poropertiesDto.getId());
		if (null != pgRegulations) {
			PgRegulationsDTO pgRegulationsDTO = PgRegulationConverter.getRegulationsDTOIntoPgRegulations(pgRegulations);
			returnDTO.setPgRegulations(pgRegulationsDTO);
		}

		// step ::9 fetching PgRoomDetails
		PgRoomDetails pgRoomDetails = pgRoomDetailsDao.getPgRoomDetailsByPropertyId(poropertiesDto.getId());
		if (null != pgRoomDetails) {
			PgRoomDetailsDTO pgRoomDetailsDTO = PgRoomDetailsConverter
					.getPgRoomDetailsDTOByPgRoomDetails(pgRoomDetails);
			returnDTO.setPgRoomDetails(pgRoomDetailsDTO);
		}

		// step :: 10 fetching PricingDetails
		PricingDetails pricingDetails = pricingDetailsDao.getPricingDetailsByPropertyId(poropertiesDto.getId());
		if (null != pricingDetails) {
			PricingDetailsDTO pricingDetailsDTO = PricingDetailsConverter
					.getPricingDetailsDTOByPricingDetails(pricingDetails);
			returnDTO.setPricingDetails(pricingDetailsDTO);
		}

		// step :: 11 fetching PropertyStatus
		PropertyStatus propertyStatus = propertyStatusDao.getPropertyStatusByPropertyId(poropertiesDto.getId());
		if (null != propertyStatus) {
			PropertyStatusDTO propertyStatusDTO = PropertyStatusConverter
					.getPropertyStatusDTOIntoPropertyStatus(propertyStatus);
			returnDTO.setPropertyStatus(propertyStatusDTO);
		}

		// step :: 12 fetching ReraStatus
		ReraStatus reraStatus = reraStatusDao.getReraStatusByPropertyId(poropertiesDto.getId());
		if (null != reraStatus) {
			ReraStatusDTO reraStatusDTO = ReraStatusConverter.getReraStatusDTOByReraStatus(reraStatus);
			returnDTO.setReraStatus(reraStatusDTO);
		}

		// step :: 13 fetching TenantStatus
		TenantStatus tenantStatus = tenantStatusDao.getTenantStatusByPropertyId(poropertiesDto.getId());
		if (null != tenantStatus) {
			TenantStatusDTO tenantStatusDTO = TenantStatusConverter.getTenantStatusDTOByTenantStatus(tenantStatus);
			returnDTO.setTenantStatus(tenantStatusDTO);
		}

		// Step 13: Fetching amenitiesList
		List<Amenities> amenitiesList = amenitiesDao.getAmenitiesByPropertyId(poropertiesDto.getId());
		List<AmenitiesDTO> amenitiesDTOList = new ArrayList<AmenitiesDTO>();
		for (Amenities amenities : amenitiesList) {
			AmenitiesDTO amenitiesDTO = AmenitiesConverter.getAmenitiesDTOIntoAmenities(amenities);
			amenitiesDTOList.add(amenitiesDTO);
		}
		returnDTO.setAmenitiesList(amenitiesDTOList);

		// Step 14: Fetching PropertyFloorRooms
		List<PropertyFloorRooms> propertyFloorRoomsList = propertyFloorRoomsDao
				.getPropertyFloorRoomsByPropertyId(poropertiesDto.getId());
		List<PropertyFloorRoomsDTO> propertyFloorRoomsDTOList = new ArrayList<PropertyFloorRoomsDTO>();
		for (PropertyFloorRooms propertyFloorRooms : propertyFloorRoomsList) {
			PropertyFloorRoomsDTO propertyFloorRoomsDTO = PropertyFloorRoomConverter
					.getPropertyFloorRoomsDTOByPropertyFloorRooms(propertyFloorRooms);
			propertyFloorRoomsDTOList.add(propertyFloorRoomsDTO);
		}

		returnDTO.setPropertyFloorRooms(propertyFloorRoomsDTOList);

		// Step 15: Fetching PropertyMedia
		List<PropertyMedia> propertyMediaList = propertyMediaDao.getPropertyMediaByPropertyId(poropertiesDto.getId());
		List<PropertyMediaDTO> propertyMediaDTOList = new ArrayList<PropertyMediaDTO>();
		for (PropertyMedia propertyMedia : propertyMediaList) {
			PropertyMediaDTO propertyMediaDTO = PropertyMediaConverter
					.getPropertyMediaDTOByPropertyMedia(propertyMedia);
			propertyMediaDTOList.add(propertyMediaDTO);
		}

		returnDTO.setPropertyMedia(propertyMediaDTOList);

		// Step 16:: get list propertyImageGallery
		PropertyImageGalleryDTO dto = new PropertyImageGalleryDTO();
		dto.setPropertyId(poropertiesDto.getId());
		List<PropertyImageGallery> propertyImageGalleryList = propertyImageGalleryDao.getAllPropertyImageGallery(dto);
		returnDTO.setPropertyGalleryImages(propertyImageGalleryList);

		Long propertyId = properties.getId();

		Long userPackageId = properties.getUserPackageId();

		String title = "";
		String username = "";
		String userRole = "";
		String userWhatsappNumber = "";
		if (userPackageId != null) {

			Optional<UserPackages> userPackageOptional = userPackagesRepository.findById(userPackageId);
			if (userPackageOptional.isPresent()) {
				Long userId = userPackageOptional.get().getUserId();

				Optional<User> userOptional = userRepository.findById(userId);
				if (userOptional.isPresent()) {
					User user = userOptional.get();
					username = user.getFullName();
					userWhatsappNumber = user.getWhatsappNumber();
				}

				UserRole userRoleByUserId = userRoleRepository.getUserRoleByUserId(userId);
				if (userRoleByUserId != null) {
					userRole = userRoleByUserId.getRole();
				}
			}
		}
		
		String furnishingType = returnDTO.getFurnishingStatus() != null ? returnDTO.getFurnishingStatus().getFurnishingType() : "";
		String noOfBedrooms = returnDTO.getPropertyAreaDetails() != null ? returnDTO.getPropertyAreaDetails().getNoOfBedrooms() : "";
		title = PropertyUtility.constructTitle(furnishingType, noOfBedrooms, returnDTO.getPropertyType(),
				returnDTO.getListingType(), returnDTO.getLocality(), returnDTO.getCity());

		returnDTO.setUsername(username);
		returnDTO.setUserRole(userRole);
		returnDTO.setUserWhatsappNumber(userWhatsappNumber);
		returnDTO.setTitle(title);
		
		return returnDTO;
	}

	@Override
	public void updateProperty(PropertiesDTO propertiesDTO) {

		// Step 1: Get property details
		Properties dbProperties = propertiesDao.getPropertyById(propertiesDTO.getId());
		PropertiesDTO dbPropertiesDTO = PropertyConverter.getPropertyDTOIntoProperties(dbProperties);

		// Step 2: check logedInUser have admin or own property user
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole());
		boolean adminAccess = loginService.isUserAccessible(propertiesDTO.getUpdatedBy(), roleList);
		if (!adminAccess) {
			if (!dbPropertiesDTO.getCreatedBy().equals(propertiesDTO.getUpdatedBy()))
				throw new UnAuthorizedException(
						"Loged in user don't have permissions  to update property or gallery image details");
		}

		if (null != propertiesDTO.getPropertyType())
			dbPropertiesDTO.setPropertyType(propertiesDTO.getPropertyType());

		if (null != propertiesDTO.getPropertyName())
			dbPropertiesDTO.setPropertyName(propertiesDTO.getPropertyName());

		if (null != propertiesDTO.getPropertyAddress())
			dbPropertiesDTO.setPropertyAddress(propertiesDTO.getPropertyAddress());

		if (null != propertiesDTO.getBuildingType())
			dbPropertiesDTO.setBuildingType(propertiesDTO.getBuildingType());

		if (null != propertiesDTO.getListingType())
			dbPropertiesDTO.setListingType(propertiesDTO.getListingType());

		if (null != propertiesDTO.getStatus())
			dbPropertiesDTO.setStatus(propertiesDTO.getStatus());

		if (null != propertiesDTO.getYoutubeLink())
			dbPropertiesDTO.setYoutubeLink(propertiesDTO.getYoutubeLink());

		if (null != propertiesDTO.getVideoLink())
			dbPropertiesDTO.setVideoLink(propertiesDTO.getVideoLink());
		
		if (null != propertiesDTO.getLandmark())
			dbPropertiesDTO.setLandmark(propertiesDTO.getLandmark());

		if (null != propertiesDTO.getLocality())
			dbPropertiesDTO.setLocality(propertiesDTO.getLocality());
		
		if (null != propertiesDTO.getPincode())
			dbPropertiesDTO.setPincode(propertiesDTO.getPincode());
		
		if (null != propertiesDTO.getBrokerageType())
			dbPropertiesDTO.setBrokerageType(propertiesDTO.getBrokerageType());
		
		if (null != propertiesDTO.getBrokerageUnit())
			dbPropertiesDTO.setBrokerageUnit(propertiesDTO.getBrokerageUnit());
		
		if (null != propertiesDTO.getBrokergeValue())
			dbPropertiesDTO.setBrokergeValue(propertiesDTO.getBrokergeValue());
		
		if(null != propertiesDTO.getPropertyBrochure())
			dbPropertiesDTO.setPropertyBrochure(propertiesDTO.getPropertyBrochure());
		
		
		
		if (null != propertiesDTO.getApprovalStatus())
			dbPropertiesDTO.setApprovalStatus(propertiesDTO.getApprovalStatus());

		
		
		// Step 3: Giving access for admin to update approval status of a property
//		if (adminAccess) {
//			if (null != propertiesDTO.getApprovalStatus()) {
//				dbPropertiesDTO.setApprovalStatus(propertiesDTO.getApprovalStatus());
//				if (Constant.STATUS_APPROVED.equals(propertiesDTO.getApprovalStatus()))
//					dbPropertiesDTO.setStatus(Constant.STATUS_ACTIVE);
//				else
//					dbPropertiesDTO.setStatus(Constant.STATUS_REJECTED);
//			}
//
//			if (null != propertiesDTO.getApprovalRemarks())
//				dbPropertiesDTO.setApprovalRemarks(propertiesDTO.getApprovalRemarks());
//
//			if (null != propertiesDTO.getApprovalActionBy())
//				dbPropertiesDTO.setApprovalActionBy(propertiesDTO.getApprovalActionBy());
//
//			if (null != propertiesDTO.getApprovalActionDate())
//				dbPropertiesDTO.setApprovalActionDate(propertiesDTO.getApprovalActionDate());
//
//		}
		
		if (adminAccess) {
			dbPropertiesDTO.setApprovalStatus(Constant.STATUS_ACTIVE);
			dbPropertiesDTO.setStatus(Constant.STATUS_ACTIVE);
			
		}else {
			dbPropertiesDTO.setApprovalStatus(Constant.STATUS_PENDING);
			dbPropertiesDTO.setStatus(Constant.STATUS_PENDING);
		}
		
		

		if ((null != propertiesDTO.getPropertyImages() && propertiesDTO.getPropertyImages().size() > 0))
			propertyImageGalleryDao.updatePropertyImages(propertiesDTO.getId(), propertiesDTO.getPropertyImages());

		dbPropertiesDTO.setUpdatedBy(propertiesDTO.getUpdatedBy());
		dbPropertiesDTO.setUpdatedDate(propertiesDTO.getUpdatedDate());
		
		System.out.println(dbPropertiesDTO.getApprovalStatus());
		
		propertiesDao.saveProperty(dbPropertiesDTO);

	}

	@Override
	public void updateTenantStatus(TenantStatusDTO tenantStatusDTO) {
		TenantStatus dbTenantStatus = tenantStatusDao.getTenantStatusById(tenantStatusDTO.getId());
		TenantStatusDTO dbTenantStatusDTO = TenantStatusConverter.getTenantStatusDTOByTenantStatus(dbTenantStatus);

		if (null != tenantStatusDTO.getTenantType())
			dbTenantStatusDTO.setTenantType(tenantStatusDTO.getTenantType());

		if (null != tenantStatusDTO.getReligiousType())
			dbTenantStatusDTO.setReligiousType(tenantStatusDTO.getReligiousType());
 
		if (null != tenantStatusDTO.getWorkPreference())
			dbTenantStatusDTO.setWorkPreference(tenantStatusDTO.getWorkPreference());

		if (null != tenantStatusDTO.getPetsAllowed())
			dbTenantStatusDTO.setPetsAllowed(tenantStatusDTO.getPetsAllowed());

		if (null != tenantStatusDTO.getFoodPreference())
			dbTenantStatusDTO.setFoodPreference(tenantStatusDTO.getFoodPreference());

		dbTenantStatusDTO.setUpdatedBy(tenantStatusDTO.getUpdatedBy());
		dbTenantStatusDTO.setUpdatedDate(tenantStatusDTO.getUpdatedDate());
		tenantStatusDao.saveTenantStatus(dbTenantStatusDTO);
	}

	@Override
	public void updateAdditionalDetails(AdditionalDetailsDTO additionalDetailsDTO) {
		AdditionalDetails dbAdditionalDetails = additionalDetailsDao
				.getAdditionalDetailsById(additionalDetailsDTO.getId());
		AdditionalDetailsDTO dbAdditionalDetailsDTO = AdditionalDetailsConverter
				.getAdditionalDetailsDTOByAdditionalDetails(dbAdditionalDetails);

		if (null != additionalDetailsDTO.getCurrentlyLeasedOut())
			dbAdditionalDetailsDTO.setCurrentlyLeasedOut(additionalDetailsDTO.getCurrentlyLeasedOut());

		if (null != additionalDetailsDTO.getModifyInterior())
			dbAdditionalDetailsDTO.setModifyInterior(additionalDetailsDTO.getCurrentlyLeasedOut());

		if (null != additionalDetailsDTO.getBrandNewInterior())
			dbAdditionalDetailsDTO.setBrandNewInterior(additionalDetailsDTO.getBrandNewInterior());

		if (null != additionalDetailsDTO.getBuildingGrade())
			dbAdditionalDetailsDTO.setBuildingGrade(additionalDetailsDTO.getCurrentlyLeasedOut());

		if (null != additionalDetailsDTO.getCafeteria())
			dbAdditionalDetailsDTO.setCafeteria(additionalDetailsDTO.getCafeteria());

		if (null != additionalDetailsDTO.getElectricityCharges())
			dbAdditionalDetailsDTO.setElectricityCharges(additionalDetailsDTO.getElectricityCharges());

		if (null != additionalDetailsDTO.getFlooringType())
			dbAdditionalDetailsDTO.setFlooringType(additionalDetailsDTO.getFlooringType());

		if (null != additionalDetailsDTO.getFlooringLiving())
			dbAdditionalDetailsDTO.setFlooringLiving(additionalDetailsDTO.getFlooringLiving());

		if (null != additionalDetailsDTO.getFlooringBalcony())
			dbAdditionalDetailsDTO.setFlooringBalcony(additionalDetailsDTO.getFlooringBalcony());

		if (null != additionalDetailsDTO.getFlooringKitchen())
			dbAdditionalDetailsDTO.setFlooringKitchen(additionalDetailsDTO.getFlooringKitchen());

		if (null != additionalDetailsDTO.getFlooringBedroom())
			dbAdditionalDetailsDTO.setFlooringBedroom(additionalDetailsDTO.getFlooringBedroom());

		if (null != additionalDetailsDTO.getFlooringMasterBedroom())
			dbAdditionalDetailsDTO.setFlooringMasterBedroom(additionalDetailsDTO.getFlooringMasterBedroom());

		if (null != additionalDetailsDTO.getFlooringOther())
			dbAdditionalDetailsDTO.setFlooringOther(additionalDetailsDTO.getFlooringOther());

		if (null != additionalDetailsDTO.getInterestedInCoWorking())
			dbAdditionalDetailsDTO.setInterestedInCoWorking(additionalDetailsDTO.getInterestedInCoWorking());

		if (null != additionalDetailsDTO.getLiftAvailable())
			dbAdditionalDetailsDTO.setLiftAvailable(additionalDetailsDTO.getLiftAvailable());

		if (null != additionalDetailsDTO.getLiftCount())
			dbAdditionalDetailsDTO.setLiftCount(additionalDetailsDTO.getLiftCount());

		if (null != additionalDetailsDTO.getParking2Wheeler())
			dbAdditionalDetailsDTO.setParking2Wheeler(additionalDetailsDTO.getParking2Wheeler());

		if (null != additionalDetailsDTO.getParking2CoverCount())
			dbAdditionalDetailsDTO.setParking2CoverCount(additionalDetailsDTO.getParking2CoverCount());

		if (null != additionalDetailsDTO.getParking2OpenCount())
			dbAdditionalDetailsDTO.setParking2OpenCount(additionalDetailsDTO.getParking2OpenCount());

		if (null != additionalDetailsDTO.getParking4Wheeler())
			dbAdditionalDetailsDTO.setParking4Wheeler(additionalDetailsDTO.getParking4Wheeler());

		if (null != additionalDetailsDTO.getParking4CoverCount())
			dbAdditionalDetailsDTO.setParking4CoverCount(additionalDetailsDTO.getParking4CoverCount());

		if (null != additionalDetailsDTO.getParking4OpenCount())
			dbAdditionalDetailsDTO.setParking4OpenCount(additionalDetailsDTO.getParking4OpenCount());

		if (null != additionalDetailsDTO.getWaterSource())
			dbAdditionalDetailsDTO.setWaterSource(additionalDetailsDTO.getWaterSource());

		if (null != additionalDetailsDTO.getTaxGovtCharges())
			dbAdditionalDetailsDTO.setBuildingGrade(additionalDetailsDTO.getTaxGovtCharges());

		if (null != additionalDetailsDTO.getOverLookingView())
			dbAdditionalDetailsDTO.setOverLookingView(additionalDetailsDTO.getOverLookingView());

		if (null != additionalDetailsDTO.getPowerInKv())
			dbAdditionalDetailsDTO.setPowerInKv(additionalDetailsDTO.getPowerInKv());

		if (null != additionalDetailsDTO.getPowerBackup())
			dbAdditionalDetailsDTO.setPowerBackup(additionalDetailsDTO.getPowerBackup());

		if (null != additionalDetailsDTO.getServiceLiftAvailability())
			dbAdditionalDetailsDTO.setServiceLiftAvailability(additionalDetailsDTO.getServiceLiftAvailability());

		if (null != additionalDetailsDTO.getServiceLiftAvailabilityCount())
			dbAdditionalDetailsDTO
					.setServiceLiftAvailabilityCount(additionalDetailsDTO.getServiceLiftAvailabilityCount());

		if (null != additionalDetailsDTO.getFrontRoadWidth())
			dbAdditionalDetailsDTO.setFrontRoadWidth(additionalDetailsDTO.getFrontRoadWidth());

		if (null != additionalDetailsDTO.getFrontRoadWidthType())
			dbAdditionalDetailsDTO.setFrontRoadWidthType(additionalDetailsDTO.getFrontRoadWidthType());
		
		if (null != additionalDetailsDTO.getFlooringBathroom())
			dbAdditionalDetailsDTO.setFlooringBathroom(additionalDetailsDTO.getFlooringBathroom());

		dbAdditionalDetailsDTO.setUpdatedBy(additionalDetailsDTO.getUpdatedBy());
		dbAdditionalDetailsDTO.setUpdatedDate(additionalDetailsDTO.getUpdatedDate());
		additionalDetailsDao.saveAdditionalDetails(dbAdditionalDetailsDTO);

	}

	@Override
	public void updateReraStatus(ReraStatusDTO reraStatusDTO) {
		ReraStatus dbReraStatus = reraStatusDao.getReraStatusById(reraStatusDTO.getId());
		ReraStatusDTO dbReraStatusDTO = ReraStatusConverter.getReraStatusDTOByReraStatus(dbReraStatus);

		if (null != reraStatusDTO.getReraAvailable())
			dbReraStatusDTO.setReraAvailable(reraStatusDTO.getReraAvailable());

		if (null != reraStatusDTO.getReraNo())
			dbReraStatusDTO.setReraNo(reraStatusDTO.getReraNo());

		dbReraStatusDTO.setUpdatedBy(reraStatusDTO.getUpdatedBy());
		dbReraStatusDTO.setUpdatedDate(reraStatusDTO.getUpdatedDate());
		reraStatusDao.saveReraStatus(dbReraStatusDTO);
	}

	@Override
	public void updateDefineProperty(DefinePropertyDTO definePropertyDTO) {
		DefineProperty dbDefineProperty = definePropertyDao.getDefinePropertyById(definePropertyDTO.getId());
		DefinePropertyDTO dbDefinePropertyDTO = DefinePropertyConverter
				.getDefinePropertyDTOByDefineProperty(dbDefineProperty);

		if (null != definePropertyDTO.getDefineLocation())
			dbDefinePropertyDTO.setDefineLocation(definePropertyDTO.getDefineLocation());

		if (null != definePropertyDTO.getDefineSizeAndStructure())
			dbDefinePropertyDTO.setDefineSizeAndStructure(definePropertyDTO.getDefineSizeAndStructure());

		if (null != definePropertyDTO.getExplainingPrice())
			dbDefinePropertyDTO.setExplainingPrice(definePropertyDTO.getExplainingPrice());

		if (null != definePropertyDTO.getExplainingProperty())
			dbDefinePropertyDTO.setExplainingProperty(definePropertyDTO.getExplainingProperty());
		
		
		if (null != definePropertyDTO.getDescription())
			dbDefinePropertyDTO.setDescription(definePropertyDTO.getDescription());


		dbDefinePropertyDTO.setUpdatedBy(definePropertyDTO.getUpdatedBy());
		dbDefinePropertyDTO.setUpdatedDate(definePropertyDTO.getUpdatedDate());
		definePropertyDao.saveDefineProperty(dbDefinePropertyDTO);

	}

	@Override
	public void updatePropertyStatus(PropertyStatusDTO propertyStatusDTO) {
		PropertyStatus dbPropertyStatus = propertyStatusDao.getPropertyStatusById(propertyStatusDTO.getId());
		PropertyStatusDTO dbPropertyStatusDTO = PropertyStatusConverter
				.getPropertyStatusDTOIntoPropertyStatus(dbPropertyStatus);

		if (null != propertyStatusDTO.getAvailableFor())
			dbPropertyStatusDTO.setAvailableFor(propertyStatusDTO.getAvailableFor());

		if (null != propertyStatusDTO.getPositionStatus())
			dbPropertyStatusDTO.setPositionStatus(propertyStatusDTO.getPositionStatus());

		if (null != propertyStatusDTO.getPositionStatusType())
			dbPropertyStatusDTO.setPositionStatusType(propertyStatusDTO.getPositionStatusType());

		if (null != propertyStatusDTO.getAvailableFrom())
			dbPropertyStatusDTO.setAvailableFrom(propertyStatusDTO.getAvailableFrom());

		if (null != propertyStatusDTO.getOccupancyDays())
			dbPropertyStatusDTO.setOccupancyDays(propertyStatusDTO.getOccupancyDays());

		if (null != propertyStatusDTO.getAgeOfProperty())
			dbPropertyStatusDTO.setAgeOfProperty(propertyStatusDTO.getAgeOfProperty());

		if (null != propertyStatusDTO.getOwnershipType())
			dbPropertyStatusDTO.setOwnershipType(propertyStatusDTO.getOwnershipType());

		if (null != propertyStatusDTO.getAboutPropertySuitableFor())
			dbPropertyStatusDTO.setAboutPropertySuitableFor(propertyStatusDTO.getAboutPropertySuitableFor());

		if (null != propertyStatusDTO.getLocationHub())
			dbPropertyStatusDTO.setLocationHub(propertyStatusDTO.getLocationHub());

		if (null != propertyStatusDTO.getEntranceWidth())
			dbPropertyStatusDTO.setEntranceWidth(propertyStatusDTO.getEntranceWidth());

		if (null != propertyStatusDTO.getHeightSealing())
			dbPropertyStatusDTO.setHeightSealing(propertyStatusDTO.getHeightSealing());

		if (null != propertyStatusDTO.getLocatedNear())
			dbPropertyStatusDTO.setLocatedNear(propertyStatusDTO.getLocatedNear());
		
		if (null != propertyStatusDTO.getAvailableFromDate())
			dbPropertyStatusDTO.setAvailableFromDate(propertyStatusDTO.getAvailableFromDate());
		
		if (null != propertyStatusDTO.getGovtApproved())
			dbPropertyStatusDTO.setGovtApproved(propertyStatusDTO.getGovtApproved());
		
		if (null != propertyStatusDTO.getTenantPreLeasedUnit())
			dbPropertyStatusDTO.setTenantPreLeasedUnit(propertyStatusDTO.getTenantPreLeasedUnit());

		dbPropertyStatusDTO.setUpdatedBy(propertyStatusDTO.getUpdatedBy());
		dbPropertyStatusDTO.setUpdatedDate(propertyStatusDTO.getUpdatedDate());
		propertyStatusDao.savePropertyStatus(dbPropertyStatusDTO);
	}

	@Override
	public void updatePropertyMedia(PropertyMediaDTO propertyMediaDTO) {
		PropertyMedia dbPropertyMedia = propertyMediaDao.getPropertyMediaById(propertyMediaDTO.getId());
		PropertyMediaDTO dbPropertyMediaDTO = PropertyMediaConverter
				.getPropertyMediaDTOByPropertyMedia(dbPropertyMedia);

		if (null != propertyMediaDTO.getCategory())
			dbPropertyMediaDTO.setCategory(propertyMediaDTO.getCategory());

		if (null != propertyMediaDTO.getMediaUrl())
			dbPropertyMediaDTO.setMediaUrl(propertyMediaDTO.getMediaUrl());

		if (null != propertyMediaDTO.getRankOrder())
			dbPropertyMediaDTO.setRankOrder(propertyMediaDTO.getRankOrder());

		dbPropertyMediaDTO.setUpdatedBy(propertyMediaDTO.getUpdatedBy());
		dbPropertyMediaDTO.setUpdatedDate(propertyMediaDTO.getUpdatedDate());
		propertyMediaDao.savePropertyMedia(dbPropertyMediaDTO);

	}

	@Override
	public void updateFurnishingStatus(FurnishingStatusDTO furnishingStatusDTO) {
		FurnishingStatus dbFurnishingStatus = furnishingStatusDao.getFurnishingStatusById(furnishingStatusDTO.getId());
		FurnishingStatusDTO dbFurnishingStatusDTO = FurnishingStatusConverter
				.getFurnishingDTOIntoFurnishingStatus(dbFurnishingStatus);

		if (null != furnishingStatusDTO.getFurnishingType())
			dbFurnishingStatusDTO.setFurnishingType(furnishingStatusDTO.getFurnishingType());

		if (null != furnishingStatusDTO.getWardrobeAvailable())
			dbFurnishingStatusDTO.setWardrobeAvailable(furnishingStatusDTO.getWardrobeAvailable());

		if (null != furnishingStatusDTO.getWardrobeCount())
			dbFurnishingStatusDTO.setWardrobeCount(furnishingStatusDTO.getWardrobeCount());

		if (null != furnishingStatusDTO.getAirConditionAvailable())
			dbFurnishingStatusDTO.setAirConditionAvailable(furnishingStatusDTO.getAirConditionAvailable());

		if (null != furnishingStatusDTO.getAirConditionCount())
			dbFurnishingStatusDTO.setAirConditionCount(furnishingStatusDTO.getAirConditionCount());

		if (null != furnishingStatusDTO.getBedsAvailable())
			dbFurnishingStatusDTO.setBedsAvailable(furnishingStatusDTO.getBedsAvailable());

		if (null != furnishingStatusDTO.getBedsCount())
			dbFurnishingStatusDTO.setBedsCount(furnishingStatusDTO.getBedsCount());

		if (null != furnishingStatusDTO.getLedLightsAvailable())
			dbFurnishingStatusDTO.setLedLightsAvailable(furnishingStatusDTO.getLedLightsAvailable());

		if (null != furnishingStatusDTO.getLedLightsCount())
			dbFurnishingStatusDTO.setLedLightsCount(furnishingStatusDTO.getLedLightsCount());

		if (null != furnishingStatusDTO.getSofaAvailable())
			dbFurnishingStatusDTO.setSofaAvailable(furnishingStatusDTO.getSofaAvailable());

		if (null != furnishingStatusDTO.getSofaCount())
			dbFurnishingStatusDTO.setSofaCount(furnishingStatusDTO.getSofaCount());

		if (null != furnishingStatusDTO.getSofaType())
			dbFurnishingStatusDTO.setSofaType(furnishingStatusDTO.getSofaType());

		if (null != furnishingStatusDTO.getRefrigeratorAvailable())
			dbFurnishingStatusDTO.setRefrigeratorAvailable(furnishingStatusDTO.getRefrigeratorAvailable());

		if (null != furnishingStatusDTO.getRefrigeratorCount())
			dbFurnishingStatusDTO.setRefrigeratorCount(furnishingStatusDTO.getRefrigeratorCount());

		if (null != furnishingStatusDTO.getGasConnectionAvailable())
			dbFurnishingStatusDTO.setGasConnectionAvailable(furnishingStatusDTO.getGasConnectionAvailable());

		if (null != furnishingStatusDTO.getGasConnectionCount())
			dbFurnishingStatusDTO.setGasConnectionCount(furnishingStatusDTO.getGasConnectionCount());

		if (null != furnishingStatusDTO.getWashingMachineAvailable())
			dbFurnishingStatusDTO.setWashingMachineAvailable(furnishingStatusDTO.getWashingMachineAvailable());

		if (null != furnishingStatusDTO.getWashingMachineCount())
			dbFurnishingStatusDTO.setWashingMachineCount(furnishingStatusDTO.getWashingMachineCount());

		if (null != furnishingStatusDTO.getTvAvailable())
			dbFurnishingStatusDTO.setTvAvailable(furnishingStatusDTO.getTvAvailable());

		if (null != furnishingStatusDTO.getTvCount())
			dbFurnishingStatusDTO.setTvCount(furnishingStatusDTO.getTvCount());

		if (null != furnishingStatusDTO.getOfficeTables())
			dbFurnishingStatusDTO.setOfficeTables(furnishingStatusDTO.getOfficeTables());

		if (null != furnishingStatusDTO.getOfficeTablesCount())
			dbFurnishingStatusDTO.setOfficeTablesCount(furnishingStatusDTO.getOfficeTablesCount());

		if (null != furnishingStatusDTO.getWaterPurifier())
			dbFurnishingStatusDTO.setWaterPurifier(furnishingStatusDTO.getWaterPurifier());

		if (null != furnishingStatusDTO.getWaterPurifierCount())
			dbFurnishingStatusDTO.setWaterPurifierCount(furnishingStatusDTO.getWaterPurifierCount());

		if (null != furnishingStatusDTO.getFan())
			dbFurnishingStatusDTO.setFan(furnishingStatusDTO.getFan());

		if (null != furnishingStatusDTO.getFanCount())
			dbFurnishingStatusDTO.setFanCount(furnishingStatusDTO.getFanCount());

		if (null != furnishingStatusDTO.getExhaustFan())
			dbFurnishingStatusDTO.setExhaustFan(furnishingStatusDTO.getExhaustFan());

		if (null != furnishingStatusDTO.getExhaustFanCount())
			dbFurnishingStatusDTO.setExhaustFanCount(furnishingStatusDTO.getExhaustFanCount());

		if (null != furnishingStatusDTO.getStove())
			dbFurnishingStatusDTO.setStove(furnishingStatusDTO.getStove());

		if (null != furnishingStatusDTO.getStoveCount())
			dbFurnishingStatusDTO.setStoveCount(furnishingStatusDTO.getStoveCount());

		if (null != furnishingStatusDTO.getCurtains())
			dbFurnishingStatusDTO.setCurtains(furnishingStatusDTO.getCurtains());

		if (null != furnishingStatusDTO.getCurtainsCount())
			dbFurnishingStatusDTO.setCurtainsCount(furnishingStatusDTO.getCurtainsCount());

		if (null != furnishingStatusDTO.getChimney())
			dbFurnishingStatusDTO.setChimney(furnishingStatusDTO.getChimney());

		if (null != furnishingStatusDTO.getChimneyCount())
			dbFurnishingStatusDTO.setChimneyCount(furnishingStatusDTO.getChimneyCount());

		if (null != furnishingStatusDTO.getMicroWave())
			dbFurnishingStatusDTO.setMicroWave(furnishingStatusDTO.getMicroWave());

		if (null != furnishingStatusDTO.getMicroWaveCount())
			dbFurnishingStatusDTO.setMicroWaveCount(furnishingStatusDTO.getMicroWaveCount());

		if (null != furnishingStatusDTO.getChairs())
			dbFurnishingStatusDTO.setChairs(furnishingStatusDTO.getChairs());

		if (null != furnishingStatusDTO.getChairsCount())
			dbFurnishingStatusDTO.setChairsCount(furnishingStatusDTO.getChairsCount());

		if (null != furnishingStatusDTO.getMeetingRooms())
			dbFurnishingStatusDTO.setMeetingRooms(furnishingStatusDTO.getMeetingRooms());

		if (null != furnishingStatusDTO.getMeetingRoomsCount())
			dbFurnishingStatusDTO.setMeetingRoomsCount(furnishingStatusDTO.getMeetingRoomsCount());

		if (null != furnishingStatusDTO.getConfernceRooms())
			dbFurnishingStatusDTO.setConfernceRooms(furnishingStatusDTO.getConfernceRooms());

		if (null != furnishingStatusDTO.getConfernceRoomsCount())
			dbFurnishingStatusDTO.setConfernceRoomsCount(furnishingStatusDTO.getConfernceRoomsCount());

		if (null != furnishingStatusDTO.getMediclKits())
			dbFurnishingStatusDTO.setMediclKits(furnishingStatusDTO.getMediclKits());

		if (null != furnishingStatusDTO.getMediclKitsCount())
			dbFurnishingStatusDTO.setMediclKitsCount(furnishingStatusDTO.getMediclKitsCount());

		if (null != furnishingStatusDTO.getRecreational())
			dbFurnishingStatusDTO.setRecreational(furnishingStatusDTO.getRecreational());

		if (null != furnishingStatusDTO.getRecreationalCount())
			dbFurnishingStatusDTO.setRecreationalCount(furnishingStatusDTO.getRecreationalCount());

		if (null != furnishingStatusDTO.getPrintingMachines())
			dbFurnishingStatusDTO.setPrintingMachines(furnishingStatusDTO.getPrintingMachines());

		if (null != furnishingStatusDTO.getPrintingMachinesCount())
			dbFurnishingStatusDTO.setPrintingMachinesCount(furnishingStatusDTO.getPrintingMachinesCount());

		if (null != furnishingStatusDTO.getCoffeeMachines())
			dbFurnishingStatusDTO.setCoffeeMachines(furnishingStatusDTO.getCoffeeMachines());

		if (null != furnishingStatusDTO.getCoffeeMachinesCount())
			dbFurnishingStatusDTO.setCoffeeMachinesCount(furnishingStatusDTO.getCoffeeMachinesCount());

		if (null != furnishingStatusDTO.getSmartBoard())
			dbFurnishingStatusDTO.setSmartBoard(furnishingStatusDTO.getSmartBoard());

		if (null != furnishingStatusDTO.getSmartBoardCount())
			dbFurnishingStatusDTO.setSmartBoardCount(furnishingStatusDTO.getSmartBoardCount());

		if (null != furnishingStatusDTO.getProjectors())
			dbFurnishingStatusDTO.setProjectors(furnishingStatusDTO.getProjectors());

		if (null != furnishingStatusDTO.getProjectorsCount())
			dbFurnishingStatusDTO.setProjectorsCount(furnishingStatusDTO.getProjectorsCount());

		if (null != furnishingStatusDTO.getDiningTables())
			dbFurnishingStatusDTO.setDiningTables(furnishingStatusDTO.getDiningTables());

		if (null != furnishingStatusDTO.getDiningTablesCount())
			dbFurnishingStatusDTO.setDiningTablesCount(furnishingStatusDTO.getDiningTablesCount());

		if (null != furnishingStatusDTO.getModularKitchen())
			dbFurnishingStatusDTO.setModularKitchen(furnishingStatusDTO.getModularKitchen());

		if (null != furnishingStatusDTO.getModularKitchenCount())
			dbFurnishingStatusDTO.setModularKitchenCount(furnishingStatusDTO.getModularKitchenCount());

		if (null != furnishingStatusDTO.getWorkStationType())
			dbFurnishingStatusDTO.setWorkStationType(furnishingStatusDTO.getWorkStationType());

		if (null != furnishingStatusDTO.getSeatType())
			dbFurnishingStatusDTO.setSeatType(furnishingStatusDTO.getSeatType());

		if (null != furnishingStatusDTO.getNoOfSeatsAvailable())
			dbFurnishingStatusDTO.setNoOfSeatsAvailable(furnishingStatusDTO.getNoOfSeatsAvailable());

		if (null != furnishingStatusDTO.getManagedType())
			dbFurnishingStatusDTO.setManagedType(furnishingStatusDTO.getManagedType());

		if (null != furnishingStatusDTO.getOfficeSpaceType())
			dbFurnishingStatusDTO.setOfficeSpaceType(furnishingStatusDTO.getOfficeSpaceType());
		
		if (null != furnishingStatusDTO.getWifiCount())
			dbFurnishingStatusDTO.setWifiCount(furnishingStatusDTO.getWifiCount());
		
		if (null != furnishingStatusDTO.getWifiAvailable())
			dbFurnishingStatusDTO.setWifiAvailable(furnishingStatusDTO.getWifiAvailable());
		
		if (null != furnishingStatusDTO.getGeyserAvailable())
			dbFurnishingStatusDTO.setGeyserAvailable(furnishingStatusDTO.getGeyserAvailable());
		
		if (null != furnishingStatusDTO.getGeyserCount())
			dbFurnishingStatusDTO.setGeyserCount(furnishingStatusDTO.getGeyserCount());
		
		
//		if (null != furnishingStatusDTO.getOfficeSpaceType())
//			dbFurnishingStatusDTO.setOfficeSpaceType(furnishingStatusDTO.getOfficeSpaceType());
//		
//		if (null != furnishingStatusDTO.getOfficeSpaceType())
//			dbFurnishingStatusDTO.setOfficeSpaceType(furnishingStatusDTO.getOfficeSpaceType());
		
		
		
		
		

		dbFurnishingStatusDTO.setUpdatedBy(furnishingStatusDTO.getUpdatedBy());
		dbFurnishingStatusDTO.setUpdatedDate(furnishingStatusDTO.getUpdatedDate());
		furnishingStatusDao.saveFurnishingStatus(dbFurnishingStatusDTO);

	}

	@Override
	public void updateLandMark(LandMarkDTO landMarkDTO) {
		LandMark dbLandMark = landMarkDao.getLandMarkById(landMarkDTO.getId());
		LandMarkDTO dbLandMarkDTO = LandMarkConverter.getLandMarkDTOByLandMark(dbLandMark);
		
		if (null != landMarkDTO.getHospitalDistance())
			dbLandMarkDTO.setHospitalDistance(landMarkDTO.getHospitalDistance());

		if (null != landMarkDTO.getHospitalDistanceType())
			dbLandMarkDTO.setHospitalDistanceType(landMarkDTO.getHospitalDistanceType());

		if (null != landMarkDTO.getAirportDistance())
			dbLandMarkDTO.setAirportDistance(landMarkDTO.getAirportDistance());

		if (null != landMarkDTO.getAirportDistanceType())
			dbLandMarkDTO.setAirportDistanceType(landMarkDTO.getAirportDistanceType());

		if (null != landMarkDTO.getAtmDistance())
			dbLandMarkDTO.setAtmDistance(landMarkDTO.getAtmDistance());

		if (null != landMarkDTO.getAtmDistanceType())
			dbLandMarkDTO.setAtmDistanceType(landMarkDTO.getAtmDistanceType());

		if (null != landMarkDTO.getBankDistance())
			dbLandMarkDTO.setBankDistance(landMarkDTO.getBankDistance());

		if (null != landMarkDTO.getBankDistanceType())
			dbLandMarkDTO.setBankDistanceType(landMarkDTO.getBankDistanceType());

		if (null != landMarkDTO.getBusStopDistance())
			dbLandMarkDTO.setBusStopDistance(landMarkDTO.getBusStopDistance());

		if (null != landMarkDTO.getBusStopDistanceType())
			dbLandMarkDTO.setBusStopDistanceType(landMarkDTO.getBusStopDistanceType());

		if (null != landMarkDTO.getSchoolDistance())
			dbLandMarkDTO.setSchoolDistance(landMarkDTO.getSchoolDistance());

		if (null != landMarkDTO.getSchoolDistanceType())
			dbLandMarkDTO.setSchoolDistanceType(landMarkDTO.getSchoolDistanceType());

		if (null != landMarkDTO.getMetroStationDistance())
			dbLandMarkDTO.setMetroStationDistance(landMarkDTO.getMetroStationDistance());

		if (null != landMarkDTO.getMetroStationDistanceType())
			dbLandMarkDTO.setMetroStationDistanceType(landMarkDTO.getMetroStationDistanceType());

		if (null != landMarkDTO.getRailwayStationDistance())
			dbLandMarkDTO.setRailwayStationDistance(landMarkDTO.getRailwayStationDistance());

		if (null != landMarkDTO.getRailwayStationDistanceType())
			dbLandMarkDTO.setRailwayStationDistanceType(landMarkDTO.getRailwayStationDistanceType());

		if (null != landMarkDTO.getShoppingMallDistance())
			dbLandMarkDTO.setShoppingMallDistance(landMarkDTO.getShoppingMallDistance());

		if (null != landMarkDTO.getShoppingMallDistanceType())
			dbLandMarkDTO.setShoppingMallDistanceType(landMarkDTO.getShoppingMallDistanceType());

		dbLandMarkDTO.setUpdatedBy(landMarkDTO.getUpdatedBy());
		dbLandMarkDTO.setUpdatedDate(landMarkDTO.getUpdatedDate());
		
		landMarkDao.saveLandMark(dbLandMarkDTO);

	}

	@Override
	public void updatePgDetails(PgDetailsDTO pgDetailsDTO) {
		PgDetails dbPgDetails = pgDetailsDao.getPgDetailsById(pgDetailsDTO.getId());
		PgDetailsDTO dbPgDetailsDTO = PgDetailsConverter.getPgDetailsDTOIntoPgDetails(dbPgDetails);

		if (null != pgDetailsDTO.getTotalBeds())
			dbPgDetailsDTO.setTotalBeds(pgDetailsDTO.getTotalBeds());

		if (null != pgDetailsDTO.getPgFor())
			dbPgDetailsDTO.setPgFor(pgDetailsDTO.getPgFor());

		if (null != pgDetailsDTO.getLockInPeriod())
			dbPgDetailsDTO.setLockInPeriod(pgDetailsDTO.getLockInPeriod());

		if (null != pgDetailsDTO.getNoticePeriod())
			dbPgDetailsDTO.setNoticePeriod(pgDetailsDTO.getNoticePeriod());

		if (null != pgDetailsDTO.getCommonAreas())
			dbPgDetailsDTO.setCommonAreas(pgDetailsDTO.getCommonAreas());

		if (null != pgDetailsDTO.getBestSuitedFor())
			dbPgDetailsDTO.setBestSuitedFor(pgDetailsDTO.getBestSuitedFor());

		if (null != pgDetailsDTO.getMealsAvailable())
			dbPgDetailsDTO.setMealsAvailable(pgDetailsDTO.getMealsAvailable());

		dbPgDetailsDTO.setUpdatedBy(pgDetailsDTO.getUpdatedBy());
		dbPgDetailsDTO.setUpdatedDate(pgDetailsDTO.getUpdatedDate());
		pgDetailsDao.savePgDetails(dbPgDetailsDTO);

	}

	@Override
	public void updatePgOwnerDetails(PgOwnerDetailsDTO pgOwnerDetailsDTO) {
		PgOwnerDetails dbPgOwnerDetails = pgOwnerDetailsDao.getPgOwnerDetailsById(pgOwnerDetailsDTO.getId());
		PgOwnerDetailsDTO dbPgOwnerDetailsDTO = PgOwnerDetailsConverter
				.getPgDetailsDTOIntoPgOwnerDetails(dbPgOwnerDetails);

		if (null != pgOwnerDetailsDTO.getPropertyManagedBy())
			dbPgOwnerDetailsDTO.setPropertyManagedBy(pgOwnerDetailsDTO.getPropertyManagedBy());

		if (null != pgOwnerDetailsDTO.getPropertyManagerStay())
			dbPgOwnerDetailsDTO.setPropertyManagerStay(pgOwnerDetailsDTO.getPropertyManagerStay());

		dbPgOwnerDetailsDTO.setUpdatedBy(pgOwnerDetailsDTO.getUpdatedBy());
		dbPgOwnerDetailsDTO.setUpdatedDate(pgOwnerDetailsDTO.getUpdatedDate());
		pgOwnerDetailsDao.savePgOwnerDetails(dbPgOwnerDetailsDTO);

	}

	@Override
	public void updatePgRegulations(PgRegulationsDTO pgRegulationsDTO) {
		PgRegulations dbPgRegulations = pgRegulationsDao.getPgRegulationsById(pgRegulationsDTO.getId());
		PgRegulationsDTO dbPgRegulationsDTO = PgRegulationConverter.getRegulationsDTOIntoPgRegulations(dbPgRegulations);

		if (null != pgRegulationsDTO.getNonVegAllowed())
			dbPgRegulationsDTO.setNonVegAllowed(pgRegulationsDTO.getNonVegAllowed());

		if (null != pgRegulationsDTO.getOppositeSex())
			dbPgRegulationsDTO.setOppositeSex(pgRegulationsDTO.getOppositeSex());

		if (null != pgRegulationsDTO.getAnyTimeAllowed())
			dbPgRegulationsDTO.setAnyTimeAllowed(pgRegulationsDTO.getAnyTimeAllowed());

		if (null != pgRegulationsDTO.getDrinkingAllowed())
			dbPgRegulationsDTO.setDrinkingAllowed(pgRegulationsDTO.getDrinkingAllowed());

		if (null != pgRegulationsDTO.getGuardianAllowed())
			dbPgRegulationsDTO.setGuardianAllowed(pgRegulationsDTO.getGuardianAllowed());

		if (null != pgRegulationsDTO.getVisitorAllowed())
			dbPgRegulationsDTO.setVisitorAllowed(pgRegulationsDTO.getVisitorAllowed());

		if (null != pgRegulationsDTO.getSmokingAllowed())
			dbPgRegulationsDTO.setSmokingAllowed(pgRegulationsDTO.getSmokingAllowed());

		dbPgRegulationsDTO.setUpdatedBy(pgRegulationsDTO.getUpdatedBy());
		dbPgRegulationsDTO.setUpdatedDate(pgRegulationsDTO.getUpdatedDate());
		pgRegulationsDao.savePgRegualtions(dbPgRegulationsDTO);

	}

	@Override
	public void updatePricingDetails(PricingDetailsDTO pricingDetailsDTO) {
		PricingDetails dbPricingDetails = pricingDetailsDao.getPricingDetailsById(pricingDetailsDTO.getId());
		PricingDetailsDTO dbPricingDetailsDTO = PricingDetailsConverter
				.getPricingDetailsDTOByPricingDetails(dbPricingDetails);
		
		List<String> requestValues = pricingDetailsDTO.getSelectPriceInclude();
		
		List<String> existingValues = dbPricingDetailsDTO.getSelectPriceInclude();
		
		// Determine values to add
        List<String> valuesToAdd = requestValues.stream()
                .filter(value -> !existingValues.contains(value))
                .collect(Collectors.toList());
        
     // Determine values to remove
        List<String> valuesToRemove = existingValues.stream()
                .filter(value -> !requestValues.contains(value))
                .collect(Collectors.toList());
        
     // Add new values
        existingValues.addAll(valuesToAdd);

        // Remove old values
        existingValues.removeAll(valuesToRemove);
        
        dbPricingDetailsDTO.setSelectPriceInclude(existingValues);

		
		if (null != pricingDetailsDTO.getRent())
			dbPricingDetailsDTO.setRent(pricingDetailsDTO.getRent());

		if (null != pricingDetailsDTO.getRentType())
			dbPricingDetailsDTO.setRentType(pricingDetailsDTO.getRentType());
		
		if(null != pricingDetailsDTO.getPerSqftPrice())
			dbPricingDetailsDTO.setPerSqftPrice(pricingDetailsDTO.getPerSqftPrice());

		if (null != pricingDetailsDTO.getBookingAmount())
			dbPricingDetailsDTO.setBookingAmount(pricingDetailsDTO.getBookingAmount());

		if (null != pricingDetailsDTO.getDepositAmount())
			dbPricingDetailsDTO.setDepositAmount(pricingDetailsDTO.getDepositAmount());

		if (null != pricingDetailsDTO.getLockInPeriod())
			dbPricingDetailsDTO.setLockInPeriod(pricingDetailsDTO.getLockInPeriod());

		if (null != pricingDetailsDTO.getLockInPeriodType())
			dbPricingDetailsDTO.setLockInPeriodType(pricingDetailsDTO.getLockInPeriodType());

		if (null != pricingDetailsDTO.getMaintananceCost())
			dbPricingDetailsDTO.setMaintananceCost(pricingDetailsDTO.getMaintananceCost());

		if (null != pricingDetailsDTO.getMaintananceCostType())
			dbPricingDetailsDTO.setMaintananceCostType(pricingDetailsDTO.getMaintananceCostType());

		if (null != pricingDetailsDTO.getRentIncrement())
			dbPricingDetailsDTO.setRentIncrement(pricingDetailsDTO.getRentIncrement());

		if (null != pricingDetailsDTO.getSecurityDeposit())
			dbPricingDetailsDTO.setSecurityDeposit(pricingDetailsDTO.getSecurityDeposit());

		dbPricingDetailsDTO.setUpdatedBy(pricingDetailsDTO.getUpdatedBy());
		dbPricingDetailsDTO.setUpdatedDate(pricingDetailsDTO.getUpdatedDate());
		
		
		pricingDetailsDao.savePricingDetails(dbPricingDetailsDTO);

	}

	@Override
	public void updatePropertyAreaDetails(PropertyAreaDetailsDTO propertyAreaDetailsDTO) {
		PropertyAreaDetails dbPropertyAreaDetails = propertyAreaDetailsDao
				.getPropertyAreaDetailsById(propertyAreaDetailsDTO.getId());
		PropertyAreaDetailsDTO dbPropertyAreaDetailsDTO = PropertyAreaDetailsConverter
				.getAreaDetailsDTOByAreaDetails(dbPropertyAreaDetails);

		if (null != propertyAreaDetailsDTO.getBuiltupPlotArea())
			dbPropertyAreaDetailsDTO.setBuiltupPlotArea(propertyAreaDetailsDTO.getBuiltupPlotArea());

		if (null != propertyAreaDetailsDTO.getCarpetArea())
			dbPropertyAreaDetailsDTO.setCarpetArea(propertyAreaDetailsDTO.getCarpetArea());

		if (null != propertyAreaDetailsDTO.getSuperBuiltupArea())
			dbPropertyAreaDetailsDTO.setSuperBuiltupArea(propertyAreaDetailsDTO.getSuperBuiltupArea());
		
		if (null != propertyAreaDetailsDTO.getSalableArea())
			dbPropertyAreaDetailsDTO.setSalableArea(propertyAreaDetailsDTO.getSalableArea());
		
		if (null != propertyAreaDetailsDTO.getPlotArea())
			dbPropertyAreaDetailsDTO.setPlotArea(propertyAreaDetailsDTO.getPlotArea());

		if (null != propertyAreaDetailsDTO.getAreaUnit())
			dbPropertyAreaDetailsDTO.setAreaUnit(propertyAreaDetailsDTO.getAreaUnit());

		if (null != propertyAreaDetailsDTO.getPrivatePoolAvailability())
			dbPropertyAreaDetailsDTO.setPrivatePoolAvailability(propertyAreaDetailsDTO.getPrivatePoolAvailability());

		if (null != propertyAreaDetailsDTO.getPrivateGardenAvailability())
			dbPropertyAreaDetailsDTO
					.setPrivateGardenAvailability(propertyAreaDetailsDTO.getPrivateGardenAvailability());

		if (null != propertyAreaDetailsDTO.getPrivateGardenArea())
			dbPropertyAreaDetailsDTO.setPrivateGardenArea(propertyAreaDetailsDTO.getPrivateGardenArea());

		if (null != propertyAreaDetailsDTO.getNoOfBedrooms())
			dbPropertyAreaDetailsDTO.setNoOfBedrooms(propertyAreaDetailsDTO.getNoOfBedrooms());

		if (null != propertyAreaDetailsDTO.getNoOfBathrooms())
			dbPropertyAreaDetailsDTO.setNoOfBathrooms(propertyAreaDetailsDTO.getNoOfBathrooms());

		if (null != propertyAreaDetailsDTO.getNoOfBalconies())
			dbPropertyAreaDetailsDTO.setNoOfBalconies(propertyAreaDetailsDTO.getNoOfBalconies());

		if (null != propertyAreaDetailsDTO.getAdditionalRooms())
			dbPropertyAreaDetailsDTO.setAdditionalRooms(propertyAreaDetailsDTO.getAdditionalRooms());

		if (null != propertyAreaDetailsDTO.getFloorNo())
			dbPropertyAreaDetailsDTO.setFloorNo(propertyAreaDetailsDTO.getFloorNo());

		if (null != propertyAreaDetailsDTO.getTowerBlockNo())
			dbPropertyAreaDetailsDTO.setTowerBlockNo(propertyAreaDetailsDTO.getTowerBlockNo());

		if (null != propertyAreaDetailsDTO.getFlatNo())
			dbPropertyAreaDetailsDTO.setFlatNo(propertyAreaDetailsDTO.getFlatNo());

		if (null != propertyAreaDetailsDTO.getPropertyLevel())
			dbPropertyAreaDetailsDTO.setPropertyLevel(propertyAreaDetailsDTO.getPropertyLevel());

		if (null != propertyAreaDetailsDTO.getCornerFlat())
			dbPropertyAreaDetailsDTO.setCornerFlat(propertyAreaDetailsDTO.getCornerFlat());

		if (null != propertyAreaDetailsDTO.getTerraceAreaFlag())
			dbPropertyAreaDetailsDTO.setTerraceAreaFlag(propertyAreaDetailsDTO.getTerraceAreaFlag());

		if (null != propertyAreaDetailsDTO.getTerraceArea())
			dbPropertyAreaDetailsDTO.setTerraceArea(propertyAreaDetailsDTO.getTerraceArea());

		if (null != propertyAreaDetailsDTO.getTerraceAreaUnit())
			dbPropertyAreaDetailsDTO.setTerraceAreaUnit(propertyAreaDetailsDTO.getTerraceAreaUnit());

		if (null != propertyAreaDetailsDTO.getTotalFloors())
			dbPropertyAreaDetailsDTO.setTotalFloors(propertyAreaDetailsDTO.getTotalFloors());

		if (null != propertyAreaDetailsDTO.getOpenSides())
			dbPropertyAreaDetailsDTO.setOpenSides(propertyAreaDetailsDTO.getOpenSides());

		if (null != propertyAreaDetailsDTO.getFacing())
			dbPropertyAreaDetailsDTO.setFacing(propertyAreaDetailsDTO.getFacing());

		if (null != propertyAreaDetailsDTO.getOccupancyType())
			dbPropertyAreaDetailsDTO.setOccupancyType(propertyAreaDetailsDTO.getOccupancyType());

		if (null != propertyAreaDetailsDTO.getOccupancyCertificate())
			dbPropertyAreaDetailsDTO.setOccupancyCertificate(propertyAreaDetailsDTO.getOccupancyCertificate());

		if (null != propertyAreaDetailsDTO.getPrivateWashroom())
			dbPropertyAreaDetailsDTO.setPrivateWashroom(propertyAreaDetailsDTO.getPrivateWashroom());

		if (null != propertyAreaDetailsDTO.getPrivateWashroomCount())
			dbPropertyAreaDetailsDTO.setPrivateWashroomCount(propertyAreaDetailsDTO.getPrivateWashroomCount());

		if (null != propertyAreaDetailsDTO.getPublicWashroom())
			dbPropertyAreaDetailsDTO.setPublicWashroom(propertyAreaDetailsDTO.getPublicWashroom());

		if (null != propertyAreaDetailsDTO.getPublicWashroomCount())
			dbPropertyAreaDetailsDTO.setPublicWashroomCount(propertyAreaDetailsDTO.getPublicWashroomCount());

		if (null != propertyAreaDetailsDTO.getGardenArea())
			dbPropertyAreaDetailsDTO.setGardenArea(propertyAreaDetailsDTO.getGardenArea());

		if (null != propertyAreaDetailsDTO.getPantry())
			dbPropertyAreaDetailsDTO.setPantry(propertyAreaDetailsDTO.getPantry());

		if (null != propertyAreaDetailsDTO.getBuildingStatus())
			dbPropertyAreaDetailsDTO.setBuildingStatus(propertyAreaDetailsDTO.getBuildingStatus());

		if (null != propertyAreaDetailsDTO.getSpaceType())
			dbPropertyAreaDetailsDTO.setSpaceType(propertyAreaDetailsDTO.getSpaceType());

		if (null != propertyAreaDetailsDTO.getBreadthFeet())
			dbPropertyAreaDetailsDTO.setBreadthFeet(propertyAreaDetailsDTO.getBreadthFeet());

		if (null != propertyAreaDetailsDTO.getLengthFeet())
			dbPropertyAreaDetailsDTO.setLengthFeet(propertyAreaDetailsDTO.getLengthFeet());

		if (null != propertyAreaDetailsDTO.getNoOfFloorsAllowed())
			dbPropertyAreaDetailsDTO.setNoOfFloorsAllowed(propertyAreaDetailsDTO.getNoOfFloorsAllowed());

		if (null != propertyAreaDetailsDTO.getCompoundWallMade())
			dbPropertyAreaDetailsDTO.setCompoundWallMade(propertyAreaDetailsDTO.getCompoundWallMade());

		if (null != propertyAreaDetailsDTO.getKeepItPrivate())
			dbPropertyAreaDetailsDTO.setKeepItPrivate(propertyAreaDetailsDTO.getKeepItPrivate());

		
		
		
		dbPropertyAreaDetailsDTO.setUpdatedBy(propertyAreaDetailsDTO.getUpdatedBy());
		dbPropertyAreaDetailsDTO.setUpdatedDate(propertyAreaDetailsDTO.getUpdatedDate());
		propertyAreaDetailsDao.saveAreaDetails(dbPropertyAreaDetailsDTO);
	}

	@Override
	public void updateAmenities(AmenitiesDTO amenitiesDTO) {
		// 1.checking propertyId is there or not.
		propertiesDao.getPropertyById(amenitiesDTO.getPropertyId());

		// 2.delete the existing aminities records
		amenitiesDao.deleteAmenitiesByPropertyId(amenitiesDTO.getPropertyId());

		// 3.save the new updated records.
		List<AmenitiesDTO> amenitiesList = new ArrayList<AmenitiesDTO>();
		AmenitiesDTO dbAmenitiesDTO = null;
		//		ravi 9may change todo
		
		
		if (null != amenitiesDTO.getAmenitiesList() ) {
			
			 List<String> amenites = amenitiesDTO.getAmenitiesList();
			for (String amenities : amenites) {
				dbAmenitiesDTO = new AmenitiesDTO();
				dbAmenitiesDTO.setPropertyId(amenitiesDTO.getPropertyId());
				dbAmenitiesDTO.setAmenities(amenities);
				dbAmenitiesDTO.setStatus(Constant.STATUS_ACTIVE);
				dbAmenitiesDTO.setCreatedBy(amenitiesDTO.getUpdatedBy());
				dbAmenitiesDTO.setCreatedDate(amenitiesDTO.getUpdatedDate());
				dbAmenitiesDTO.setUpdatedBy(amenitiesDTO.getUpdatedBy());
				dbAmenitiesDTO.setUpdatedDate(amenitiesDTO.getUpdatedDate());
				amenitiesList.add(dbAmenitiesDTO);
			}
		}
		amenitiesDao.saveAllAmenities(amenitiesList);
	}

	@Override
	public void updatePropertyFloorRooms(PropertyFloorRoomsDTO propertyFloorRoomsDTO) {
		// 1.checking propertyId is there or not
		propertiesDao.getPropertyById(propertyFloorRoomsDTO.getPropertyId());

		// 2. Delete the existing PropertyFloorRooms records
		propertyFloorRoomsDao.deletePropertyFloorRoomsByPropertyId(propertyFloorRoomsDTO.getPropertyId());

		// 3. Create and save the new PropertyFloorRooms records.
		List<PropertyFloorRoomsDTO> propertyFloorRoomsList = new ArrayList<PropertyFloorRoomsDTO>();
		PropertyFloorRoomsDTO dbPropertyFloorRoomsDTO = null;

		if (null != propertyFloorRoomsDTO.getPropertyFloorRoomsList()
				&& propertyFloorRoomsDTO.getPropertyFloorRoomsList().size() > 0) {
			for (PropertyFloorRoomsDTO roomDTO : propertyFloorRoomsDTO.getPropertyFloorRoomsList()) {
				dbPropertyFloorRoomsDTO = new PropertyFloorRoomsDTO();
				dbPropertyFloorRoomsDTO.setPropertyId(propertyFloorRoomsDTO.getPropertyId());
				dbPropertyFloorRoomsDTO.setFloorNo(roomDTO.getFloorNo());
				dbPropertyFloorRoomsDTO.setNoOfRooms(roomDTO.getNoOfRooms());
				dbPropertyFloorRoomsDTO.setStatus(Constant.STATUS_ACTIVE);
				dbPropertyFloorRoomsDTO.setCreatedBy(propertyFloorRoomsDTO.getUpdatedBy());
				dbPropertyFloorRoomsDTO.setCreatedDate(propertyFloorRoomsDTO.getUpdatedDate());
				dbPropertyFloorRoomsDTO.setUpdatedBy(propertyFloorRoomsDTO.getUpdatedBy());
				dbPropertyFloorRoomsDTO.setUpdatedDate(propertyFloorRoomsDTO.getUpdatedDate());
				propertyFloorRoomsList.add(dbPropertyFloorRoomsDTO);
			}
		}
		propertyFloorRoomsDao.saveAllPropertyFloorRooms(propertyFloorRoomsList);
	}

	@Override
	public void updatePgRoomDetails(PgRoomDetailsDTO pgRoomDetailsDTO) {
		PgRoomDetails dbPgRoomDetails = pgRoomDetailsDao.getPgRoomDetailsById(pgRoomDetailsDTO.getId());
		PgRoomDetailsDTO dbPgRoomDetailsDTO = PgRoomDetailsConverter
				.getPgRoomDetailsDTOByPgRoomDetails(dbPgRoomDetails);

		if (null != pgRoomDetailsDTO.getFacilityOffered())
			dbPgRoomDetailsDTO.setFacilityOffered(pgRoomDetailsDTO.getFacilityOffered());

		if (null != pgRoomDetailsDTO.getRoomType())
			dbPgRoomDetailsDTO.setRoomType(pgRoomDetailsDTO.getRoomType());

		if (null != pgRoomDetailsDTO.getRent())
			dbPgRoomDetailsDTO.setRent(pgRoomDetailsDTO.getRent());

		if (null != pgRoomDetailsDTO.getRentType())
			dbPgRoomDetailsDTO.setRentType(pgRoomDetailsDTO.getRentType());

		if (null != pgRoomDetailsDTO.getParking2Wheeler())
			dbPgRoomDetailsDTO.setParking2Wheeler(pgRoomDetailsDTO.getParking2Wheeler());

		if (null != pgRoomDetailsDTO.getParking2OpenType())
			dbPgRoomDetailsDTO.setParking2OpenType(pgRoomDetailsDTO.getParking2OpenType());

		if (null != pgRoomDetailsDTO.getParking2CoverType())
			dbPgRoomDetailsDTO.setParking2CoverType(pgRoomDetailsDTO.getParking2CoverType());

		if (null != pgRoomDetailsDTO.getParking4Wheeler())
			dbPgRoomDetailsDTO.setParking4Wheeler(pgRoomDetailsDTO.getParking4Wheeler());

		if (null != pgRoomDetailsDTO.getParking4OpenType())
			dbPgRoomDetailsDTO.setParking4OpenType(pgRoomDetailsDTO.getParking4OpenType());

		if (null != pgRoomDetailsDTO.getParking4CoverType())
			dbPgRoomDetailsDTO.setParking4CoverType(pgRoomDetailsDTO.getParking4CoverType());

		if (null != pgRoomDetailsDTO.getSecuredDeposit())
			dbPgRoomDetailsDTO.setSecuredDeposit(pgRoomDetailsDTO.getSecuredDeposit());

		if (null != pgRoomDetailsDTO.getSecuredDepositAmount())
			dbPgRoomDetailsDTO.setSecuredDepositAmount(pgRoomDetailsDTO.getSecuredDepositAmount());

		if (null != pgRoomDetailsDTO.getTotalBedsInRoom())
			dbPgRoomDetailsDTO.setTotalBedsInRoom(pgRoomDetailsDTO.getTotalBedsInRoom());

		dbPgRoomDetailsDTO.setUpdatedBy(pgRoomDetailsDTO.getUpdatedBy());
		dbPgRoomDetailsDTO.setUpdatedDate(pgRoomDetailsDTO.getUpdatedDate());
		pgRoomDetailsDao.savePgRoomDetails(dbPgRoomDetailsDTO);

	}
	
	@Override
	public List<Object> propertyListInDashboard(PropertiesDTO propertiesDTO) {
	    System.out.println("Entering propertyListInDashboard with propertiesDTO: " + propertiesDTO);
	    List<Object> allDetails = new ArrayList<>();
	    
	    try {
	        // By user id getting roles for check loged in user is admin or not
	        List<UserRole> userRoles = loginService.getAllUserRoles(propertiesDTO.getCreatedBy());
	        
	        // getting userdetails for set user name
	        Optional<User> user = userRepository.findById(propertiesDTO.getCreatedBy());

	        // checking the logged in user admin or not
	        boolean adminFlag = userRoles.stream().anyMatch(role -> "Admin".equals(role.getRole()));
	        
	        String username = user.map(User::getFullName).orElse("");
	        
	        // Fetch properties based on admin flag
	        List<Properties> properties = adminFlag ? 
	            propertiesDao.allPropertyListByStatusInDashboard(propertiesDTO) : 
	            propertiesDao.allPropertyByStatusAndUserIdInDashboard(propertiesDTO);

	        for (Properties property : properties) {
	            try {
	                // Process each property
	                Long propertyId = property.getId();
	                HashMap<String, Object> propertyDtl = new HashMap<>();

	                PricingDetails priceDetails = pricingDetailsRepository.getPricingDetailsByPropertyId(propertyId);
	                PropertyAreaDetails propertyAreaDetails = propertyAreaDetailsRepository.getAreaDetailsByPropertyId(propertyId);
	                FurnishingStatus furnishingStatusDtl = furnishingStatusRepository.getFurnishingStatusByPropertyId(propertyId);
	                List<PropertyImageGallery> propertyImageGalleryDtl = propertyImageGalleryRepository.getPropertyImageGalleryByPropertyId(propertyId);
	                PropertyStatus propertyStatusDtl = propertyStatusRepository.getPropertyStatusByPropertyId(propertyId);

	                List<Map<String, String>> imgDetails = new ArrayList<>();
	                for (PropertyImageGallery propertyImageGallery : propertyImageGalleryDtl) {
	                    HashMap<String, String> imageDetails = new HashMap<>();
	                    imageDetails.put("imagePath", propertyImageGallery.getImagePath());
	                    imageDetails.put("imageType", propertyImageGallery.getImageType());
	                    imageDetails.put("status", propertyImageGallery.getStatus());
	                    imgDetails.add(imageDetails);
	                }
	                
	                List<UserRole> userRole = loginService.getAllUserRoles(property.getCreatedBy());
	                
	                List<String> rolesList = userRole.stream()
	                	    .map(UserRole::getRole)
	                	    .collect(Collectors.toList());

	                propertyDtl.put("propertyId", String.valueOf(propertyId));
	                propertyDtl.put("propertyType", property.getPropertyType());
	                propertyDtl.put("listingType", property.getListingType());
	                propertyDtl.put("locality", property.getLocality());
	                propertyDtl.put("city", property.getCity());
	                propertyDtl.put("state", property.getState());
	                propertyDtl.put("pinCode", property.getPincode());
	                propertyDtl.put("userRoles", rolesList);
	                propertyDtl.put("isExclusiveProperty", property.isExclusiveProperty());
	                propertyDtl.put("country", property.getCountry());
	                propertyDtl.put("propertyAddress", property.getPropertyAddress());
	                propertyDtl.put("propertyName", property.getPropertyName());
	                propertyDtl.put("rent", priceDetails != null && priceDetails.getRent() != null ? String.valueOf(priceDetails.getRent()) : "0");
	                propertyDtl.put("areaUnit", propertyAreaDetails != null ? propertyAreaDetails.getAreaUnit() : "");
	                propertyDtl.put("builtupPlotArea", propertyAreaDetails != null ? propertyAreaDetails.getBuiltupPlotArea() : "");
	                propertyDtl.put("furnishingType", furnishingStatusDtl != null ? furnishingStatusDtl.getFurnishingType() : "");
	                propertyDtl.put("postDate", property.getCreatedDate());
	                propertyDtl.put("positionStatus", propertyStatusDtl != null ? propertyStatusDtl.getPositionStatus() : "");
	                propertyDtl.put("username", username);
	                propertyDtl.put("buildingType", property.getBuildingType());
	                propertyDtl.put("numOfBedrooms", propertyAreaDetails != null ? propertyAreaDetails.getNoOfBedrooms() : "");
	                propertyDtl.put("imageData", imgDetails);
	                propertyDtl.put("owner", property.getOwner());

	                allDetails.add(propertyDtl);
	            } catch (Exception e) {
	                System.err.println("Error processing property with ID: " + property.getId());
	                e.printStackTrace();
	            }
	        }
	    } catch (Exception e) {
	        System.err.println("Error in propertyListInDashboard");
	        e.printStackTrace();
	        throw e;
	    }

	    return allDetails;
	}

	@Override
	public List<Properties> myPropertyListInDashboard(PropertiesDTO propertiesDTO) {

		List<Properties> findData = propertiesRepository.findActiveInDescOrder();

		return findData;
	}


	@Override
	public void acceptedPropertyByAdmin(Properties properties) {

		propertiesRepository.save(properties);
		
	}
	
	@Override
	public List<Properties> myPropertyList(PropertiesDTO propertiesDTO) {

//		List<Properties> findData = propertiesRepository.findInDescOrder();
		
		List<Properties> findData = propertiesDao.findInDescOrder();

		return findData;
	}
	
	@Override
	public List<Properties> getSiteMapProperties() {

//		List<Properties> findData = propertiesRepository.findInDescOrder();
		
		List<Properties> findData = propertiesDao.findInDescOrder();

		return findData;
	}
	

	@Override
	public PropertyResponse getPropertiesByFilter(PropertySearchDto propertySearchDto) {

		return propertiesDao.getPropertyListByFilter(propertySearchDto);

	}
	
	@Override
	public List<PropertySearchDto> getRelatedProperties(PropertySearchDto propertySearchDto){
		List<PropertySearchDto> returnList = propertiesDao.getRelatedProperties(propertySearchDto);
	        
	        for (PropertySearchDto property : returnList) {
	            Long propertyId = property.getPropertyId();

	            List<PropertyGroup> propertyGroupDetails = propertyGroupRepository.findAllByPropertyId(propertyId);

	            if (propertyGroupDetails != null && !propertyGroupDetails.isEmpty()) {
	                long groupId = propertyGroupDetails.get(0).getGroupId();
	                List<PropertyGroup> propertyGroups = propertyGroupRepository.findByGroupId(groupId);

	                List<IncludedGroupPropertyDTO> includedGroupPropertyList = new ArrayList<>();

	    	        Long minRent=0L , maxRent =0L;

	                for (PropertyGroup propertyGroup : propertyGroups) {
	                    long propertyId2 = propertyGroup.getPropertyId();
	                    Properties properties = propertiesRepository.findById(propertyId2).get();
	                    IncludedGroupPropertyDTO addGroupProperty = includedGroupPropertyDao.addGroupProperty(properties);
	                    
	                    if(property.getPropertyId().equals(addGroupProperty.getPropertyId())) {
	                    	
		                    Long rent = addGroupProperty.getRent();
		                    if(rent != null && rent <= minRent && rent == 0L) {
		                    	minRent=rent;
		                    	
		                    	System.out.println("minRent "+ minRent);
		                    }

	                    	System.out.println("Same Property ");
	                    } else {
	                    	
	                    	
	                    	 includedGroupPropertyList.add(addGroupProperty);
	                    	 
	 	                    Long rent = addGroupProperty.getRent();
	 	                   if(rent != null && rent <= minRent) {
		                    	minRent=rent;
		                    	
		                    	System.out.println("minRent "+ minRent);

		                    }

	                    }
	                    
	                   
	                }

	                property.setMinRent(String.valueOf(minRent));
	                property.setMaxRent(String.valueOf(maxRent));

	                property.setIncludedGroupProperty(includedGroupPropertyList);
	            }
	        }
		
		return returnList;
	}

	
	@Override
	public PropertyResponse getCompletedPropertiesByFilter(PropertySearchDto propertySearchDto) {

		return propertiesDao.getCompletedPropertyListByFilter(propertySearchDto);

	}

	

//	@Override
//	public List<PropertyGroupDTO> getPropertyGroupWiseForAdmin() {
//		// TODO Auto-generated method stub
//		
//		
//		 List<PropertyGroup> allPropertiesGroups = propertyGroupRepository.findAll();
//		 List<PropertyGroupDTO> allPropertiesGroupDto = new ArrayList<>();
//		 Set<Long> encounteredGroupIds = new HashSet<>();
//		
//		for( PropertyGroup allPropertiesGroup : allPropertiesGroups) {
//						
//			PropertyGroupDTO propertyGroupDTOByPropertyGroup = PropertyGroupConverter.getPropertyGroupDTOByPropertyGroup(allPropertiesGroup);
//			
//			String groupName = allPropertiesGroup.getGroupName();
//			List<PropertyGroup> propertyGroups =propertyGroupRepository.findByGroupName( groupName );
//			
//			List<Long> propertyIdList = new ArrayList<>();
//			for(PropertyGroup propertyGroup :propertyGroups) {
//				
//				long propertyId = propertyGroup.getPropertyId();
//				propertyIdList.add(propertyId);
//			}
//			
//			propertyGroupDTOByPropertyGroup.setPropertyIdList(propertyIdList);
//			allPropertiesGroupDto.add(propertyGroupDTOByPropertyGroup);
//		
//		}
//		
//		return allPropertiesGroupDto;
//	}
//
//	
	
	
	@Override
	public List<PropertyGroupDTO> getPropertyGroupWiseForAdmin() {
		
	    List<PropertyGroup> allPropertiesGroups = propertyGroupRepository.findAll();
	    
	    List<PropertyGroupDTO> allPropertiesGroupDto = new ArrayList<>();
	    
	    Set<Long> encounteredGroupIds = new HashSet<>(); // to keep track of encountered groupIds

	    for (PropertyGroup allPropertiesGroup : allPropertiesGroups) {
	        // Check if the groupId is encountered before
	        if (!encounteredGroupIds.contains(allPropertiesGroup.getGroupId())) {
	            PropertyGroupDTO propertyGroupDTOByPropertyGroup = PropertyGroupConverter.getPropertyGroupDTOByPropertyGroup(allPropertiesGroup);
	            String groupName = allPropertiesGroup.getGroupName();
	            List<PropertyGroup> propertyGroups = propertyGroupRepository.findByGroupName(groupName);

	            List<Long> propertyIdList = new ArrayList<>();
	            for (PropertyGroup propertyGroup : propertyGroups) {
	                long propertyId = propertyGroup.getPropertyId();
	                propertyIdList.add(propertyId);
	            }

	            propertyGroupDTOByPropertyGroup.setPropertyIdList(propertyIdList);
	            allPropertiesGroupDto.add(propertyGroupDTOByPropertyGroup);
	            encounteredGroupIds.add(allPropertiesGroup.getGroupId());
	        }
	    }

	    return allPropertiesGroupDto;
	}
	
	@Override
	public List<PropertyGroupDTO> getPropertyGroupWiseForUser(long userId) {
		// TODO Auto-generated method stub
		
		  List<PropertyGroup> allPropertiesGroups = propertyGroupRepository.findByUserId(userId);
		    
		    List<PropertyGroupDTO> allPropertiesGroupDto = new ArrayList<>();
		    
		    Set<Long> encounteredGroupIds = new HashSet<>(); // to keep track of encountered groupIds

		    for (PropertyGroup allPropertiesGroup : allPropertiesGroups) {
		        // Check if the groupId is encountered before
		        if (!encounteredGroupIds.contains(allPropertiesGroup.getGroupId())) {
		            PropertyGroupDTO propertyGroupDTOByPropertyGroup = PropertyGroupConverter.getPropertyGroupDTOByPropertyGroup(allPropertiesGroup);
		            String groupName = allPropertiesGroup.getGroupName();
		            List<PropertyGroup> propertyGroups = propertyGroupRepository.findByGroupName(groupName);

		            List<Long> propertyIdList = new ArrayList<>();
		            for (PropertyGroup propertyGroup : propertyGroups) {
		                long propertyId = propertyGroup.getPropertyId();
		                propertyIdList.add(propertyId);
		            }

		            propertyGroupDTOByPropertyGroup.setPropertyIdList(propertyIdList);
		            allPropertiesGroupDto.add(propertyGroupDTOByPropertyGroup);
		            encounteredGroupIds.add(allPropertiesGroup.getGroupId());
		        }
		    }

		    return allPropertiesGroupDto;
	}

	@Override
	public PropertyResponse myPropertyListBySearch(PropertySearchDto propertySearchDTO) {

//		List<Properties> findData = propertiesRepository.findInDescOrder();
		
		PropertyResponse findData = propertiesDao.findInDescOrderBySearch(propertySearchDTO);

		return findData;
	}
	
	@Override
	public void changePropertyStatusByAdmin(PropertiesDTO propertiesDto) {
		
		Long userId = userUtils.getLogedInUser();
		
		List<UserRole> roles = loginService.getAllUserRoles(userId);
		boolean adminAcccess = roles.stream()
				.anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()));
		
		if(!adminAcccess) {
			throw new UnAuthorizedException("Loged in user don't have permissions to change property details"); 
		}
		propertiesDto.setUpdatedBy(userId);
		
		propertiesDao.changePropertyStatusByAdmin(propertiesDto);
		
	}
	
	@Override
	public void verifyPropertyAddress(CountryPincodeMappingDTO countryPincodeMappingDTO) {
		
		List<UserRole> roles = loginService.getAllUserRoles(countryPincodeMappingDTO.getCreatedBy());
		
		boolean adminAcccess = roles.stream()
				.anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()));
		
		boolean associateAccess = roles.stream()
				.anyMatch(x -> x.getRole().equals(RoleEnum.ASSOCIATE.getRole()));
		
		if(!adminAcccess && associateAccess) {
			Optional<User> userDetails = userRepository.findById(countryPincodeMappingDTO.getCreatedBy());
			
			if(userDetails.isPresent()) {
				User user = userDetails.get();
				
				if(!user.getCountry().equals(countryPincodeMappingDTO.getCountry())) {
					throw new FieldException("you have not permission to post in " + countryPincodeMappingDTO.getCountry());
				}
				
				if(!user.getState().equals(countryPincodeMappingDTO.getState())) {
					throw new FieldException("you have not permission to post in " + countryPincodeMappingDTO.getState());
				}
				
				if(!user.getDistrict().equals(countryPincodeMappingDTO.getDistrict())) {
					throw new FieldException("you have not permission to post in " + countryPincodeMappingDTO.getDistrict());
				}
				
				if(!user.getPincode().equals(countryPincodeMappingDTO.getPincode())) {
					throw new FieldException("you have not permission to post in " + countryPincodeMappingDTO.getPincode());
				}
			}
		}
		
	}

	@Override
	public void exclusiveProperty(PropertiesDTO propertiesDto) {
		
		List<UserRole> roles = loginService.getAllUserRoles(propertiesDto.getUpdatedBy());
		
		boolean adminFlag = roles.stream()
				.anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()));
		
		if(!adminFlag) {
			throw new UnAuthorizedException("Loged-in user don't have permissions to change property details");
		}
		
		propertiesDao.exclusiveProperty(propertiesDto);
		
	}
	
	@Override
	public List<Object> getAllExclusiveProperties(PropertiesDTO propertiesDTO) {
		
	    List<Object> allDetails = new ArrayList<>();
	    
	    try {
	        
	        // getting userdetails for set user name
//	        Optional<User> user = userRepository.findById(propertiesDTO.getCreatedBy());
	        
	        // Fetch properties based on exclusive property flag
	        List<Properties> properties =  
	            propertiesDao.getAllExclusiveProperties(propertiesDTO);

	        for (Properties property : properties) {
	            try {
	            	
	            	User user = userRepository.findById(property.getCreatedBy()).get();
	            	
	            	String username = user.getFullName();
	            	
	                // Process each property
	                Long propertyId = property.getId();
	                HashMap<String, Object> propertyDtl = new HashMap<>();

	                PricingDetails priceDetails = pricingDetailsRepository.getPricingDetailsByPropertyId(propertyId);
	                PropertyAreaDetails propertyAreaDetails = propertyAreaDetailsRepository.getAreaDetailsByPropertyId(propertyId);
	                FurnishingStatus furnishingStatusDtl = furnishingStatusRepository.getFurnishingStatusByPropertyId(propertyId);
	                List<PropertyImageGallery> propertyImageGalleryDtl = propertyImageGalleryRepository.getPropertyImageGalleryByPropertyId(propertyId);
	                PropertyStatus propertyStatusDtl = propertyStatusRepository.getPropertyStatusByPropertyId(propertyId);

	                List<Map<String, String>> imgDetails = new ArrayList<>();
	                for (PropertyImageGallery propertyImageGallery : propertyImageGalleryDtl) {
	                    HashMap<String, String> imageDetails = new HashMap<>();
	                    imageDetails.put("imagePath", propertyImageGallery.getImagePath());
	                    imageDetails.put("imageType", propertyImageGallery.getImageType());
	                    imageDetails.put("status", propertyImageGallery.getStatus());
	                    imgDetails.add(imageDetails);
	                }
	                
	                String title = PropertyUtility.constructTitle(furnishingStatusDtl.getFurnishingType(), propertyAreaDetails.getNoOfBedrooms()
	                		, property.getPropertyType(), property.getListingType(), property.getLocality(), property.getCity());

	                propertyDtl.put("propertyId", String.valueOf(propertyId));
	                propertyDtl.put("propertyType", property.getPropertyType());
	                propertyDtl.put("listingType", property.getListingType());
	                propertyDtl.put("locality", property.getLocality());
	                propertyDtl.put("city", property.getCity());
	                propertyDtl.put("state", property.getState());
	                propertyDtl.put("isExclusiveProperty", property.isExclusiveProperty());
	                propertyDtl.put("country", property.getCountry());
	                propertyDtl.put("propertyAddress", property.getPropertyAddress());
	                propertyDtl.put("propertyName", property.getPropertyName());
	                propertyDtl.put("rent", priceDetails != null && priceDetails.getRent() != null ? String.valueOf(priceDetails.getRent()) : "0");
	                propertyDtl.put("areaUnit", propertyAreaDetails != null ? propertyAreaDetails.getAreaUnit() : "");
	                propertyDtl.put("builtupPlotArea", propertyAreaDetails != null ? propertyAreaDetails.getBuiltupPlotArea() : "");
	                propertyDtl.put("furnishingType", furnishingStatusDtl != null ? furnishingStatusDtl.getFurnishingType() : "");
	                propertyDtl.put("postDate", property.getCreatedDate());
	                propertyDtl.put("positionStatus", propertyStatusDtl != null ? propertyStatusDtl.getPositionStatus() : "");
	                propertyDtl.put("username", username);
	                propertyDtl.put("title", title);
	                propertyDtl.put("buildingType", property.getBuildingType());
	                propertyDtl.put("numOfBedrooms", propertyAreaDetails != null ? propertyAreaDetails.getNoOfBedrooms() : "");
	                propertyDtl.put("imageData", imgDetails);

	                allDetails.add(propertyDtl);
	            } catch (Exception e) {
	                System.err.println("Error processing property with ID: " + property.getId());
	                e.printStackTrace();
	            }
	        }
	    } catch (Exception e) {
	        System.err.println("Error in propertyListInDashboard");
	        e.printStackTrace();
	        throw e;
	    }

	    return allDetails;
	}

	@Override
	public void assignOwnerToProperty(PropertiesDTO propertiesDTO) {
		// Step 1: Check user access
	    List<String> roleList = Arrays.asList(
	        RoleEnum.ADMIN.getRole(), 
	        RoleEnum.ASSOCIATE.getRole(), 
	        RoleEnum.AGENT.getRole()
	    );
	    
	    boolean userAccess = loginService.isUserAccessible(propertiesDTO.getUpdatedBy(), roleList);
	    
	    if (!userAccess) {
	        throw new UnAuthorizedException("Logged-in user doesn't have permissions to add/update owner API details.");
	    }
		
	 // Step 2: Fetch property details
	    Properties dbProperties = propertiesDao.getPropertyById(propertiesDTO.getId());
	    if (dbProperties == null) {
	        throw new ResourceNotFoundException("Property not found with ID: " + propertiesDTO.getId());
	    }
	    
	 // Step 3: Fetch owner details
	    Optional<Owner> owner = ownerDao.getOwnerById(propertiesDTO.getOwnerId());
	    if (!owner.isPresent()) {
	        throw new ResourceNotFoundException("Owner not found with ID: " + propertiesDTO.getOwnerId());
	    }
	    
	 // Step 4: Assign owner to property
	    dbProperties.setOwner(owner.get()); // Set the owner in the property entity
	    dbProperties.setUpdatedBy(propertiesDTO.getUpdatedBy()); // Update the "updatedBy" field
	    dbProperties.setUpdatedDate(propertiesDTO.getUpdatedDate()); // Update the "updatedDate" field
		
	 // Step 5: Save the updated property
		propertiesDao.assignOwnerToProperty(dbProperties);
		
	}

}
