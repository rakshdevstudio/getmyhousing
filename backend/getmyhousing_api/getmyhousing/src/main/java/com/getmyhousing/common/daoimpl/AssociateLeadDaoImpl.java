package com.getmyhousing.common.daoimpl;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.AssociateLeadConverter;
import com.getmyhousing.common.dao.AssociateLeadDao;
import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.repository.AssociateLeadRepository;
import com.getmyhousing.common.repository.UserRoleRepository;

@Transactional
@Service("AssociateLeadDaoImpl")
public class AssociateLeadDaoImpl implements AssociateLeadDao {
	
	private Logger LOGGER = LoggerFactory.getLogger(AssociateLeadDaoImpl.class);
	
	@Autowired
	AssociateLeadRepository associateLeadsRepository;
	
	@Autowired
	UserRoleRepository userRoleRepository;

	@Override
	public AssociateLead saveAssociateLead(AssociateLeadDTO associateLeadDTO) {
		
		AssociateLead associateLead = AssociateLeadConverter.getAssociateLeadByAssociateLeadDTO(associateLeadDTO);
		return associateLeadsRepository.save(associateLead);
		
	}
	
	@Override
    public List<AssociateLead> getLeadsByUserIdAndRoles(AssociateLeadDTO associateLeadDTO) {
		Long userId = associateLeadDTO.getCreatedBy();

		List<UserRole> userRoles = userRoleRepository.findByUserId(userId);
		if (userRoles != null && !userRoles.isEmpty()) {
            boolean isAdmin = userRoles.stream().anyMatch(userRole -> userRole.getRole().equals("Admin"));
            if (isAdmin) {
                // If user has admin role, return all leads
                return associateLeadsRepository.findAll();
            } else {
                // Otherwise, return leads associated with the user
                return associateLeadsRepository.findByCreatedBy(userId);
            }
        }
        return null;
    }

	@Override
	public AssociateLead getAssociateLeadByLeadId(Long associateLeadId) {
		
		AssociateLead associateLead = associateLeadsRepository.findById(associateLeadId).orElse(null);
		
		return associateLead;
	}

	@Override
	public List<AssociateLead> getAllAssociateLeads(AssociateLeadDTO associatedLeadsDTO) {
		return associateLeadsRepository.findAll();
	}

	@Override
	public List<AssociateLead> getCreatedByAssociateLeads(AssociateLeadDTO associatedLeadsDTO) {
		return associateLeadsRepository.findByCreatedBy(associatedLeadsDTO.getUpdatedBy());
	}

	@Override
	public List<AssociateLead> getAssignedAssociateLeads(AssociateLeadDTO associatedLeadsDTO) {
		return associateLeadsRepository.findByAssignedTo(associatedLeadsDTO.getUpdatedBy());
	}

}
