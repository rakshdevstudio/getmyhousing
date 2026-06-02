package com.getmyhousing.common.converter;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.dto.UserDTO;
import com.getmyhousing.common.utils.DateUtils;

public class UserConverter {

	/**
	 * To convert User to UserDTO
	 * 
	 * @param user
	 * @return
	 */
	public static UserDTO getUserDTOByUser(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setEmail(user.getEmail());
		userDTO.setPassword(user.getPassword());
		userDTO.setFullName(user.getFullName());
		userDTO.setMobileNumber(user.getMobileNumber());
		userDTO.setWhatsappNumber(user.getWhatsappNumber());
		userDTO.setCountry(user.getCountry());
		userDTO.setState(user.getState());
		userDTO.setDistrict(user.getDistrict());
		userDTO.setCity(user.getCity());
//		userDTO.setPasswordChangeOnLogin(user.getPasswordChangeOnLogin());
		userDTO.setPasswordChangeOnLogin(Constant.CONSTANT_YES);

		userDTO.setStatus(user.getStatus());
		userDTO.setCreatedDate(user.getCreatedDate());
		userDTO.setCreatedBy(user.getCreatedBy());
		userDTO.setUpdatedDate(user.getUpdatedDate());
		userDTO.setUpdatedBy(user.getUpdatedBy());
		userDTO.setPincode(user.getPincode());
		userDTO.setCountryCode(user.getCountryCode());

		return userDTO;

	}

	/**
	 * To convert UserDTO to User
	 * 
	 * @param userDTO
	 * @return
	 */
	public static User getUserByUserDTO(UserDTO userDTO) {
		User user = new User();
		user.setId(userDTO.getId());
		user.setEmail(userDTO.getEmail());
		user.setPassword(userDTO.getPassword());
		user.setFullName(userDTO.getFullName());
		user.setMobileNumber(userDTO.getMobileNumber());
		user.setWhatsappNumber(userDTO.getWhatsappNumber());
		user.setCountry(userDTO.getCountry());
		user.setState(userDTO.getState());
		user.setDistrict(userDTO.getDistrict());
		user.setCity(userDTO.getCity());
		user.setPasswordChangeOnLogin(userDTO.getPasswordChangeOnLogin());
		user.setStatus(Constant.STATUS_ACTIVE);
		user.setCreatedDate(DateUtils.currentDate());
		user.setUpdatedDate(DateUtils.currentDate());
		user.setCreatedBy(userDTO.getCreatedBy());
		user.setUpdatedBy(userDTO.getCreatedBy());
		user.setPincode(userDTO.getPincode());
		user.setCountryCode(userDTO.getCountryCode());

		return user;
	}

}
