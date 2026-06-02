package com.getmyhousing.rental.validator;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.AssociateLeadDTO;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.dto.LeadHistoryDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;

public class LeadValidator implements Validator {

	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;
	private static final Pattern VALID_EAMIL_PATTERN = Pattern.compile(Constant.EMAIL_PATTERN);
	private static final Pattern VALID_MOBILE_PATTERN = Pattern.compile(Constant.MOBILE_PATTERN);
	private static final Pattern VALID_DATE_FILED_PATTERN = Pattern.compile(Constant.DATE_FIELD_PATTERN);
	private static final List<String> VALID_LEAD_SOURCE_LIST = Arrays.asList(Constant.LEAD_SOURCE_ONILNE,
			Constant.LEAD_SOURCE_OFFLINE);

	@Autowired
	UserUtils userUtils;

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate(Object target, Errors errors) {
		// TODO Auto-generated method stub

	}

	public void addLead(LeadDTO leadsDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(leadsDTO.getPropertyId()))
			errors.rejectValue("propertyId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(leadsDTO.getCustomerName()))
			errors.rejectValue("customerName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != leadsDTO.getEmail() && !CustomValidator.isValidPattern(VALID_EAMIL_PATTERN, leadsDTO.getEmail()))
			errors.rejectValue("email", BAD_REQUEST_ERROR_CD, "Email is either empty or not in a valid format");

		if (!CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, leadsDTO.getMobileNumber()))
			errors.rejectValue("mobileNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!VALID_LEAD_SOURCE_LIST.contains(leadsDTO.getLeadSource()))
			errors.rejectValue("leadSource", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		leadsDTO.setStatus(Constant.STATUS_NEW);
		leadsDTO.setCreatedDate(createdDate);
		leadsDTO.setCreatedBy(logedUserid);

	}

	public void getLeadById(LeadDTO leadDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(leadDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		leadDTO.setUpdatedBy(logedUserid);
		leadDTO.setUpdatedDate(createdDate);

	}

	public void updateLead(LeadDTO leadDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(leadDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != leadDTO.getStatus() && CustomValidator.isEmpty(leadDTO.getStatus()))
			errors.rejectValue("status", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		leadDTO.setUpdatedDate(createdDate);
		leadDTO.setUpdatedBy(logedUserid);

	}

	public void getLeadsByFilters(LeadDTO leadDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (null != leadDTO.getNextFollowupStartDate()
				&& !CustomValidator.isValidPattern(VALID_DATE_FILED_PATTERN, leadDTO.getNextFollowupStartDate()))
			errors.rejectValue("nextFollowupStartDate", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != leadDTO.getNextFollowupEndDate()
				&& !CustomValidator.isValidPattern(VALID_DATE_FILED_PATTERN, leadDTO.getNextFollowupEndDate()))
			errors.rejectValue("nextFollowupEndDate", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != leadDTO.getLeadStartDate()
				&& !CustomValidator.isValidPattern(VALID_DATE_FILED_PATTERN, leadDTO.getLeadStartDate()))
			errors.rejectValue("LeadStartDate", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != leadDTO.getLeadEndDate()
				&& !CustomValidator.isValidPattern(VALID_DATE_FILED_PATTERN, leadDTO.getLeadEndDate()))
			errors.rejectValue("leadEndDate", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (0 == leadDTO.getLimit())
			leadDTO.setLimit(10);

		leadDTO.setUpdatedDate(createdDate);
		leadDTO.setUpdatedBy(logedUserid);

	}

	public void assignLead(LeadDTO leadDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(leadDTO.getUserId()))
			errors.rejectValue("userId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null == leadDTO.getLeads() || leadDTO.getLeads().size() == 0)
			errors.rejectValue("leads", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		else {
			if (leadDTO.getLeads().stream().anyMatch(lead -> CustomValidator.isEmpty(lead)))
				errors.rejectValue("lead", BAD_REQUEST_ERROR_CD, "is are empty or not in a valid format");
		}

		leadDTO.setUpdatedDate(createdDate);
		leadDTO.setUpdatedBy(logedUserid);
	}

	public void addLeadHistory(LeadHistoryDTO leadHistoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (null != leadHistoryDTO.getLeadId() && CustomValidator.isEmpty(leadHistoryDTO.getLeadId()))
			errors.rejectValue("leadId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		leadHistoryDTO.setStatus(Constant.STATUS_ACTIVE);
		leadHistoryDTO.setCreatedDate(createdTime);
		leadHistoryDTO.setCreatedBy(logedUserid);
	}
	
	public void getAssociateLeads(AssociateLeadDTO associateLeadDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		
		associateLeadDTO.setStatus(Constant.STATUS_ACTIVE);
		associateLeadDTO.setUpdatedDate(createdTime);
		associateLeadDTO.setUpdatedBy(logedUserid);
	}

	public void getLeadHistoryByLeadId(LeadHistoryDTO leadHistoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (null != leadHistoryDTO.getLeadId() && CustomValidator.isEmpty(leadHistoryDTO.getLeadId()))
			errors.rejectValue("leadId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		leadHistoryDTO.setUpdatedDate(createdTime);
		leadHistoryDTO.setUpdatedBy(logedUserid);
	}
	
	public void addAssociateLead(AssociateLeadDTO associateLeadDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		
		if (null != associateLeadDTO.getEmail() && (!CustomValidator.isValidPattern(VALID_EAMIL_PATTERN, associateLeadDTO.getEmail())))
			errors.rejectValue("email", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (null != associateLeadDTO.getPincode() && CustomValidator.isEmpty(associateLeadDTO.getPincode()))
			errors.rejectValue("pincode", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(associateLeadDTO.getImagePath()))
			errors.rejectValue("tolet Image", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (null != associateLeadDTO.getMobileNumber()
				&& !CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, associateLeadDTO.getMobileNumber()))
			errors.rejectValue("mobileNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		associateLeadDTO.setStatus(Constant.STATUS_ACTIVE);
		associateLeadDTO.setUpdatedDate(createdTime);
		associateLeadDTO.setUpdatedBy(logedUserid);
		associateLeadDTO.setAssociateLeadProviderId(logedUserid);
		associateLeadDTO.setCreatedDate(createdTime);
		associateLeadDTO.setCreatedBy(logedUserid);
		
	}

}
