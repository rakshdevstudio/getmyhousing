package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.dto.UserDTO;

public interface UserDao {

	public User saveUser(UserDTO userDTO);
	
	public User changeStatus(User user);

	public User getUserById(Long id);
	
	public Long getReferedCount(Long id);

	public User getUserByEmail(String email);

	public List<UserDTO> getAllUser(UserDTO userDTO);
	
	public List<UserDTO> getAllUserForOperator(UserDTO dto);

	public List<UserDTO> getAllUserForAssign(UserDTO dto);
	
	public List<UserDTO> getAllOperators(UserDTO dto);

//	public User getAssociateUserById(Long userId);

}
