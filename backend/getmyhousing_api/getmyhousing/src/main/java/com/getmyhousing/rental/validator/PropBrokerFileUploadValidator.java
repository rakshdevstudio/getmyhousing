package com.getmyhousing.rental.validator;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.Errors;
import org.springframework.web.multipart.MultipartFile;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.validator.CustomValidator;

public class PropBrokerFileUploadValidator {

	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;

	@Value("${multipart.maxFileSize}")
	private long multipartFileSize;

	public void uploadFileToS3Validation(MultipartFile multipartFile, String folderName, Errors errors) {
		if (CustomValidator.isEmpty(multipartFile) || CustomValidator.isEmpty(folderName))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "multipart or folder is null or invalid format");

		// Check given file size > 5MB
		if (multipartFile.getSize() > multipartFileSize)
			errors.rejectValue("file", BAD_REQUEST_ERROR_CD, " size should be equal/lessthan 5MB");

	}

	public void uploadVideoFile(MultipartFile multipartFile, String folderName, Errors errors) {
		if (CustomValidator.isEmpty(multipartFile) || CustomValidator.isEmpty(folderName))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "multipart or folder is null or invalid format");

	}

}
