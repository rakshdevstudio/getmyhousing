package com.getmyhousing.common.converter;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.Owner;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.dto.PropertiesDTO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class PropertyConverter {

	/**
	 * convert PropertiesDTO to Properties
	 * 
	 *
	 * @return
	 */
	
	public static Properties getPropertyByPropertiesDTO(PropertiesDTO propertiesDTO) {

		// Get the current date and time
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String currentDateTime = dateTime.format(formatter);

		Properties property = new Properties();

		property.setId(propertiesDTO.getId());
		property.setLocality(propertiesDTO.getLocality());
		property.setCity(propertiesDTO.getCity());
		property.setState(propertiesDTO.getState());
		property.setCountry(propertiesDTO.getCountry());
		property.setPincode(propertiesDTO.getPincode());
		property.setLatitude(propertiesDTO.getLatitude());
		property.setLongitude(propertiesDTO.getLongitude());
		property.setBuildingType(propertiesDTO.getBuildingType());
		property.setLandmark(propertiesDTO.getLandmark());
		property.setStatus(propertiesDTO.getStatus());
		property.setCreatedBy(propertiesDTO.getCreatedBy());
		property.setCreatedDate(currentDateTime);
		property.setUpdatedBy(propertiesDTO.getCreatedBy());
		property.setUpdatedDate(currentDateTime);
		property.setListingType(propertiesDTO.getListingType());
		property.setZone(propertiesDTO.getZone());
		property.setPropertyType(propertiesDTO.getPropertyType());
		property.setPropertyAddress(propertiesDTO.getPropertyAddress());
		property.setPropertyName(propertiesDTO.getPropertyName());
		property.setUserPackageId(propertiesDTO.getUserPackageId());
		property.setPropertyBrochure(propertiesDTO.getPropertyBrochure());
		property.setApprovalStatus(propertiesDTO.getApprovalStatus());
		
		// Set owner if ownerId is provided
        if (propertiesDTO.getOwnerId() != null) {
            Owner owner = new Owner();
            owner.setId(propertiesDTO.getOwnerId());
            property.setOwner(owner);
        }
//		property.setApprovalStatus(propertiesDTO.getApprovalStatus());
//		if (adminFlag) {
//			property.setApprovalStatus(Constant.STATUS_ACTIVE);
//
//		} else {
//			property.setApprovalStatus(Constant.STATUS_PENDING);
//
//		}

		property.setApprovalRemarks(propertiesDTO.getApprovalRemarks());
		property.setApprovalActionBy(propertiesDTO.getApprovalActionBy());
		property.setApprovalActionDate(propertiesDTO.getApprovalActionDate());
		property.setYoutubeLink(propertiesDTO.getYoutubeLink());
		property.setVideoLink(propertiesDTO.getVideoLink());

		property.setSubLocality(propertiesDTO.getSubLocality());

		property.setBrokerageType(propertiesDTO.getBrokerageType());
		property.setBrokerageUnit(propertiesDTO.getBrokerageUnit());
		property.setBrokergeValue(propertiesDTO.getBrokergeValue());
			

		return property;
	}

	public static Properties getPropertyByPropertiesDTO(PropertiesDTO propertiesDTO, boolean adminFlag) {

		// Get the current date and time
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String currentDateTime = dateTime.format(formatter);

		Properties property = new Properties();

		property.setId(propertiesDTO.getId());
		property.setLocality(propertiesDTO.getLocality());
		property.setCity(propertiesDTO.getCity());
		property.setState(propertiesDTO.getState());
		property.setCountry(propertiesDTO.getCountry());
		property.setPincode(propertiesDTO.getPincode());
		property.setLatitude(propertiesDTO.getLatitude());
		property.setLongitude(propertiesDTO.getLongitude());
		property.setBuildingType(propertiesDTO.getBuildingType());
		property.setLandmark(propertiesDTO.getLandmark());
		property.setStatus(propertiesDTO.getStatus());
		property.setCreatedBy(propertiesDTO.getCreatedBy());
		property.setCreatedDate(currentDateTime);
		property.setUpdatedBy(propertiesDTO.getCreatedBy());
		property.setUpdatedDate(currentDateTime);
		property.setListingType(propertiesDTO.getListingType());
		property.setZone(propertiesDTO.getZone());
		property.setPropertyType(propertiesDTO.getPropertyType());
		property.setPropertyAddress(propertiesDTO.getPropertyAddress());
		property.setPropertyName(propertiesDTO.getPropertyName());
		property.setUserPackageId(propertiesDTO.getUserPackageId());
		property.setPropertyBrochure(propertiesDTO.getPropertyBrochure());
		
		// Set owner if ownerId is provided
        if (propertiesDTO.getOwnerId() != null) {
            Owner owner = new Owner();
            owner.setId(propertiesDTO.getOwnerId());
            property.setOwner(owner);
        }
		
//		property.setApprovalStatus(propertiesDTO.getApprovalStatus());
		if (adminFlag) {
			property.setApprovalStatus(Constant.STATUS_ACTIVE);

		} else {
			property.setApprovalStatus(Constant.STATUS_PENDING);

		}

		property.setApprovalRemarks(propertiesDTO.getApprovalRemarks());
		property.setApprovalActionBy(propertiesDTO.getApprovalActionBy());
		property.setApprovalActionDate(propertiesDTO.getApprovalActionDate());
		property.setYoutubeLink(propertiesDTO.getYoutubeLink());
		property.setVideoLink(propertiesDTO.getVideoLink());

		property.setSubLocality(propertiesDTO.getSubLocality());

		property.setBrokerageType(propertiesDTO.getBrokerageType());
		property.setBrokerageUnit(propertiesDTO.getBrokerageUnit());
		property.setBrokergeValue(propertiesDTO.getBrokergeValue());
			

		return property;
	}

	/**
	 * To convert Properties to PropertiesDTO
	 * 
	 * @param properties
	 * @return
	 */
	public static PropertiesDTO getPropertyDTOIntoProperties(Properties properties) {
		PropertiesDTO dto = new PropertiesDTO();
		dto.setId(properties.getId());
		dto.setLocality(properties.getLocality());
		dto.setCity(properties.getCity());
		dto.setState(properties.getState());
		dto.setCountry(properties.getCountry());
		dto.setPincode(properties.getPincode());
		dto.setLatitude(properties.getLatitude());
		dto.setLongitude(properties.getLongitude());
		dto.setBuildingType(properties.getBuildingType());
		dto.setLandmark(properties.getLandmark());
		dto.setStatus(properties.getStatus());
		dto.setCreatedBy(properties.getCreatedBy());
		dto.setCreatedDate(properties.getCreatedDate());
		dto.setUpdatedBy(properties.getUpdatedBy());
		dto.setUpdatedDate(properties.getUpdatedDate());
		dto.setListingType(properties.getListingType());
		dto.setPropertyAddress(properties.getPropertyAddress());
		dto.setPropertyName(properties.getPropertyName());
		dto.setPropertyType(properties.getPropertyType());
		dto.setUserPackageId(properties.getUserPackageId());
		dto.setApprovalStatus(properties.getApprovalStatus());
		dto.setApprovalRemarks(properties.getApprovalRemarks());
		dto.setApprovalActionBy(properties.getApprovalActionBy());
		dto.setApprovalActionDate(properties.getApprovalActionDate());
		dto.setYoutubeLink(properties.getYoutubeLink());
		dto.setVideoLink(properties.getVideoLink());
		dto.setPropertyBrochure(properties.getPropertyBrochure());
		dto.setBrokerageType(properties.getBrokerageType());
		dto.setBrokerageUnit(properties.getBrokerageUnit());
		dto.setBrokergeValue(properties.getBrokergeValue());
		dto.setSubLocality(properties.getSubLocality());
		if (properties.getOwner() != null) {
            dto.setOwnerId(properties.getOwner().getId());
        }

		return dto;
	}

}
