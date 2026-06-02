package com.getmyhousing.common.daoimpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.AssociateLeadHistoryConverter;
import com.getmyhousing.common.converter.LeadHistoryConverter;
import com.getmyhousing.common.dao.LeadHistoryDao;
import com.getmyhousing.common.domain.AssociateLeadHistory;
import com.getmyhousing.common.domain.LeadHistory;
import com.getmyhousing.common.dto.AssociateLeadHistoryDTO;
import com.getmyhousing.common.dto.LeadHistoryDTO;
import com.getmyhousing.common.repository.AssociateLeadHistoryRepository;
import com.getmyhousing.common.repository.AssociateLeadRepository;
import com.getmyhousing.common.repository.LeadHistoryRepository;

@Transactional
@Service("LeadHistoryDaoImpl")
public class LeadHistoryDaoImpl implements LeadHistoryDao {

	private Logger LOGGER = LoggerFactory.getLogger(LeadHistoryDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private LeadHistoryRepository leadHistoryRepository;
	
	@Autowired
	private AssociateLeadHistoryRepository associateLeadHistoryRepository;


	@Override
	public LeadHistory saveLeadHistory(LeadHistoryDTO leadHistoryDTO) {
		LeadHistory leadHistory = LeadHistoryConverter.getLeadHistoryByLeadHistoryDTO(leadHistoryDTO);
		return leadHistoryRepository.save(leadHistory);
	}

	@Override
	public List<LeadHistory> getAllLeadHistory(LeadHistoryDTO leadHistoryDTO) {
		List<LeadHistory> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from LeadHistory a where 1=1");

		if (null != leadHistoryDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != leadHistoryDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != leadHistoryDTO.getLeadId())
			sqlQuery.append(" AND a.leadId = :leadId");

		sqlQuery.append(" ORDER by a.id DESC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != leadHistoryDTO.getId())
			query.setParameter("id", leadHistoryDTO.getId());
		if (null != leadHistoryDTO.getStatus())
			query.setParameter("status", leadHistoryDTO.getStatus());
		if (null != leadHistoryDTO.getLeadId())
			query.setParameter("leadId", leadHistoryDTO.getLeadId());

		// query.setFirstResult(userDTO.getOffset());
		/// query.setMaxResults(userDTO.getLimit());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public List<LeadHistory> saveAllLeadHistory(List<LeadHistoryDTO> leadHistoryDTOList) {
		List<LeadHistory> leadHistoryList = new ArrayList<LeadHistory>();
		for (LeadHistoryDTO leadHistoryDTO : leadHistoryDTOList) {
			leadHistoryList.add(LeadHistoryConverter.getLeadHistoryByLeadHistoryDTO(leadHistoryDTO));
		}
		leadHistoryList = leadHistoryRepository.saveAll(leadHistoryList);
		return leadHistoryList;
	}
	
	@Override
	public List<AssociateLeadHistory> saveAllAssociateLeadHistory(List<AssociateLeadHistoryDTO> associateLeadHistoryDTOList) {
		List<AssociateLeadHistory> leadHistoryList = new ArrayList<AssociateLeadHistory>();
		for (AssociateLeadHistoryDTO associateLeadHistoryDTO : associateLeadHistoryDTOList) {
			leadHistoryList.add(AssociateLeadHistoryConverter.getAssociateLeadHistoryByAssociateLeadHistoryDTO(associateLeadHistoryDTO));
		}
		leadHistoryList = associateLeadHistoryRepository.saveAll(leadHistoryList);
		return leadHistoryList;
	}

	
	
	
//	@Override
//	public List<LeadHistory> getAllLeadHistory(LeadHistoryDTO leadHistoryDTO) {
//		List<LeadHistory> returnList = null;
//		StringBuffer sqlQuery = new StringBuffer("from LeadHistory a where 1=1");
//
//		if (null != leadHistoryDTO.getId())
//			sqlQuery.append(" AND a.id = :id");
//		if (null != leadHistoryDTO.getStatus())
//			sqlQuery.append(" AND a.status = :status");
//		if (null != leadHistoryDTO.getLeadId())
//			sqlQuery.append(" AND a.leadId = :leadId");
//
//		sqlQuery.append(" ORDER by a.id DESC");
//		Query query = entityManager.createQuery(sqlQuery.toString());
//
//		if (null != leadHistoryDTO.getId())
//			query.setParameter("id", leadHistoryDTO.getId());
//		if (null != leadHistoryDTO.getStatus())
//			query.setParameter("status", leadHistoryDTO.getStatus());
//		if (null != leadHistoryDTO.getLeadId())
//			query.setParameter("leadId", leadHistoryDTO.getLeadId());
//
//
//		returnList = query.getResultList();
//
//		return returnList;
//	}
//	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
