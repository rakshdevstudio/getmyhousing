package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.PropertyMedia;
import com.getmyhousing.common.dto.PropertyMediaDTO;

public interface PropertyMediaDao {

	public PropertyMedia savePropertyMedia(PropertyMediaDTO propertyMediaDTO);

	public List<PropertyMedia> getPropertyMediaByPropertyId(Long propertyId);

	public PropertyMedia getPropertyMediaById(Long id);

}
