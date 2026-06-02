package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.Amenities;
import com.getmyhousing.common.dto.AmenitiesDTO;

public interface AmenitiesDao {

	public Amenities saveAmenities(AmenitiesDTO amenitiesDTO);

	public List<Amenities> getAmenitiesByPropertyId(Long propertyId);

	public void deleteAmenitiesByPropertyId(Long propertyId);

	public List<Amenities> saveAllAmenities(List<AmenitiesDTO> amenitiesList);

}
