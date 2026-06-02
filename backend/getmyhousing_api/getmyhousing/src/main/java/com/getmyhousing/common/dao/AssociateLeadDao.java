package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.dto.AssociateLeadDTO;

public interface AssociateLeadDao {

	public AssociateLead saveAssociateLead(AssociateLeadDTO associateLeadDTO);
	
	List<AssociateLead> getLeadsByUserIdAndRoles(AssociateLeadDTO associateLeadDTO);
	
	List<AssociateLead> getAllAssociateLeads(AssociateLeadDTO associatedLeadsDTO);
	
	List<AssociateLead> getCreatedByAssociateLeads(AssociateLeadDTO associatedLeadsDTO);
	
	List<AssociateLead> getAssignedAssociateLeads(AssociateLeadDTO associatedLeadsDTO);

	public AssociateLead getAssociateLeadByLeadId(Long associateLeadId);
	
}
