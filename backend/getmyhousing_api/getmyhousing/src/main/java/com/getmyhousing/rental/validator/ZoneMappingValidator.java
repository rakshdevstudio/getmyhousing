package com.getmyhousing.rental.validator;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;

public class ZoneMappingValidator implements Validator {
	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate(Object target, Errors errors) {
		// TODO Auto-generated method stub

	}

	public void getZoneMapping(CountryPincodeMappingDTO countryPincodeMappingDTO, Errors errors) {
		// TODO Auto-generated method stub

	}

}
