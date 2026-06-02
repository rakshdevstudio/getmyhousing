package com.getmyhousing.rental.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.AssociateLeadConverter;
import com.getmyhousing.common.dao.AssociateLeadDao;
import com.getmyhousing.common.domain.AssociateLead;
import com.getmyhousing.common.domain.AssociateLeadHistory;
import com.getmyhousing.common.domain.Lead;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.dto.AssociateLeadHistoryDTO;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.dto.LeadHistoryDTO;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.UserDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.rental.service.LeadService;
import com.getmyhousing.rental.validator.LeadValidator;

@CrossOrigin
@RestController
@RequestMapping("/lead")
public class LeadController {
	private Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	private LinkedHashMap<String, Object> returnMap;

	@Autowired
	LeadService leadService;
	
	@Autowired
	AssociateLeadDao associateLeadDao;

	@Autowired
	LeadValidator leadValidator;
	
	@Autowired
	private UserUtils userUtils;
	
	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;

	@RequestMapping(value = "/addLead", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<LinkedHashMap<String, Object>> addLead(@RequestBody LeadDTO leadDTO,
            HttpServletRequest request, BindingResult result) throws Exception {

        LinkedHashMap<String, Object> returnMap = new LinkedHashMap<>();
        try {
            Long loginUserId = userUtils.getLogedInUser();

            if (!StringUtils.isEmpty(leadDTO.getPropertyId())) {
                leadDTO.setId(loginUserId);
            }

            leadDTO.setLeadProviderId(loginUserId);
            leadDTO.setCreatedBy(loginUserId);

            leadService.addLead(leadDTO);

            returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
            returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);

        } catch (FieldException ex) {
            returnMap.put("responseCode", Constant.BAD_REQUEST_ERROR_CD);
            returnMap.put("responseMessage", ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(returnMap);

        } catch (Exception ex) {
            // Log the exception for debugging purposes
            Logger logger = LoggerFactory.getLogger(LeadController.class);
            logger.error("Error while adding lead", ex);

            returnMap.put("responseCode", HttpStatus.INTERNAL_SERVER_ERROR);
            returnMap.put("responseMessage", "An error occurred while processing your request.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(returnMap);
        }

        return ResponseEntity.status(HttpStatus.OK).body(returnMap);
    }

	
//	this is used for getting lead by particular id , customer can see only his leads 
	@RequestMapping(value = "/getLead", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getLead(@RequestBody LeadDTO leadDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		

//		Map<String, String> map = new HashMap<String, String>();
//		MapBindingResult err = new MapBindingResult(map, LeadDTO.class.getName());
//		leadValidator.getLeadById(leadDTO, err);
//		List<ObjectError> list = err.getAllErrors();
//		if (list.size() > 0)
//			throw new FieldException(list);
		

		LeadDTO lead = leadService.getLeadByUserId(leadDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("lead", lead);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateLead", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateLead(@RequestBody LeadDTO leadDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, LeadDTO.class.getName());
		leadValidator.updateLead(leadDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		leadService.updateLead(leadDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	
//	it is used to getting all leads for admin . admin can seen all the lead 
	@RequestMapping(value = "/getLeads", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getLeads(@RequestBody LeadDTO leadDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, LeadDTO.class.getName());
		leadValidator.getLeadsByFilters(leadDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<LeadDTO> lead = leadService.getLeadsByFilters(leadDTO);
		int leadCount = leadService.getTotalLeadCount(leadDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("leadCount", leadCount);
		returnMap.put("leads", lead);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/userLeads", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> userLeads(
			@RequestBody LeadDTO leadDTO,
			HttpServletRequest request,
			BindingResult result
			)throws Exception{
		
		List<LeadDTO> leads = leadService.getUserLeads(leadDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("userLeads", leads);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/assignLead", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> assignLead(@RequestBody LeadDTO leadDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, LeadDTO.class.getName());
		leadValidator.assignLead(leadDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		
		String loginId = request.getHeader("loginUserId");
		Long loginUserId = Long.parseLong(loginId);
		
		leadDTO.setUpdatedBy(loginUserId);
		
		leadService.assignLeads(leadDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/addLeadHistory", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addLeadHistory(@RequestBody LeadHistoryDTO leadHistoryDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		HashMap<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, LeadHistoryDTO.class.getName());
		leadValidator.addLeadHistory(leadHistoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		leadService.addLeadHistory(leadHistoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	
	@RequestMapping(value = "/editLead", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> editLead(@RequestBody LeadDTO leadDTO,
			HttpServletRequest request, BindingResult result) {

		String loginId = request.getHeader("loginUserId");
		Long loginUserId = Long.parseLong(loginId);
		
		
		leadDTO.setUpdatedBy(loginUserId);
		Lead editedLead = leadService.editLeadByLeadId(leadDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("lead", editedLead);

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}


	@RequestMapping(value = "/getLeadHistory", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getLeadHistory(@RequestBody LeadHistoryDTO leadHistoryDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		HashMap<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, LeadHistoryDTO.class.getName());
		leadValidator.getLeadHistoryByLeadId(leadHistoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<LeadHistoryDTO> leadHistories = leadService.getLeadHistoryByLeadId(leadHistoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("leadHistories", leadHistories);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
//	below the method for associate lead
	
	@RequestMapping(value = "/addAssociateLead", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> assAssociateLead(
	@RequestBody AssociateLeadDTO associateLeadDTO,
			HttpServletRequest request, BindingResult result) 
			throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, AssociateLeadDTO.class.getName());
		leadValidator.addAssociateLead(associateLeadDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}
		
		associateLeadDao.saveAssociateLead(associateLeadDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	
	@RequestMapping(value = "/getAssociateLeads", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> getAssociatedLeads(
    		@RequestBody AssociateLeadDTO associateLeadDTO,
			HttpServletRequest request,
			BindingResult result
    		) {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, AssociateLeadDTO.class.getName());
		leadValidator.getAssociateLeads(associateLeadDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);
		 		
		List<AssociateLeadDTO> associatedLeadsDTO = leadService.getAssociateLeadsDTO(associateLeadDTO);
		
        returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("associatedLeads", associatedLeadsDTO);
        return ResponseEntity.status(HttpStatus.OK).body(returnMap);
    }
	
	@RequestMapping(value = "/getAssociateLead", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getAssociatedLead(
			@RequestBody AssociateLeadDTO associateLeadDTO,
			HttpServletRequest request,
			BindingResult result
			) throws Exception {

		String loginUserId = request.getHeader("loginUserId");

		AssociateLeadDTO associatedLeadsDTO = leadService.getAssociateLeadsDTOByLeadId(associateLeadDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("associatedLead", associatedLeadsDTO);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/editAssociateLead", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> editAssociatedLead(@RequestBody AssociateLeadDTO associateLeadDTO,
			HttpServletRequest request, BindingResult result) {


		AssociateLead editedAssociateLead = leadService.editAssociateLeadByAssociateLeadId(associateLeadDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("associatedLead", editedAssociateLead);

		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

@RequestMapping(value = "/assignAssociateLead", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> assignAssociateLead(
	@RequestBody AssociateLeadDTO associateLeadDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
//		Map<String, String> map = new HashMap<String, String>();
//		MapBindingResult err = new MapBindingResult(map, LeadDTO.class.getName());
//		leadValidator.assignAssociateLead(associateLeadDTO, err);
//		List<ObjectError> list = err.getAllErrors();
//		if (list.size() > 0)
//			throw new FieldException(list);		
		
		String loginId = request.getHeader("loginUserId");
		Long loginUserId = Long.parseLong(loginId);
		associateLeadDTO.setAssignedBy(loginUserId);
		
		leadService.assignAssociateLeads(associateLeadDTO , loginUserId );
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}







@RequestMapping(value = "/getAssociateLeadHistory", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
public ResponseEntity<LinkedHashMap<String, Object>> getAssociateLeadHistory(@RequestBody AssociateLeadHistoryDTO associateLeadHistoryDTO ,
		HttpServletRequest request, BindingResult result) throws Exception {
//	HashMap<String, String> map = new HashMap<String, String>();
//	MapBindingResult err = new MapBindingResult(map, LeadHistoryDTO.class.getName());
//	leadValidator.getLeadHistoryByLeadId(leadHistoryDTO, err);
//	List<ObjectError> list = err.getAllErrors();
//	if (list.size() > 0)
//		throw new FieldException(list);

	
	List<AssociateLeadHistoryDTO> associateLeadHistoriesDTO = leadService.getAssociateLeadHistoryByLeadId(associateLeadHistoryDTO);
	returnMap = new LinkedHashMap<String, Object>();
	returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
	returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
	returnMap.put("associateLeadHistories", associateLeadHistoriesDTO);
	return ResponseEntity.status(HttpStatus.OK).body(returnMap);
}


	@Bean
	public LeadValidator getLeadValidator() {
		return new LeadValidator();
	}

}
