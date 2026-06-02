package com.getmyhousing.rental.validator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.AdditionalDetailsDTO;
import com.getmyhousing.common.dto.AmenitiesDTO;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.dto.DefinePropertyDTO;
import com.getmyhousing.common.dto.FurnishingStatusDTO;
import com.getmyhousing.common.dto.LandMarkDTO;
import com.getmyhousing.common.dto.PgDetailsDTO;
import com.getmyhousing.common.dto.PgOwnerDetailsDTO;
import com.getmyhousing.common.dto.PgRegulationsDTO;
import com.getmyhousing.common.dto.PgRoomDetailsDTO;
import com.getmyhousing.common.dto.PricingDetailsDTO;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.PropertyAreaDetailsDTO;
import com.getmyhousing.common.dto.PropertyFloorRoomsDTO;
import com.getmyhousing.common.dto.PropertyImageGalleryDTO;
import com.getmyhousing.common.dto.PropertyMediaDTO;
import com.getmyhousing.common.dto.PropertyStatusDTO;
import com.getmyhousing.common.dto.ReraStatusDTO;
import com.getmyhousing.common.dto.TenantStatusDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;

public class RentalValidator implements Validator {

	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;

	private static final List<String> VALID_STATUS_LIST = Arrays.asList(Constant.STATUS_APPROVED,
			Constant.STATUS_REJECTED, Constant.STATUS_PENDING);
	private static final List<String> VALID_IMAGE_TYPE_LIST = Arrays.asList(Constant.FEATURED_FLAG,
			Constant.GALLERY_FLAG);

	private static final List<String> VALID_IMAGE_LIST = Arrays.asList(Constant.STATUS_ACTIVE,
			Constant.STATUS_DELETED);

	@Autowired
	UserUtils userUtils;

	@Override
	public boolean supports(Class<?> arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate(Object arg0, Errors arg1) {
		// TODO Auto-generated method stub

	}

	public void saveProperty(PropertiesDTO propertiesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertiesDTO.getPropertyType()))
			errors.rejectValue("propertyType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getPropertyName()))
			errors.rejectValue("propertyName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getListingType()))
			errors.rejectValue("listingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getBuildingType()))
			errors.rejectValue("buildingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getZone()))
			errors.rejectValue("zone", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getCountry()))
			errors.rejectValue("country", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getState()))
			errors.rejectValue("state", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getLandmark()))
			errors.rejectValue("landmark", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getLatitude()))
			errors.rejectValue("latitude", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getLongitude()))
			errors.rejectValue("logitude", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getLocality()))
			errors.rejectValue("locality", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getCity()))
			errors.rejectValue("city", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getPincode()))
			errors.rejectValue("pincode", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getPropertyAddress()))
			errors.rejectValue("propertyAddress", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertiesDTO.getUserPackageId()))
			errors.rejectValue("userPackageId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getYoutubeLink() && CustomValidator.isEmpty(propertiesDTO.getYoutubeLink()))
			errors.rejectValue("youtubeLink", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getVideoLink() && CustomValidator.isEmpty(propertiesDTO.getVideoLink()))
			errors.rejectValue("videoLink", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getPropertyAreaDetails()) {
			PropertyAreaDetailsDTO areaDetailsDTO = propertiesDTO.getPropertyAreaDetails();

			areaDetailsDTO.setStatus(Constant.STATUS_ACTIVE);
			areaDetailsDTO.setCreatedDate(createdDate);
			areaDetailsDTO.setCreatedBy(userId);
			areaDetailsDTO.setUpdatedDate(createdDate);
			areaDetailsDTO.setUpdatedBy(userId);
		}

		if (null != propertiesDTO.getTenantStatus()) {
			TenantStatusDTO tenantDTO = propertiesDTO.getTenantStatus();

			tenantDTO.setStatus(Constant.STATUS_ACTIVE);
			tenantDTO.setCreatedDate(createdDate);
			tenantDTO.setCreatedBy(userId);
			tenantDTO.setUpdatedDate(createdDate);
			tenantDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getPropertyStatus()) {
			PropertyStatusDTO propertystatusDTO = propertiesDTO.getPropertyStatus();

			propertystatusDTO.setStatus(Constant.STATUS_ACTIVE);
			propertystatusDTO.setCreatedDate(createdDate);
			propertystatusDTO.setCreatedBy(userId);
			propertystatusDTO.setUpdatedDate(createdDate);
			propertystatusDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getPricingDetails()) {
			PricingDetailsDTO pricingDetailsDTO = propertiesDTO.getPricingDetails();

			pricingDetailsDTO.setStatus(Constant.STATUS_ACTIVE);
			pricingDetailsDTO.setCreatedDate(createdDate);
			pricingDetailsDTO.setCreatedBy(userId);
			pricingDetailsDTO.setUpdatedDate(createdDate);
			pricingDetailsDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getReraStatus()) {
			ReraStatusDTO reraStatusDTO = propertiesDTO.getReraStatus();

			reraStatusDTO.setStatus(Constant.STATUS_ACTIVE);
			reraStatusDTO.setCreatedDate(createdDate);
			reraStatusDTO.setCreatedBy(userId);
			reraStatusDTO.setUpdatedDate(createdDate);
			reraStatusDTO.setUpdatedBy(userId);

		}
		if (null != propertiesDTO.getAdditionalDetails()) {
			AdditionalDetailsDTO additionalDetailsDTO = propertiesDTO.getAdditionalDetails();

			additionalDetailsDTO.setStatus(Constant.STATUS_ACTIVE);
			additionalDetailsDTO.setCreatedDate(createdDate);
			additionalDetailsDTO.setCreatedBy(userId);
			additionalDetailsDTO.setUpdatedDate(createdDate);
			additionalDetailsDTO.setUpdatedBy(userId);

		}
		if (!CustomValidator.isEmpty(propertiesDTO.getLandMarks())) {
			LandMarkDTO landMarkDTO = propertiesDTO.getLandMarks();

			landMarkDTO.setStatus(Constant.STATUS_ACTIVE);
			landMarkDTO.setCreatedDate(createdDate);
			landMarkDTO.setCreatedBy(userId);
			landMarkDTO.setUpdatedDate(createdDate);
			landMarkDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getDefineProperty()) {
			DefinePropertyDTO definePropertyDTO = propertiesDTO.getDefineProperty();

			definePropertyDTO.setStatus(Constant.STATUS_ACTIVE);
			definePropertyDTO.setCreatedDate(createdDate);
			definePropertyDTO.setCreatedBy(userId);
			definePropertyDTO.setUpdatedDate(createdDate);
			definePropertyDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getFurnishingStatus()) {
			FurnishingStatusDTO furnishingStatusDTO = propertiesDTO.getFurnishingStatus();

			furnishingStatusDTO.setStatus(Constant.STATUS_ACTIVE);
			furnishingStatusDTO.setCreatedDate(createdDate);
			furnishingStatusDTO.setCreatedBy(userId);
			furnishingStatusDTO.setUpdatedDate(createdDate);
			furnishingStatusDTO.setUpdatedBy(userId);
		}
//		if (!CustomValidator.isEmpty(propertiesDTO.getAmenities()) && propertiesDTO.getAmenities().size() > 0) {
//			List<AmenitiesDTO> amenitiesList = new ArrayList<>();
//			Set<String> uniqueAmenities = new HashSet<>();
//			boolean daysRepeatedFlag = propertiesDTO.getAmenities().stream().anyMatch(str -> !uniqueAmenities.add(str));
//			if (daysRepeatedFlag)
//				errors.rejectValue("amenities", BAD_REQUEST_ERROR_CD, "cannot allowing repeated dayNames.");
//
//			for (String amenities : propertiesDTO.getAmenities()) {
//				if (CustomValidator.isEmpty(amenities)) {
//					errors.rejectValue("amenities", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
//				} else {
//					AmenitiesDTO amenitiesDTO = new AmenitiesDTO();
//					amenitiesDTO.setAmenities(amenities);
//					amenitiesDTO.setStatus(Constant.STATUS_ACTIVE);
//					amenitiesDTO.setCreatedDate(createdDate);
//					amenitiesDTO.setCreatedBy(userId);
//					amenitiesDTO.setUpdatedDate(createdDate);
//					amenitiesDTO.setUpdatedBy(userId);
//					amenitiesList.add(amenitiesDTO);
//				}
//			}
//			propertiesDTO.setAmenitiesList(amenitiesList);
//		}
		if (null != propertiesDTO.getPgDetails()) {
			PgDetailsDTO pgDetailsDTO = propertiesDTO.getPgDetails();

			pgDetailsDTO.setStatus(Constant.STATUS_ACTIVE);
			pgDetailsDTO.setCreatedDate(createdDate);
			pgDetailsDTO.setCreatedBy(userId);
			pgDetailsDTO.setUpdatedDate(createdDate);
			pgDetailsDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getPgRoomDetails()) {
			PgRoomDetailsDTO pgRoomDetailsDTO = propertiesDTO.getPgRoomDetails();

			pgRoomDetailsDTO.setStatus(Constant.STATUS_ACTIVE);
			pgRoomDetailsDTO.setCreatedDate(createdDate);
			pgRoomDetailsDTO.setCreatedBy(userId);
			pgRoomDetailsDTO.setUpdatedDate(createdDate);
			pgRoomDetailsDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getPgRegulations()) {
			PgRegulationsDTO pgRegulationsDTO = propertiesDTO.getPgRegulations();

			pgRegulationsDTO.setStatus(Constant.STATUS_ACTIVE);
			pgRegulationsDTO.setCreatedDate(createdDate);
			pgRegulationsDTO.setCreatedBy(userId);
			pgRegulationsDTO.setUpdatedDate(createdDate);
			pgRegulationsDTO.setUpdatedBy(userId);
		}
		if (null != propertiesDTO.getPgOwnerDetails()) {
			PgOwnerDetailsDTO pgOwnerDetailsDTO = propertiesDTO.getPgOwnerDetails();

			pgOwnerDetailsDTO.setStatus(Constant.STATUS_ACTIVE);
			pgOwnerDetailsDTO.setCreatedDate(createdDate);
			pgOwnerDetailsDTO.setCreatedBy(userId);
			pgOwnerDetailsDTO.setUpdatedDate(createdDate);
			pgOwnerDetailsDTO.setUpdatedBy(userId);

		}
		if (null != propertiesDTO.getPropertyFloorRooms() && propertiesDTO.getPropertyFloorRooms().size() > 0) {
			for (PropertyFloorRoomsDTO propFloorDTO : propertiesDTO.getPropertyFloorRooms()) {

				propFloorDTO.setStatus(Constant.STATUS_ACTIVE);
				propFloorDTO.setCreatedDate(createdDate);
				propFloorDTO.setCreatedBy(userId);
				propFloorDTO.setUpdatedDate(createdDate);
				propFloorDTO.setUpdatedBy(userId);

			}
		}

		if (null != propertiesDTO.getPropertyMedia() && propertiesDTO.getPropertyMedia().size() > 0) {
			for (PropertyMediaDTO propertyMediaDTO : propertiesDTO.getPropertyMedia()) {

				propertyMediaDTO.setStatus(Constant.STATUS_ACTIVE);
				propertyMediaDTO.setCreatedDate(createdDate);
				propertyMediaDTO.setCreatedBy(userId);
				propertyMediaDTO.setUpdatedDate(createdDate);
				propertyMediaDTO.setUpdatedBy(userId);

			}
		}
		if (null == propertiesDTO.getPropertyImages() || propertiesDTO.getPropertyImages().size() == 0)
			errors.rejectValue("propertyImages", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		else {
			int primaryImageCounter = 0;
			for (PropertyImageGalleryDTO propertyImageGalleryDTO : propertiesDTO.getPropertyImages()) {

				if (CustomValidator.isEmpty(propertyImageGalleryDTO.getImagePath()))
					errors.rejectValue("imagePath", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
				if (!VALID_IMAGE_TYPE_LIST.contains(propertyImageGalleryDTO.getImageType()))
					errors.rejectValue("imageType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

				if (Constant.FEATURED_FLAG.equals(propertyImageGalleryDTO.getImageType())) {
					primaryImageCounter++;
				}
				if (!(primaryImageCounter == 1)) {
					errors.rejectValue("imageType", BAD_REQUEST_ERROR_CD,
							"featured images are more than one not accept.");
				}

				propertyImageGalleryDTO.setStatus(Constant.STATUS_ACTIVE);
				propertyImageGalleryDTO.setCreatedDate(createdDate);
				propertyImageGalleryDTO.setCreatedBy(userId);
				propertyImageGalleryDTO.setUpdatedDate(createdDate);
				propertyImageGalleryDTO.setUpdatedBy(userId);

			}
		}

		propertiesDTO.setStatus(Constant.STATUS_PENDING_REVIEW);
		propertiesDTO.setApprovalStatus(Constant.STATUS_PENDING_REVIEW);
		propertiesDTO.setCreatedDate(createdDate);
		propertiesDTO.setCreatedBy(userId);
		propertiesDTO.setUpdatedDate(createdDate);
		propertiesDTO.setUpdatedBy(userId);

	}

	public void getCompleteProperty(PropertiesDTO propertiesDto, Errors errors) {
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertiesDto.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		propertiesDto.setUpdatedBy(userId);
		propertiesDto.setUpdatedDate(createDate);

	}

	public void updateProperty(PropertiesDTO propertiesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertiesDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getPropertyType() && CustomValidator.isEmpty(propertiesDTO.getPropertyType()))
			errors.rejectValue("propertyType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getPropertyName() && CustomValidator.isEmpty(propertiesDTO.getPropertyName()))
			errors.rejectValue("propertyName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getListingType() && CustomValidator.isEmpty(propertiesDTO.getListingType()))
			errors.rejectValue("listingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getBuildingType() && CustomValidator.isEmpty(propertiesDTO.getBuildingType()))
			errors.rejectValue("BuildingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getPropertyAddress() && CustomValidator.isEmpty(propertiesDTO.getPropertyAddress()))
			errors.rejectValue("propertyAddress", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getApprovalStatus() && CustomValidator.isEmpty(propertiesDTO.getApprovalStatus()))
			errors.rejectValue("approvalStatus", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getApprovalRemarks() && CustomValidator.isEmpty(propertiesDTO.getApprovalRemarks()))
			errors.rejectValue("approvalRemarks", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getApprovalActionBy() && CustomValidator.isEmpty(propertiesDTO.getApprovalActionBy()))
			errors.rejectValue("approvalActionBy", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getApprovalActionDate()
				&& CustomValidator.isEmpty(propertiesDTO.getApprovalActionDate()))
			errors.rejectValue("approvalActionDate", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getPropertyImages() && propertiesDTO.getPropertyImages().size() > 0)
			for (PropertyImageGalleryDTO imageDTO : propertiesDTO.getPropertyImages()) {

				// New Image Scenerio
				if (null == imageDTO.getId() && CustomValidator.isEmpty(imageDTO.getImagePath()))
					errors.rejectValue("imagePath", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

				if (null == imageDTO.getId() && CustomValidator.isEmpty(imageDTO.getImageType()))
					errors.rejectValue("imageType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

				if (null != imageDTO.getStatus() && (!VALID_IMAGE_LIST.contains(imageDTO.getStatus()))) {
					errors.rejectValue("status", BAD_REQUEST_ERROR_CD,
							"only Deleted status should be provided for deleting the image");
				}

				imageDTO.setPropertyId(propertiesDTO.getId());
				imageDTO.setCreatedBy(userId);
				imageDTO.setCreatedDate(createdDate);
				imageDTO.setUpdatedBy(userId);
				imageDTO.setUpdatedDate(createdDate);

			}

		if (null != propertiesDTO.getYoutubeLink() && CustomValidator.isEmpty(propertiesDTO.getYoutubeLink()))
			errors.rejectValue("youtubeLink", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertiesDTO.getVideoLink() && CustomValidator.isEmpty(propertiesDTO.getVideoLink()))
			errors.rejectValue("videoLink", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		propertiesDTO.setUpdatedDate(createdDate);
		propertiesDTO.setUpdatedBy(userId);

	}

	public void updateTenantStatus(TenantStatusDTO tenantStatusDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(tenantStatusDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		tenantStatusDTO.setUpdatedDate(createdDate);
		tenantStatusDTO.setUpdatedBy(userId);

	}

	public void updateReraStatus(ReraStatusDTO reraStatusDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(reraStatusDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		reraStatusDTO.setUpdatedDate(createdDate);
		reraStatusDTO.setUpdatedBy(userId);

	}

	public void updatePropertyStatus(PropertyStatusDTO propertyStatusDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertyStatusDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		propertyStatusDTO.setUpdatedDate(createdDate);
		propertyStatusDTO.setUpdatedBy(userId);

	}

	public void updatePropertyMedia(PropertyMediaDTO propertyMediaDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertyMediaDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		propertyMediaDTO.setUpdatedDate(createdDate);
		propertyMediaDTO.setUpdatedBy(userId);

	}

	public void updateAdditionalDetails(AdditionalDetailsDTO additionalDetailsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(additionalDetailsDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		additionalDetailsDTO.setUpdatedDate(createdDate);
		additionalDetailsDTO.setUpdatedBy(userId);

	}

	public void updateDefineProperty(DefinePropertyDTO definePropertyDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(definePropertyDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		definePropertyDTO.setUpdatedDate(createdDate);
		definePropertyDTO.setUpdatedBy(userId);

	}

	public void updateFurnishingStatus(FurnishingStatusDTO furnishingStatusDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(furnishingStatusDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		furnishingStatusDTO.setUpdatedDate(createdDate);
		furnishingStatusDTO.setUpdatedBy(userId);

	}

	public void updateLandMark(LandMarkDTO landMarkDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(landMarkDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		landMarkDTO.setUpdatedDate(createdDate);
		landMarkDTO.setUpdatedBy(userId);

	}

	public void updatePgDteails(PgDetailsDTO pgDetailsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(pgDetailsDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		pgDetailsDTO.setUpdatedDate(createdDate);
		pgDetailsDTO.setUpdatedBy(userId);

	}

	public void updatePgOwnerDetails(PgOwnerDetailsDTO pgOwnerDetailsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(pgOwnerDetailsDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		pgOwnerDetailsDTO.setUpdatedDate(createdDate);
		pgOwnerDetailsDTO.setUpdatedBy(userId);

	}

	public void updatePgRegulations(PgRegulationsDTO pgRegulationsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(pgRegulationsDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		pgRegulationsDTO.setUpdatedDate(createdDate);
		pgRegulationsDTO.setUpdatedBy(userId);

	}

	public void updatePricingDetails(PricingDetailsDTO pricingDetailsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(pricingDetailsDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		pricingDetailsDTO.setUpdatedDate(createdDate);
		pricingDetailsDTO.setUpdatedBy(userId);

	}

	public void updatePropertyAreaDetails(PropertyAreaDetailsDTO propertyAreaDetailsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertyAreaDetailsDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		propertyAreaDetailsDTO.setUpdatedDate(createdDate);
		propertyAreaDetailsDTO.setUpdatedBy(userId);

	}

	public void updateAmenities(AmenitiesDTO amenitiesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(amenitiesDTO.getPropertyId()))
			errors.rejectValue("propertyId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		//		ravi 9may change todo
//		if (null != amenitiesDTO.getAmenitiesList() && amenitiesDTO.getAmenitiesList().size() > 0) {
//			for (String amenity : amenitiesDTO.getAmenitiesList()) {
//				if (CustomValidator.isEmpty(amenity))
//					errors.rejectValue("aminities", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
//			}
//		}
		amenitiesDTO.setUpdatedDate(createdDate);
		amenitiesDTO.setUpdatedBy(userId);
	}
	
	public void propertyListInDashboard(PropertiesDTO propertiesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(propertiesDTO.getStatus()))
			errors.rejectValue("status", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(propertiesDTO.getCreatedBy()))
			errors.rejectValue("created by", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		propertiesDTO.setCreatedDate(createdDate);
	}

	public void updatePropertyFloorRooms(PropertyFloorRoomsDTO propertyFloorRoomsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertyFloorRoomsDTO.getPropertyId()))
			errors.rejectValue("propertyId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != propertyFloorRoomsDTO.getPropertyFloorRoomsList()
				&& propertyFloorRoomsDTO.getPropertyFloorRoomsList().size() > 0) {
			for (PropertyFloorRoomsDTO roomDTO : propertyFloorRoomsDTO.getPropertyFloorRoomsList()) {

				if (CustomValidator.isEmpty(roomDTO.getFloorNo()))
					errors.rejectValue("floorNo", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

				if (CustomValidator.isEmpty(roomDTO.getNoOfRooms()))
					errors.rejectValue("noOfRooms", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
			}
		}
		propertyFloorRoomsDTO.setUpdatedDate(createdDate);
		propertyFloorRoomsDTO.setUpdatedBy(userId);
	}

	public void updatePgRoomDetails(PgRoomDetailsDTO pgRoomDetailsDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(pgRoomDetailsDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		pgRoomDetailsDTO.setUpdatedDate(createdDate);
		pgRoomDetailsDTO.setUpdatedBy(userId);

	}

	public void validateProperty(PropertiesDTO propertiesDTO, Errors errors) {
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();

		propertiesDTO.setUpdatedBy(userId);
		propertiesDTO.setUpdatedDate(createDate);

	}

	public void allActiveProperties(PropertiesDTO propertiesDTO, Errors errors) {
		Long userId = userUtils.getLogedInUser();

		propertiesDTO.setCreatedBy(userId);

	}
	
	public void verifyPropertyAddress(CountryPincodeMappingDTO countryPincodeMappingDTO, Errors errors) {
		
		Long userId = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getCountry()))
			errors.rejectValue("country", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getState()))
			errors.rejectValue("state", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getDistrict()))
			errors.rejectValue("city", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getPincode()))
			errors.rejectValue("pincode", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		countryPincodeMappingDTO.setCreatedBy(userId);

	}
	
	public void assignOwnerToProperty(PropertiesDTO propertiesDTO, Errors errors) {
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();
		
		if (CustomValidator.isEmpty(propertiesDTO.getId()))
			errors.rejectValue("property Id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(propertiesDTO.getOwnerId()))
			errors.rejectValue("owner Id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		propertiesDTO.setUpdatedBy(userId);
		propertiesDTO.setUpdatedDate(createDate);
	}

	public void makeExclusiveProperty(PropertiesDTO propertiesDto, Errors errors) {
		
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long userId = userUtils.getLogedInUser();
		
		if (CustomValidator.isEmpty(propertiesDto.isExclusiveProperty()))
			errors.rejectValue("exclusive property status", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(propertiesDto.getId()))
			errors.rejectValue("Property Id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		propertiesDto.setUpdatedBy(userId);
		propertiesDto.setUpdatedDate(createdDate);
	}

}
