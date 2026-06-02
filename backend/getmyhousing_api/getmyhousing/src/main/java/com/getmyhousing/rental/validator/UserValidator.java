package com.getmyhousing.rental.validator;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.UserDTO;
import com.getmyhousing.common.dto.UserRoleDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;
import com.getmyhousing.common.validator.RoleEnum;

public class UserValidator implements Validator {

	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;
	private static final Pattern PASSWORD_PATTERN = Pattern.compile(Constant.PASSWORD_PATTERN);
	private static final Pattern VALID_EAMIL_PATTERN = Pattern.compile(Constant.EMAIL_PATTERN);
	private static final Pattern VALID_MOBILE_PATTERN = Pattern.compile(Constant.MOBILE_PATTERN);

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

	public void signup(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (!CustomValidator.isValidPattern(VALID_EAMIL_PATTERN, userDTO.getEmail()))
			errors.rejectValue("email", BAD_REQUEST_ERROR_CD, "Email is either empty or not in a valid format");

		if (!CustomValidator.isValidPattern(PASSWORD_PATTERN, userDTO.getPassword()))
			errors.rejectValue("password", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!RoleEnum.isInEnum(userDTO.getRole(), RoleEnum.class))
			errors.rejectValue("role", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(userDTO.getFullName()))
			errors.rejectValue("fullName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, userDTO.getMobileNumber()))
			errors.rejectValue("mobileNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		// Need to ask
		userDTO.setStatus(Constant.STATUS_ACTIVE);
		userDTO.setPasswordChangeOnLogin(Constant.CONSTANT_YES);
//		userDTO.setCreatedDate(createdDate);
//		userDTO.setCreatedBy((long) 1);
//		userDTO.setUpdatedDate(createdDate);
//		userDTO.setUpdatedBy((long) 1);

	}

	public void saveUser(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (!CustomValidator.isValidPattern(VALID_EAMIL_PATTERN, userDTO.getEmail()))
			errors.rejectValue("email", BAD_REQUEST_ERROR_CD, "Email is either empty or not in a valid format");

		if (CustomValidator.isEmpty(userDTO.getFullName()))
			errors.rejectValue("fullName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, userDTO.getMobileNumber()))
			errors.rejectValue("mobileNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getWhatsappNumber()
				&& !CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, userDTO.getWhatsappNumber()))
			errors.rejectValue("whatsappNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(userDTO.getRoles())) {
			errors.rejectValue("roles", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		} else {
			if (userDTO.getRoles().stream().noneMatch(role -> RoleEnum.isInEnum(role, RoleEnum.class)))
				errors.rejectValue("role", BAD_REQUEST_ERROR_CD, "is empty or not in a valid format");
		}

		userDTO.setStatus(Constant.STATUS_ACTIVE);
		userDTO.setPasswordChangeOnLogin(Constant.CONSTANT_YES);
		userDTO.setCreatedDate(createdDate);
		userDTO.setCreatedBy(logedUserid);
		userDTO.setUpdatedDate(createdDate);
		userDTO.setUpdatedBy(logedUserid);
	}
	
	public void changeUserStatus(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();
		
		if (CustomValidator.isEmpty(userDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (null != userDTO.getStatus() && CustomValidator.isEmpty(userDTO.getStatus()))
			errors.rejectValue("status", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		userDTO.setUpdatedDate(createdDate);
		userDTO.setUpdatedBy(logedUserid);
		
	}

	public void updateUser(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(userDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getEmail() && (!CustomValidator.isValidPattern(VALID_EAMIL_PATTERN, userDTO.getEmail())))
			errors.rejectValue("email", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getFullName() && CustomValidator.isEmpty(userDTO.getFullName()))
			errors.rejectValue("fullName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getMobileNumber()
				&& !CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, userDTO.getMobileNumber()))
			errors.rejectValue("mobileNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getWhatsappNumber()
				&& !CustomValidator.isValidPattern(VALID_MOBILE_PATTERN, userDTO.getWhatsappNumber()))
			errors.rejectValue("whatsappNumber", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getCountry() && CustomValidator.isEmpty(userDTO.getCountry()))
			errors.rejectValue("country", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getState() && CustomValidator.isEmpty(userDTO.getState()))
			errors.rejectValue("state", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getDistrict() && CustomValidator.isEmpty(userDTO.getDistrict()))
			errors.rejectValue("district", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getCity() && CustomValidator.isEmpty(userDTO.getCity()))
			errors.rejectValue("city", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		userDTO.setUpdatedDate(createdDate);
		userDTO.setUpdatedBy(logedUserid);

	}

	public void login(UserDTO userDTO, Errors errors) {

		if (!CustomValidator.isValidPattern(VALID_EAMIL_PATTERN, userDTO.getEmail()))
			errors.rejectValue("email", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!CustomValidator.isValidPattern(PASSWORD_PATTERN, userDTO.getPassword()))
			errors.rejectValue("password", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

	}

	public void getUserById(UserDTO userDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(userDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		userDTO.setUpdatedBy(logedUserid);
		userDTO.setUpdatedDate(createdDate);

	}

	public void saveUserRole(UserRoleDTO userRoleDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(userRoleDTO.getUserId()))
			errors.rejectValue("userId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(userRoleDTO.getRole()))
			errors.rejectValue("role", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		userRoleDTO.setStatus(Constant.STATUS_ACTIVE);
		userRoleDTO.setCreatedDate(createdDate);
		userRoleDTO.setCreatedBy(logedUserid);
		userRoleDTO.setUpdatedDate(createdDate);
		userRoleDTO.setUpdatedBy(logedUserid);

	}

	public void updateUserRole(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(userDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null == userDTO.getRoles() || userDTO.getRoles().size() == 0)
			errors.rejectValue("roles", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		else {
			if (userDTO.getRoles().stream().noneMatch(role -> RoleEnum.isInEnum(role, RoleEnum.class)))
				errors.rejectValue("role", BAD_REQUEST_ERROR_CD, "is empty or not in a valid format");
		}

		userDTO.setUpdatedDate(createdDate);
		userDTO.setUpdatedBy(logedUserid);
	}

	public void deleteUser(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.hasValidValue(userDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		userDTO.setUpdatedDate(createdDate);
		userDTO.setUpdatedBy(logedUserid);

	}

	public void getAllUsers(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(userDTO.getRoles()))
			errors.rejectValue("roles", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		else {
			if (userDTO.getRoles().stream().noneMatch(role -> RoleEnum.isInEnum(role, RoleEnum.class)))
				errors.rejectValue("role", BAD_REQUEST_ERROR_CD, "is empty or not in a valid format");
		}

		userDTO.setUpdatedDate(createdDate);
		userDTO.setUpdatedBy(logedUserid);

	}

	public void changePassword(UserDTO userDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (!CustomValidator.isValidPattern(PASSWORD_PATTERN, userDTO.getPassword()))
			errors.rejectValue("password", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!CustomValidator.isValidPattern(PASSWORD_PATTERN, userDTO.getNewPassword()))
			errors.rejectValue("newPassword", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!CustomValidator.isValidPattern(PASSWORD_PATTERN, userDTO.getConfirmNewPassword()))
			errors.rejectValue("confirmNewPassword", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != userDTO.getNewPassword() && null != userDTO.getConfirmNewPassword()
				&& !userDTO.getNewPassword().equals(userDTO.getConfirmNewPassword()))
			errors.rejectValue("confirmNewPassword/newPassword", BAD_REQUEST_ERROR_CD, "both should be equal");

		userDTO.setUpdatedDate(createdDate);
		userDTO.setUpdatedBy(logedUserid);

	}

}
