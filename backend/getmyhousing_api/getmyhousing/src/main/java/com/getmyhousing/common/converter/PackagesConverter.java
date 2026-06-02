package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.dto.PackagesDTO;

public class PackagesConverter {

	/**
	 * To convert Packages to PackagesDTO
	 * 
	 * @param packages
	 * @return
	 */
	public static PackagesDTO getPackagesDTOByPackages(Packages packages) {
		PackagesDTO packagesDTO = new PackagesDTO();
		packagesDTO.setId(packages.getId());
		packagesDTO.setPackageName(packages.getPackageName());
		packagesDTO.setPackageFor(packages.getPackageFor());
		packagesDTO.setListingType(packages.getListingType());
		packagesDTO.setDurationInDays(packages.getDurationInDays());
		packagesDTO.setNoOfListings(packages.getNoOfListings());
		packagesDTO.setCountry(packages.getCountry());
		packagesDTO.setState(packages.getState());
		packagesDTO.setDistrict(packages.getDistrict());
		packagesDTO.setDescription(packages.getDescription());
		packagesDTO.setMrp(packages.getMrp());
		packagesDTO.setDiscount(packages.getDiscount());
		packagesDTO.setSellingPrice(packages.getSellingPrice());
		packagesDTO.setStatus(packages.getStatus());
		packagesDTO.setUpdatedBy(packages.getUpdatedBy());
		packagesDTO.setUpdatedDate(packages.getUpdatedDate());
		packagesDTO.setCreatedBy(packages.getCreatedBy());
		packagesDTO.setCreatedDate(packages.getCreatedDate());

		return packagesDTO;

	}

	/**
	 * To convert Packages to PackagesDTO
	 * 
	 * @param packagesDTO
	 * @return
	 */
	public static Packages getPackagesByPackagesDTO(PackagesDTO packagesDTO) {
		Packages packages = new Packages();
		packages.setId(packagesDTO.getId());
		packages.setPackageName(packagesDTO.getPackageName());
		packages.setPackageFor(packagesDTO.getPackageFor());
		packages.setListingType(packagesDTO.getListingType());
		packages.setDurationInDays(packagesDTO.getDurationInDays());
		packages.setNoOfListings(packagesDTO.getNoOfListings());
		packages.setCountry(packagesDTO.getCountry());
		packages.setState(packagesDTO.getState());
		packages.setDistrict(packagesDTO.getDistrict());
		packages.setDescription(packagesDTO.getDescription());
		packages.setMrp(packagesDTO.getMrp());
		packages.setDiscount(packagesDTO.getDiscount());
		packages.setSellingPrice(packagesDTO.getSellingPrice());
		packages.setStatus(packagesDTO.getStatus());
		packages.setUpdatedBy(packagesDTO.getUpdatedBy());
		packages.setUpdatedDate(packagesDTO.getUpdatedDate());
		packages.setCreatedBy(packagesDTO.getCreatedBy());
		packages.setCreatedDate(packagesDTO.getCreatedDate());

		return packages;
	}

}
