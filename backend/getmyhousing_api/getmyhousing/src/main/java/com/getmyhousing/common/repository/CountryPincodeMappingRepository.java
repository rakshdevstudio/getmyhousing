package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.CountryPincodeMapping;

@Repository
public interface CountryPincodeMappingRepository extends JpaRepository<CountryPincodeMapping, Long> {
	
	boolean existsByCountryAndStateAndDistrictAndPincode(String country, String state, String district, String pincode);
	
	@Query("SELECT c FROM CountryPincodeMapping c WHERE " +
	           "c.country LIKE %:search% OR " +
	           "c.state LIKE %:search% OR " +
	           "c.district LIKE %:search% OR " +
	           "c.pincode LIKE %:search%")
	    Page<CountryPincodeMapping> findByMultipleFieldsContaining(@Param("search") String search, Pageable pageable);
	
	@Query("SELECT DISTINCT c.district FROM CountryPincodeMapping c ORDER BY c.district")
    List<String> findDistinctDistricts();

}
