package com.getmyhousing.common.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PricingDetails;

@Repository
public interface PricingDetailsRepository extends JpaRepository<PricingDetails, Long> {

	@Query("select u from PricingDetails u where u.propertyId=:propertyId")
	PricingDetails getPricingDetailsByPropertyId(@Param("propertyId") Long propertyId);

	@Query("select u from PricingDetails u where u.propertyId=:propertyId")
	Optional<PricingDetails> findByPropertyId(@Param("propertyId") Long propertyId);

	


	
}
