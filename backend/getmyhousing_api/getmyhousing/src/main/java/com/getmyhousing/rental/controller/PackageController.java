package com.getmyhousing.rental.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.PackagePayment;
import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;
import com.getmyhousing.common.dto.PackagePaymentDTO;
import com.getmyhousing.common.dto.PackagesDTO;
import com.getmyhousing.common.dto.UserPackagesDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.rental.service.PackageService;
import com.getmyhousing.rental.validator.PackagesValidator;

@CrossOrigin
@RestController
@RequestMapping("/package")
public class PackageController {

	private Logger LOGGER = LoggerFactory.getLogger(PackageController.class);

	private LinkedHashMap<String, Object> returnMap;

	@Autowired
	PackageService packageService;

	@Autowired
	PackagesValidator packagesValidator;

	@RequestMapping(value = "/addPackage", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addPackage(@RequestBody PackagesDTO packagesDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		
		packagesValidator.savePackage(packagesDTO, err);
		
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		packageService.savePackage(packagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/getPackages", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getPackages(@RequestBody PackagesDTO packagesDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.getAllPackages(packagesDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<Packages> returnList = packageService.getAllPackages(packagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("packages", returnList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/getPackage", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getPackageById(@RequestBody PackagesDTO packagesDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
		HashMap<String, String> map = new HashMap<String, String>();
		
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.getPackageById(packagesDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		Packages packages = packageService.getPackageById(packagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("packages", packages);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updatePackage", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePackage(@RequestBody PackagesDTO packagesDto,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.updatePackage(packagesDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		packageService.updatePackage(packagesDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/deletePackage", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> deletePackage(@RequestBody PackagesDTO packagesDto,
			BindingResult result) {

		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.deletePackage(packagesDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		packageService.deletePackage(packagesDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/addUserPackage", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addUserPackage(@RequestBody UserPackagesDTO userPackagesDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.saveUserPackage(userPackagesDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		packageService.saveUserPackage(userPackagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/getUserPackages", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getUserPackages(@RequestBody UserPackagesDTO userPackagesDTO,
			BindingResult result) {
		
		Map<String, String> map = new HashMap<String, String>();
		
		MapBindingResult err = new MapBindingResult(map, UserPackagesDTO.class.getName());
		
		packagesValidator.getUserPackages(userPackagesDTO, err);
		
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<UserPackagesDTO> returnList = packageService.getAllUserPackages(userPackagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put(Constant.RESPONSE_CODE_KEY, Constant.SUCCESSFULL_CODE);
		returnMap.put(Constant.RESPONSE_MSG_KEY, Constant.SUCCESSFULL_MSG);
		returnMap.put("UserPackages", returnList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/verifyUserPackage", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> verifyUserPackage(@RequestBody PackagesDTO packagesDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.verifyUserPackage(packagesDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		packageService.verifyUserPackage(packagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/verifyUserPackageByListingType", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> verifyUserPackageByListingType(
			@RequestBody PackagesDTO packagesDTO, BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.verifyUserPackageByListingType(packagesDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		packageService.verifyUserPackageByListingType(packagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/verifyUserPackageByCity", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> verifyUserPackageByCity(@RequestBody PackagesDTO packagesDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.verifyUserPackageByCity(packagesDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		Long userPackageId = packageService.verifyUserPackageByCity(packagesDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("userPackageId", userPackageId);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/purchasePackage", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> purchasePackage(@RequestBody PackagesDTO packagesDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.purchasePackage(packagesDTO, err);
				
//		List<ObjectError> list = err.getAllErrors();
//		if (list.size() > 0)
//			throw new FieldException(list);

		LinkedHashMap<String, String> easebuzzMap = packageService.purchasePackage(packagesDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		for (Map.Entry<String, String> entry : easebuzzMap.entrySet()) {
			returnMap.put(entry.getKey(), entry.getValue());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/updatePurchasePkgSuccess", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePurchasePkgSuccess(
			@RequestBody EasebuzzOrderDTO easebuzzOrderDTO, HttpServletRequest request, BindingResult result)
			throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.updatePurchasePkgSuccess(easebuzzOrderDTO, err);
//		List<ObjectError> list = err.getAllErrors();
//		if (list.size() > 0)
//			throw new FieldException(list);

		packageService.updatePurchasePkgSuccess(easebuzzOrderDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/updatePurchasePkgFailure", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updatePurchasePkgFailure(
			@RequestBody EasebuzzOrderDTO easebuzzOrderDTO, HttpServletRequest request, BindingResult result)
			throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, PackagesDTO.class.getName());
		packagesValidator.updatePurchasePkgFailure(easebuzzOrderDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		packageService.updatePurchasePkgFailure(easebuzzOrderDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/addPackagePayment"
			, produces = MediaType.APPLICATION_JSON_VALUE
			, consumes = MediaType.APPLICATION_JSON_VALUE
			, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addPackagePayment(
			@RequestBody PackagePaymentDTO packagePaymentDto,
			HttpServletRequest request,
			BindingResult result
			) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		packageService.savePackagePayment(packagePaymentDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value="/getPackagePayments", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getPackagePayments(@RequestBody PackagePaymentDTO packagePaymentDto, HttpServletRequest request, BindingResult result ){
		
		List<PackagePaymentDTO> packagePayments = packageService.getPackagePayments(packagePaymentDto);
		
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("packagePayments", packagePayments);
		
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value="/editStatusPackagePayment"
			, produces = MediaType.APPLICATION_JSON_VALUE
			,consumes = MediaType.APPLICATION_JSON_VALUE
			,method = RequestMethod.POST
			)
	public ResponseEntity<LinkedHashMap<String, Object>> editStatusPackagePayment(
			@RequestBody PackagePaymentDTO packagePaymentDto,
			HttpServletRequest request,
			BindingResult result
			) throws Exception {
		
		returnMap = new LinkedHashMap<String, Object>();
		
		if (result.hasErrors()) {
			returnMap.put("responseCode", HttpStatus.BAD_REQUEST);
			returnMap.put("responseMessage", "Invalid input");
			returnMap.put("errors", result.getAllErrors());
            return new ResponseEntity<>(returnMap, HttpStatus.BAD_REQUEST);
        }
		
		try {
            // Extract information from DTO
            Long packagePaymentId = packagePaymentDto.getId();
            String status = packagePaymentDto.getStatus();
            
            // Update status in PackagePayment table
            boolean isUpdated = packageService.updatePackagePaymentStatus(packagePaymentId, status);
            
            if (isUpdated) {
            	returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
            	returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
                return new ResponseEntity<>(returnMap, HttpStatus.OK);
            } else {
            	returnMap.put("status", "error");
            	returnMap.put("message", "Failed to update status");
                return new ResponseEntity<>(returnMap, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
        } catch (Exception e) {
        	returnMap.put("status", "error");
        	returnMap.put("message", "An error occurred: " + e.getMessage());
            return new ResponseEntity<>(returnMap, HttpStatus.INTERNAL_SERVER_ERROR);
        }
	}
	
	
	@Bean
	public PackagesValidator getPackagesValidator() {
		return new PackagesValidator();
	}

}
