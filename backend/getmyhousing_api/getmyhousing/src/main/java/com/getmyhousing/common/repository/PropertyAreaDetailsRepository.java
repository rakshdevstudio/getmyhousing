package com.getmyhousing.common.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PropertyAreaDetails;

@Repository
public interface PropertyAreaDetailsRepository extends JpaRepository<PropertyAreaDetails, Long> {

	@Query("select u from PropertyAreaDetails u where u.propertyId=:propertyId")
	PropertyAreaDetails getAreaDetailsByPropertyId(@Param("propertyId") Long propertyId);

	@Query("select u from PropertyAreaDetails u where u.propertyId=:propertyId")
	Optional<PropertyAreaDetails> findByPropertyId(@Param("propertyId") Long propertyId);

	
	

}
