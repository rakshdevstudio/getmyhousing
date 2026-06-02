package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.Amenities;
import com.getmyhousing.common.dto.AmenitiesDTO;

public class AmenitiesConverter {

	/**
	 * convert AmenitiesDTO to Amenities
	 * 
	 *
	 * @return
	 */
	public static Amenities getAmenitiesByAmenitiesDTO(AmenitiesDTO amenitiesDTO) {
		Amenities amenities = new Amenities();
try {
		amenities.setId(amenitiesDTO.getId());
		amenities.setPropertyId(amenitiesDTO.getPropertyId());
		amenities.setAmenities(amenitiesDTO.getAmenities());
		amenities.setUpdatedBy(amenitiesDTO.getUpdatedBy());
		amenities.setStatus(amenitiesDTO.getStatus());
		amenities.setUpdatedDate(amenitiesDTO.getUpdatedDate());
		amenities.setCreatedBy(amenitiesDTO.getCreatedBy());
		amenities.setCreatedDate(amenitiesDTO.getCreatedDate());
} catch(Exception e) {
			e.printStackTrace();
		}
		return amenities;
	}

	/**
	 * To convert amenities amenitiesDTO
	 * 
	 * @param amenities
	 * @return
	 */
	public static AmenitiesDTO getAmenitiesDTOIntoAmenities(Amenities amenities) {
		AmenitiesDTO dto = new AmenitiesDTO();
		dto.setId(amenities.getId());
		dto.setPropertyId(amenities.getPropertyId());
		dto.setAmenities(amenities.getAmenities());
		dto.setStatus(amenities.getStatus());
		dto.setCreatedBy(amenities.getCreatedBy());
		dto.setCreatedDate(amenities.getCreatedDate());
		dto.setUpdatedBy(amenities.getUpdatedBy());
		dto.setUpdatedDate(amenities.getUpdatedDate());
		return dto;
	}

}
