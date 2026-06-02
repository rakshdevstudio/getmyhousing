package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.domain.Lead;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.dto.LeadDTO;

public interface LeadDao {

	public Lead saveLead(LeadDTO leadDTO);

	public List<Lead> getAllLead(LeadDTO leadDTO);

	public Lead getLeadById(Long id);

	public List<LeadDTO> getAllLeadsByFilters(LeadDTO leadDTO);
	
	public List<LeadDTO> getAllLeadsByPropertyId(LeadDTO leadDTO);
	
	public List<LeadDTO> getAllLeadsAssignedToUser(LeadDTO leadDTO);
	
	public List<LeadDTO> getAllLeadsForAssociate(LeadDTO leadDTO);
	
	public List<LeadDTO> getUserLeads(LeadDTO leadDTO);

	public int getLeadCount(LeadDTO leadDTO);

	public List<LeadDTO> getLeadByUserId(Long id);

	public List<LeadDTO> getAllLeadsByUserId(LeadDTO leadDTO);

	public List<AssociateLead> getAllAssociateLead(AssociateLeadDTO dto, Long loginUserId);

	public AssociateLead saveAssociateLead(AssociateLeadDTO dbLead);

}
