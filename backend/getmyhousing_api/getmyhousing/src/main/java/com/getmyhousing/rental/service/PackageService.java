package com.getmyhousing.rental.service;

import java.util.LinkedHashMap;
import java.util.List;

import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;
import com.getmyhousing.common.dto.PackagePaymentDTO;
import com.getmyhousing.common.dto.PackagesDTO;
import com.getmyhousing.common.dto.UserPackagesDTO;

public interface PackageService {

	// To save user package
	public Packages savePackage(PackagesDTO packagesDTO);

	// To get all packages
	public List<Packages> getAllPackages(PackagesDTO packagesDTO);

	// To update package details
	public void updatePackage(PackagesDTO packagesDTO);

	// To get package by given id
	public Packages getPackageById(PackagesDTO packagesDTO);

	// To delete package by id
	public Packages deletePackage(PackagesDTO packagesDTO);

	// To save user package
	public UserPackages saveUserPackage(UserPackagesDTO userPackagesDTO);

	// To get all user packages
	public List<UserPackagesDTO> getAllUserPackages(UserPackagesDTO userPackagesDTO);

	// To verify user package
	public void verifyUserPackage(PackagesDTO packagesDTO);

	// To verify userPackage by listing type
	public void verifyUserPackageByListingType(PackagesDTO packagesDTO);

	// To verify userPackage by city
	public Long verifyUserPackageByCity(PackagesDTO packagesDTO);

	// To give accessKey from easebuzz
	public LinkedHashMap<String, String> purchasePackage(PackagesDTO packagesDTO);

	// To update easebuzz order payment as success
	public void updatePurchasePkgSuccess(EasebuzzOrderDTO easebuzzOrderDTO);

	// To update easebuzz order payment as failure
	public void updatePurchasePkgFailure(EasebuzzOrderDTO easebuzzOrderDTO);
	
	public void savePackagePayment(PackagePaymentDTO packagePaymentDto);
	
	public List<PackagePaymentDTO> getPackagePayments(PackagePaymentDTO packagePaymentDto);
	
	public boolean updatePackagePaymentStatus(Long packagePaymentId, String status);

}
