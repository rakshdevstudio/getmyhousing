package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PgRoomDetails;
import com.getmyhousing.common.dto.PgRoomDetailsDTO;

public class PgRoomDetailsConverter {

	/**
	 * To convert PgRoomDetails to PgRoomDetailsDTO
	 * 
	 * @param pgRoomDetails
	 * @return
	 */
	public static PgRoomDetailsDTO getPgRoomDetailsDTOByPgRoomDetails(PgRoomDetails pgRoomDetails) {
		PgRoomDetailsDTO pgRoomDetailsDTO = new PgRoomDetailsDTO();
		pgRoomDetailsDTO.setId(pgRoomDetails.getId());
		pgRoomDetailsDTO.setPropertyId(pgRoomDetails.getPropertyId());
		pgRoomDetailsDTO.setRoomType(pgRoomDetails.getRoomType());
		pgRoomDetailsDTO.setTotalBedsInRoom(pgRoomDetails.getTotalBedsInRoom());
		pgRoomDetailsDTO.setRent(pgRoomDetails.getRent());
		pgRoomDetailsDTO.setRentType(pgRoomDetails.getRentType());
		pgRoomDetailsDTO.setSecuredDeposit(pgRoomDetails.getSecuredDeposit());
		pgRoomDetailsDTO.setSecuredDepositAmount(pgRoomDetails.getSecuredDepositAmount());
		pgRoomDetailsDTO.setParking2Wheeler(pgRoomDetails.getParking2Wheeler());
		pgRoomDetailsDTO.setParking2OpenType(pgRoomDetails.getParking2OpenType());
		pgRoomDetailsDTO.setParking2CoverType(pgRoomDetails.getParking2CoverType());
		pgRoomDetailsDTO.setParking4Wheeler(pgRoomDetails.getParking4Wheeler());
		pgRoomDetailsDTO.setParking4OpenType(pgRoomDetails.getParking4OpenType());
		pgRoomDetailsDTO.setParking4CoverType(pgRoomDetails.getParking4CoverType());
		pgRoomDetailsDTO.setFacilityOffered(pgRoomDetails.getFacilityOffered());
		pgRoomDetailsDTO.setStatus(pgRoomDetails.getStatus());
		pgRoomDetailsDTO.setUpdatedBy(pgRoomDetails.getUpdatedBy());
		pgRoomDetailsDTO.setUpdatedDate(pgRoomDetails.getUpdatedDate());
		pgRoomDetailsDTO.setCreatedBy(pgRoomDetails.getCreatedBy());
		pgRoomDetailsDTO.setCreatedDate(pgRoomDetails.getCreatedDate());

		return pgRoomDetailsDTO;

	}

	/**
	 * To convert PgRoomDetailsDTO to PgRoomDetails
	 * 
	 * @param pgRoomDetailsDTO
	 * @return
	 */
	public static PgRoomDetails getPgRoomDetailsByPgRoomDetailsDTO(PgRoomDetailsDTO pgRoomDetailsDTO) {
		PgRoomDetails pgRoomDetails = new PgRoomDetails();
		pgRoomDetails.setId(pgRoomDetailsDTO.getId());
		pgRoomDetails.setPropertyId(pgRoomDetailsDTO.getPropertyId());
		pgRoomDetails.setRoomType(pgRoomDetailsDTO.getRoomType());
		pgRoomDetails.setTotalBedsInRoom(pgRoomDetailsDTO.getTotalBedsInRoom());
		pgRoomDetails.setRent(pgRoomDetailsDTO.getRent());
		pgRoomDetails.setRentType(pgRoomDetailsDTO.getRentType());
		pgRoomDetails.setSecuredDeposit(pgRoomDetailsDTO.getSecuredDeposit());
		pgRoomDetails.setSecuredDepositAmount(pgRoomDetailsDTO.getSecuredDepositAmount());
		pgRoomDetails.setParking2Wheeler(pgRoomDetailsDTO.getParking2Wheeler());
		pgRoomDetails.setParking2OpenType(pgRoomDetailsDTO.getParking2OpenType());
		pgRoomDetails.setParking2CoverType(pgRoomDetailsDTO.getParking2CoverType());
		pgRoomDetails.setParking4Wheeler(pgRoomDetailsDTO.getParking4Wheeler());
		pgRoomDetails.setParking4OpenType(pgRoomDetailsDTO.getParking4OpenType());
		pgRoomDetails.setParking4CoverType(pgRoomDetailsDTO.getParking4CoverType());
		pgRoomDetails.setFacilityOffered(pgRoomDetailsDTO.getFacilityOffered());
		pgRoomDetails.setStatus(pgRoomDetailsDTO.getStatus());
		pgRoomDetails.setUpdatedBy(pgRoomDetailsDTO.getUpdatedBy());
		pgRoomDetails.setUpdatedDate(pgRoomDetailsDTO.getUpdatedDate());
		pgRoomDetails.setCreatedBy(pgRoomDetailsDTO.getCreatedBy());
		pgRoomDetails.setCreatedDate(pgRoomDetailsDTO.getCreatedDate());

		return pgRoomDetails;
	}

}
