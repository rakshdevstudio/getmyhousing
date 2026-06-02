package com.getmyhousing.common.converter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.Lead;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.repository.PropertiesRepository;
import com.getmyhousing.common.repository.UserPackagesRepository;

public class LeadConverter {

	public static LeadDTO getLeadDTOByLead(Lead lead) {
		LeadDTO leadDTO = new LeadDTO();
		leadDTO.setId(lead.getId());
		leadDTO.setPropertyId(lead.getPropertyId());
		leadDTO.setCustomerName(lead.getCustomerName());
		leadDTO.setMobileNumber(lead.getMobileNumber());
		leadDTO.setEmail(lead.getEmail());
		leadDTO.setLeadSource(lead.getLeadSource());
		leadDTO.setLeadType(lead.getLeadType());
		leadDTO.setAssignedBy(lead.getAssignedBy());
		leadDTO.setAssignedTo(lead.getAssignedTo());
		leadDTO.setAssignedDate(lead.getAssignedDate());
		leadDTO.setNextFollowupDate(lead.getNextFollowupDate());
		leadDTO.setStatus(lead.getStatus());
		leadDTO.setUpdatedBy(lead.getUpdatedBy());
		leadDTO.setUpdatedDate(lead.getUpdatedDate());
		leadDTO.setCreatedBy(lead.getCreatedBy());
		leadDTO.setCreatedDate(lead.getCreatedDate());
		leadDTO.setCountryCode(lead.getCountryCode());
		leadDTO.setScheduleDateTime(lead.getScheduleDateTime());
		leadDTO.setCustomerDistrict(lead.getCustomerDistrict());
		leadDTO.setCustomerState(lead.getCustomerState());
		leadDTO.setGettingLeadByProperty(lead.getGettingLeadByProperty());
		leadDTO.setLeadProviderId(lead.getLeadProviderId());


		return leadDTO;

	}

	/**
	 * To convert LeadDTO to Lead
	 * 
	 * @param leadDTO
	 * @return
	 */
	public static Lead getLeadByLeadDTO(LeadDTO leadDTO) {

		// Get the current date and time
		LocalDateTime dateTime = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		String currentDateTime = dateTime.format(formatter);

		Lead lead = new Lead();
		try {
			lead.setId(leadDTO.getId());

			lead.setPropertyId(leadDTO.getPropertyId());

			lead.setCustomerName(leadDTO.getCustomerName());
			lead.setMobileNumber(leadDTO.getMobileNumber());
			lead.setEmail(leadDTO.getEmail());
			lead.setLeadSource(leadDTO.getLeadSource());
			lead.setLeadType(leadDTO.getLeadType());
			lead.setAssignedTo(leadDTO.getAssignedTo());
			lead.setAssignedBy(leadDTO.getAssignedBy());
			lead.setAssignedDate(leadDTO.getAssignedDate());
			lead.setNextFollowupDate(leadDTO.getNextFollowupDate());
			lead.setStatus(Constant.STATUS_ACTIVE);
			lead.setUpdatedBy(leadDTO.getUpdatedBy());
			lead.setUpdatedDate(leadDTO.getUpdatedDate());
			lead.setCreatedBy(leadDTO.getCreatedBy());
			lead.setCreatedDate(currentDateTime);
			lead.setCountryCode(leadDTO.getCountryCode());
			lead.setScheduleDateTime(leadDTO.getScheduleDateTime());
			lead.setCustomerDistrict(leadDTO.getCustomerDistrict());
			lead.setCustomerState(leadDTO.getCustomerState());
			lead.setGettingLeadByProperty(leadDTO.getGettingLeadByProperty());
			lead.setLeadProviderId(leadDTO.getLeadProviderId());

			
			
		} catch (Exception e) {
			// TODO: handle exception

			e.printStackTrace();

		}
		return lead;
	}

}
