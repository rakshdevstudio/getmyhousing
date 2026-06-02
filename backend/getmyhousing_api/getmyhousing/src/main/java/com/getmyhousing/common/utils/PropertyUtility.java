package com.getmyhousing.common.utils;

import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.dto.PropertiesDTO;

public class PropertyUtility {

	/**
	 * convert PropertiesDTO to Properties
	 * 
	 *
	 * @return
	 */
	public static Properties getPropertyByPropertiesDTO(PropertiesDTO propertiesDTO) {
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
		property.setCreatedDate(propertiesDTO.getCreatedDate());
		property.setUpdatedBy(propertiesDTO.getUpdatedBy());
		property.setUpdatedDate(propertiesDTO.getUpdatedDate());
		property.setListingType(propertiesDTO.getListingType());
		property.setZone(propertiesDTO.getZone());
		property.setPropertyType(propertiesDTO.getPropertyType());
		property.setPropertyAddress(propertiesDTO.getPropertyAddress());
		property.setPropertyName(propertiesDTO.getPropertyName());

		return property;
	}

	public static PropertiesDTO convertPropertyIntoPropertiesDTO(Properties properties) {
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
		return dto;
	}
	
	public static String constructTitle(String furnishingType, String numOfBedrooms, String propertyType, String listingType, String locality, String city) {
//	    if (numOfBedrooms == null || numOfBedrooms.isEmpty()) {
//	        return null;
//	    }
	    
	    String bhk;
	    if ("Studio".equals(numOfBedrooms) || "1 RK".equals(numOfBedrooms)) {
	        bhk = " " + numOfBedrooms + " ";
	    }else if(numOfBedrooms == null || numOfBedrooms.isEmpty()) {
	    	bhk = "";
	    }else {
	        bhk = " "+numOfBedrooms + " BHK ";
	    } 
	    
	    String title = furnishingType + bhk + propertyType + " for " + listingType + " in " + locality + " " + city;
	    return title;
	}

}
