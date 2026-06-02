package com.getmyhousing.rental.validator;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.ContactUsDataDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;

public class ContactUsDataValidator implements Validator {
	
	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;

	private static final List<String> VALID_UPDATE_STATUS = Arrays.asList(Constant.STATUS_ACTIVE,
			Constant.STATUS_DELETED);
	private static final Pattern VALID_EAMIL_PATTERN = Pattern.compile(Constant.EMAIL_PATTERN);
	private static final Pattern MOBILE_PATTERN = Pattern.compile(Constant.MOBILE_PATTERN);
	
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
	
	public void saveContactUsData(ContactUsDataDTO contactUsDataDTO, Errors errors) {
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(contactUsDataDTO.getName()))
			errors.rejectValue("name", BAD_REQUEST_ERROR_CD, "is required and cannot be null");
		if (CustomValidator.isEmpty(contactUsDataDTO.getMobileNumber())
				|| !CustomValidator.isValidPattern(MOBILE_PATTERN, contactUsDataDTO.getMobileNumber()))
			errors.rejectValue("mobileNumber", BAD_REQUEST_ERROR_CD, "is empty or not in a valid format");
		if (CustomValidator.isEmpty(contactUsDataDTO.getMessage()))
			errors.rejectValue("message", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		contactUsDataDTO.setStatus(Constant.STATUS_ACTIVE);
		contactUsDataDTO.setCreatedDate(createdTime);

	}

	public void getContactUsDataById(ContactUsDataDTO contactUsDataDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(contactUsDataDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
	}

	public void getAllContactUsData(ContactUsDataDTO contactUsDataDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		String formattedCreatedTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		contactUsDataDTO.setCreatedDate(createdTime);
	}

}
