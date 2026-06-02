package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.ReraStatus;
import com.getmyhousing.common.dto.ReraStatusDTO;

public class ReraStatusConverter {

	/**
	 * To convert ReraStatus to ReraStatusDTO
	 * 
	 * @param reraStatus
	 * @return
	 */
	public static ReraStatusDTO getReraStatusDTOByReraStatus(ReraStatus reraStatus) {
		ReraStatusDTO reraStatusDTO = new ReraStatusDTO();
		reraStatusDTO.setId(reraStatus.getId());
		reraStatusDTO.setPropertyId(reraStatus.getPropertyId());
		reraStatusDTO.setReraAvailable(reraStatus.getReraAvailable());
		reraStatusDTO.setReraNo(reraStatus.getReraNo());
		reraStatusDTO.setStatus(reraStatus.getStatus());
		reraStatusDTO.setUpdatedBy(reraStatus.getUpdatedBy());
		reraStatusDTO.setUpdatedDate(reraStatus.getUpdatedDate());
		reraStatusDTO.setCreatedBy(reraStatus.getCreatedBy());
		reraStatusDTO.setCreatedDate(reraStatus.getCreatedDate());

		return reraStatusDTO;

	}

	/**
	 * To convert ReraStatusDTO to ReraStatus
	 * 
	 * @param reraStatusDTO
	 * @return
	 */
	public static ReraStatus getReraStatusByReraStatusDTO(ReraStatusDTO reraStatusDTO) {
		ReraStatus reraStatus = new ReraStatus();
		reraStatus.setId(reraStatusDTO.getId());
		reraStatus.setPropertyId(reraStatusDTO.getPropertyId());
		reraStatus.setReraAvailable(reraStatusDTO.getReraAvailable());
		reraStatus.setReraNo(reraStatusDTO.getReraNo());
		reraStatus.setStatus(reraStatusDTO.getStatus());
		reraStatus.setUpdatedBy(reraStatusDTO.getUpdatedBy());
		reraStatus.setUpdatedDate(reraStatusDTO.getUpdatedDate());
		reraStatus.setCreatedBy(reraStatusDTO.getCreatedBy());
		reraStatus.setCreatedDate(reraStatusDTO.getCreatedDate());

		return reraStatus;
	}

}
