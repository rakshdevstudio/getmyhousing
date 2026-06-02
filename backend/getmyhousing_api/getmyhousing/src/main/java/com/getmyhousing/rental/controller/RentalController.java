package com.getmyhousing.rental.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.annotation.Resource;
import javax.persistence.NonUniqueResultException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dao.IncludedGroupPropertyDao;
import com.getmyhousing.common.domain.FurnishingStatus;
import com.getmyhousing.common.domain.GroupDetail;
import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.PropertyAreaDetails;
import com.getmyhousing.common.domain.PropertyGroup;
import com.getmyhousing.common.domain.PropertyImageGallery;
import com.getmyhousing.common.domain.PropertyStatus;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.AdditionalDetailsDTO;
import com.getmyhousing.common.dto.AmenitiesDTO;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.dto.DefinePropertyDTO;
import com.getmyhousing.common.dto.FurnishingStatusDTO;
import com.getmyhousing.common.dto.IncludedGroupPropertyDTO;
import com.getmyhousing.common.dto.LandMarkDTO;
import com.getmyhousing.common.dto.OwnerDTO;
import com.getmyhousing.common.dto.PgDetailsDTO;
import com.getmyhousing.common.dto.PgOwnerDetailsDTO;
import com.getmyhousing.common.dto.PgRegulationsDTO;
import com.getmyhousing.common.dto.PgRoomDetailsDTO;
import com.getmyhousing.common.dto.PricingDetailsDTO;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.PropertyAreaDetailsDTO;
import com.getmyhousing.common.dto.PropertyFloorRoomsDTO;
import com.getmyhousing.common.dto.PropertyGroupDTO;
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
import com.getmyhousing.common.repository.GroupDetailRepository;
import com.getmyhousing.common.repository.PricingDetailsRepository;
import com.getmyhousing.common.repository.PropertiesRepository;
import com.getmyhousing.common.repository.PropertyAreaDetailsRepository;
import com.getmyhousing.common.repository.PropertyGroupRepository;
import com.getmyhousing.common.repository.PropertyImageGalleryRepository;
import com.getmyhousing.common.repository.PropertyStatusRepository;
import com.getmyhousing.common.repository.UserRepository;
import com.getmyhousing.common.repository.UserRoleRepository;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.PropertyUtility;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.rental.service.RentalService;
import com.getmyhousing.rental.validator.RentalValidator;

@CrossOrigin
@RestController
@RequestMapping("/rental")
public class RentalController {
	
	private static final Logger logger = LoggerFactory.getLogger(RentalController.class);

	@Autowired
	private RentalService rentalService;

	@Autowired
	private RentalValidator rentalValidator;

	@Autowired
	private PropertyAreaDetailsRepository propertyAreaDetailsRepository;

	@Autowired
	private PricingDetailsRepository pricingDetailsRepository;

	@Autowired
	private FurnishingStatusRepository furnishingStatusRepository;

	@Autowired
	private PropertyImageGalleryRepository propertyImageGalleryRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private PropertiesRepository propertiesRepository;

	@Autowired
	private PropertyGroupRepository propertyGroupRepository;

	@Autowired
	private GroupDetailRepository groupDetailRepository;

	@Autowired
	private PropertyStatusRepository propertyStatusRepository;

	@Autowired
	private IncludedGroupPropertyDao includedGroupPropertyDao;

	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;
	
	@Autowired
	private UserUtils userUtils;

	private LinkedHashMap<String, Object> returnMap;

	@RequestMapping(path = "/addProperty", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> saveProperty(@RequestBody PropertiesDTO propertiesDto,
			BindingResult result) {

		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<>();
		
		Long userId = userUtils.getLogedInUser();
		
		propertiesDto.setCreatedBy(userId);
		
		try {

			rentalService.saveProperty(propertiesDto);

		}catch (NonUniqueResultException e) {
			e.printStackTrace();
			returnMap.put("errorCode", "NonUniqueResultException: Query returned multiple results");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(returnMap);
		}catch (UnAuthorizedException e) {
            returnMap.put("responseCode", HttpStatus.UNAUTHORIZED);
            returnMap.put("responseMessage", "Don't have Persmission to post property please contact admin.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(returnMap);
        } catch (Exception e) {
			// Handle any other exceptions
			e.printStackTrace();
			returnMap.put("errorCode", "An error occurred: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(returnMap);
		}

//		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/getProperty", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getProperty(@RequestBody PropertiesDTO propertiesDto,
			BindingResult result) {

		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertiesDTO.class.getName());
		rentalValidator.getCompleteProperty(propertiesDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		PropertiesDTO propertiesDTO = rentalService.getCompleteProperty(propertiesDto);
		if (propertiesDTO == null) {
			throw new ResourceNotFoundException("Property details not found for id: " + propertiesDto.getId());
		}

		Long propertyId = propertiesDTO.getId();
		List<PropertyGroup> propertyGroupDtls = propertyGroupRepository.findAllByPropertyId(propertyId);
		PropertyGroup propertyGroupDtl = propertyGroupDtls != null && !propertyGroupDtls.isEmpty()
				? propertyGroupDtls.get(0)
				: null;

		if (propertyGroupDtl != null) {
			long groupId = propertyGroupDtl.getGroupId();
			List<PropertyGroup> propertyGroups = propertyGroupRepository.findByGroupId(groupId);

			List<IncludedGroupPropertyDTO> includedGroupPropertyList = new ArrayList<>();

			Long minRent = 0L, maxRent = 0L;

			for (PropertyGroup propertyGroup : propertyGroups) {
				long propertyId2 = propertyGroup.getPropertyId();
				Optional<Properties> propertiesOptional = propertiesRepository.findById(propertyId2);
				if (!propertiesOptional.isPresent()) {
					continue;
				}
				Properties properties = propertiesOptional.get();
				IncludedGroupPropertyDTO addGroupProperty = includedGroupPropertyDao.addGroupProperty(properties);
				if (addGroupProperty == null) {
					continue;
				}

				if (propertyId.equals(addGroupProperty.getPropertyId())) {
					System.out.println("Same Property ");

				} else {
					includedGroupPropertyList.add(addGroupProperty);

				}

				Long rent = addGroupProperty.getRent();
				if (rent != null && rent <= minRent) {
					minRent = rent;

					System.out.println("minRent " + minRent);
				}

			}

//			property.setMinRent(String.valueOf(minRent));
//			property.setMaxRent(String.valueOf(maxRent));

			propertiesDTO.setIncludedGroupProperty(includedGroupPropertyList);
			propertiesDTO.setMaskedUserWhatsappNumber(frontMaskMobileNumber(propertiesDTO.getUserWhatsappNumber()));

		}
		
		PropertySearchDto propertySearchDto = new PropertySearchDto();
		propertySearchDto.setPincode(propertiesDTO.getPincode());
		propertySearchDto.setVastuFacing(
				propertiesDTO.getPropertyAreaDetails() != null ? propertiesDTO.getPropertyAreaDetails().getFacing() : null);
		propertySearchDto.setPropertyType(propertiesDTO.getPropertyType());
		List<PropertySearchDto> response = rentalService.getRelatedProperties(propertySearchDto);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("Properties", propertiesDTO);
		returnMap.put("relatedProperties", response);

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	private String frontMaskMobileNumber(String mobileNumber) {
	    if (mobileNumber != null && mobileNumber.length() >= 5) {
	        return "*****" + mobileNumber.substring(5);
	    }
	    return mobileNumber; // Return as-is if the number is null or shorter than 5 digits
	}

	@RequestMapping(path = "/updateProperty", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateProperty(@RequestBody PropertiesDTO propertiesDto,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertiesDTO.class.getName());
		rentalValidator.updateProperty(propertiesDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateProperty(propertiesDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateTenantStatus", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateTenantStatus(
			@RequestBody TenantStatusDTO tenantStatusDto, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, TenantStatusDTO.class.getName());
		rentalValidator.updateTenantStatus(tenantStatusDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateTenantStatus(tenantStatusDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateReraStatus", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateReraStatus(@RequestBody ReraStatusDTO reraStatussDto,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, ReraStatusDTO.class.getName());
		rentalValidator.updateReraStatus(reraStatussDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateReraStatus(reraStatussDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePropertyStatus", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePackage(@RequestBody PropertyStatusDTO propertyStatusDto,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertyStatusDTO.class.getName());
		rentalValidator.updatePropertyStatus(propertyStatusDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePropertyStatus(propertyStatusDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePropertyMedia", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePackage(@RequestBody PropertyMediaDTO propertyMediaDto,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertyMediaDTO.class.getName());
		rentalValidator.updatePropertyMedia(propertyMediaDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePropertyMedia(propertyMediaDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateAdditionalDetails", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateAdditionalDetails(
			@RequestBody AdditionalDetailsDTO additionalDetailsDTO, BindingResult result) {

		Map<String, String> map = new HashMap<String, String>();

		MapBindingResult err = new MapBindingResult(map, AdditionalDetailsDTO.class.getName());

		rentalValidator.updateAdditionalDetails(additionalDetailsDTO, err);

		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateAdditionalDetails(additionalDetailsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/updateDefineProperty", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateDefineProperty(
			@RequestBody DefinePropertyDTO definePropertyDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, DefinePropertyDTO.class.getName());
		rentalValidator.updateDefineProperty(definePropertyDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateDefineProperty(definePropertyDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateFurnishingStatus", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateFurnishingStatus(
			@RequestBody FurnishingStatusDTO furnishingStatusDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, DefinePropertyDTO.class.getName());
		rentalValidator.updateFurnishingStatus(furnishingStatusDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateFurnishingStatus(furnishingStatusDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateLandMark", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateLandMark(@RequestBody LandMarkDTO landMarkDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, LandMarkDTO.class.getName());
		rentalValidator.updateLandMark(landMarkDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateLandMark(landMarkDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePgDetails", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePgDetails(@RequestBody PgDetailsDTO pgDetailsDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PgDetailsDTO.class.getName());
		rentalValidator.updatePgDteails(pgDetailsDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePgDetails(pgDetailsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePgOwnerDetails", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePgOwnerDetails(
			@RequestBody PgOwnerDetailsDTO pgOwnerDetailsDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PgOwnerDetailsDTO.class.getName());
		rentalValidator.updatePgOwnerDetails(pgOwnerDetailsDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePgOwnerDetails(pgOwnerDetailsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePgRegulations", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePgRegulations(
			@RequestBody PgRegulationsDTO pgRegulationsDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PgRegulationsDTO.class.getName());
		rentalValidator.updatePgRegulations(pgRegulationsDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePgRegulations(pgRegulationsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePricingDetails", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePricingDetails(
			@RequestBody PricingDetailsDTO pricingDetailsDTO, BindingResult result) {

		Map<String, String> map = new HashMap<String, String>();

		MapBindingResult err = new MapBindingResult(map, PricingDetailsDTO.class.getName());

		rentalValidator.updatePricingDetails(pricingDetailsDTO, err);

		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePricingDetails(pricingDetailsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePropertyAreaDetails", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePropertyAreaDetails(
			@RequestBody PropertyAreaDetailsDTO propertyAreaDetailsDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PricingDetailsDTO.class.getName());
		rentalValidator.updatePropertyAreaDetails(propertyAreaDetailsDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePropertyAreaDetails(propertyAreaDetailsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateAmenities", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateAmenities(@RequestBody AmenitiesDTO amenitiesDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, AmenitiesDTO.class.getName());
		rentalValidator.updateAmenities(amenitiesDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updateAmenities(amenitiesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePropertyFloorRooms", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePropertyFloorRooms(
			@RequestBody PropertyFloorRoomsDTO propertyFloorRoomsDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertyFloorRoomsDTO.class.getName());
		rentalValidator.updatePropertyFloorRooms(propertyFloorRoomsDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePropertyFloorRooms(propertyFloorRoomsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePgRoomDetails", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePgRoomDetails(
			@RequestBody PgRoomDetailsDTO pgRoomDetailsDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PgRoomDetailsDTO.class.getName());
		rentalValidator.updatePgRoomDetails(pgRoomDetailsDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		rentalService.updatePgRoomDetails(pgRoomDetailsDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}


	@RequestMapping(path = "/allActiveProperties", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> allActiveProperties(@RequestBody PropertiesDTO propertiesDTO,
			BindingResult result) {

		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertiesDTO.class.getName());
		rentalValidator.allActiveProperties(propertiesDTO, err);

		returnMap = new LinkedHashMap<String, Object>();
		List<Object> allDetails = new ArrayList();

		try {

			List<Properties> properties = rentalService.myPropertyList(propertiesDTO);

			for (Properties property : properties) {

				HashMap<String, Object> propertyDtl = new HashMap<String, Object>();

				Long propertyId = property.getId();
//				Long userPackageId = property.getUserPackageId();

//				UserPackages userPackage = userPackagesRepository.findById(userPackageId).get();
//				Long userId = userPackage.getUserId();

				String username = "";
				String userRole = "";
				if (property.getCreatedBy() != null) {
					Optional<User> userOptional = userRepository.findById(property.getCreatedBy());
					if (userOptional.isPresent()) {
						username = userOptional.get().getFullName();
					}
					UserRole userRoleByUserId = userRoleRepository.getUserRoleByUserId(property.getCreatedBy());
					if (userRoleByUserId != null) {
						userRole = userRoleByUserId.getRole();
					}
				}

				PricingDetails priceDetails = pricingDetailsRepository.getPricingDetailsByPropertyId(propertyId);
				PropertyAreaDetails propertyAreaDetails = propertyAreaDetailsRepository
						.getAreaDetailsByPropertyId(propertyId);
				FurnishingStatus furnishingStatusDtl = furnishingStatusRepository
						.getFurnishingStatusByPropertyId(propertyId);

				List<PropertyImageGallery> propertyImageGalleryDtl = propertyImageGalleryRepository
						.getPropertyImageGalleryByPropertyId(propertyId);
				if (propertyImageGalleryDtl == null) {
					propertyImageGalleryDtl = new ArrayList<>();
				}

				PropertyStatus propertyStatusDtl = propertyStatusRepository.getPropertyStatusByPropertyId(propertyId);

				List<Map<String, String>> imgDetails = new ArrayList<>();

				String imagePath = null;
				for (PropertyImageGallery propertyImageGallery : propertyImageGalleryDtl) {

					HashMap<String, String> imageDetails = new HashMap<String, String>();

					imagePath = propertyImageGallery.getImagePath();
					String imageType = propertyImageGallery.getImageType();
					String status = propertyImageGallery.getStatus();

					imageDetails.put("imagePath", imagePath);
					imageDetails.put("imageType", imageType);
					imageDetails.put("status", status);

					imgDetails.add(imageDetails);

				}

				String propertyId2 = String.valueOf(propertyId);
				String propertyType = property.getPropertyType();
				String listingType = property.getListingType();
				String locality = property.getLocality();
				String propertyAddress = property.getPropertyAddress();
				String city = property.getCity();
				String state = property.getState();
				String country = property.getCountry();
				String propertyName = property.getPropertyName();
				String createdDate = property.getCreatedDate();
				String buildingType = property.getBuildingType();

				Long rent = priceDetails != null && priceDetails.getRent() != null ? priceDetails.getRent() : 0L;
				String rent2 = String.valueOf(rent);
				String areaUnit = propertyAreaDetails != null ? propertyAreaDetails.getAreaUnit() : "";
				String builtupPlotArea = propertyAreaDetails != null ? propertyAreaDetails.getBuiltupPlotArea() : "";
				String carpetArea = propertyAreaDetails != null ? propertyAreaDetails.getCarpetArea() : "";
				String superBuiltupArea = propertyAreaDetails != null ? propertyAreaDetails.getSuperBuiltupArea() : "";
				String salebleArea = propertyAreaDetails != null ? propertyAreaDetails.getSalableArea() : "";

				String numOfBedrooms = propertyAreaDetails != null ? propertyAreaDetails.getNoOfBedrooms() : "";
				String furnishingType = furnishingStatusDtl != null ? furnishingStatusDtl.getFurnishingType() : "";

				String positionStatus = propertyStatusDtl != null ? propertyStatusDtl.getPositionStatus() : "";
				
				String title = PropertyUtility.constructTitle(furnishingType, numOfBedrooms, propertyType, listingType, locality, city);

				propertyDtl.put("propertyId", propertyId2);
				propertyDtl.put("propertyType", propertyType);
				propertyDtl.put("buildingType", buildingType);
				propertyDtl.put("listingType", listingType);
				propertyDtl.put("locality", locality);
				propertyDtl.put("city", city);
				propertyDtl.put("state", state);
				propertyDtl.put("country", country);
				propertyDtl.put("propertyAddress", propertyAddress);
				propertyDtl.put("isExclusiveProperty", property.isExclusiveProperty());
				propertyDtl.put("propertyName", propertyName);
				propertyDtl.put("imageData", imgDetails);
				propertyDtl.put("rent", rent2);
				propertyDtl.put("areaUnit", areaUnit);
				propertyDtl.put("builtupPlotArea", builtupPlotArea);
				propertyDtl.put("carpetArea", carpetArea);
				propertyDtl.put("superBuiltupArea", superBuiltupArea);
				propertyDtl.put("salebleArea", salebleArea);
				propertyDtl.put("title", title);
				propertyDtl.put("furnishingType", furnishingType);
				propertyDtl.put("postDate", createdDate);
				propertyDtl.put("positionStatus", positionStatus);
				propertyDtl.put("username", username);
				propertyDtl.put("userRole", userRole);
				propertyDtl.put("numOfBedrooms", numOfBedrooms);

				allDetails.add(propertyDtl);

			}

			returnMap.put("propertyDtl", allDetails);
			returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
			returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);

		} catch (Exception e) {
			e.printStackTrace();
			returnMap.put(Constant.RESPONSE_CODE_KEY, "");
			returnMap.put(Constant.RESPONSE_MSG_KEY, "Error occurred while fetching property details");
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/propertyListInDashboard", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> propertyListInDashboard(
	        @RequestBody PropertiesDTO propertiesDTO,
	        HttpServletRequest request,
	        BindingResult result) {
	    
	    System.out.println("Received request for propertyListInDashboard with propertiesDTO: " + propertiesDTO);
	    
	    HashMap<String, String> map = new HashMap<>();
	    MapBindingResult err = new MapBindingResult(map, PropertiesDTO.class.getName());
	    rentalValidator.propertyListInDashboard(propertiesDTO, err);
	    List<ObjectError> list = err.getAllErrors();
	    
	    if (!list.isEmpty()) {
	        System.err.println("Validation errors: " + list);
	        throw new FieldException(list);
	    }
	    
	    LinkedHashMap<String, Object> returnMap = new LinkedHashMap<>();
	    
	    try {
	        List<Object> allDetails = rentalService.propertyListInDashboard(propertiesDTO);
	        returnMap.put("dashboardProperties", allDetails);
	        returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
	        returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
	    } catch (Exception e) {
	        System.err.println("Error in propertyListInDashboard controller method");
	        e.printStackTrace();
	        returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SERVER_ERROR);
	        returnMap.put(Constant.RESPONSE_MSG_KEY, e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(returnMap);
	    }

	    return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/changePropertyStatusByAdmin", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> changePropertyStatusByAdmin(
			@RequestBody PropertiesDTO propertiesDto,
			HttpServletRequest request,
			BindingResult result) {
		
		try {
		
		rentalService.changePropertyStatusByAdmin(propertiesDto);
		
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			returnMap.put(Constant.RESPONSE_CODE_KEY, "");
			returnMap.put(Constant.RESPONSE_MSG_KEY, "Error occurred while fetching property details");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getPropertiesByFilter", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<PropertyResponse> getPropertiesByFilter(@RequestBody PropertySearchDto propertySearchDto,
	        HttpServletRequest request, BindingResult result) throws Exception {

	    PropertyResponse response = rentalService.getPropertiesByFilter(propertySearchDto);
	    
	    
	    
//	    PropertyResponse response = new PropertyResponse();
//		PropertyResponse activeResponse = rentalService.getPropertiesByFilter(propertySearchDto);
//		PropertyResponse completeResponse = rentalService.getCompletedPropertiesByFilter(propertySearchDto);
//		
//	    
//		 PropertyResponse response = new PropertyResponse();
//		 response.getProperties().addAll(activeResponse.getProperties());
//		 response.getProperties().addAll(completeResponse.getProperties());
//			System.out.println("R2 response "+ response);

	    
	    
	    try {
	        List<PropertySearchDto> propertiesByFilters = response.getProperties();
	        
	        for (PropertySearchDto property : propertiesByFilters) {
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

	        response.setResponseCode("200");
	        response.setResponseMessage("Successful");
	        return ResponseEntity.status(HttpStatus.OK).body(response);
	    } catch (Exception e) {
	        e.printStackTrace();
	        response.setResponseCode("500");
	        response.setResponseMessage("Internal Server Error: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

	@RequestMapping(path = "/addInPropertyGroup", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addInPropertyGroup(
			@RequestBody PropertyGroupDTO propertyGroupDTO, HttpServletRequest request, BindingResult result) {

		returnMap = new LinkedHashMap<String, Object>();
		try {

			String userIdString = request.getHeader("loginUserId");
			long userId = Long.parseLong(userIdString);

			GroupDetail groupDetail = new GroupDetail();
			String groupName = propertyGroupDTO.getGroupName();
			groupDetail.setGroupName(groupName);
			groupDetail.setStatus(Constant.STATUS_ACTIVE);
			groupDetail.setCreatedBy(userId);
			groupDetail.setCreatedDate(DateUtils.currentDate());
			groupDetail.setUpdatedBy(userId);
			groupDetail.setUpdatedDate(DateUtils.currentDate());
			groupDetail.setUserId(userId);

			List<GroupDetail> groupDetails = groupDetailRepository.findByGroupName(groupName);

			if (groupDetails.size() > 0) {
				returnMap.put(Constant.RESPONSE_MSG_KEY, "This group name is not available");

			} else {
				groupDetailRepository.save(groupDetail);

			}

			Long groupId = null;
			List<GroupDetail> groupDetails2 = groupDetailRepository.findByGroupName(groupName);
			for (GroupDetail groupDtl : groupDetails2) {

				groupId = groupDtl.getId();
			}

			List<Long> propertyIdLists = propertyGroupDTO.getPropertyIdList();

			for (Long propertyIdList : propertyIdLists) {
				PropertyGroup propertyGroup = new PropertyGroup();
				propertyGroup.setPropertyId(propertyIdList);
				propertyGroup.setUserId(userId);
				propertyGroup.setCreatedBy(userId);
				propertyGroup.setUpdatedBy(userId);
				propertyGroup.setCreatedDate(DateUtils.currentDate());
				propertyGroup.setUpdatedDate(DateUtils.currentDate());
				propertyGroup.setGroupId(groupId);
				propertyGroup.setStatus(Constant.STATUS_ACTIVE);
				propertyGroup.setGroupName(groupName);

				propertyGroupRepository.save(propertyGroup);

			}

//			returnMap.put("propertyDtl", allDetails);
			returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
			returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);

		} catch (Exception e) {
			e.printStackTrace();
			returnMap.put(Constant.RESPONSE_CODE_KEY, "");
			returnMap.put(Constant.RESPONSE_MSG_KEY, "Error occurred while fetching property details");
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/getPropertyByGroupWise", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getPropertyByGroupWise(
			@RequestBody PropertyGroupDTO propertyGroupDTO, HttpServletRequest request, BindingResult result) {

		returnMap = new LinkedHashMap<String, Object>();
		try {

			String userIdString = request.getHeader("loginUserId");
			long userId = Long.parseLong(userIdString);

			List<UserRole> findByUserIds = userRoleRepository.findByUserId(userId);

			String role = "";
			for (UserRole findByUserId : findByUserIds) {
				role = findByUserId.getRole();
			}

			List<PropertyGroupDTO> propertyGroups = new ArrayList<>();
			if (role.equalsIgnoreCase("Admin")) {

				propertyGroups = rentalService.getPropertyGroupWiseForAdmin();
			} else {

				propertyGroups = rentalService.getPropertyGroupWiseForUser(userId);

			}

			returnMap.put("propertyGroups", propertyGroups);
			returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
			returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);

		} catch (Exception e) {
			e.printStackTrace();
			returnMap.put(Constant.RESPONSE_CODE_KEY, "");
			returnMap.put(Constant.RESPONSE_MSG_KEY, "Error occurred while fetching property details");
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/searchProperties", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> searchProperties(
			@RequestBody PropertySearchDto propertySearchDTO, BindingResult result, HttpServletRequest request
			){
		
		returnMap = new LinkedHashMap<String, Object>();
		List<Object> allDetails = new ArrayList();
		
		PropertyResponse properties = rentalService.myPropertyListBySearch(propertySearchDTO);
		
		for (PropertySearchDto property : properties.getProperties()) {

			Long propertyId = property.getPropertyId();
			HashMap<String, Object> propertyDtl = new HashMap<String, Object>();

			PricingDetails priceDetails = pricingDetailsRepository.getPricingDetailsByPropertyId(propertyId);
			
			PropertyAreaDetails propertyAreaDetails = propertyAreaDetailsRepository
					.getAreaDetailsByPropertyId(propertyId);
			
			FurnishingStatus furnishingStatusDtl = furnishingStatusRepository
					.getFurnishingStatusByPropertyId(propertyId);

			List<PropertyImageGallery> propertyImageGalleryDtl = propertyImageGalleryRepository
					.getPropertyImageGalleryByPropertyId(propertyId);

			PropertyStatus propertyStatusDtl = propertyStatusRepository.getPropertyStatusByPropertyId(propertyId);

			List<Map<String, String>> imgDetails = new ArrayList<>();

			String imagePath = null;
			for (PropertyImageGallery propertyImageGallery : propertyImageGalleryDtl) {

				HashMap<String, String> imageDetails = new HashMap<String, String>();

				imagePath = propertyImageGallery.getImagePath();
				String imageType = propertyImageGallery.getImageType();
				String status = propertyImageGallery.getStatus();

				imageDetails.put("imagePath", imagePath);
				imageDetails.put("imageType", imageType);
				imageDetails.put("status", status);

				imgDetails.add(imageDetails);

			}

			String propertyId2 = String.valueOf(propertyId);
			String propertyType = property.getPropertyType();
			String listingType = property.getListingType();
			String locality = property.getLocality();
			String propertyAddress = property.getPropertyAddress();
			String city = property.getCity();
			String state = property.getState();
			String country = property.getCountry();
			String propertyName = property.getPropertyName();
			String createdDate = property.getCreatedDate();
			String buildingType = property.getBuildingType();

			Long rent = priceDetails != null && priceDetails.getRent() != null ? priceDetails.getRent() : 0L;
			String rent2 = String.valueOf(rent);
			String areaUnit = propertyAreaDetails != null ? propertyAreaDetails.getAreaUnit() : "";
			String builtupPlotArea = propertyAreaDetails != null ? propertyAreaDetails.getBuiltupPlotArea() : "";
			String numOfBedrooms = propertyAreaDetails != null ? propertyAreaDetails.getNoOfBedrooms() : "";
			String furnishingType = furnishingStatusDtl != null ? furnishingStatusDtl.getFurnishingType() : "";
			String positionStatus = propertyStatusDtl != null ? propertyStatusDtl.getPositionStatus() : "";

			propertyDtl.put("propertyId", propertyId2);
			propertyDtl.put("propertyType", propertyType);
			propertyDtl.put("buildingType", buildingType);
			propertyDtl.put("listingType", listingType);
			propertyDtl.put("locality", locality);
			propertyDtl.put("city", city);
			propertyDtl.put("state", state);
			propertyDtl.put("country", country);
			propertyDtl.put("propertyAddress", propertyAddress);
			propertyDtl.put("propertyName", propertyName);
			propertyDtl.put("rent", rent2);
			propertyDtl.put("areaUnit", areaUnit);
			propertyDtl.put("builtupPlotArea", builtupPlotArea);
			propertyDtl.put("furnishingType", furnishingType);
			propertyDtl.put("postDate", createdDate);
			propertyDtl.put("positionStatus", positionStatus);
			propertyDtl.put("numOfBedrooms", numOfBedrooms);
			propertyDtl.put("imageData", imgDetails);

			allDetails.add(propertyDtl);

		}

		returnMap.put("searchByProperties", allDetails);
		
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/verifyPropertyAddress", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> verifyPropertyAddress (
			@RequestBody CountryPincodeMappingDTO countryPincodeMappingDTO,
			HttpServletRequest request,
			BindingResult result
			){
			
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, CountryPincodeMappingDTO.class.getName());
		rentalValidator.verifyPropertyAddress(countryPincodeMappingDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);
		
		rentalService.verifyPropertyAddress(countryPincodeMappingDTO);
		
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/exclusiveProperty", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> exclusiveProperty (
		@RequestBody PropertiesDTO propertiesDto, BindingResult result, HttpServletRequest request
	){
		
//		System.out.println("Received DTO: " + propertiesDto.isExclusiveProperty());
//	    PropertiesDTO testDto = new PropertiesDTO();
//	    testDto.setExclusiveProperty(true);
//	    System.out.println("Test DTO: " + testDto.isExclusiveProperty());
		
		System.out.println("f " + propertiesDto.isExclusiveProperty());
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, CountryPincodeMappingDTO.class.getName());
		rentalValidator.makeExclusiveProperty(propertiesDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);
	try {
			
		rentalService.exclusiveProperty(propertiesDto);
		
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
		
		}catch (ResourceNotFoundException e) {
            returnMap.put("responseCode", Constant.NOT_FOUND);
            returnMap.put("responseMessage", "Not Found Property Your Given Id");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(returnMap);
        }catch (UnAuthorizedException e) {
            returnMap.put("responseCode", HttpStatus.UNAUTHORIZED);
            returnMap.put("responseMessage", "Unauthorized to change property details");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(returnMap);
        } catch (Exception e) {
			e.printStackTrace();
	        returnMap.put("responseCode", "500");
	        returnMap.put("responseMessage", "Error occurred while updating property exclusive status");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(returnMap);
		}

	}
	
	@RequestMapping(path = "/getAllExclusiveProperties", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getAllExclusiveProperties(
	        @RequestBody PropertiesDTO propertiesDTO,
	        HttpServletRequest request,
	        BindingResult result
        ) {
	    
	    LinkedHashMap<String, Object> returnMap = new LinkedHashMap<>();
	    
	    try {
	        List<Object> allDetails = rentalService.getAllExclusiveProperties(propertiesDTO);
	        returnMap.put("exclusiveProperties", allDetails);
	        returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
	        returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
	        return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	    } catch (Exception e) {
	        e.printStackTrace();
	        returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SERVER_ERROR);
	        returnMap.put(Constant.RESPONSE_MSG_KEY, e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(returnMap);
	    }

	}
	
	@RequestMapping(path = "/assignOwnerToProperty", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> assignOwnerToProperty(
	        @RequestBody PropertiesDTO propertiesDTO,
	        HttpServletRequest request,
	        BindingResult result
        ) {
		
		try {
	        // Step 1: Validate the request
	        Map<String, String> map = new HashMap<>();
	        MapBindingResult err = new MapBindingResult(map, PropertiesDTO.class.getName());
	        rentalValidator.assignOwnerToProperty(propertiesDTO, err);
	        if (err.hasErrors()) {
	            throw new FieldException(err.getAllErrors());
	        }

	        // Step 2: Assign owner to property
	        rentalService.assignOwnerToProperty(propertiesDTO);

	        // Step 3: Return success response
	        returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
	        returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
	        return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	    } catch (UnAuthorizedException | ResourceNotFoundException | FieldException e) {
	        // These exceptions are handled by the global exception handler
	        throw e;
	    } catch (Exception e) {
	        // Handle unexpected exceptions
	        returnMap.put(Constant.RESPONSE_CODE_KEY, "500");
	        returnMap.put(Constant.RESPONSE_MSG_KEY, "An internal server error occurred.");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(returnMap);
	    }

	}
	
	@RequestMapping(path = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE, method = RequestMethod.POST)
	public ResponseEntity<String> sitemap() {
		try {
		StringBuilder sitemap = new StringBuilder();
        sitemap.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        sitemap.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        
     // Add static pages (main domain)
        sitemap.append(createUrlElement("https://getmyhousing.com/about-us", "2023-10-01", "weekly", "1.0"));
        sitemap.append(createUrlElement("https://getmyhousing.com/contact-us", "2023-10-01", "weekly", "1.0"));
        sitemap.append(createUrlElement("https://getmyhousing.com/privacy-policy", "2023-10-01", "monthly", "0.8"));
        
     // Add dynamic pages (main domain)
    	List<Properties> properties = rentalService.getSiteMapProperties();
    	
    	if (properties != null && !properties.isEmpty()) {
            for (Properties property : properties) {
                String propertyUrl = "https://getmyhousing.com/property/" + property.getId();
                sitemap.append(createUrlElement(propertyUrl, property.getUpdatedDate().toString(), "daily", "0.9"));
            }
        } else {
            logger.warn("No properties found for sitemap generation.");
        }

    	sitemap.append("</urlset>");
        return ResponseEntity.ok(sitemap.toString());
	    } catch (Exception e) {
	        logger.error("Error generating sitemap: ", e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating sitemap.");
	    }
	}
	
	private String createUrlElement(String loc, String lastmod, String changefreq, String priority) {
        return "<url>\n" +
               "  <loc>" + loc + "</loc>\n" +
               "  <lastmod>" + lastmod + "</lastmod>\n" +
               "  <changefreq>" + changefreq + "</changefreq>\n" +
               "  <priority>" + priority + "</priority>\n" +
               "</url>\n";
    }
	
	@Bean
	public RentalValidator getRentalValidator() {
		return new RentalValidator();
	}

}
