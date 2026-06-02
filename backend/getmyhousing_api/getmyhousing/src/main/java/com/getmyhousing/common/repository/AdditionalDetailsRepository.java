package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.AdditionalDetails;

@Repository
public interface AdditionalDetailsRepository extends JpaRepository<AdditionalDetails, Long> {

	@Query("select u from AdditionalDetails u where u.propertyId=:propertyId")
	AdditionalDetails getAdditionalDetailsByPropertyId(@Param("propertyId") Long propertyId);

}
