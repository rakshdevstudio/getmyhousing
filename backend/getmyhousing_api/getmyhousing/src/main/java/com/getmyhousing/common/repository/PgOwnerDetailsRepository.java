package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PgOwnerDetails;

@Repository
public interface PgOwnerDetailsRepository extends JpaRepository<PgOwnerDetails, Long> {

	@Query("select u from PgOwnerDetails u where u.propertyId=:propertyId")
	PgOwnerDetails getPgOwnerDetailsByPropertyId(@Param("propertyId") Long propertyId);

}
