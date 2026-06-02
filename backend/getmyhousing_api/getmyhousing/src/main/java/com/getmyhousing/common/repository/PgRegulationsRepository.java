package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PgRegulations;

@Repository
public interface PgRegulationsRepository extends JpaRepository<PgRegulations, Long> {

	@Query("select u from PgRegulations u where u.propertyId=:propertyId")
	PgRegulations getPgRegulationsByPropertyId(@Param("propertyId") Long propertyId);

}
