package com.getmyhousing.common.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.getmyhousing.common.domain.LeadHistory;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.dto.LeadHistoryDTO;
import com.getmyhousing.common.repository.UserRepository;

@Component
public class LeadHistoryConverter {

	/**
	 * convert LeadHistoryDTO to LeadHistory
	 * 
	 * @param LeadHistoryDTO
	 * @return
	 */
	
	
	@Autowired
	private UserRepository userRepository;

	public static LeadHistory getLeadHistoryByLeadHistoryDTO(LeadHistoryDTO leadHistoryDTO) {
		LeadHistory leadHistory = new LeadHistory();

		leadHistory.setId(leadHistoryDTO.getId());
		leadHistory.setLeadId(leadHistoryDTO.getLeadId());
		leadHistory.setAssignedTo(leadHistoryDTO.getAssignedTo());
		leadHistory.setAssignedBy(leadHistoryDTO.getAssignedBy());
		leadHistory.setAssignedDate(leadHistoryDTO.getAssignedDate());
		leadHistory.setCallDate(leadHistoryDTO.getCallDate());
		leadHistory.setCallBy(leadHistoryDTO.getCallBy());
		leadHistory.setCallResponse(leadHistoryDTO.getCallResponse());
		leadHistory.setCallNotes(leadHistoryDTO.getCallNotes());
		leadHistory.setStatusChangeFrom(leadHistoryDTO.getStatusChangeFrom());
		leadHistory.setStatusChangeTo(leadHistoryDTO.getStatusChangeTo());
		leadHistory.setNextFollowupDate(leadHistoryDTO.getNextFollowupDate());
		leadHistory.setStatus(leadHistoryDTO.getStatus());
		leadHistory.setCreatedDate(leadHistoryDTO.getCreatedDate());
		leadHistory.setCreatedBy(leadHistoryDTO.getCreatedBy());
		leadHistory.setUpdatedDate(leadHistoryDTO.getUpdatedDate());
		leadHistory.setUpdatedBy(leadHistoryDTO.getUpdatedBy());
		return leadHistory;

	}

	/**
	 * convert LeadHistory to LeadHistoryDTO
	 * 
	 * @param LeadHistory
	 * @return
	 */

	public static LeadHistoryDTO getLeadHistoryDTOByLeadHistory(LeadHistory leadHistory) {
		LeadHistoryDTO dto = new LeadHistoryDTO();

		dto.setId(leadHistory.getId());
		dto.setLeadId(leadHistory.getLeadId());
		dto.setAssignedTo(leadHistory.getAssignedTo());
		dto.setAssignedBy(leadHistory.getAssignedBy());
		dto.setAssignedDate(leadHistory.getAssignedDate());
		dto.setCallDate(leadHistory.getCallDate());
		dto.setCallBy(leadHistory.getCallBy());
		dto.setCallResponse(leadHistory.getCallResponse());
		dto.setCallNotes(leadHistory.getCallNotes());
		dto.setStatusChangeFrom(leadHistory.getStatusChangeFrom());
		dto.setStatusChangeTo(leadHistory.getStatusChangeTo());
		dto.setNextFollowupDate(leadHistory.getNextFollowupDate());
		dto.setStatus(leadHistory.getStatus());
		dto.setCreatedDate(leadHistory.getCreatedDate());
		dto.setCreatedBy(leadHistory.getCreatedBy());
		dto.setUpdatedDate(leadHistory.getUpdatedDate());
		dto.setUpdatedBy(leadHistory.getUpdatedBy());
		dto.setRemarks(leadHistory.getRemarks());
		dto.setRemarks(leadHistory.getRemarks());

		return dto;

	}
}
