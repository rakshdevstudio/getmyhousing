package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.PropertyImageGallery;
import com.getmyhousing.common.dto.PropertyImageGalleryDTO;

public interface PropertyImageGalleryDao {

	public PropertyImageGallery savePropertyImageGallery(PropertyImageGalleryDTO propertyImageGalleryDTO);

	public List<PropertyImageGallery> getAllPropertyImageGallery(PropertyImageGalleryDTO propertyImageGalleryDTO);

	public void updatePropertyImages(Long propertyId, List<PropertyImageGalleryDTO> list);

	public List<PropertyImageGallery> saveAllPropertyimages(List<PropertyImageGallery> imageGalleryList);

}
