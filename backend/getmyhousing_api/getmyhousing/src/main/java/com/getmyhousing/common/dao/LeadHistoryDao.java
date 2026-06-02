package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.AssociateLeadHistory;
import com.getmyhousing.common.domain.LeadHistory;
import com.getmyhousing.common.dto.AssociateLeadHistoryDTO;
import com.getmyhousing.common.dto.LeadHistoryDTO;

public interface LeadHistoryDao {

	public LeadHistory saveLeadHistory(LeadHistoryDTO leadHistoryDTO);

	public List<LeadHistory> getAllLeadHistory(LeadHistoryDTO leadHistoryDTO);

	public List<LeadHistory> saveAllLeadHistory(List<LeadHistoryDTO> leadHistoryDTOList);

	public List<AssociateLeadHistory> saveAllAssociateLeadHistory(List<AssociateLeadHistoryDTO> leadHistoryList);

//	public List<AssociateLeadHistory> getAllAssociateLeadHistory(AssociateLeadHistoryDTO associateLeadHistoryDTO);
}
