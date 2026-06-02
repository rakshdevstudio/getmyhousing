package com.getmyhousing.common.converter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.repository.UserRepository;

public class AssociateLeadConverter {

	@Autowired
	private UserRepository userRepository;

	public static AssociateLeadDTO getAssociateLeadDTOByAssociateLead(AssociateLead associateLead) {
		AssociateLeadDTO associateLeadDTO = new AssociateLeadDTO();
		associateLeadDTO.setId(associateLead.getId());
		associateLeadDTO.setImagePath(associateLead.getImagePath());
		associateLeadDTO.setCustomerName(associateLead.getCustomerName());
		associateLeadDTO.setMobileNumber(associateLead.getMobileNumber());
		associateLeadDTO.setEmail(associateLead.getEmail());
		associateLeadDTO.setLocation(associateLead.getLocation());
		associateLeadDTO.setPincode(associateLead.getPincode());
		associateLeadDTO.setLandmark(associateLead.getLandmark());
		associateLeadDTO.setTypeOfLead(associateLead.getTypeOfLead());
		associateLeadDTO.setBestTimeToCall(associateLead.getBestTimeToCall());
		associateLeadDTO.setStatus(associateLead.getStatus());
		associateLeadDTO.setCreatedDate(associateLead.getCreatedDate());
		associateLeadDTO.setCreatedBy(associateLead.getCreatedBy());
		associateLeadDTO.setUpdatedDate(associateLead.getUpdatedDate());
		associateLeadDTO.setUpdatedBy(associateLead.getUpdatedBy());
		associateLeadDTO.setAssignedTo(associateLead.getAssignedTo());
		associateLeadDTO.setAssignedDate(associateLead.getAssignedDate());
		associateLeadDTO.setAssociateLeadProviderId(associateLead.getAssociateLeadProviderId());


		return associateLeadDTO;

	}

	/**
	 * To convert LeadDTO to Lead
	 * 
	 * @param leadDTO
	 * @return
	 */
	public static AssociateLead getAssociateLeadByAssociateLeadDTO(AssociateLeadDTO associateLeadDTO) {

		// Get the current date and time
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String currentDateTime = dateTime.format(formatter);

		AssociateLead associateLead = new AssociateLead();
		
		associateLead.setId(associateLeadDTO.getId());
		associateLead.setImagePath(associateLeadDTO.getImagePath());
		associateLead.setCustomerName(associateLeadDTO.getCustomerName());
		associateLead.setMobileNumber(associateLeadDTO.getMobileNumber());
		associateLead.setEmail(associateLeadDTO.getEmail());
		associateLead.setLocation(associateLeadDTO.getLocation());
		associateLead.setPincode(associateLeadDTO.getPincode());
		associateLead.setLandmark(associateLeadDTO.getLandmark());
		associateLead.setTypeOfLead(associateLeadDTO.getTypeOfLead());
		associateLead.setBestTimeToCall(associateLeadDTO.getBestTimeToCall());
		associateLead.setStatus(Constant.STATUS_ACTIVE);
		associateLead.setCreatedDate(currentDateTime);
		associateLead.setCreatedBy(associateLeadDTO.getCreatedBy());
		associateLead.setUpdatedDate(associateLeadDTO.getUpdatedDate());
		associateLead.setUpdatedBy(associateLeadDTO.getUpdatedBy());
		associateLead.setAssociateLeadProviderId(associateLeadDTO.getAssociateLeadProviderId());
		return associateLead;
	}
}
