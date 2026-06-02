package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.dto.UserPackagesDTO;

public interface UserPackagesDao {

	public UserPackages saveUserPackages(UserPackagesDTO userPackagesDTO);

	public List<UserPackages> getExpiredUserPackages(String date);

	public List<UserPackages> getAllUserPackages(UserPackagesDTO userPackagesDTO);

	public UserPackages getUserPackageById(Long id);

	public List<UserPackagesDTO> getUserPackagesList(UserPackagesDTO userPackagesDTO);

}
