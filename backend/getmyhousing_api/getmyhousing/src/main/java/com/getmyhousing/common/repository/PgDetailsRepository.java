package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PgDetails;

@Repository
public interface PgDetailsRepository extends JpaRepository<PgDetails, Long> {

	@Query("select u from PgDetails u where u.propertyId=:propertyId")
	PgDetails getPgDetailsByPropertyId(@Param("propertyId") Long propertyId);

}
