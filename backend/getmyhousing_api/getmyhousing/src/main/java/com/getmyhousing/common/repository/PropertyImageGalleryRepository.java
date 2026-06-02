package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PropertyImageGallery;

@Repository
public interface PropertyImageGalleryRepository extends JpaRepository<PropertyImageGallery, Long> {

	
	
	@Query("select u from PropertyImageGallery u where u.propertyId=:propertyId")
	List<PropertyImageGallery> getPropertyImageGalleryByPropertyId(@Param("propertyId") Long propertyId);

	
	@Query("select u from PropertyImageGallery u where u.propertyId=:propertyId and u.imageType='featured'")
	PropertyImageGallery getPropertyImageByPropertyId(@Param("propertyId") Long propertyId);

	
}
