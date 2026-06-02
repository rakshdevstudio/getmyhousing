package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PropertyStatus;
import com.getmyhousing.common.dto.PropertyStatusDTO;

public class PropertyStatusConverter {

	/**
	 * convert PropertiesDTO to Properties
	 * 
	 *
	 * @return
	 */
	public static PropertyStatus getPropertyByPropertyStatusDTO(PropertyStatusDTO propertyStatusDTO) {
		PropertyStatus propertyStatus = new PropertyStatus();

		propertyStatus.setId(propertyStatusDTO.getId());
		propertyStatus.setPropertyId(propertyStatusDTO.getPropertyId());
		propertyStatus.setOwnershipType(propertyStatusDTO.getOwnershipType());
		propertyStatus.setAboutPropertySuitableFor(propertyStatusDTO.getAboutPropertySuitableFor());
		propertyStatus.setAgeOfProperty(propertyStatusDTO.getAgeOfProperty());
		propertyStatus.setAvailableFor(propertyStatusDTO.getAvailableFor());
		propertyStatus.setAvailableFrom(propertyStatusDTO.getAvailableFrom());
		propertyStatus.setEntranceWidth(propertyStatusDTO.getEntranceWidth());
		propertyStatus.setHeightSealing(propertyStatusDTO.getHeightSealing());
		propertyStatus.setLocatedNear(propertyStatusDTO.getLocatedNear());
		propertyStatus.setLocationHub(propertyStatusDTO.getLocationHub());
		propertyStatus.setOccupancyDays(propertyStatusDTO.getOccupancyDays());
		propertyStatus.setPositionStatus(propertyStatusDTO.getPositionStatus());
		propertyStatus.setPositionStatusType(propertyStatusDTO.getPositionStatusType());
		propertyStatus.setGovtApproved(propertyStatusDTO.getGovtApproved());
		propertyStatus.setStatus(propertyStatusDTO.getStatus());
		propertyStatus.setUpdatedBy(propertyStatusDTO.getUpdatedBy());
		propertyStatus.setUpdatedDate(propertyStatusDTO.getUpdatedDate());
		propertyStatus.setCreatedBy(propertyStatusDTO.getCreatedBy());
		propertyStatus.setCreatedDate(propertyStatusDTO.getCreatedDate());
		
		propertyStatus.setAvailableFromDate(propertyStatusDTO.getAvailableFromDate());		
		
		propertyStatus.setTenantPreLeasedUnit(propertyStatusDTO.getTenantPreLeasedUnit());		

		return propertyStatus;
	}

	/**
	 * To convert PropertyStatus to PropertyStatusDTO 
	 * 
	 * @param propertyStatus
	 * @return
	 */
	public static PropertyStatusDTO getPropertyStatusDTOIntoPropertyStatus(PropertyStatus propertyStatus) {
		PropertyStatusDTO dto = new PropertyStatusDTO();
		dto.setId(propertyStatus.getId());
		dto.setPropertyId(propertyStatus.getPropertyId());
		dto.setAboutPropertySuitableFor(propertyStatus.getAboutPropertySuitableFor());
		dto.setAgeOfProperty(propertyStatus.getAgeOfProperty());
		dto.setAvailableFor(propertyStatus.getAvailableFor());
		dto.setAvailableFrom(propertyStatus.getAvailableFrom());
		dto.setEntranceWidth(propertyStatus.getEntranceWidth());
		dto.setHeightSealing(propertyStatus.getHeightSealing());
		dto.setLocatedNear(propertyStatus.getLocatedNear());
		dto.setLocationHub(propertyStatus.getLocationHub());
		dto.setPositionStatus(propertyStatus.getPositionStatus());
		dto.setPositionStatusType(propertyStatus.getPositionStatusType());
		dto.setOccupancyDays(propertyStatus.getOccupancyDays());
		dto.setOwnershipType(propertyStatus.getOwnershipType());
		dto.setGovtApproved(propertyStatus.getGovtApproved());
		dto.setStatus(propertyStatus.getStatus());
		dto.setCreatedBy(propertyStatus.getCreatedBy());
		dto.setCreatedDate(propertyStatus.getCreatedDate());
		dto.setUpdatedBy(propertyStatus.getUpdatedBy());
		dto.setUpdatedDate(propertyStatus.getUpdatedDate());
		dto.setAvailableFromDate(propertyStatus.getAvailableFromDate());
		dto.setTenantPreLeasedUnit(propertyStatus.getTenantPreLeasedUnit());

		return dto;
	}

}
