package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PackagePayment;
import com.getmyhousing.common.domain.UserPackages;


@Repository
public interface PackagePaymentRepository extends JpaRepository<PackagePayment, Long> {
	
	@Query(value = "SELECT * FROM package_payment  WHERE STATUS = 'Pending' ", nativeQuery = true)
	List<PackagePayment> findByStatus();

}
