package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PgRoomDetails;

@Repository
public interface PgRoomDetailsRepository extends JpaRepository<PgRoomDetails, Long> {

	@Query("select u from PgRoomDetails u where u.propertyId=:propertyId")
	PgRoomDetails getPgRoomDetailsByPropertyId(@Param("propertyId") Long propertyId);

}
