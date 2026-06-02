package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PgOwnerDetails;
import com.getmyhousing.common.dto.PgOwnerDetailsDTO;

public class PgOwnerDetailsConverter {

	/**
	 * convert pgOwnerDetails to pgOwnerDetails
	 * 
	 *
	 * @return
	 */
	public static PgOwnerDetails getDetailsByPgOwnerDetailsDTO(PgOwnerDetailsDTO pgOwnerDetailsDTO) {

		PgOwnerDetails pgOwnerDetails = new PgOwnerDetails();

		pgOwnerDetails.setId(pgOwnerDetailsDTO.getId());
		pgOwnerDetails.setPropertyId(pgOwnerDetailsDTO.getPropertyId());
		pgOwnerDetails.setPropertyManagedBy(pgOwnerDetailsDTO.getPropertyManagedBy());
		pgOwnerDetails.setPropertyManagerStay(pgOwnerDetailsDTO.getPropertyManagerStay());
		pgOwnerDetails.setStatus(pgOwnerDetailsDTO.getStatus());
		pgOwnerDetails.setUpdatedDate(pgOwnerDetailsDTO.getUpdatedDate());
		pgOwnerDetails.setUpdatedBy(pgOwnerDetailsDTO.getUpdatedBy());
		pgOwnerDetails.setCreatedBy(pgOwnerDetailsDTO.getCreatedBy());
		pgOwnerDetails.setCreatedDate(pgOwnerDetailsDTO.getCreatedDate());

		return pgOwnerDetails;
	}

	/**
	 * To convert PgOwnerDetails to PgOwnerDetailsDTO
	 * 
	 * @param pgOwnerDetails
	 * @return
	 */
	public static PgOwnerDetailsDTO getPgDetailsDTOIntoPgOwnerDetails(PgOwnerDetails pgOwnerDetails) {

		PgOwnerDetailsDTO dto = new PgOwnerDetailsDTO();

		dto.setId(pgOwnerDetails.getId());
		dto.setPropertyId(pgOwnerDetails.getPropertyId());
		dto.setPropertyManagedBy(pgOwnerDetails.getPropertyManagedBy());
		dto.setPropertyManagerStay(pgOwnerDetails.getCreatedDate());
		dto.setStatus(pgOwnerDetails.getStatus());
		dto.setUpdatedDate(pgOwnerDetails.getUpdatedDate());
		dto.setCreatedBy(pgOwnerDetails.getCreatedBy());
		dto.setCreatedDate(pgOwnerDetails.getCreatedDate());
		dto.setUpdatedBy(pgOwnerDetails.getUpdatedBy());

		return dto;
	}

}
