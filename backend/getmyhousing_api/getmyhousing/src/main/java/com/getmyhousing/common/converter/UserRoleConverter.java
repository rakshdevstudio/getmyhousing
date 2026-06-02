package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.UserRoleDTO;

public class UserRoleConverter {

	/**
	 * To convert UserRole to UserRoleDTO
	 * 
	 * @param userRole
	 * @return
	 */
	public static UserRoleDTO getUserRoleDTOByUserRole(UserRole userRole) {
		UserRoleDTO userRoleDTO = new UserRoleDTO();
		userRoleDTO.setId(userRole.getId());
		userRoleDTO.setUserId(userRole.getUserId());
		userRoleDTO.setRole(userRole.getRole());
		userRoleDTO.setStatus(userRole.getStatus());
		userRoleDTO.setCreatedDate(userRole.getCreatedDate());
		userRoleDTO.setCreatedBy(userRole.getCreatedBy());
		userRoleDTO.setUpdatedDate(userRole.getUpdatedDate());
		userRoleDTO.setUpdatedBy(userRole.getUpdatedBy());

		return userRoleDTO;
	}

	/**
	 * To convert UserRoleDTO to UserRole
	 * 
	 * @param userRoleDTO
	 * @return
	 */
	public static UserRole getUserRoleByUserRoleDTO(UserRoleDTO userRoleDTO) {
		UserRole userRole = new UserRole();
		userRole.setId(userRoleDTO.getId());
		userRole.setUserId(userRoleDTO.getUserId());
		userRole.setRole(userRoleDTO.getRole());
		userRole.setStatus(userRoleDTO.getStatus());
		userRole.setCreatedDate(userRoleDTO.getCreatedDate());
		userRole.setCreatedBy(userRoleDTO.getCreatedBy());
		userRole.setUpdatedDate(userRoleDTO.getUpdatedDate());
		userRole.setUpdatedBy(userRoleDTO.getUpdatedBy());

		return userRole;
	}

}
