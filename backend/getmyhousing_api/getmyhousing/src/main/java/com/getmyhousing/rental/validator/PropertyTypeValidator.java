package com.getmyhousing.rental.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.dto.PropertyTypeDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;

public class PropertyTypeValidator implements Validator {

	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;

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

	public void savePropertyType(PropertyTypeDTO propertyTypeDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(propertyTypeDTO.getPropertyType()))
			errors.rejectValue("propertyType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertyTypeDTO.getPropertySubType()))
			errors.rejectValue("propertySubType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertyTypeDTO.getPropertySubTypeIconPath()))
			errors.rejectValue("propertySubTypeIconPath", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertyTypeDTO.getPropertyRankOrder()))
			errors.rejectValue("propertyRankOrder", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(propertyTypeDTO.getPropertyTypeIconPath()))
			errors.rejectValue("propertyTypeIconPath", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		propertyTypeDTO.setStatus(Constant.STATUS_ACTIVE);
		propertyTypeDTO.setCreatedDate(createdDate);
		propertyTypeDTO.setCreatedBy(logedUserid);
		propertyTypeDTO.setUpdatedDate(createdDate);
		propertyTypeDTO.setUpdatedBy(logedUserid);

	}
	
	public void saveAddress(CountryPincodeMappingDTO countryPincodeMappingDTO, Errors errors) {
		
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();
		
		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getCountry()))
			errors.rejectValue("country", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getState()))
			errors.rejectValue("state", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getDistrict()))
			errors.rejectValue("district", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		if (CustomValidator.isEmpty(countryPincodeMappingDTO.getPincode()))
			errors.rejectValue("pincode", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");
		
		countryPincodeMappingDTO.setStatus(Constant.STATUS_ACTIVE);
		countryPincodeMappingDTO.setCreatedDate(createdDate);
		countryPincodeMappingDTO.setCreatedBy(logedUserid);
		countryPincodeMappingDTO.setUpdatedDate(createdDate);
		countryPincodeMappingDTO.setUpdatedBy(logedUserid);
	}

	public void getPropertyTypes(PropertyTypeDTO propertyTypeDTO, MapBindingResult err) {

	}

}
