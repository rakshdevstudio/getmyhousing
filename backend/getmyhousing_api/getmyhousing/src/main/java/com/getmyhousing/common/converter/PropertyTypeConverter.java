package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PropertyType;
import com.getmyhousing.common.dto.PropertyTypeDTO;

public class PropertyTypeConverter {

	/**
	 * To convert PropertyType to PropertyTypeDTO
	 * 
	 * @param propertyType
	 * @return
	 */
	public static PropertyTypeDTO getPropertyTypeDTOByPropertyType(PropertyType propertyType) {
		PropertyTypeDTO propertyTypeDTO = new PropertyTypeDTO();
		propertyTypeDTO.setId(propertyType.getId());
		propertyTypeDTO.setPropertyType(propertyType.getPropertyType());
		propertyTypeDTO.setPropertyRankOrder(propertyType.getPropertyRankOrder());
		propertyTypeDTO.setPropertySubType(propertyType.getPropertySubType());
		propertyTypeDTO.setPropertySubTypeIconPath(propertyType.getPropertySubTypeIconPath());
		propertyTypeDTO.setPropertyTypeIconPath(propertyType.getPropertyTypeIconPath());
		propertyTypeDTO.setStatus(propertyType.getStatus());
		propertyTypeDTO.setUpdatedBy(propertyType.getUpdatedBy());
		propertyTypeDTO.setUpdatedDate(propertyType.getUpdatedDate());
		propertyTypeDTO.setCreatedBy(propertyType.getCreatedBy());
		propertyTypeDTO.setCreatedDate(propertyType.getCreatedDate());

		return propertyTypeDTO;

	}

	/**
	 * To convert PropertyTypeDTO to PropertyType
	 * 
	 * @param propertyTypeDTO
	 * @return
	 */
	public static PropertyType getPropertyTypeByPropertyTypeDTO(PropertyTypeDTO propertyTypeDTO) {
		PropertyType propertyType = new PropertyType();
		propertyType.setId(propertyTypeDTO.getId());
		propertyType.setPropertyType(propertyTypeDTO.getPropertyType());
		propertyType.setPropertyRankOrder(propertyTypeDTO.getPropertyRankOrder());
		propertyType.setPropertySubType(propertyTypeDTO.getPropertySubType());
		propertyType.setPropertySubTypeIconPath(propertyTypeDTO.getPropertySubTypeIconPath());
		propertyType.setPropertyTypeIconPath(propertyTypeDTO.getPropertyTypeIconPath());
		propertyType.setStatus(propertyTypeDTO.getStatus());
		propertyType.setUpdatedBy(propertyTypeDTO.getUpdatedBy());
		propertyType.setUpdatedDate(propertyTypeDTO.getUpdatedDate());
		propertyType.setCreatedBy(propertyTypeDTO.getCreatedBy());
		propertyType.setCreatedDate(propertyTypeDTO.getCreatedDate());

		return propertyType;
	}
}
