package com.getmyhousing.rental.serviceimpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.getmyhousing.common.cache.UserCache;
import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.AssociateLeadConverter;
import com.getmyhousing.common.converter.AssociateLeadHistoryConverter;
import com.getmyhousing.common.converter.LeadConverter;
import com.getmyhousing.common.converter.LeadHistoryConverter;
import com.getmyhousing.common.dao.AssociateLeadDao;
import com.getmyhousing.common.dao.LeadDao;
import com.getmyhousing.common.dao.LeadHistoryDao;
import com.getmyhousing.common.dao.UserDao;
import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.domain.AssociateLeadHistory;
import com.getmyhousing.common.domain.Lead;
import com.getmyhousing.common.domain.LeadHistory;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.dto.AssociateLeadHistoryDTO;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.dto.LeadHistoryDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.exception.UnAuthorizedException;
import com.getmyhousing.common.repository.AssociateLeadHistoryRepository;
import com.getmyhousing.common.repository.AssociateLeadRepository;
import com.getmyhousing.common.repository.LeadHistoryRepository;
import com.getmyhousing.common.repository.LeadRepository;
import com.getmyhousing.common.repository.PropertiesRepository;
import com.getmyhousing.common.repository.UserPackagesRepository;
import com.getmyhousing.common.repository.UserRepository;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.validator.RoleEnum;
import com.getmyhousing.rental.service.LeadService;

@Service("LeadServiceImpl")
public class LeadServiceImpl implements LeadService {

	private Logger LOGGER = LoggerFactory.getLogger(LeadServiceImpl.class);

	LinkedHashMap<String, Object> returnMap = null;

	@Resource(name = "LeadDaoImpl")
	private LeadDao leadDao;

	@Resource(name = "UserDaoImpl")
	private UserDao userDao;

	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;

	@Resource(name = "LeadHistoryDaoImpl")
	private LeadHistoryDao leadHistoryDao;
	
	@Resource(name = "AssociateLeadDaoImpl")
	AssociateLeadDao associateLeadDao;

	@Autowired
	UserCache userCache;

	@Autowired
	LeadRepository leadRepo;

	@Autowired
	private PropertiesRepository propertiesRepository;

	@Autowired
	private UserPackagesRepository userPackagesRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AssociateLeadRepository associateLeadRepository;

	@Autowired
	private AssociateLeadHistoryRepository associateLeadHistoryRepository;

	@Autowired
	private LeadHistoryRepository leadHistoryRepository;
	
	@Autowired
	LeadRepository leadsRepository;

	@Override
	public void addLead(LeadDTO leadDTO) {
	    // Check for existing lead with the same email, phone number, and property ID
	    if (!StringUtils.isEmpty(leadDTO.getEmail()) && 
	        !StringUtils.isEmpty(leadDTO.getMobileNumber()) && 
	        leadDTO.getPropertyId() != null) {

	        List<Lead> existingLeads = leadsRepository.findByEmailAndMobileNumberAndPropertyId(
	            leadDTO.getEmail(), leadDTO.getMobileNumber(), leadDTO.getPropertyId());

	        if (!existingLeads.isEmpty()) {
	            throw new FieldException("A lead with the same email, phone number, and property ID already exists.");
	        }
	    }

	    // Save for leadType = customer
	    leadDTO.setLeadType(Constant.LEAD_TYPE_CUSTOMER);

	    // if lead is coming from property
	    if (!StringUtils.isEmpty(leadDTO.getPropertyId())) {
	        Long propertyId = leadDTO.getPropertyId();
	        Optional<Properties> propertiesOpt = propertiesRepository.findById(propertyId);

	        if (propertiesOpt.isPresent()) {
	            Properties properties = propertiesOpt.get();
	            Long propertyPostedUserId = properties.getCreatedBy();
	            leadDTO.setGettingLeadByProperty(propertyPostedUserId);
	        } else {
	            throw new FieldException("Property not found for ID: " + propertyId);
	        }
	    } else {
	        leadDTO.setPropertyId(null);
	    }

	    leadDao.saveLead(leadDTO);
	}


	@Override
	public LeadDTO getLeadByUserId(LeadDTO leadDTO) {

//		leadDTO.setId(33L);
//		return leadDao.getLeadByUserId(leadDTO.getId());
		Optional<Lead> leadOptional = leadRepo.findById(leadDTO.getId());

		if (leadOptional.isPresent()) {
			Lead lead = leadOptional.get();
			// Map the Lead entity to LeadDTO
			LeadDTO leadDto = LeadConverter.getLeadDTOByLead(lead);
			// Add other fields as necessary
			String assignedTofullName = "";
			if (lead.getAssignedTo() != null) {
				Long assignedToId = lead.getAssignedTo();
				User assignedToUser = userRepository.findById(assignedToId).get();
				assignedTofullName = assignedToUser.getFullName();

			}

			String assignedByfullName = "";
			if (lead.getAssignedBy() != null) {
				Long assignedById = lead.getAssignedBy();
				User assignedByUser = userRepository.findById(assignedById).get();
				assignedByfullName = assignedByUser.getFullName();

			}

			leadDto.setAssignedToName(assignedTofullName);
			leadDto.setAssignedByName(assignedByfullName);

			return leadDto;
		}

		return null;
	}

	@Override
	public void updateLead(LeadDTO leadDTO) {
		List<UserRole> roles = loginService.getAllUserRoles(leadDTO.getUpdatedBy());
		boolean adminAcccess = roles.stream()
				.anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole())
						|| x.getRole().equals(RoleEnum.TEAM_LEADER.getRole())
						|| x.getRole().equals(RoleEnum.TELECALLER.getRole()));
		if (!adminAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permission to update Lead Details.");

		// Check leadId is present in db or not
		Lead lead = leadDao.getLeadById(leadDTO.getId());
		LeadDTO dbLeadDTO = LeadConverter.getLeadDTOByLead(lead);

		boolean leadDataChangeFlag = false;

		// Check status changes with with previous status
		if (null != leadDTO.getStatus() && !dbLeadDTO.getStatus().equals(leadDTO.getStatus())) {
			leadDTO.setStatusChangeFrom(dbLeadDTO.getStatus());
			leadDTO.setStatusChangeTo(leadDTO.getStatus());
			dbLeadDTO.setStatus(leadDTO.getStatus());
			leadDataChangeFlag = true;
		}

		if (null != leadDTO.getNextFollowupDate()
				&& !leadDTO.getNextFollowupDate().equals(dbLeadDTO.getNextFollowupDate())) {
			dbLeadDTO.setNextFollowupDate(leadDTO.getNextFollowupDate());

			// If NextFollowupDate is given empty clear the NextFollowupDate
			if ("".equals(leadDTO.getNextFollowupDate())) {
				dbLeadDTO.setNextFollowupDate(null);
				leadDTO.setNextFollowupDate(null);
			}
			leadDataChangeFlag = true;
		}
		// Check call notes
		if (null != leadDTO.getCallNotes() || null != leadDTO.getCallResponse()) {
			leadDTO.setCallBy(leadDTO.getUpdatedBy());
			leadDTO.setCallDate(leadDTO.getUpdatedDate());
			leadDataChangeFlag = true;
		}

		dbLeadDTO.setUpdatedBy(leadDTO.getUpdatedBy());
		dbLeadDTO.setUpdatedDate(leadDTO.getUpdatedDate());

		// Update the leadStatus
		leadDao.saveLead(dbLeadDTO);
		LOGGER.info("Lead " + leadDTO.getId() + " updated successfully by " + leadDTO.getUpdatedBy());

		// Save record in leadHistory
		if (leadDataChangeFlag)
			leadHistoryDao.saveLeadHistory(getLeadHistoryDTO(leadDTO));

	}

	private LeadHistoryDTO getLeadHistoryDTO(LeadDTO leadDTO, LeadDTO dbleadDTO, String callNotes) {
		LeadHistoryDTO dto = new LeadHistoryDTO();
		if (null != dbleadDTO.getId())
			dto.setLeadId(dbleadDTO.getId());

		dto.setCallDate(leadDTO.getUpdatedDate());
		dto.setStatusChangeFrom(dbleadDTO.getStatus());
		dto.setStatusChangeTo(leadDTO.getStatus());
		dto.setAssignedBy(dbleadDTO.getAssignedBy());
		dto.setAssignedTo(dbleadDTO.getAssignedTo());
		dto.setAssignedDate(dbleadDTO.getAssignedDate());
		dto.setNextFollowupDate(leadDTO.getNextFollowupDate());

		dto.setCallNotes(callNotes);
		dto.setStatus(Constant.STATUS_ACTIVE);
		dto.setCreatedBy(leadDTO.getUpdatedBy());
		dto.setCreatedDate(leadDTO.getUpdatedDate());

		return dto;

	}

	@Override
	public List<LeadDTO> getLeadsByFilters(LeadDTO leadDTO) {

		List<UserRole> roles = loginService.getAllUserRoles(leadDTO.getUserId());

//		boolean adminFlag = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole())
//				|| x.getRole().equals(RoleEnum.TEAM_LEADER.getRole()));
		
		boolean adminFlag = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()) );

		boolean associateFlag = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ASSOCIATE.getRole()) || x.getRole().equals(RoleEnum.AGENT.getRole()));

		boolean telecallerAndTeamLeaderFlag = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.TELECALLER.getRole()) || x.getRole().equals(RoleEnum.TEAM_LEADER.getRole()));
		
		boolean operatorFlag = roles.stream().anyMatch(role -> role.getRole().equals(RoleEnum.OPERATOR.getRole()));

//		if (!(adminFlag || customerFlag ))
//			throw new UnAuthorizedException("Logged in user doesn't have permissions to get leads details");

		List<LeadDTO> returnList = new ArrayList<>();

		
		if (adminFlag) {
			
			returnList = leadDao.getAllLeadsByFilters(leadDTO);

		} else if(operatorFlag) {
			
			if (leadDTO.getPropertyId() == null) {
			    throw new FieldException("Please provide the Property Id");
			}
			
			returnList = leadDao.getAllLeadsByPropertyId(leadDTO);
			
		} else if(telecallerAndTeamLeaderFlag) {
			if(null == leadDTO.getUserId()) {
				throw new FieldException("Please provide the UserId");
			}
			
			returnList = leadDao.getAllLeadsAssignedToUser(leadDTO);
			
		}else if(associateFlag) {
			
			if(null == leadDTO.getUserId()) {
				throw new FieldException("Please provide the UserId");
			}
			
			returnList = leadDao.getAllLeadsForAssociate(leadDTO);
			
		} else {

			returnList = new ArrayList<>();

			returnList = leadDao.getAllLeadsByUserId(leadDTO);

		}
		
		return returnList;
	}
	
	@Override
	public List<LeadDTO> getUserLeads(LeadDTO leadDTO){
		
		List<UserRole> roles = loginService.getAllUserRoles(leadDTO.getUserId());
		
		boolean agentFlag = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.AGENT.getRole()) );

		boolean customerFlag = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.CUSTOMER.getRole()));
		
		List<LeadDTO> returnList = new ArrayList<>();
		
		if(customerFlag || agentFlag) {
			returnList = leadDao.getUserLeads(leadDTO);
		}else {
			throw new FieldException("This Data Provide For Only Agent or Customer");
		}
		
		return returnList;
	}

	@Override
	public void assignLeads(LeadDTO leadDTO) {
		List<UserRole> roles = loginService.getAllUserRoles(leadDTO.getUpdatedBy());
		boolean adminAccess = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole())
				|| x.getRole().equals(RoleEnum.TEAM_LEADER.getRole()));
		if (!adminAccess)
			throw new UnAuthorizedException("Logged in user doesn't have permission to assign leads details");

		// Step 1: check userId is there or not
		userDao.getUserById(leadDTO.getUserId());

		// Step 2: Get list of leads
		LeadDTO dto = new LeadDTO();
		dto.setLeads(leadDTO.getLeads());
		List<Lead> leadsToAssign = leadDao.getAllLead(dto);
		if (null == leadsToAssign || leadsToAssign.size() == 0)
			throw new FieldException("leads is not present in the system");

		List<Long> existIds = leadsToAssign.stream().map(Lead::getId).collect(Collectors.toList());
		if (!existIds.containsAll(leadDTO.getLeads()))
			throw new FieldException("Some of given leadIds are not present in db");

		// Step 3: Update the leads assignedBy and assignedTo fields
		List<LeadHistoryDTO> leadHistoryList = new ArrayList<LeadHistoryDTO>();
		for (Lead lead : leadsToAssign) {
			LeadDTO dbLead = LeadConverter.getLeadDTOByLead(lead);

			// Check given assignTo is equal to db asssignTo
			if (null != dbLead.getAssignedTo() && dbLead.getAssignedTo().equals(leadDTO.getUserId())) {
				LOGGER.info("Same userId " + leadDTO.getUserId() + " assigning to lead " + dbLead.getId()
						+ " so we are not updating lead again");
				continue;
			}

			// I have created new object for leadDTO because duplicates are saving in db
			LeadDTO leadForHistory = new LeadDTO();
			leadForHistory.setId(dbLead.getId());

			// Check already status assigned
			if (!Constant.STATUS_ASSIGNED.equals(dbLead.getStatus())) {
				leadForHistory.setStatusChangeFrom(dbLead.getStatus());
				leadForHistory.setStatusChangeTo(dbLead.getStatus());
			}

			dbLead.setAssignedBy(leadDTO.getUpdatedBy());
			dbLead.setAssignedTo(leadDTO.getUserId());
			dbLead.setAssignedDate(leadDTO.getUpdatedDate());
			dbLead.setUpdatedBy(leadDTO.getUpdatedBy());
			dbLead.setUpdatedDate(leadDTO.getUpdatedDate());
			dbLead.setStatus(Constant.STATUS_ASSIGNED);
			leadDao.saveLead(dbLead);

			LOGGER.info("lead " + dbLead.getId() + " assigned to " + leadDTO.getUserId() + " successfully by "
					+ leadDTO.getUpdatedBy());

			// Adding data in leadHistory
			leadForHistory.setAssignedBy(leadDTO.getUpdatedBy());
			leadForHistory.setAssignedTo(leadDTO.getUserId());
			leadForHistory.setAssignedDate(leadDTO.getUpdatedDate());
			leadForHistory.setUpdatedBy(leadDTO.getUpdatedBy());
			leadForHistory.setUpdatedDate(leadDTO.getUpdatedDate());
			LeadHistoryDTO leadHisDTO = getLeadHistoryDTO(leadForHistory);
			leadHistoryList.add(leadHisDTO);

		}

		// Save leadHistory
		if (null != leadHistoryList && leadHistoryList.size() > 0)
			leadHistoryDao.saveAllLeadHistory(leadHistoryList);

	}

	@Override
	public void addLeadHistory(LeadHistoryDTO leadHistoryDTO) {
		List<UserRole> roles = loginService.getAllUserRoles(leadHistoryDTO.getCreatedBy());
		boolean adminAcccess = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.TEAM_LEADER.getRole())
				|| x.getRole().equals(RoleEnum.TELECALLER.getRole()) || x.getRole().equals(RoleEnum.ADMIN.getRole()));
		if (!adminAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permission to save LeadHistory Details.");

		leadHistoryDao.saveLeadHistory(leadHistoryDTO);
		LOGGER.info(
				"Added Lead history for leadId " + leadHistoryDTO.getLeadId() + " by " + leadHistoryDTO.getCreatedBy());
	}

	@Override
	public List<LeadHistoryDTO> getLeadHistoryByLeadId(LeadHistoryDTO leadHistoryDTO) {
		List<LeadHistoryDTO> returnList = new ArrayList<LeadHistoryDTO>();
		
		try {
		Long leadId = leadHistoryDTO.getLeadId();
				
		List<LeadHistory> leadHistoryList = leadHistoryRepository.getLeadHistoryByleadId(leadId);

		for (LeadHistory leadHistory : leadHistoryList) {
			
			LeadHistoryDTO dbLeadHistoryDTO = LeadHistoryConverter.getLeadHistoryDTOByLeadHistory(leadHistory);
			
			String assignedTofullName = "";
			if (leadHistory.getAssignedTo() != null) {
				Long assignedToId = leadHistory.getAssignedTo();
				User assignedToUser = userRepository.findById(assignedToId).get();
				assignedTofullName = assignedToUser.getFullName();

			}

			String assignedByfullName = "";
			if (leadHistory.getAssignedBy() != null) {
				Long assignedById = leadHistory.getAssignedBy();
				User assignedByUser = userRepository.findById(assignedById).get();
				assignedByfullName = assignedByUser.getFullName();

			}

			dbLeadHistoryDTO.setAssignToName(assignedTofullName);
			dbLeadHistoryDTO.setAssignedByName(assignedByfullName);
			
//			dbLeadHistoryDTO.setCreatedByName(userCache.getUser(dbLeadHistoryDTO.getCreatedBy()).getFullName());
//
//			if (null != dbLeadHistoryDTO.getAssignedTo())
//				dbLeadHistoryDTO.setAssignToName(userCache.getUser(dbLeadHistoryDTO.getAssignedTo()).getFullName());
//
//			if (null != dbLeadHistoryDTO.getAssignedBy())
//				dbLeadHistoryDTO.setAssignedByName(userCache.getUser(dbLeadHistoryDTO.getAssignedBy()).getFullName());

			returnList.add(dbLeadHistoryDTO);
		}
		
		}catch(Exception e) {
			e.printStackTrace();
		}
		return returnList;
	}

	private void saveLeadForOwn(LeadDTO leadDTO) {
		LeadDTO ownLeadDTO = new LeadDTO();
		ownLeadDTO.setCustomerName(leadDTO.getCustomerName());
		ownLeadDTO.setMobileNumber(leadDTO.getMobileNumber());
		ownLeadDTO.setEmail(leadDTO.getEmail());
		ownLeadDTO.setLeadSource(leadDTO.getLeadSource());
		ownLeadDTO.setStatus(Constant.STATUS_NEW);
		ownLeadDTO.setLeadType(Constant.LEAD_TYPE_OWN);
		ownLeadDTO.setCreatedDate(leadDTO.getCreatedDate());
		ownLeadDTO.setCreatedBy(leadDTO.getCreatedBy());
		ownLeadDTO.setPropertyId(leadDTO.getPropertyId());
		ownLeadDTO.setCountryCode(leadDTO.getCountryCode());
		ownLeadDTO.setScheduleDateTime(leadDTO.getScheduleDateTime());
		ownLeadDTO.setCustomerDistrict(leadDTO.getCustomerDistrict());
		ownLeadDTO.setCustomerState(leadDTO.getCustomerState());
		leadDao.saveLead(ownLeadDTO);

	}

	@Override
	public int getTotalLeadCount(LeadDTO leadDTO) {
		return leadDao.getLeadCount(leadDTO);
	}

	/**
	 * To get leadHistory Object
	 * 
	 * @param leadDTO
	 * @return
	 */
	private LeadHistoryDTO getLeadHistoryDTO(LeadDTO leadDTO) {
		LeadHistoryDTO returnDTO = new LeadHistoryDTO();
		returnDTO.setLeadId(leadDTO.getId());
		returnDTO.setAssignedTo(leadDTO.getAssignedTo());
		returnDTO.setAssignedBy(leadDTO.getAssignedBy());
		returnDTO.setAssignedDate(leadDTO.getAssignedDate());
		returnDTO.setCallDate(leadDTO.getCallDate());
		returnDTO.setCallBy(leadDTO.getCallBy());
		returnDTO.setCallResponse(leadDTO.getCallResponse());
		returnDTO.setCallNotes(leadDTO.getCallNotes());
		returnDTO.setStatusChangeFrom(leadDTO.getStatusChangeFrom());
		returnDTO.setStatusChangeTo(leadDTO.getStatusChangeTo());
		returnDTO.setNextFollowupDate(leadDTO.getNextFollowupDate());
		returnDTO.setStatus(Constant.STATUS_ACTIVE);
		returnDTO.setCreatedBy(leadDTO.getUpdatedBy());
		returnDTO.setCreatedDate(leadDTO.getUpdatedDate());
		return returnDTO;

	}

	@Override
	public List<Lead> getLeadById(LeadDTO leadDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void assignAssociateLeads(AssociateLeadDTO associateLeadDTO, Long loginUserId) {

		List<UserRole> roles = loginService.getAllUserRoles(associateLeadDTO.getAssignedBy());

		boolean adminAccess = roles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole())
				|| x.getRole().equals(RoleEnum.TEAM_LEADER.getRole()));
		if (!adminAccess)
			throw new UnAuthorizedException("Logged in user doesn't have permission to assign leads details");

		// Step 1: check userId is there or not
		userDao.getUserById(associateLeadDTO.getAssignedTo());

		// Step 2: Get list of leads
		AssociateLeadDTO dto = new AssociateLeadDTO();

		dto.setAssociateLeads(associateLeadDTO.getAssociateLeads());
		dto.setAssignedTo(associateLeadDTO.getAssignedTo());

		List<AssociateLead> associateLeadsToAssign = leadDao.getAllAssociateLead(dto, loginUserId);

		if (null == associateLeadsToAssign || associateLeadsToAssign.size() == 0)
			throw new FieldException("leads is not present in the system");

		List<Long> existIds = associateLeadsToAssign.stream().map(AssociateLead::getId).collect(Collectors.toList());

		if (!existIds.containsAll(associateLeadDTO.getAssociateLeads()))
			throw new FieldException("Some of given leadIds are not present in db");

		// Step 3: Update the leads assignedBy and assignedTo fields
		List<AssociateLeadHistoryDTO> leadHistoryList = new ArrayList<AssociateLeadHistoryDTO>();
		for (AssociateLead associateLead : associateLeadsToAssign) {
			AssociateLeadDTO dbLead = AssociateLeadConverter.getAssociateLeadDTOByAssociateLead(associateLead);

			// Check given assignTo is equal to db asssignTo
			if (null != dbLead.getAssignedTo() && dbLead.getAssignedTo().equals(associateLeadDTO.getUserId())) {
				LOGGER.info("Same userId " + associateLeadDTO.getUserId() + " assigning to lead " + dbLead.getId()
						+ " so we are not updating lead again");
				continue;
			}

			// I have created new object for leadDTO because duplicates are saving in db
			AssociateLeadDTO leadForHistory = new AssociateLeadDTO();
			leadForHistory.setId(dbLead.getId());

			// Check already status assigned
			if (!Constant.STATUS_ASSIGNED.equals(dbLead.getStatus())) {
				leadForHistory.setStatusChangeFrom(dbLead.getStatus());
				leadForHistory.setStatusChangeTo(dbLead.getStatus());
			}

			LOGGER.info("lead " + dbLead.getId() + " assigned to " + associateLeadDTO.getAssignedTo()
					+ " successfully by " + loginUserId);

			// Adding data in leadHistory
			leadForHistory.setAssignedBy(loginUserId);
			leadForHistory.setAssignedTo(associateLeadDTO.getAssignedTo());
			leadForHistory.setAssignedDate(associateLeadDTO.getUpdatedDate());
			leadForHistory.setUpdatedBy(loginUserId);
			leadForHistory.setUpdatedDate(associateLeadDTO.getUpdatedDate());

			AssociateLeadHistoryDTO leadHisDTO = getAssociateLeadHistoryDTO(leadForHistory, loginUserId);

			leadHistoryList.add(leadHisDTO);

		}


		// Save leadHistory
		if (null != leadHistoryList && leadHistoryList.size() > 0)
			leadHistoryDao.saveAllAssociateLeadHistory(leadHistoryList);

	}

	private AssociateLeadHistoryDTO getAssociateLeadHistoryDTO(AssociateLeadDTO associateLeadDTO, Long loginUserId) {
		AssociateLeadHistoryDTO returnDTO = new AssociateLeadHistoryDTO();
		returnDTO.setAssociateLeadId(associateLeadDTO.getId());
		returnDTO.setAssignedTo(associateLeadDTO.getAssignedTo());
		returnDTO.setAssignedBy(associateLeadDTO.getAssignedBy());
		returnDTO.setAssignedDate(associateLeadDTO.getAssignedDate());
		returnDTO.setCallDate(associateLeadDTO.getCallDate());
		returnDTO.setCallBy(associateLeadDTO.getCallBy());
		returnDTO.setCallResponse(associateLeadDTO.getCallResponse());
		returnDTO.setCallNotes(associateLeadDTO.getCallNotes());
		returnDTO.setStatusChangeFrom(associateLeadDTO.getStatusChangeFrom());
		returnDTO.setStatusChangeTo(associateLeadDTO.getStatusChangeTo());
		returnDTO.setFollowupDate(associateLeadDTO.getFollowupDate());
		returnDTO.setStatus(Constant.STATUS_ACTIVE);
		returnDTO.setCreatedBy(associateLeadDTO.getUpdatedBy());
		returnDTO.setCreatedDate(associateLeadDTO.getUpdatedDate());
		returnDTO.setUpdatedBy(associateLeadDTO.getUpdatedBy());
		returnDTO.setUpdatedDate(associateLeadDTO.getUpdatedDate());

		return returnDTO;

	}

	
	@Override
	public List<AssociateLeadDTO> getAssociateLeadsDTO(AssociateLeadDTO associatedLeadsDTO) {
		// TODO Auto-generated method stub
		
		List<String> adminRoleList = Arrays.asList(RoleEnum.ADMIN.getRole());
		
		List<String> leadCreatorRoleList = Arrays.asList(RoleEnum.CHANNELPARTNER.getRole(), RoleEnum.ASSOCIATE.getRole());
		
		List<String> assignedRoleList = Arrays.asList(RoleEnum.TEAM_LEADER.getRole(), RoleEnum.TELECALLER.getRole());
		
		boolean adminAccess = loginService.isUserAccessible(associatedLeadsDTO.getUpdatedBy(), adminRoleList);
		
		boolean leadCreatorAccess = loginService.isUserAccessible(associatedLeadsDTO.getUpdatedBy(), leadCreatorRoleList);
		
		boolean assignedAccess = loginService.isUserAccessible(associatedLeadsDTO.getUpdatedBy(), assignedRoleList);
		
		 List<AssociateLead> associatedLeads = new ArrayList<>();
		
		if (adminAccess) {
			associatedLeads = associateLeadDao.getAllAssociateLeads(associatedLeadsDTO);
		} else if (leadCreatorAccess) {
			associatedLeads = associateLeadDao.getCreatedByAssociateLeads(associatedLeadsDTO);
		} else if (assignedAccess) {
			associatedLeads = associateLeadDao.getAssignedAssociateLeads(associatedLeadsDTO);
		} else {
		    throw new UnAuthorizedException("Logged-in user doesn't have permissions to create lead details");
		}
		
		 List<AssociateLeadDTO> returnDto = new ArrayList<>();
		 
		 for (AssociateLead associatedLead : associatedLeads) {
		        AssociateLeadDTO associatedLeadDto = new AssociateLeadDTO();

		        // Get assigned user details safely
		        String fullName = ""; // Default value
		        if (associatedLead.getAssignedTo() != null) {
		            fullName = userRepository.findById(associatedLead.getAssignedTo())
		                .map(User::getFullName)
		                .orElse("");
		        }

		        associatedLeadDto.setAssignedBy(associatedLead.getAssignedBy());
		        associatedLeadDto.setAssignedDate(associatedLead.getAssignedDate());
		        associatedLeadDto.setAssignedTo(associatedLead.getAssignedTo());
		        associatedLeadDto.setAssignedToDate(associatedLead.getAssignedDate());
		        associatedLeadDto.setAssignedToName(fullName);
		        associatedLeadDto.setBestTimeToCall(associatedLead.getBestTimeToCall());
		        associatedLeadDto.setCreatedBy(associatedLead.getCreatedBy());
		        associatedLeadDto.setCreatedDate(associatedLead.getCreatedDate());
		        associatedLeadDto.setCustomerName(associatedLead.getCustomerName());
		        associatedLeadDto.setEmail(associatedLead.getEmail());
		        associatedLeadDto.setId(associatedLead.getId());
		        associatedLeadDto.setImagePath(associatedLead.getImagePath());
		        associatedLeadDto.setLandmark(associatedLead.getLandmark());
		        associatedLeadDto.setLocation(associatedLead.getLocation());
		        associatedLeadDto.setMobileNumber(associatedLead.getMobileNumber());
		        associatedLeadDto.setStatus(associatedLead.getStatus());
		        associatedLeadDto.setUpdatedBy(associatedLead.getUpdatedBy());
		        associatedLeadDto.setUpdatedDate(associatedLead.getUpdatedDate());
		        associatedLeadDto.setAssociateLeadProviderId(associatedLead.getAssociateLeadProviderId());
		        associatedLeadDto.setTypeOfLead(associatedLead.getTypeOfLead());

		        returnDto.add(associatedLeadDto);
		    }
			
		return returnDto;
	}

	@Override
	public AssociateLeadDTO getAssociateLeadsDTOByLeadId(AssociateLeadDTO associateLeadDTO) {
		// TODO Auto-generated method stub

		Long associateLeadId = associateLeadDTO.getAssociateLeadId();
		AssociateLead associateLead = associateLeadRepository.findById(associateLeadId).get();

		AssociateLeadDTO getAssociateLeadDTO = AssociateLeadConverter.getAssociateLeadDTOByAssociateLead(associateLead);

		String assignedTofullName = "";
		if (associateLead.getAssignedTo() != null) {
			Long assignedToId = associateLead.getAssignedTo();
			User assignedToUser = userRepository.findById(assignedToId).get();
			assignedTofullName = assignedToUser.getFullName();

		}

		String assignedByfullName = "";
		if (associateLead.getAssignedBy() != null) {
			Long assignedById = associateLead.getAssignedBy();
			User assignedByUser = userRepository.findById(assignedById).get();
			assignedByfullName = assignedByUser.getFullName();

		}

		getAssociateLeadDTO.setAssignedToName(assignedTofullName);
		getAssociateLeadDTO.setAssignedByName(assignedByfullName);

		return getAssociateLeadDTO;
	}

	@Override
	public AssociateLead editAssociateLeadByAssociateLeadId(AssociateLeadDTO associateLeadDTO) {
		// TODO Auto-generated method stub

		AssociateLead associateLead2 = new AssociateLead();
		Long associateLeadId = associateLeadDTO.getAssociateLeadId();

		AssociateLead associateLead = associateLeadRepository.findById(associateLeadId).get();

		String previousStatus = associateLead.getStatus();

		associateLead2.setId(associateLeadId);
		associateLead2.setStatus(associateLeadDTO.getStatus());

		associateLead2.setImagePath(associateLead.getImagePath());
		associateLead2.setCustomerName(associateLead.getCustomerName());
		associateLead2.setMobileNumber(associateLead.getMobileNumber());
		associateLead2.setEmail(associateLead.getEmail());
		associateLead2.setLocation(associateLead.getLocation());
		associateLead2.setLandmark(associateLead.getLandmark());
		associateLead2.setTypeOfLead(associateLead.getTypeOfLead());
		associateLead2.setBestTimeToCall(associateLead.getBestTimeToCall());
		associateLead2.setCreatedDate(associateLead.getCreatedDate());
		associateLead2.setCreatedBy(associateLead.getCreatedBy());
		associateLead2.setUpdatedDate(associateLead.getUpdatedDate());
		associateLead2.setUpdatedBy(associateLead.getUpdatedBy());
		associateLead2.setAssignedTo(associateLead.getAssignedTo());
		associateLead2.setAssignedBy(associateLead.getAssignedBy());
		associateLead2.setAssignedDate(associateLead.getAssignedDate());
		associateLead2.setFollowupDate(associateLeadDTO.getFollowupDate());

		String followupDate = associateLeadDTO.getFollowupDate();

		String desiredDate = followupDate.replace('T', ' ').concat(":25");

		associateLead2.setFollowupDate(desiredDate);

		associateLead2.setRemarks(associateLeadDTO.getRemarks());

		AssociateLead saveAssociateLead = associateLeadRepository.save(associateLead2);

//		to save associate lead in associate lead history 

		AssociateLeadHistory associateLeadHistory = new AssociateLeadHistory();

		associateLeadHistory.setAssociateLeadId(associateLeadId);
		associateLeadHistory.setAssignedTo(associateLead.getAssignedTo());
		associateLeadHistory.setAssignedBy(associateLead.getAssignedBy());
		associateLeadHistory.setAssignedDate(DateUtils.currentDate());
		associateLeadHistory.setFollowupDate(desiredDate);

		associateLeadHistory.setStatus(associateLeadDTO.getStatus());
		associateLeadHistory.setCreatedBy(associateLead.getCreatedBy());
		associateLeadHistory.setCreatedDate(associateLead.getCreatedDate());
		associateLeadHistory.setUpdatedBy(associateLeadDTO.getAssignedBy());
		associateLeadHistory.setUpdatedDate(DateUtils.currentDate());
		associateLeadHistory.setRemarks(associateLeadDTO.getRemarks());

		associateLeadHistory.setStatusChangeFrom(previousStatus);
		associateLeadHistory.setStatusChangeTo(associateLeadDTO.getStatus());

		AssociateLeadHistory save = associateLeadHistoryRepository.save(associateLeadHistory);

		return saveAssociateLead;
	}

	@Override
	public List<AssociateLeadHistoryDTO> getAssociateLeadHistoryByLeadId(
			AssociateLeadHistoryDTO associateLeadHistoryDTO) {
		
		List<AssociateLeadHistory> associateLeadHistories = new ArrayList<AssociateLeadHistory>();
		List<AssociateLeadHistoryDTO> associateLeadHistoriesDTO = new ArrayList<AssociateLeadHistoryDTO>();

		Long associateLeadId = associateLeadHistoryDTO.getAssociateLeadId();
		associateLeadHistories = associateLeadHistoryRepository.findAllByLeadId(associateLeadId);

		for (AssociateLeadHistory associateLeadHistory : associateLeadHistories) {

			AssociateLeadHistoryDTO associateLeadHistoryDto = AssociateLeadHistoryConverter
					.getAssociateLeadHistoryDTOByAssociateLeadHistory(associateLeadHistory);

			associateLeadHistoryDto.setAssignedTo(associateLeadHistory.getAssignedTo());
			associateLeadHistoryDto.setAssignedBy(associateLeadHistory.getAssignedBy());

			String assignedTofullName = "";
			if (associateLeadHistory.getAssignedTo() != null) {
				Long assignedToId = associateLeadHistory.getAssignedTo();
				User assignedToUser = userRepository.findById(assignedToId).get();
				assignedTofullName = assignedToUser.getFullName();

			}

			String assignedByfullName = "";
			if (associateLeadHistory.getAssignedBy() != null) {
				Long assignedById = associateLeadHistory.getAssignedBy();
				User assignedByUser = userRepository.findById(assignedById).get();
				assignedByfullName = assignedByUser.getFullName();

			}

			associateLeadHistoryDto.setAssignToName(assignedTofullName);
			associateLeadHistoryDto.setAssignedByName(assignedByfullName);

			associateLeadHistoryDto.setStatusChangeFrom(associateLeadHistory.getStatusChangeFrom());
			associateLeadHistoryDto.setStatusChangeTo(associateLeadHistory.getStatusChangeTo());
			associateLeadHistoryDto.setRemarks(associateLeadHistory.getRemarks());
			associateLeadHistoryDto.setAssignedDate(associateLeadHistory.getAssignedDate());
			
			associateLeadHistoriesDTO.add(associateLeadHistoryDto);

		}

		return associateLeadHistoriesDTO;
	}

	@Override
	public Lead editLeadByLeadId(LeadDTO leadDTO) {
		// TODO Auto-generated method stub

		Lead saveLead = new Lead();
		
		try {
		Lead lead2 = new Lead();
		Long leadId = leadDTO.getId();

		Lead lead = leadRepo.findById(leadId).get();

		String previousStatus = lead.getStatus();

		lead2.setId(leadId);
		lead2.setStatus(leadDTO.getStatus());

		lead2.setCustomerName(lead.getCustomerName());
		lead2.setMobileNumber(lead.getMobileNumber());
		lead2.setEmail(lead.getEmail());
//		
		lead2.setCreatedDate(lead.getCreatedDate());
		
		if(lead.getCreatedBy() != null ) {
			lead2.setCreatedBy(lead.getCreatedBy());

		}
		lead2.setUpdatedDate(lead.getUpdatedDate());
		lead2.setUpdatedBy(leadDTO.getUpdatedBy());
		lead2.setAssignedTo(lead.getAssignedTo());
		lead2.setAssignedBy(lead.getAssignedBy());
		lead2.setAssignedDate(lead.getAssignedDate());
		lead2.setLeadSource(lead.getLeadSource());
		lead2.setLeadType(lead.getLeadType());
		lead2.setLeadProviderId(lead.getLeadProviderId());


		String desiredDate = "";
		if(leadDTO.getNextFollowupDate().length() >0 || leadDTO.getNextFollowupDate() != null ) {
		String followupDate = leadDTO.getNextFollowupDate();
		
		
		
		 desiredDate = followupDate.replace('T', ' ').concat(":25");
		
		}
		lead2.setNextFollowupDate(desiredDate);
		lead2.setRemarks(leadDTO.getRemarks());
		 saveLead = leadRepo.save(lead2);

//		to save associate lead in associate lead history 

		LeadHistory leadHistory = new LeadHistory();

		leadHistory.setLeadId(leadId);
		leadHistory.setAssignedTo(lead.getAssignedTo());
		leadHistory.setAssignedBy(lead.getAssignedBy());
		leadHistory.setAssignedDate(lead.getAssignedDate());
		leadHistory.setNextFollowupDate(desiredDate);

		leadHistory.setStatus(leadDTO.getStatus());
//		leadHistory.setCreatedBy(lead.getCreatedBy());
		if(lead.getCreatedBy() != null ) {
			leadHistory.setCreatedBy(lead.getCreatedBy());

		}
		leadHistory.setCreatedDate(lead.getCreatedDate());
		leadHistory.setUpdatedBy(leadDTO.getUpdatedBy());
		leadHistory.setUpdatedDate(DateUtils.currentDate());
		leadHistory.setRemarks(leadDTO.getRemarks());

		leadHistory.setStatusChangeFrom(previousStatus);
		leadHistory.setStatusChangeTo(leadDTO.getStatus());

		
		
		
		LeadHistory save = leadHistoryRepository.save(leadHistory);

		
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return saveLead;
		
		
	}
	
	@Override
	public void saveAssociateLead(AssociateLeadDTO associateLeadDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ASSOCIATE.getRole(), RoleEnum.CHANNELPARTNER.getRole());
		
		boolean access = loginService.isUserAccessible(associateLeadDTO.getUpdatedBy(), roleList);
		
		if (!access) {
			throw new UnAuthorizedException("Loged in user don't have permissions to create lead details");
		}
		
		associateLeadDao.saveAssociateLead(associateLeadDTO);
	}
		
	

}
