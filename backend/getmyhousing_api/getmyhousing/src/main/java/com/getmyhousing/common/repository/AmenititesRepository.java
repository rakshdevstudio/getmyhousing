package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.Amenities;

@Repository
public interface AmenititesRepository extends JpaRepository<Amenities, Long> {

	@Query("select u from Amenities u where u.propertyId=:propertyId")
	List<Amenities> getAmenitiesByPropertyId(@Param("propertyId") Long propertyId);

	@Modifying
	@Query("DELETE FROM Amenities u WHERE u.propertyId = :propertyId")
	void deleteAmenitiesByPropertyId(@Param("propertyId") Long propertyId);

}
