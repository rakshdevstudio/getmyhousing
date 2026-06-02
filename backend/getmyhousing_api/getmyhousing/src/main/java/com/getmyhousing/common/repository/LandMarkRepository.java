package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.LandMark;

@Repository
public interface LandMarkRepository extends JpaRepository<LandMark, Long> {

	@Query("select u from LandMark u where u.propertyId=:propertyId")
	LandMark getLandMarkByPropertyId(@Param("propertyId") Long propertyId);

}
