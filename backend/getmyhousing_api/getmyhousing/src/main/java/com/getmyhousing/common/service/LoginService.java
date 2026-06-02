package com.getmyhousing.common.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.getmyhousing.common.domain.UserRole;

public interface LoginService extends UserDetailsService {

	UserDetails loadUserByUserEmail(String email) throws UsernameNotFoundException;

	List<UserRole> getAllUserRoles(Long userId);

	boolean isUserAccessible(Long userId, List<String> roles);

}
