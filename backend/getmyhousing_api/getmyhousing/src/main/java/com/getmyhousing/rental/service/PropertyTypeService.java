package com.getmyhousing.rental.service;

import java.util.List;

import com.getmyhousing.common.domain.PropertyType;
import com.getmyhousing.common.dto.PropertyTypeDTO;

public interface PropertyTypeService {

	public PropertyType savePropertyType(PropertyTypeDTO propertyTypeDTO);

	public List<PropertyTypeDTO> getPropertyTypes(PropertyTypeDTO propertyTypeDTO);
	
	public List<String> getSubPropertyTypes(PropertyTypeDTO propertyTypeDTO);

}