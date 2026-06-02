package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.UserRoleDTO;

public interface UserRoleDao {

	public UserRole saveUserRole(UserRoleDTO userRoleDTO);

	public UserRole getUserRoleById(Long id);

	public void deleteUserRoleByUserId(Long userId);

	public List<UserRole> saveAllUserRole(List<UserRoleDTO> roleList);

	public List<UserRole> getAllRoles(UserRoleDTO roleDTO);

}
