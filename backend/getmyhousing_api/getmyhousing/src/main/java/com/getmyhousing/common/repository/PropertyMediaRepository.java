package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PropertyMedia;

@Repository
public interface PropertyMediaRepository extends JpaRepository<PropertyMedia, Long> {

	@Query("select u from PropertyMedia u where u.propertyId=:propertyId")
	List<PropertyMedia> getPropertyMediaByPropertyId(@Param("propertyId") Long propertyId);

}
