package com.getmyhousing.rental.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.rental.service.PropBrokerFileUploadService;
import com.getmyhousing.rental.validator.PropBrokerFileUploadValidator;

@CrossOrigin
@RestController
@RequestMapping("/upload")
public class PropBrokerFileUploadController {

	@Autowired
	private PropBrokerFileUploadService fileUploadService;

	@Autowired
	private PropBrokerFileUploadValidator fileUploadValidator;

	private Logger LOGGER = LoggerFactory.getLogger(PropBrokerFileUploadController.class);

	@RequestMapping(path = "/uploadFile", method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> uploadFile(@RequestParam("file") MultipartFile multipartFile,
			@RequestParam("path") String folderName) {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, String.class.getName());
		
		fileUploadValidator.uploadFileToS3Validation(multipartFile, folderName, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		String str = fileUploadService.uploadFileToS3(multipartFile, folderName);

		LinkedHashMap<String, Object> map1 = new LinkedHashMap<String, Object>();
		map1.put("responseCode", Constant.SUCCESSFULL_CODE);
		map1.put("responseMessage", Constant.SUCCESSFULL_MSG);
		map1.put("url", str);
		

		return ResponseEntity.status(HttpStatus.OK).body(map1);
	}

	
//	@RequestMapping(path = "/uploadVideoFile", method = RequestMethod.POST)
//	public ResponseEntity<LinkedHashMap<String, Object>> uploadVideoFile(
//			@RequestParam("file") MultipartFile multipartFile, @RequestParam("path") String folderName) {
//
//		Map<String, String> map = new HashMap<String, String>();
//
//		MapBindingResult err = new MapBindingResult(map, String.class.getName());
//
//		LOGGER.info("Upload file:" + multipartFile + " ,folder name:" + folderName);
//		fileUploadValidator.uploadVideoFile(multipartFile, folderName, err);
//		List<ObjectError> list = err.getAllErrors();
//		if (list.size() > 0)
//			throw new FieldException(list);
 //
//		
//		String str = fileUploadService.uploadFileToS3(multipartFile, folderName);
//		LinkedHashMap<String, Object> map1 = new LinkedHashMap<String, Object>();
//		map1.put("responseCode", Constant.SUCCESSFULL_CODE);
//		map1.put("responseMessage", Constant.SUCCESSFULL_MSG);
//		map1.put("url", str);
//
//		return ResponseEntity.status(HttpStatus.OK).body(map1);
//	}
	
	
	@RequestMapping(path = "/uploadVideoFile", method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> uploadVideoFile(
			@RequestParam("file") MultipartFile multipartFile, @RequestParam("path") String folderName) {
 
		Map<String, String> map = new HashMap<String, String>();

		MapBindingResult err = new MapBindingResult(map, String.class.getName());

		LOGGER.info("Upload file:" + multipartFile + " ,folder name:" + folderName);
		fileUploadValidator.uploadVideoFile(multipartFile, folderName, err);
//		List<ObjectError> list = err.getAllErrors();
//		if (list.size() > 0)
//			throw new FieldException(list);
 
		
		String str = fileUploadService.uploadFileToS3(multipartFile, folderName);
		LinkedHashMap<String, Object> map1 = new LinkedHashMap<String, Object>();
		map1.put("responseCode", Constant.SUCCESSFULL_CODE);
		map1.put("responseMessage", Constant.SUCCESSFULL_MSG);
		map1.put("url", str);
 
		return ResponseEntity.status(HttpStatus.OK).body(map1);
	}

	
	
	
	

	@Bean
	public PropBrokerFileUploadValidator getPropBrokerFileUploadValidator() {
		return new PropBrokerFileUploadValidator();
	}

}
