package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getmyhousing.common.domain.PackagePayment;
import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.domain.UserPackages;

@Repository
public interface PackagesRepository extends JpaRepository<Packages, Long> {
	
	@Transactional
	@Query(value = "SELECT * FROM packages o WHERE o.package_for = 'admin' ", nativeQuery = true)
	Packages findByPackage_for(String string);

	
	
	
	
	

}
