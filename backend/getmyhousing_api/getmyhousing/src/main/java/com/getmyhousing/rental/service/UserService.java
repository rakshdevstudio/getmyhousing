package com.getmyhousing.rental.service;

import java.util.LinkedHashMap;
import java.util.List;

import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.UserDTO;
import com.getmyhousing.common.dto.UserRoleDTO;

public interface UserService {

	// Signup for the user
	public void signUp(UserDTO userDTO);

	// To add user by admin
	public User saveUser(UserDTO userDTO);
	
	public User findByEmail(String email);

	// To update user details
	public void updateUser(UserDTO userDTO);
	
//	Change Status of user
	public void changeUserStatus(UserDTO userDTO);

	// To login user by email and password
	public LinkedHashMap<String, Object> login(UserDTO usersDTO);

	// To get user by id
	public UserDTO getUserById(UserDTO userDTO);

	// To save the user roles
	public UserRole saveUserRole(UserRoleDTO userRoleDTO);

	// To update the user roles
	public void updateUserRole(UserDTO userDTO);

	// To delete the user by id
	public User deleteUser(UserDTO userDTO);

	// To get all users by Admin, teleCaller and team leader
	public List<UserDTO> getAllUsers(UserDTO userDTO);
	
	// To get pincode wise user for operator
	public List<UserDTO> getAllUsersForOperator(UserDTO userDTO);

	// To change the oldPassword
	public void changePassword(UserDTO userDTO);
	
	public void resetPassword(UserDTO userDTO);

	public List<UserDTO> getAllUsersForAssign(UserDTO userDTO);
	
	public List<UserDTO> getAllOperators(UserDTO userDTO);

}
