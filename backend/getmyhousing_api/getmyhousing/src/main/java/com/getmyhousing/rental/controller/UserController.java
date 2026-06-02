package com.getmyhousing.rental.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.ContactUsData;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.dto.ContactUsDataDTO;
import com.getmyhousing.common.dto.UserDTO;
import com.getmyhousing.common.dto.UserRoleDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.service.EmailService;
import com.getmyhousing.rental.service.ContactUsDataService;
import com.getmyhousing.rental.service.OtpService;
import com.getmyhousing.rental.service.UserService;
import com.getmyhousing.rental.validator.ContactUsDataValidator;
import com.getmyhousing.rental.validator.UserValidator;


@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

	private Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	private LinkedHashMap<String, Object> returnMap;

	@Autowired
	UserService userService;

	@Autowired
	UserValidator userValidator;
	
	@Autowired
    private OtpService otpService;
	
	@Autowired
	private ContactUsDataValidator contactUsDataValidator;
	
	@Autowired
	private ContactUsDataService contactUsDataService;

	@RequestMapping(value = "/signup", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> signUp(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
//		Map<String, String> map = new HashMap<String, String>();
//		MapBindingResult err = new MapBindingResult (map, UserDTO.class.getName());
//		userValidator.signup(userDTO, err);
//		List<ObjectError> list = err.getAllErrors();
//		if (list.size() > 0)
//			throw new FieldException(list);

		userService.signUp(userDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/addUser", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addUser(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
		userService.saveUser(userDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateUser", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateUser(@RequestBody UserDTO userDto,
			BindingResult result) {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.updateUser(userDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		userService.updateUser(userDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/changeStatus", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> changeStatus(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.changeUserStatus(userDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		userService.changeUserStatus(userDTO);
		
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/updateUserRoles", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateUserRole(@RequestBody UserDTO userDTO,
			BindingResult result) {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserRoleDTO.class.getName());
		userValidator.updateUserRole(userDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		userService.updateUserRole(userDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> login(@RequestBody UserDTO usersDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		HashMap<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.login(usersDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		returnMap = userService.login(usersDTO);
		
		
//		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/getUser", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getUser(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.getUserById(userDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		UserDTO dto = userService.getUserById(userDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("user", dto);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(path = "/deleteUser", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> deleteUser(@RequestBody UserDTO userDto,
			BindingResult result) {

		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.deleteUser(userDto, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0) {
			throw new FieldException(list);
		}

		userService.deleteUser(userDto);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getUsers(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
		LOGGER.info("Pincode controll: {}", userDTO.getPincode());
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.getAllUsers(userDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<UserDTO> dto = userService.getAllUsers(userDTO);
		
		// Extract unique pincodes from user data
	    Set<String> uniquePincodes = dto.stream()
	            .map(UserDTO::getPincode)
	            .filter(Objects::nonNull) // Exclude null values
	            .collect(Collectors.toSet());
	
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("users", dto);
		returnMap.put("pincodeList", new ArrayList<>(uniquePincodes));
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(path = "/getUsersForOperator", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getUsersForOperator(
			@RequestBody UserDTO userDTO,
			HttpServletRequest request,
			BindingResult result
			)throws Exception{
		
		List<UserDTO> dto = userService.getAllUsersForOperator(userDTO);
		
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("users", dto);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/changePassword", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> changePassword(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();

		userService.changePassword(userDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	
//	here we have need only that user who's role is team leader , telecaller , associate 
	@RequestMapping(value = "/getUsersForAssign", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getUsersForAssign(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.getAllUsers(userDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<UserDTO> dto = userService.getAllUsersForAssign(userDTO);
	
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("users", dto);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@PostMapping(value = "/sendOtp", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LinkedHashMap<String, Object>> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userService.findByEmail(email);

        if (user != null) {
            String otp = otpService.generateOtp(email);
            otpService.sendOtpEmail(email, otp);
            
            returnMap = new LinkedHashMap<String, Object>();
    		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
    		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
    		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
        } else {
        	returnMap = new LinkedHashMap<String, Object>();
    		returnMap.put("responseCode", "404");
    		returnMap.put("responseMessage", "Email not found");
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(returnMap);
        }
    }

    @PostMapping(value = "/verifyOtp", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LinkedHashMap<String, Object>> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        boolean isValid = otpService.verifyOtp(email, otp);

        if (isValid) {
        	returnMap = new LinkedHashMap<String, Object>();
    		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
    		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
    		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
//            return ResponseEntity.ok(Map.of("success", true));
        } else {
        	returnMap = new LinkedHashMap<String, Object>();
    		returnMap.put("responseCode", "400");
    		returnMap.put("responseMessage", "Invalid OTP");
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(returnMap);
//            return ResponseEntity.ok(Map.of("success", false, "message", "Invalid OTP"));
        }
    }
    
    @RequestMapping(value = "/resetPassword",
    		produces = MediaType.APPLICATION_JSON_VALUE,
    		consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> resetPassword(
			@RequestBody UserDTO userDTO,
			HttpServletRequest request,
			BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();

		userService.resetPassword(userDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
    
    @RequestMapping(value = "/addContactUsData", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addContactUsData(
			@RequestBody ContactUsDataDTO contactUsDataDTO, HttpServletRequest request, BindingResult result)
			throws Exception {
		HashMap<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, ContactUsDataDTO.class.getName());

		// contactUsDataValidator
		contactUsDataValidator.saveContactUsData(contactUsDataDTO, err);

		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		contactUsDataService.saveContactUsData(contactUsDataDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/getContactUsData", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getContactUsData(
			@RequestBody ContactUsDataDTO contactUsDataDTO, HttpServletRequest request, BindingResult result)
			throws Exception {
		HashMap<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, ContactUsDataDTO.class.getName());
		// contactUsDataValidator
		contactUsDataValidator.getContactUsDataById(contactUsDataDTO, err);

		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);
		ContactUsData contactUsData = contactUsDataService.getContactUsDataById(contactUsDataDTO);

		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("contactUsData", contactUsData);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}

	@RequestMapping(value = "/getContactUsDatas", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getContactUsDatas(
			@RequestBody ContactUsDataDTO contactUsDataDTO, HttpServletRequest request, BindingResult result)
			throws Exception {
		HashMap<String, String> map = new HashMap<>();
		MapBindingResult err = new MapBindingResult(map, ContactUsDataDTO.class.getName());

		// Assuming you have a validator for ContactUsDataDTO named
		// contactUsDataValidator
		contactUsDataValidator.getAllContactUsData(contactUsDataDTO, err);

		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		// Assuming you have a service method to get all contact us data
		List<ContactUsDataDTO> contactUsDataList = contactUsDataService.getAllContactUsData(contactUsDataDTO);

		returnMap = new LinkedHashMap<>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("contactUsDataList", contactUsDataList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getOperators", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getOperators(@RequestBody UserDTO userDTO,
			HttpServletRequest request, BindingResult result) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, UserDTO.class.getName());
		userValidator.getAllUsers(userDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<UserDTO> dto = userService.getAllOperators(userDTO);
	
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("users", dto);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@Bean
	public ContactUsDataValidator contactUsDataValidator() {
		return new ContactUsDataValidator();
	}
	
	@Bean
	public UserValidator getUserValidator() {
		return new UserValidator();
	}

}
