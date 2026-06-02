package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.DefineProperty;

@Repository
public interface DefinePropertyRepository extends JpaRepository<DefineProperty, Long> {

	@Query("select u from DefineProperty u where u.propertyId=:propertyId")
	DefineProperty getDefinePropertyByPropertyId(@Param("propertyId") Long propertyId);

}
