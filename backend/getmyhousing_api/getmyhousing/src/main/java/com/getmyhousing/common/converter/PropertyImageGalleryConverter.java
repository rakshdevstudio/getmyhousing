package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PropertyImageGallery;
import com.getmyhousing.common.dto.PropertyImageGalleryDTO;

public class PropertyImageGalleryConverter {

	/**
	 * Convert PropertyImageGalleryDTO to PropertyImageGallery.
	 * 
	 * @param propertyImageGalleryDTO
	 * @return
	 */
	public static PropertyImageGallery getPropertyImageGalleryByHCImageGalleryDTO(
			PropertyImageGalleryDTO propertyImageGalleryDTO) {

		PropertyImageGallery gallery = new PropertyImageGallery();
		gallery.setId(propertyImageGalleryDTO.getId());
		gallery.setPropertyId(propertyImageGalleryDTO.getPropertyId());
		gallery.setImagePath(propertyImageGalleryDTO.getImagePath());
		gallery.setImageType(propertyImageGalleryDTO.getImageType());
		gallery.setCreatedBy(propertyImageGalleryDTO.getCreatedBy());
		gallery.setCreatedDate(propertyImageGalleryDTO.getCreatedDate());
		gallery.setStatus(propertyImageGalleryDTO.getStatus());
		gallery.setUpdatedBy(propertyImageGalleryDTO.getUpdatedBy());
		gallery.setUpdatedDate(propertyImageGalleryDTO.getUpdatedDate());

		return gallery;
	}

	/**
	 * Convert PropertyImageGallery into PropertyImageGalleryDTO
	 * 
	 * @param propertyImageGallery
	 * @return
	 */
	public static PropertyImageGalleryDTO getPropertyImageGalleryDTOIntoPropertyImageGallery(
			PropertyImageGallery propertyImageGallery) {

		PropertyImageGalleryDTO propertyImageGalleryDTO = new PropertyImageGalleryDTO();
		propertyImageGalleryDTO.setId(propertyImageGallery.getId());
		propertyImageGalleryDTO.setPropertyId(propertyImageGallery.getPropertyId());
		propertyImageGalleryDTO.setImagePath(propertyImageGallery.getImagePath());
		propertyImageGalleryDTO.setImageType(propertyImageGallery.getImageType());
		propertyImageGalleryDTO.setStatus(propertyImageGallery.getStatus());
		propertyImageGalleryDTO.setCreatedBy(propertyImageGallery.getCreatedBy());
		propertyImageGalleryDTO.setCreatedDate(propertyImageGallery.getCreatedDate());
		propertyImageGalleryDTO.setUpdatedBy(propertyImageGallery.getUpdatedBy());
		propertyImageGalleryDTO.setUpdatedDate(propertyImageGallery.getUpdatedDate());
		return propertyImageGalleryDTO;
	}
}
