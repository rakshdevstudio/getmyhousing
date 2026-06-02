package com.getmyhousing.common.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PropertyStatus;

@Repository
public interface PropertyStatusRepository extends JpaRepository<PropertyStatus, Long> {

	@Query("select u from PropertyStatus u where u.propertyId=:propertyId")
	PropertyStatus getPropertyStatusByPropertyId(@Param("propertyId") Long propertyId);

	@Query("select u from PropertyStatus u where u.propertyId=:propertyId")
	Optional<PropertyStatus> findByPropertyId(@Param("propertyId") Long propertyId);
	


}
