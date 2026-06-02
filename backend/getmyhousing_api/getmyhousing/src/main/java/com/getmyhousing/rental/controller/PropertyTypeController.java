package com.getmyhousing.rental.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.CountryPincodeMapping;
import com.getmyhousing.common.dto.AddressResponse;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.dto.PaginationDTO;
import com.getmyhousing.common.dto.PropertyTypeDTO;
import com.getmyhousing.common.dto.TenantStatusDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.rental.service.CountryPincodeMappingService;
import com.getmyhousing.rental.service.PropertyTypeService;
import com.getmyhousing.rental.validator.PropertyTypeValidator;
import com.getmyhousing.rental.validator.ZoneMappingValidator;

@RestController
@RequestMapping("/propertytype")
public class PropertyTypeController {

	private Logger LOGGER = LoggerFactory.getLogger(PropertyTypeController.class);

	private LinkedHashMap<String, Object> returnMap;

	@Autowired
	PropertyTypeService propertyTypeService;

	@Autowired
	PropertyTypeValidator propertyTypeValidator;

	@Autowired
	CountryPincodeMappingService countryPincodeMappingService;

	@Autowired
	ZoneMappingValidator zoneMappingValidator;

	@RequestMapping(value = "/addPropertyType", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addPropertyType(@RequestBody PropertyTypeDTO propertyTypeDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertyTypeDTO.class.getName());
		propertyTypeValidator.savePropertyType(propertyTypeDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		propertyTypeService.savePropertyType(propertyTypeDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/getPropertyTypes", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getPropertyTypes(@RequestBody PropertyTypeDTO propertyTypeDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PropertyTypeDTO.class.getName());
		propertyTypeValidator.getPropertyTypes(propertyTypeDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<PropertyTypeDTO> returnList = propertyTypeService.getPropertyTypes(propertyTypeDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("PropertyTypes", returnList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/getSubPropertyTypes", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getSubPropertyTypes(@RequestBody PropertyTypeDTO propertyTypeDTO,
			BindingResult result) {

		List<String> returnList = propertyTypeService.getSubPropertyTypes(propertyTypeDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("SubPropertyTypes", returnList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/getCountryPincodeMapping", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getCountryPincodeMapping(
			@RequestBody CountryPincodeMappingDTO pincodeMappingDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, CountryPincodeMappingDTO.class.getName());
		zoneMappingValidator.getZoneMapping(pincodeMappingDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		ArrayNode returnList = countryPincodeMappingService.getCountryPincodeMapping(pincodeMappingDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("countries", returnList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	

	@RequestMapping(path = "/getCities", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getCities(
			@RequestBody CountryPincodeMappingDTO countryPincodeMappingDTO, BindingResult result) {
		
		Map<String, String> map = new HashMap<>();
		
		MapBindingResult err = new MapBindingResult(map, CountryPincodeMappingDTO.class.getName());
		
		zoneMappingValidator.getZoneMapping(countryPincodeMappingDTO, err);
		
		List<ObjectError> list = err.getAllErrors();
		
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		List<String> returnList = countryPincodeMappingService.getAllCity(countryPincodeMappingDTO);

		LinkedHashMap<String, Object> returnMap = new LinkedHashMap<>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("cities", returnList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/getAddress", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getAddress(
			@RequestBody PaginationDTO paginationDTO,
			HttpServletRequest request,
			BindingResult result
			){
		AddressResponse returnList = countryPincodeMappingService.getAddress(paginationDTO.getPageNumber(), paginationDTO.getPageSize(), paginationDTO.getSearch());
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("address", returnList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/saveAddress", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> saveAddress(
			@RequestBody CountryPincodeMappingDTO countryPincodeMappingDTO,
			HttpServletRequest request,
			BindingResult result
			) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, CountryPincodeMappingDTO.class.getName());
		propertyTypeValidator.saveAddress(countryPincodeMappingDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);
		
		countryPincodeMappingService.saveAddress(countryPincodeMappingDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/welcome", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> welcome(@RequestBody TenantStatusDTO amenitiesDTO,
			BindingResult result, HttpServletRequest request) {
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);

	}

	@Bean
	public ZoneMappingValidator getZoneMappingValidator() {
		return new ZoneMappingValidator();
	}

	@Bean
	public PropertyTypeValidator getPropertyTypeValidator() {
		return new PropertyTypeValidator();
	}

}
