package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.dto.UserPackagesDTO;

public class UserPackageConverter {

	/**
	 * To convert UserPackages to UserPackagesDTO
	 * 
	 * @param userPackages
	 * @return
	 */
	public static UserPackagesDTO getUserPackagesDTOByUserPackages(UserPackages userPackages) {
		UserPackagesDTO userPackagesDTO = new UserPackagesDTO();
		userPackagesDTO.setId(userPackages.getId());
		userPackagesDTO.setUserId(userPackages.getUserId());
		userPackagesDTO.setPackageId(userPackages.getPackageId());
		userPackagesDTO.setPackageActiveDate(userPackages.getPackageActiveDate());
		userPackagesDTO.setPackageExpiryDate(userPackages.getPackageExpiryDate());
		userPackagesDTO.setStatus(userPackages.getStatus());
		userPackagesDTO.setUpdatedBy(userPackages.getUpdatedBy());
		userPackagesDTO.setUpdatedDate(userPackages.getUpdatedDate());
		userPackagesDTO.setCreatedBy(userPackages.getCreatedBy());
		userPackagesDTO.setCreatedDate(userPackages.getCreatedDate());

		return userPackagesDTO;

	}

	/**
	 * To convert UserPackagesDTO to UserPackages
	 * 
	 * @param userPackagesDTO
	 * @return
	 */
	public static UserPackages getUserPackagesByUserPackagesDTO(UserPackagesDTO userPackagesDTO) {
		UserPackages userPackages = new UserPackages();
		userPackages.setId(userPackagesDTO.getId());
		userPackages.setUserId(userPackagesDTO.getUserId());
		userPackages.setPackageId(userPackagesDTO.getPackageId());
		userPackages.setPackageActiveDate(userPackagesDTO.getPackageActiveDate());
		userPackages.setPackageExpiryDate(userPackagesDTO.getPackageExpiryDate());
		userPackages.setStatus(userPackagesDTO.getStatus());
		userPackages.setUpdatedBy(userPackagesDTO.getUpdatedBy());
		userPackages.setUpdatedDate(userPackagesDTO.getUpdatedDate());
		userPackages.setCreatedBy(userPackagesDTO.getCreatedBy());
		userPackages.setCreatedDate(userPackagesDTO.getCreatedDate());

		return userPackages;
	}

}
