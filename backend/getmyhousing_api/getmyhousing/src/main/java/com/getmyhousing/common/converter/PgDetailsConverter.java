package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PgDetails;
import com.getmyhousing.common.dto.PgDetailsDTO;

public class PgDetailsConverter {

	/**
	 * convert pgDetailsDTO to pgDetails
	 * 
	 *
	 * @return
	 */
	public static PgDetails getPgDetailsByPgDetailsDTO(PgDetailsDTO pgDetailsDTO) {

		PgDetails pgDetails = new PgDetails();

		pgDetails.setId(pgDetailsDTO.getId());
		pgDetails.setPropertyId(pgDetailsDTO.getPropertyId());
		pgDetails.setPgFor(pgDetailsDTO.getPgFor());
		pgDetails.setTotalBeds(pgDetailsDTO.getTotalBeds());
		pgDetails.setBestSuitedFor(pgDetailsDTO.getBestSuitedFor());
		pgDetails.setMealsAvailable(pgDetailsDTO.getMealsAvailable());
		pgDetails.setCommonAreas(pgDetailsDTO.getCommonAreas());
		pgDetails.setLockInPeriod(pgDetailsDTO.getLockInPeriod());
		pgDetails.setNoticePeriod(pgDetailsDTO.getNoticePeriod());
		pgDetails.setStatus(pgDetailsDTO.getStatus());
		pgDetails.setUpdatedDate(pgDetailsDTO.getUpdatedDate());
		pgDetails.setUpdatedBy(pgDetailsDTO.getUpdatedBy());
		pgDetails.setCreatedBy(pgDetailsDTO.getCreatedBy());
		pgDetails.setCreatedDate(pgDetailsDTO.getCreatedDate());

		return pgDetails;
	}

	/**
	 * To convert PgDetails to PgDetailsDTO
	 * 
	 * @param pgDetails
	 * @return
	 */
	public static PgDetailsDTO getPgDetailsDTOIntoPgDetails(PgDetails pgDetails) {
		PgDetailsDTO dto = new PgDetailsDTO();

		dto.setId(pgDetails.getId());
		dto.setPropertyId(pgDetails.getPropertyId());
		dto.setTotalBeds(pgDetails.getTotalBeds());
		dto.setPgFor(pgDetails.getPgFor());
		dto.setBestSuitedFor(pgDetails.getBestSuitedFor());
		dto.setMealsAvailable(pgDetails.getMealsAvailable());
		dto.setCommonAreas(pgDetails.getCommonAreas());
		dto.setLockInPeriod(pgDetails.getLockInPeriod());
		dto.setNoticePeriod(pgDetails.getNoticePeriod());
		dto.setStatus(pgDetails.getStatus());
		dto.setUpdatedDate(pgDetails.getUpdatedDate());
		dto.setCreatedBy(pgDetails.getCreatedBy());
		dto.setCreatedDate(pgDetails.getCreatedDate());
		dto.setUpdatedBy(pgDetails.getUpdatedBy());

		return dto;
	}

}
