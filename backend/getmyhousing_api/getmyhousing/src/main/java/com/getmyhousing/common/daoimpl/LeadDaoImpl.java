package com.getmyhousing.common.daoimpl;

import java.math.BigInteger;
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.AssociateLeadConverter;
import com.getmyhousing.common.converter.LeadConverter;
import com.getmyhousing.common.dao.LeadDao;
import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.domain.Lead;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.AssociateLeadRepository;
import com.getmyhousing.common.repository.LeadRepository;
import com.getmyhousing.common.repository.PropertiesRepository;
import com.getmyhousing.common.repository.UserRepository;
import com.getmyhousing.common.utils.DateUtils;

@Transactional
@Service("LeadDaoImpl")
public class LeadDaoImpl implements LeadDao {

	private Logger LOGGER = LoggerFactory.getLogger(LeadDaoImpl.class);

	@Autowired
	LeadRepository leadsRepository;
	
	@Autowired
	AssociateLeadRepository associateLeadRepository;

	@Autowired
	PropertiesRepository propertiesRepository;
	
	@Autowired
	UserRepository userRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public Lead saveLead(LeadDTO leadsDTO) {
	    Lead lead = LeadConverter.getLeadByLeadDTO(leadsDTO);
	    return leadsRepository.save(lead);
	}


	@Override
	public List<Lead> getAllLead(LeadDTO leadDTO) {
		List<Lead> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from Lead a where 1=1 ");

		if (null != leadDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != leadDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != leadDTO.getAssignedBy())
			sqlQuery.append(" AND a.assignedBy = :assignedBy");
		if (null != leadDTO.getAssignedDate())
			sqlQuery.append(" AND a.assignedDate = :assignedDate");
		if (null != leadDTO.getAssignedTo())
			sqlQuery.append(" AND a.assignedTo = :assignedTo");
		if (null != leadDTO.getCustomerName())
			sqlQuery.append(" AND a.customerName = :customerName");
		if (null != leadDTO.getEmail())
			sqlQuery.append(" AND a.email = :email");
		if (null != leadDTO.getLeadSource())
			sqlQuery.append(" AND a.leadSource = :leadSource");
		if (null != leadDTO.getLeadType())
			sqlQuery.append(" AND a.leadType = :leadType");
		if (null != leadDTO.getMobileNumber())
			sqlQuery.append(" AND a.mobileNumber= :mobileNumber");
		if (null != leadDTO.getPropertyId())
			sqlQuery.append(" AND a.propertyId = :propertyId");
		if (null != leadDTO.getNextFollowupDate())
			sqlQuery.append(" AND a.nextFollowupDate = :nextFollowupDate");
		if (null != leadDTO.getLeads() && leadDTO.getLeads().size() > 0)
			sqlQuery.append(" AND a.id IN :leads");

		sqlQuery.append(" order by a.id ASC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != leadDTO.getId())
			query.setParameter("id", leadDTO.getId());
		if (null != leadDTO.getStatus())
			query.setParameter("status", leadDTO.getStatus());
		if (null != leadDTO.getAssignedBy())
			query.setParameter("assignedBy", leadDTO.getAssignedBy());
		if (null != leadDTO.getAssignedDate())
			query.setParameter("assignedDate", leadDTO.getAssignedDate());
		if (null != leadDTO.getAssignedTo())
			query.setParameter("assignedTo", leadDTO.getAssignedTo());
		if (null != leadDTO.getCustomerName())
			query.setParameter("customerName", leadDTO.getCustomerName());
		if (null != leadDTO.getEmail())
			query.setParameter("email", leadDTO.getEmail());
		if (null != leadDTO.getLeadSource())
			query.setParameter("leadSource", leadDTO.getLeadSource());
		if (null != leadDTO.getLeadType())
			query.setParameter("leadType", leadDTO.getLeadType());
		if (null != leadDTO.getMobileNumber())
			query.setParameter("mobileNumber", leadDTO.getMobileNumber());
		if (null != leadDTO.getPropertyId())
			query.setParameter("propertyId", leadDTO.getPropertyId());
		if (null != leadDTO.getNextFollowupDate())
			query.setParameter("nextFollowupDate", leadDTO.getNextFollowupDate());
		if (null != leadDTO.getLeads() && leadDTO.getLeads().size() > 0)
			query.setParameter("leads", leadDTO.getLeads());

		returnList = query.getResultList();

		return returnList;

	}

//	@Override
//	public List<Lead> getLeadByUserId(Long id) {
//
//		List<Lead> db = leadsRepository.getLeadByUserId(id);
//
//		return db;
//	}

//	getLeadDTOByLead

	@Override
	public List<LeadDTO> getLeadByUserId(Long id) {

		LeadDTO leadDto = new LeadDTO();
		List<Lead> db = leadsRepository.getLeadByUserId(id);

		List<LeadDTO> leads = new ArrayList<>();
		for (Lead lead : db) {

			leadDto = LeadConverter.getLeadDTOByLead(lead);
			Long propertyId = leadDto.getPropertyId();

			Properties prop = propertiesRepository.findById(propertyId).get();

			leadDto.setBuildingType(prop.getBuildingType());
			leadDto.setListingType(prop.getListingType());
			leadDto.setPropertyType(prop.getPropertyType());
			leadDto.setState(prop.getState());
			leadDto.setCity(prop.getCity());

			leads.add(leadDto);
		}

		return leads;
	}

	@Override
	public List<LeadDTO> getAllLeadsByFilters(LeadDTO leadDTO) {
		List<LeadDTO> returnList = new ArrayList<LeadDTO>();
		StringBuilder sqlQuery = new StringBuilder("");

//      create column name 
		sqlQuery.append("SELECT leads.id, leads.customer_name, leads.mobile_number, leads.email, ");
		sqlQuery.append(
				" leads.created_date, leads.status, leads.assigned_to , leads.next_followup_date , leads.country_code , ");
		
		sqlQuery.append(" leads.lead_provider_id, leads.customer_district, leads.customer_state  ");

		sqlQuery.append(" , properties.listing_type, properties.building_type, properties.property_type, ");

		sqlQuery.append("properties.state, properties.city, leads.lead_source ");

		sqlQuery.append(" , users.full_name ");

		sqlQuery.append("FROM leads ");

		sqlQuery.append("LEFT JOIN properties ON leads.property_id = properties.id   ");



		sqlQuery.append("LEFT JOIN users ON leads.assigned_to = users.id   ");

		sqlQuery.append("WHERE 1=1 and lead_type='Customer' ");

		if (null != leadDTO.getId())
			sqlQuery.append(" AND leads.id=" + leadDTO.getId());

		if (null != leadDTO.getCustomerName())
			sqlQuery.append(" AND leads.customer_name = '" + leadDTO.getCustomerName() + "'");

		if (null != leadDTO.getMobileNumber())
			sqlQuery.append(" AND leads.mobile_number=" + leadDTO.getMobileNumber());

		if (null != leadDTO.getEmail())
			sqlQuery.append(" AND leads.email = '" + leadDTO.getEmail() + "'");

		if (null != leadDTO.getLeadStartDate() && null != leadDTO.getLeadEndDate()) {
			sqlQuery.append(" AND leads.created_date >= '" + leadDTO.getLeadStartDate()
					+ " 00:00:00' AND leads.created_date <= '" + leadDTO.getLeadEndDate() + " 23:59:59'");
		}

		if (null != leadDTO.getStatus())
			sqlQuery.append(" AND leads.status = '" + leadDTO.getStatus() + "'");

		if (null != leadDTO.getAssignedTo())
			sqlQuery.append(" AND leads.assigned_to = " + leadDTO.getAssignedTo());

		if (null != leadDTO.getNextFollowupStartDate() && null != leadDTO.getNextFollowupEndDate()) {
			sqlQuery.append(" AND leads.next_followup_date BETWEEN  '" + leadDTO.getNextFollowupStartDate() + "' AND '"
					+ leadDTO.getNextFollowupEndDate() + "'");
		}

		if (null != leadDTO.getCountryCode())
			sqlQuery.append(" AND leads.country_code = " + leadDTO.getCountryCode());
		
		if (null != leadDTO.getLeadProviderId())
			sqlQuery.append(" AND leads.lead_provider_id = " + leadDTO.getLeadProviderId());

		if (null != leadDTO.getListingType())
			sqlQuery.append(" AND properties.listing_type = '" + leadDTO.getListingType() + "'");

		if (null != leadDTO.getBuildingType())
			sqlQuery.append(" AND properties.building_type = '" + leadDTO.getBuildingType() + "'");

		if (null != leadDTO.getPropertyType())
			sqlQuery.append(" AND properties.property_type = '" + leadDTO.getPropertyType() + "'");

		if (null != leadDTO.getState())
			sqlQuery.append(" AND properties.state = '" + leadDTO.getState() + "'");

		if (null != leadDTO.getCity())
			sqlQuery.append(" AND properties.city = '" + leadDTO.getCity() + "'");

		if (null != leadDTO.getAssignedToName())
			sqlQuery.append(" AND users.full_name = '" + leadDTO.getAssignedToName() + "'");

		sqlQuery.append(" ORDER BY ").append(" leads.id DESC");
//		sqlQuery.append(" LIMIT ").append(leadDTO.getLimit()).append(" OFFSET ").append(leadDTO.getOffset());

		sqlQuery.append(";");
		
		Query query = entityManager.createNativeQuery(sqlQuery.toString());

		try {
	        List<Object[]> retList = query.getResultList();
	        LeadDTO dbLeadDTO = null;
	        for (Object[] object : retList) {
	            dbLeadDTO = new LeadDTO();
	            dbLeadDTO.setId(Long.parseLong(String.valueOf(object[0])));

	            if (null != object[1])
	                dbLeadDTO.setCustomerName(String.valueOf(object[1]));

	            if (null != object[2])
	                dbLeadDTO.setMobileNumber(String.valueOf(object[2]));

	            if (null != object[3])
	                dbLeadDTO.setEmail(String.valueOf(object[3]));

	            if (null != object[4])
	                dbLeadDTO.setCreatedDate(String.valueOf(object[4]));

	            if (null != object[5])
	                dbLeadDTO.setStatus(String.valueOf(object[5]));

	            if (null != object[6])
	                dbLeadDTO.setAssignedTo(Long.parseLong(String.valueOf(object[6])));

	            if (null != object[7])
	                dbLeadDTO.setNextFollowupDate(String.valueOf(object[7]));

	            if (null != object[8])
	                dbLeadDTO.setCountryCode(String.valueOf(object[8]));

	            if (null != object[9])
	                dbLeadDTO.setLeadProviderId(Long.parseLong(String.valueOf(object[9])));
	            
	         // Add customer_district and customer_state
	            if (null != object[10])
	                dbLeadDTO.setCustomerDistrict(String.valueOf(object[10]));

	            if (null != object[11])
	                dbLeadDTO.setCustomerState(String.valueOf(object[11]));

	            int propertyIndex = 12; // The index where properties data starts

	            if (null != object[propertyIndex])
	                dbLeadDTO.setListingType(String.valueOf(object[propertyIndex]));

	            if (null != object[propertyIndex + 1])
	                dbLeadDTO.setBuildingType(String.valueOf(object[propertyIndex + 1]));

	            if (null != object[propertyIndex + 2])
	                dbLeadDTO.setPropertyType(String.valueOf(object[propertyIndex + 2]));

	            if (null != object[propertyIndex + 3])
	                dbLeadDTO.setState(String.valueOf(object[propertyIndex + 3]));

	            if (null != object[propertyIndex + 4])
	                dbLeadDTO.setCity(String.valueOf(object[propertyIndex + 4]));

	            if (null != object[propertyIndex + 5]) // lead_source is at index 15 (10 + 5)
	                dbLeadDTO.setLeadSource(String.valueOf(object[propertyIndex + 5]));

	            if (null != object[propertyIndex + 6])
	                dbLeadDTO.setAssignedToName(String.valueOf(object[propertyIndex + 6]));

	            returnList.add(dbLeadDTO);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }

		return returnList;
	}
	
	@Override
	public List<LeadDTO> getAllLeadsByPropertyId(LeadDTO leadDTO) {
	    
	    List<Lead> allLeadsByPropertyId = leadsRepository.findAllByPropertyId(leadDTO.getPropertyId());
	    
	    return allLeadsByPropertyId.stream()
	        .map(lead -> {
	            LeadDTO dto = LeadConverter.getLeadDTOByLead(lead);
	            dto.setMobileNumber(frontMaskMobileNumber(dto.getMobileNumber()));
	            return dto;
	        })
	        .collect(Collectors.toList());
	}
	
	private String frontMaskMobileNumber(String mobileNumber) {
	    if (mobileNumber != null && mobileNumber.length() >= 5) {
	        return "*****" + mobileNumber.substring(5);
	    }
	    return mobileNumber; // Return as-is if the number is null or shorter than 5 digits
	}
	
	@Override
	public List<LeadDTO> getAllLeadsForAssociate(LeadDTO leadDTO) {
		
		Long userId = leadDTO.getUserId();
		
		List<LeadDTO> returnList = new ArrayList<>();
		
		List<Properties> userIdProperties = propertiesRepository.findAllByCreatedBy(userId);
		
		for(Properties property : userIdProperties) {
			Long propertyId = property.getId();
			
			List<Lead> leads = leadsRepository.findAllByPropertyId(propertyId);
			
			for(Lead lead : leads) {
				LeadDTO leadConverted = LeadConverter.getLeadDTOByLead(lead);
				
				// Mask the mobile number
	            String maskedMobile = backMaskMobileNumber(leadConverted.getMobileNumber());
	            leadConverted.setMobileNumber(maskedMobile);
				
				// Print original and masked mobile number in console
	            System.out.println("Original: " + lead.getMobileNumber() + " -> Masked: " + maskedMobile);
				
				returnList.add(leadConverted);
			}
		}
		
		return returnList;
	}
	
	private String backMaskMobileNumber(String mobileNumber) {
	    if (mobileNumber != null && mobileNumber.length() > 5) {
	        return mobileNumber.substring(0, mobileNumber.length() - 5) + "*****";
	    }
	    return mobileNumber; // Return as-is if the number is null or shorter than 5 digits
	}

	@Override
	public List<LeadDTO> getAllLeadsAssignedToUser(LeadDTO leadDTO) {
		
		List<Lead> listLeadsDb = leadsRepository.findAllByAssignedTo(leadDTO.getUserId());
		
		List<LeadDTO> returnList = new ArrayList<>();
		
		for(Lead lead : listLeadsDb) {
			User userFullNameAssignedBy = userRepository.findById(lead.getAssignedBy()).get();
			
			User userFullNameAssignedTo = userRepository.findById(lead.getAssignedTo()).get();
			
			Properties propertyDetail = propertiesRepository.findById(lead.getPropertyId()).get();
			
			LeadDTO converted = LeadConverter.getLeadDTOByLead(lead);
			
			converted.setAssignedByName(userFullNameAssignedBy.getFullName());
			
			converted.setAssignedToName(userFullNameAssignedTo.getFullName());
			
			converted.setBuildingType(propertyDetail.getBuildingType());
			
			converted.setLeadSource(propertyDetail.getPropertyType());
			
			converted.setPropertyType(propertyDetail.getPropertyType());
			
			converted.setListingType(propertyDetail.getListingType());
			
			returnList.add(converted);
		}
		
		return returnList;
	}
	
//	it is used for getting own leads of customer
	@Override
	public List<LeadDTO> getAllLeadsByUserId(LeadDTO leadDTO) {
		List<LeadDTO> returnList = new ArrayList<>();
		
		StringBuilder sqlQuery = new StringBuilder("");

//      create column name 
		sqlQuery.append("SELECT leads.id, leads.customer_name, leads.mobile_number, leads.email, ");
		sqlQuery.append(
				" leads.created_date, leads.status, leads.assigned_to , leads.next_followup_date , leads.country_code , ");
		
		sqlQuery.append(" leads.lead_provider_id  ");

		sqlQuery.append(" , properties.listing_type, properties.building_type, properties.property_type, ");

		sqlQuery.append("properties.state, properties.city ");

		sqlQuery.append(" , users.full_name ");

		sqlQuery.append("FROM leads ");

		sqlQuery.append("LEFT JOIN properties ON leads.property_id = properties.id   ");

		sqlQuery.append("LEFT JOIN users ON leads.assigned_to = users.id   ");
		
		sqlQuery.append("WHERE 1=1 and leads.assigned_to = " + leadDTO.getUserId() + " and leads.lead_type='Customer' ");
	
		
		if (null != leadDTO.getId())
			sqlQuery.append(" AND leads.id=" + leadDTO.getId());

		if (null != leadDTO.getCustomerName())
			sqlQuery.append(" AND leads.customer_name = '" + leadDTO.getCustomerName() + "'");

		if (null != leadDTO.getMobileNumber())
			sqlQuery.append(" AND leads.mobile_number=" + leadDTO.getMobileNumber());

		if (null != leadDTO.getEmail())
			sqlQuery.append(" AND leads.email = '" + leadDTO.getEmail() + "'");

		if (null != leadDTO.getLeadStartDate() && null != leadDTO.getLeadEndDate()) {
			sqlQuery.append(" AND leads.created_date >= '" + leadDTO.getLeadStartDate()
					+ " 00:00:00' AND leads.created_date <= '" + leadDTO.getLeadEndDate() + " 23:59:59'");
		}

		if (null != leadDTO.getStatus())
			sqlQuery.append(" AND leads.status = '" + leadDTO.getStatus() + "'");

		if (null != leadDTO.getAssignedTo())
			sqlQuery.append(" AND leads.assigned_to = " + leadDTO.getAssignedTo());

		if (null != leadDTO.getNextFollowupStartDate() && null != leadDTO.getNextFollowupEndDate()) {
			sqlQuery.append(" AND leads.next_followup_date BETWEEN  '" + leadDTO.getNextFollowupStartDate() + "' AND '"
					+ leadDTO.getNextFollowupEndDate() + "'");
		}

		if (null != leadDTO.getCountryCode())
			sqlQuery.append(" AND leads.country_code = " + leadDTO.getCountryCode());
		
		
		if (null != leadDTO.getLeadProviderId())
			sqlQuery.append(" AND leads.lead_provider_id = " + leadDTO.getLeadProviderId());

		if (null != leadDTO.getListingType())
			sqlQuery.append(" AND properties.listing_type = '" + leadDTO.getListingType() + "'");

		if (null != leadDTO.getBuildingType())
			sqlQuery.append(" AND properties.building_type = '" + leadDTO.getBuildingType() + "'");

		if (null != leadDTO.getPropertyType())
			sqlQuery.append(" AND properties.property_type = '" + leadDTO.getPropertyType() + "'");

		if (null != leadDTO.getState())
			sqlQuery.append(" AND properties.state = '" + leadDTO.getState() + "'");

		if (null != leadDTO.getCity())
			sqlQuery.append(" AND properties.city = '" + leadDTO.getCity() + "'");

		if (null != leadDTO.getAssignedToName())
			sqlQuery.append(" AND users.full_name = '" + leadDTO.getAssignedToName() + "'");

		sqlQuery.append(" ORDER BY ").append(" leads.id DESC");
//		sqlQuery.append(" LIMIT ").append(leadDTO.getLimit()).append(" OFFSET ").append(leadDTO.getOffset());

		sqlQuery.append(";");

//		System.out.println(" Z5 leadDTO.getUserId() "+ leadDTO.getUserId());
//		System.out.println(" Z6 leadDTO.() "+ leadDTO);
//
//		System.out.println(" Z7 sqlQuery "+ sqlQuery);
		
		try {

			Query query = entityManager.createNativeQuery(sqlQuery.toString());

			List<Object[]> retList = query.getResultList();
			LeadDTO dbLeadDTO = null;
			for (Object[] object : retList) {

				dbLeadDTO = new LeadDTO();
				dbLeadDTO.setId(Long.parseLong(String.valueOf(object[0])));

				if (null != object[1])
					dbLeadDTO.setCustomerName(String.valueOf(object[1]));

				if (null != object[2])
					dbLeadDTO.setMobileNumber(String.valueOf(object[2]));

				if (null != object[3])
					dbLeadDTO.setEmail(String.valueOf(object[3]));

				if (null != object[4])
					dbLeadDTO.setCreatedDate(String.valueOf(object[4]));

				if (null != object[5])
					dbLeadDTO.setStatus(String.valueOf(object[5]));

				if (null != object[6])
					dbLeadDTO.setAssignedTo(Long.parseLong(String.valueOf(object[6])));

				if (null != object[7])
					dbLeadDTO.setNextFollowupDate(String.valueOf(object[7]));

				if (null != object[8])
					dbLeadDTO.setCountryCode(String.valueOf(object[8]));
				
				if (null != object[9])
					dbLeadDTO.setLeadProviderId(Long.parseLong(String.valueOf(object[9])));

				int propertyIndex = 10; // The index where properties data starts

				if (null != object[propertyIndex])
					dbLeadDTO.setListingType(String.valueOf(object[propertyIndex]));

				if (null != object[propertyIndex + 1])
					dbLeadDTO.setBuildingType(String.valueOf(object[propertyIndex + 1]));

				if (null != object[propertyIndex + 2])
					dbLeadDTO.setPropertyType(String.valueOf(object[propertyIndex + 2]));

				if (null != object[propertyIndex + 3])
					dbLeadDTO.setState(String.valueOf(object[propertyIndex + 3]));

				if (null != object[propertyIndex + 4])
					dbLeadDTO.setCity(String.valueOf(object[propertyIndex + 4]));

				if (null != object[propertyIndex + 5])
					dbLeadDTO.setAssignedToName(String.valueOf(object[propertyIndex + 5]));

				returnList.add(dbLeadDTO);
			}

		} catch (Exception e) {
			e.printStackTrace(); // Or log the exception
		}

		return returnList;
	}

	/**
	 * To get lead count based on filters
	 * 
	 */
	@Override
	public int getLeadCount(LeadDTO leadDTO) {
		StringBuilder sqlQuery = new StringBuilder("");
		sqlQuery.append("SELECT COUNT(*) FROM leads l ");
		sqlQuery.append("LEFT JOIN properties p ON p.id = l.property_id ");
		sqlQuery.append("LEFT JOIN users u ON u.id = l.assigned_to ");
		sqlQuery.append("WHERE 1=1 ");

		// Filters
		if (null != leadDTO.getId())
			sqlQuery.append(" AND id=" + leadDTO.getId());

		if (null != leadDTO.getPropertyId())
			sqlQuery.append(" AND property_id = '" + leadDTO.getPropertyId() + "'");

		if (null != leadDTO.getStatus())
			sqlQuery.append(" AND l.status = '" + leadDTO.getStatus() + "'");

		if (null != leadDTO.getState())
			sqlQuery.append(" AND p.state = '" + leadDTO.getState() + "'");

		if (null != leadDTO.getCity())
			sqlQuery.append(" AND p.city = '" + leadDTO.getCity() + "'");

		if (null != leadDTO.getCustomerName())
			sqlQuery.append(" AND customer_name = '" + leadDTO.getCustomerName() + "'");

		if (null != leadDTO.getLeadType())
			sqlQuery.append(" AND lead_type = '" + leadDTO.getLeadType() + "'");

		if (null != leadDTO.getAssignedBy())
			sqlQuery.append(" AND assigned_by = '" + leadDTO.getAssignedBy() + "'");

		if (null != leadDTO.getAssignedToName())
			sqlQuery.append(" AND u.full_name = '" + leadDTO.getAssignedToName() + "'");

		if (null != leadDTO.getBuildingType())
			sqlQuery.append(" AND p.building_type = '" + leadDTO.getBuildingType() + "'");

		if (null != leadDTO.getListingType())
			sqlQuery.append(" AND p.listing_type = '" + leadDTO.getListingType() + "'");

		if (null != leadDTO.getEmail())
			sqlQuery.append(" AND email = '" + leadDTO.getEmail() + "'");

		if (null != leadDTO.getMobileNumber())
			sqlQuery.append(" AND mobile_number=" + leadDTO.getMobileNumber());

		if (null != leadDTO.getLeadSource())
			sqlQuery.append(" AND lead_source = '" + leadDTO.getLeadSource() + "'");

		if (null != leadDTO.getAssignedDate())
			sqlQuery.append(" AND assigned_date = '" + leadDTO.getAssignedDate() + "'");

		if (null != leadDTO.getPropertyType())
			sqlQuery.append(" AND p.property_type = '" + leadDTO.getPropertyType() + "'");

		if (leadDTO.isUnAssignedFlag()) {
			sqlQuery.append(" AND assigned_to is null ");
		} else {
			if (null != leadDTO.getAssignedTo())
				sqlQuery.append(" AND assigned_to = " + leadDTO.getAssignedTo());
		}

		if (null != leadDTO.getLeadStartDate() && null != leadDTO.getLeadEndDate()) {
			sqlQuery.append(" AND created_date >= '" + leadDTO.getLeadStartDate() + " 00:00:00' AND created_date <= '"
					+ leadDTO.getLeadEndDate() + " 23:59:59'");
		}

		if (null != leadDTO.getNextFollowupStartDate() && null != leadDTO.getNextFollowupEndDate()) {
			sqlQuery.append(" AND next_followup_date BETWEEN  '" + leadDTO.getNextFollowupStartDate() + "' AND '"
					+ leadDTO.getNextFollowupEndDate() + "'");
		}

		Query query = entityManager.createNativeQuery(sqlQuery.toString());

		// Execute the query and get count
		BigInteger countResult = (BigInteger) query.getSingleResult();
		int count = countResult.intValue(); // Convert BigInteger to int
		LOGGER.info("LeadsCount: " + count);

		return count;
	}

	@Override
	public Lead getLeadById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	
//	@Override
//	public List<AssociateLead> getAllAssociateLead(AssociateLeadDTO associateLeadDTO) {
//		List<AssociateLead> returnList = null;
//		StringBuffer sqlQuery = new StringBuffer("from Lead a where 1=1 ");
//
//		if (null != associateLeadDTO.getId())
//			sqlQuery.append(" AND a.id = :id");
//		if (null != associateLeadDTO.getStatus())
//			sqlQuery.append(" AND a.status = :status");
//		if (null != associateLeadDTO.getAssignedBy())
//			sqlQuery.append(" AND a.assignedBy = :assignedBy");
//		if (null != associateLeadDTO.getAssignedDate())
//			sqlQuery.append(" AND a.assignedDate = :assignedDate");
//		if (null != associateLeadDTO.getAssignedTo())
//			sqlQuery.append(" AND a.assignedTo = :assignedTo");
//		if (null != associateLeadDTO.getCustomerName())
//			sqlQuery.append(" AND a.customerName = :customerName");
//		if (null != associateLeadDTO.getEmail())
//			sqlQuery.append(" AND a.email = :email");
////		if (null != associateLeadDTO.getLeadSource())
////			sqlQuery.append(" AND a.leadSource = :leadSource");
////		if (null != associateLeadDTO.getLeadType())
////			sqlQuery.append(" AND a.leadType = :leadType");
//		if (null != associateLeadDTO.getMobileNumber())
//			sqlQuery.append(" AND a.mobileNumber= :mobileNumber");
////		if (null != associateLeadDTO.getPropertyId())
////			sqlQuery.append(" AND a.propertyId = :propertyId");
////		if (null != associateLeadDTO.getNextFollowupDate())
////			sqlQuery.append(" AND a.nextFollowupDate = :nextFollowupDate");
//		if (null != associateLeadDTO.getAssociateLeads() && associateLeadDTO.getAssociateLeads().size() > 0)
//			sqlQuery.append(" AND a.id IN :leads");
//
//		sqlQuery.append(" order by a.id ASC");
//		Query query = entityManager.createQuery(sqlQuery.toString());
//
//		if (null != associateLeadDTO.getId())
//			query.setParameter("id", associateLeadDTO.getId());
//		if (null != associateLeadDTO.getStatus())
//			query.setParameter("status", associateLeadDTO.getStatus());
//		if (null != associateLeadDTO.getAssignedBy())
//			query.setParameter("assignedBy", associateLeadDTO.getAssignedBy());
//		if (null != associateLeadDTO.getAssignedDate())
//			query.setParameter("assignedDate", associateLeadDTO.getAssignedDate());
//		if (null != associateLeadDTO.getAssignedTo())
//			query.setParameter("assignedTo", associateLeadDTO.getAssignedTo());
//		if (null != associateLeadDTO.getCustomerName())
//			query.setParameter("customerName", associateLeadDTO.getCustomerName());
//		if (null != associateLeadDTO.getEmail())
//			query.setParameter("email", associateLeadDTO.getEmail());
////		if (null != associateLeadDTO.getLeadSource())
////			query.setParameter("leadSource", associateLeadDTO.getLeadSource());
////		if (null != associateLeadDTO.getLeadType())
////			query.setParameter("leadType", associateLeadDTO.getLeadType());
//		if (null != associateLeadDTO.getMobileNumber())
//			query.setParameter("mobileNumber", associateLeadDTO.getMobileNumber());
////		if (null != associateLeadDTO.getPropertyId())
////			query.setParameter("propertyId", associateLeadDTO.getPropertyId());
////		if (null != associateLeadDTO.getNextFollowupDate())
////			query.setParameter("nextFollowupDate", associateLeadDTO.getNextFollowupDate());
//		if (null != associateLeadDTO.getAssociateLeads() && associateLeadDTO.getAssociateLeads().size() > 0)
//			query.setParameter("leads", associateLeadDTO.getAssociateLeads());
//
//		returnList = query.getResultList();
//
//		return returnList;
//
//	}
//	
	
	
//	ravi
	@Override
	public List<AssociateLead> getAllAssociateLead(AssociateLeadDTO associateLeadDTO ,  Long loginUserId) {
		List<AssociateLead> returnList = new ArrayList<>();
		
		List<Long> associateLeads = associateLeadDTO.getAssociateLeads();
		Long assignedTo = associateLeadDTO.getAssignedTo();
		
		
		for (Long associateLeadId : associateLeads) {
			
			
			AssociateLead associateLead2 = new AssociateLead();
			AssociateLead associateLead = associateLeadRepository.findById(associateLeadId).get();
			
			
			associateLead2.setId(associateLeadId);
			associateLead2.setAssignedBy(loginUserId);
			associateLead2.setAssignedDate(DateUtils.currentDate());
			associateLead2.setAssignedTo(assignedTo);
			associateLead2.setBestTimeToCall(associateLead.getBestTimeToCall());
			associateLead2.setCreatedBy(associateLead.getCreatedBy());
			associateLead2.setCreatedDate(associateLead.getCreatedDate());
			associateLead2.setCustomerName(associateLead.getCustomerName());
			associateLead2.setEmail(associateLead.getEmail());
			associateLead2.setImagePath(associateLead.getImagePath());
			associateLead2.setLandmark(associateLead.getLandmark());
			associateLead2.setLocation(associateLead.getLocation());
			associateLead2.setMobileNumber(associateLead.getMobileNumber());
			associateLead2.setStatus(associateLead.getStatus());
			associateLead2.setTypeOfLead(associateLead.getTypeOfLead());
			associateLead2.setUpdatedBy(loginUserId);
			associateLead2.setUpdatedDate(DateUtils.currentDate());
			
			associateLeadRepository.save(associateLead2);
			returnList.add(associateLead2);
			
		}

		return returnList;

	}
	
	
	@Override
	public AssociateLead saveAssociateLead(AssociateLeadDTO associateLeadDTO) {

		AssociateLead associateLead = AssociateLeadConverter.getAssociateLeadByAssociateLeadDTO(associateLeadDTO);

		return associateLeadRepository.save(associateLead);
	}

	@Override
	public List<LeadDTO> getUserLeads(LeadDTO leadDTO) {
		
		List<Lead> returnlist = leadsRepository.findAllByLeadProviderId(leadDTO.getUserId());
		
		List<LeadDTO> returnlistDto = returnlist.stream().map((lead)-> LeadConverter.getLeadDTOByLead(lead)).collect(Collectors.toList());
		
		return returnlistDto;
	}

}
