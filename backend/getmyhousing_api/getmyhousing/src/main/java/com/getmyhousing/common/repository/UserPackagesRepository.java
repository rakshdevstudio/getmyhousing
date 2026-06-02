package com.getmyhousing.common.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.domain.UserPackages;

@Repository
public interface UserPackagesRepository extends JpaRepository<UserPackages, Long> {

	@Query("select u from UserPackages u where u.status= 'Active' and u.packageExpiryDate <= :packageExpiryDate")
	List<UserPackages> getExpiredUserPackages(@Param("packageExpiryDate") String packageExpiryDate);

	
	@Query(value = "SELECT * FROM user_packages WHERE user_id = :userId", nativeQuery = true)
	Optional<UserPackages> findByUserId(@Param("userId") Long userId);

	
	@Query(value = "SELECT * FROM user_packages WHERE user_id = :userId", nativeQuery = true)
	List<UserPackages> findByUserId2(@Param("userId") Long userId);

	@Query(value = "SELECT * FROM user_packages WHERE id = :userPackageId", nativeQuery = true)
	UserPackages findByUserId3(@Param("userPackageId") Long userPackageId);
	
	Optional<UserPackages> findByUserIdAndPackageId(Long userId, Long packageId);

	@Query(value = "SELECT * FROM user_packages WHERE user_id = :userId", nativeQuery = true)
	 List<UserPackages> findPackageByUserId(@Param("userId") Long userId);



}
