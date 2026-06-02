package com.getmyhousing.rental.validator;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.BlogCategoryDTO;
import com.getmyhousing.common.dto.OwnerDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;

public class OwnerValidator implements Validator {
	
	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;

	private static final List<String> VALID_APPROVAL_STATUS_LIST = Arrays.asList(Constant.STATUS_APPROVED,
			Constant.STATUS_REJECTED);
	private static final Pattern VALID_EAMIL_PATTERN = Pattern.compile(Constant.EMAIL_PATTERN);
	private static final Pattern VALID_MOBILE_PATTERN = Pattern.compile(Constant.MOBILE_PATTERN);

	@Autowired
	private UserUtils userUtils;
	
	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate(Object target, Errors errors) {
		// TODO Auto-generated method stub

	}
	
	public void saveOwner(OwnerDTO ownerDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(ownerDTO.getFullName()))
			errors.rejectValue("name", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
			
		if (!CustomValidator.isValidPattern(VALID_EAMIL_PATTERN, ownerDTO.getEmail()))
			errors.rejectValue("email", BAD_REQUEST_ERROR_CD, "Email is either empty or not in a valid format");
			
		if (!CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, ownerDTO.getMobileNumber()))
			errors.rejectValue("mobileNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		ownerDTO.setStatus(Constant.STATUS_ACTIVE);
		ownerDTO.setCreatedBy(logedUserid);
		ownerDTO.setCreatedDate(createDate);

	}
	
	public void getOwnersByRole(OwnerDTO ownerDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		ownerDTO.setUpdatedBy(logedUserid);
		ownerDTO.setUpdatedDate(createDate);

	}
	
	public void getOwners(OwnerDTO ownerDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		ownerDTO.setUpdatedBy(logedUserid);
		ownerDTO.setUpdatedDate(createDate);

	}

}
