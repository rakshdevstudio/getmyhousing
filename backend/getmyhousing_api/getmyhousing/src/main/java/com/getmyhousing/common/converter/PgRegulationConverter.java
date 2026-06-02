package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PgRegulations;
import com.getmyhousing.common.dto.PgRegulationsDTO;

public class PgRegulationConverter {

	/**
	 * convert pgDetailsDTO to pgDetails
	 * 
	 *
	 * @return
	 */
	public static PgRegulations getRegulationsByPgRegulationsDTO(PgRegulationsDTO pgRegulationsDTO) {

		PgRegulations pgRegulations = new PgRegulations();

		pgRegulations.setId(pgRegulationsDTO.getId());
		pgRegulations.setPropertyId(pgRegulationsDTO.getPropertyId());
		pgRegulations.setNonVegAllowed(pgRegulationsDTO.getNonVegAllowed());
		pgRegulations.setAnyTimeAllowed(pgRegulationsDTO.getAnyTimeAllowed());
		pgRegulations.setOppositeSex(pgRegulationsDTO.getOppositeSex());
		pgRegulations.setDrinkingAllowed(pgRegulationsDTO.getDrinkingAllowed());
		pgRegulations.setGuardianAllowed(pgRegulationsDTO.getGuardianAllowed());
		pgRegulations.setSmokingAllowed(pgRegulationsDTO.getSmokingAllowed());
		pgRegulations.setVisitorAllowed(pgRegulationsDTO.getVisitorAllowed());
		pgRegulations.setStatus(pgRegulationsDTO.getStatus());
		pgRegulations.setUpdatedDate(pgRegulationsDTO.getUpdatedDate());
		pgRegulations.setUpdatedBy(pgRegulationsDTO.getUpdatedBy());
		pgRegulations.setCreatedBy(pgRegulationsDTO.getCreatedBy());
		pgRegulations.setCreatedDate(pgRegulationsDTO.getCreatedDate());

		return pgRegulations;
	}

	/**
	 * To convert PgRegulations to PgRegulationsDTO
	 * 
	 * @param pgRegulations
	 * @return
	 */
	public static PgRegulationsDTO getRegulationsDTOIntoPgRegulations(PgRegulations pgRegulations) {

		PgRegulationsDTO dto = new PgRegulationsDTO();

		dto.setId(pgRegulations.getId());
		dto.setPropertyId(pgRegulations.getPropertyId());
		dto.setNonVegAllowed(pgRegulations.getNonVegAllowed());
		dto.setOppositeSex(pgRegulations.getOppositeSex());
		dto.setAnyTimeAllowed(pgRegulations.getAnyTimeAllowed());
		dto.setDrinkingAllowed(pgRegulations.getDrinkingAllowed());
		dto.setGuardianAllowed(pgRegulations.getGuardianAllowed());
		dto.setSmokingAllowed(pgRegulations.getSmokingAllowed());
		dto.setVisitorAllowed(pgRegulations.getVisitorAllowed());
		dto.setStatus(pgRegulations.getStatus());
		dto.setUpdatedDate(pgRegulations.getUpdatedDate());
		dto.setCreatedBy(pgRegulations.getCreatedBy());
		dto.setCreatedDate(pgRegulations.getCreatedDate());
		dto.setUpdatedBy(pgRegulations.getUpdatedBy());

		return dto;
	}

}
