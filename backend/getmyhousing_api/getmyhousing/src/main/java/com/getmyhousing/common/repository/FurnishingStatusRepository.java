package com.getmyhousing.common.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.FurnishingStatus;

@Repository
public interface FurnishingStatusRepository extends JpaRepository<FurnishingStatus, Long> {

	@Query("select u from FurnishingStatus u where u.propertyId=:propertyId")
	FurnishingStatus getFurnishingStatusByPropertyId(@Param("propertyId") Long propertyId);

	@Query("select u from FurnishingStatus u where u.propertyId=:propertyId")
	Optional<FurnishingStatus> findByPropertyId(@Param("propertyId") Long propertyId);

}
