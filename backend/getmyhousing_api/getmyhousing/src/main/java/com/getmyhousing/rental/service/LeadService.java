package com.getmyhousing.rental.service;

import java.util.List;

import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.domain.AssociateLeadHistory;
import com.getmyhousing.common.domain.Lead;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.dto.AssociateLeadHistoryDTO;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.dto.LeadHistoryDTO;

public interface LeadService {

	// Saving the given lead
	public void addLead(LeadDTO leadDTO);

	// To get LeadById
	public List<Lead> getLeadById(LeadDTO leadDTO);

	// To update the Lead information
	public void updateLead(LeadDTO leadDTO);

	// To get leads by given filters
	public List<LeadDTO> getLeadsByFilters(LeadDTO leadDTO);
	
	// to get agent or customer submited leads status and list
	public List<LeadDTO> getUserLeads(LeadDTO leadDTO);

	// To assign a lead to given properties
	public void assignLeads(LeadDTO leadDTO);

	// To add lead history for property
	public void addLeadHistory(LeadHistoryDTO leadHistoryDTO);

	// To get leadHistory by given leadId
	public List<LeadHistoryDTO> getLeadHistoryByLeadId(LeadHistoryDTO leadHistoryDTO);

	// To get lead count from leaddatabase
	public int getTotalLeadCount(LeadDTO leadDTO);

	public LeadDTO getLeadByUserId(LeadDTO leadDTO);
	
	public void saveAssociateLead(AssociateLeadDTO associateLeadDTO);

	public void assignAssociateLeads(AssociateLeadDTO associateLeadDTO , Long loginUserId);

	public List<AssociateLeadDTO> getAssociateLeadsDTO(AssociateLeadDTO associatedLeadsDTO);

	public AssociateLeadDTO getAssociateLeadsDTOByLeadId(AssociateLeadDTO associateLeadDTO);

	public AssociateLead editAssociateLeadByAssociateLeadId(AssociateLeadDTO associateLeadDTO);

	public List<AssociateLeadHistoryDTO> getAssociateLeadHistoryByLeadId(
			AssociateLeadHistoryDTO associateLeadHistoryDTO);

	public Lead editLeadByLeadId(LeadDTO leadDTO);

}
