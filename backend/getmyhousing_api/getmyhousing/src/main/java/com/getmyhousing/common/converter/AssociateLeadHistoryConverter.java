package com.getmyhousing.common.converter;

import org.springframework.stereotype.Component;

import com.getmyhousing.common.domain.AssociateLeadHistory;
import com.getmyhousing.common.domain.LeadHistory;
import com.getmyhousing.common.dto.AssociateLeadHistoryDTO;
import com.getmyhousing.common.dto.LeadHistoryDTO;
import com.getmyhousing.common.utils.DateUtils;

@Component
public class AssociateLeadHistoryConverter {
	
	/**
	 * convert AssociateLeadHistoryDTO to AssociateLeadHistory
	 * 
	 * @param AssociateLeadHistoryDTO
	 * @return
	 */

	public static AssociateLeadHistory getAssociateLeadHistoryByAssociateLeadHistoryDTO(AssociateLeadHistoryDTO associateLeadHistoryDTO) {
		AssociateLeadHistory associateLeadHistory = new AssociateLeadHistory();

		associateLeadHistory.setId(associateLeadHistoryDTO.getId());
		associateLeadHistory.setAssociateLeadId(associateLeadHistoryDTO.getAssociateLeadId());
		associateLeadHistory.setAssignedTo(associateLeadHistoryDTO.getAssignedTo());
		associateLeadHistory.setAssignedBy(associateLeadHistoryDTO.getAssignedBy());
		associateLeadHistory.setAssignedDate( DateUtils.currentDate() );
		associateLeadHistory.setCallDate(associateLeadHistoryDTO.getCallDate());
		associateLeadHistory.setCallBy(associateLeadHistoryDTO.getCallBy());
		associateLeadHistory.setCallResponse(associateLeadHistoryDTO.getCallResponse());
		associateLeadHistory.setCallNotes(associateLeadHistoryDTO.getCallNotes());
		associateLeadHistory.setStatusChangeFrom(associateLeadHistoryDTO.getStatusChangeFrom());
		associateLeadHistory.setStatusChangeTo(associateLeadHistoryDTO.getStatusChangeTo());
		associateLeadHistory.setFollowupDate(associateLeadHistoryDTO.getFollowupDate());
		associateLeadHistory.setStatus(associateLeadHistoryDTO.getStatus());
		associateLeadHistory.setCreatedDate(DateUtils.currentDate());
		associateLeadHistory.setCreatedBy(associateLeadHistoryDTO.getCreatedBy());
		associateLeadHistory.setUpdatedDate(DateUtils.currentDate());
		associateLeadHistory.setUpdatedBy(associateLeadHistoryDTO.getUpdatedBy());
		return associateLeadHistory;

	}

	/**
	 * convert AssociateLeadHistory to AssociateLeadHistoryDTO
	 * 
	 * @param AssociateLeadHistory
	 * @return
	 */

	public static AssociateLeadHistoryDTO getAssociateLeadHistoryDTOByAssociateLeadHistory(AssociateLeadHistory associateLeadHistory) {
		AssociateLeadHistoryDTO dto = new AssociateLeadHistoryDTO();

		dto.setId(associateLeadHistory.getId());
		dto.setAssociateLeadId(associateLeadHistory.getAssociateLeadId());
		dto.setAssignedTo(associateLeadHistory.getAssignedTo());
		dto.setAssignedBy(associateLeadHistory.getAssignedBy());
		dto.setAssignedDate(associateLeadHistory.getAssignedDate());
		dto.setCallDate(associateLeadHistory.getCallDate());
		dto.setCallBy(associateLeadHistory.getCallBy());
		dto.setCallResponse(associateLeadHistory.getCallResponse());
		dto.setCallNotes(associateLeadHistory.getCallNotes());
		dto.setStatusChangeFrom(associateLeadHistory.getStatusChangeFrom());
		dto.setStatusChangeTo(associateLeadHistory.getStatusChangeTo());
		dto.setFollowupDate(associateLeadHistory.getFollowupDate());
		dto.setStatus(associateLeadHistory.getStatus());
		dto.setCreatedDate(associateLeadHistory.getCreatedDate());
		dto.setCreatedBy(associateLeadHistory.getCreatedBy());
		dto.setUpdatedDate(associateLeadHistory.getUpdatedDate());
		dto.setUpdatedBy(associateLeadHistory.getUpdatedBy());
		return dto;

	}

}
