package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.TenantStatus;
import com.getmyhousing.common.dto.TenantStatusDTO;

public class TenantStatusConverter {

	/**
	 * To convert TenantStatus to TenantStatusDTO
	 * 
	 * @param tenantStatus
	 * @return
	 */
	public static TenantStatusDTO getTenantStatusDTOByTenantStatus(TenantStatus tenantStatus) {
		TenantStatusDTO tenantStatusDTO = new TenantStatusDTO();
		tenantStatusDTO.setId(tenantStatus.getId());
		tenantStatusDTO.setPropertyId(tenantStatus.getPropertyId());
		tenantStatusDTO.setTenantType(tenantStatus.getTenantType());
		tenantStatusDTO.setReligiousType(tenantStatus.getReligiousType());
		tenantStatusDTO.setWorkPreference(tenantStatus.getWorkPreference());
		tenantStatusDTO.setPetsAllowed(tenantStatus.getPetsAllowed());
		tenantStatusDTO.setFoodPreference(tenantStatus.getFoodPreference());
		tenantStatusDTO.setStatus(tenantStatus.getStatus());
		tenantStatusDTO.setUpdatedBy(tenantStatus.getUpdatedBy());
		tenantStatusDTO.setUpdatedDate(tenantStatus.getUpdatedDate());
		tenantStatusDTO.setCreatedBy(tenantStatus.getCreatedBy());
		tenantStatusDTO.setCreatedDate(tenantStatus.getCreatedDate());
		tenantStatusDTO.setBachelorsAllowed(tenantStatus.getBachelorsAllowed());
		tenantStatusDTO.setSprinstersAllowed(tenantStatus.getSprinstersAllowed());

		return tenantStatusDTO;

	}

	/**
	 * To convert TenantStatusDTO to TenantStatus
	 * 
	 * @param tenantStatusDTO
	 * @return
	 */
	public static TenantStatus getTenantStatusByTenantStatusDTO(TenantStatusDTO tenantStatusDTO) {
		TenantStatus tenantStatus = new TenantStatus();
		tenantStatus.setId(tenantStatusDTO.getId());
		tenantStatus.setPropertyId(tenantStatusDTO.getPropertyId());
		tenantStatus.setTenantType(tenantStatusDTO.getTenantType());
		tenantStatus.setReligiousType(tenantStatusDTO.getReligiousType());
		tenantStatus.setWorkPreference(tenantStatusDTO.getWorkPreference());
		tenantStatus.setPetsAllowed(tenantStatusDTO.getPetsAllowed());
		tenantStatus.setFoodPreference(tenantStatusDTO.getFoodPreference());
		tenantStatus.setStatus(tenantStatusDTO.getStatus());
		tenantStatus.setUpdatedBy(tenantStatusDTO.getUpdatedBy());
		tenantStatus.setUpdatedDate(tenantStatusDTO.getUpdatedDate());
		tenantStatus.setCreatedBy(tenantStatusDTO.getCreatedBy());
		tenantStatus.setCreatedDate(tenantStatusDTO.getCreatedDate());
		tenantStatus.setBachelorsAllowed(tenantStatusDTO.getBachelorsAllowed());
		tenantStatus.setSprinstersAllowed(tenantStatusDTO.getSprinstersAllowed());

		return tenantStatus;
	}
}
