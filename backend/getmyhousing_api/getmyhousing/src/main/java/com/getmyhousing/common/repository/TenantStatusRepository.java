package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.TenantStatus;

@Repository
public interface TenantStatusRepository extends JpaRepository<TenantStatus, Long> {

	@Query("select u from TenantStatus u where u.propertyId=:propertyId")
	TenantStatus getTenantStatusByPropertyId(@Param("propertyId") Long propertyId);

}
