package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.ReraStatus;

@Repository
public interface ReraStatusRepository extends JpaRepository<ReraStatus, Long> {

	@Query("select u from ReraStatus u where u.propertyId=:propertyId")
	ReraStatus getReraStatusByPropertyId(@Param("propertyId") Long propertyId);

}
