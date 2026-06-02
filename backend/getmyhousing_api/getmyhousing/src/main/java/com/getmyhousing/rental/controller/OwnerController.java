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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.dto.BlogCategoryDTO;
import com.getmyhousing.common.dto.OwnerDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.rental.service.BlogService;
import com.getmyhousing.rental.service.OwnerService;
import com.getmyhousing.rental.validator.OwnerValidator;

@RestController
@RequestMapping("/owner")
public class OwnerController {
	
	private static Logger LOGGER = LoggerFactory.getLogger(BlogController.class);

	private LinkedHashMap<String, Object> returnMap;
	
	@Autowired
	private OwnerValidator ownerValidator;
	
	@Autowired
	private OwnerService ownerService;
	
	@RequestMapping(value = "/addOwner", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addOwner(@RequestBody OwnerDTO ownerDTO,
			BindingResult result) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, OwnerDTO.class.getName());
		ownerValidator.saveOwner(ownerDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		ownerService.saveOwner(ownerDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getOwnersByRole", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getOwnersByRole(@RequestBody OwnerDTO ownerDTO,
			BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, OwnerDTO.class.getName());
		ownerValidator.getOwnersByRole(ownerDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<OwnerDTO> ownersList = ownerService.getOwnersByRole(ownerDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("owners", ownersList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getOwners", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getOwners(@RequestBody OwnerDTO ownerDTO,
			BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, OwnerDTO.class.getName());
		ownerValidator.getOwners(ownerDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<OwnerDTO> ownersList = ownerService.getOwners(ownerDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("owners", ownersList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@Bean
	private OwnerValidator getOwnerValidator() {
		return new OwnerValidator();
	}

}
