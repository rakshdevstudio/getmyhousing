package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PropertyType;

@Repository
public interface PropertyTypeRepository extends JpaRepository<PropertyType, Long> {
	
	@Query("SELECT DISTINCT p.propertySubType FROM PropertyType p")
    List<String> findAllSubPropertyTypes();

}
