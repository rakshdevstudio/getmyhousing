package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.PropertyType;
import com.getmyhousing.common.dto.PropertyTypeDTO;

public interface PropertyTypeDao {

	public PropertyType savePropertyType(PropertyTypeDTO propertyTypeDTO);

	public List<PropertyType> getAllPropertyType(PropertyTypeDTO propertyTypeDTO);
	
	public List<String> getAllSubPropertyType(PropertyTypeDTO propertyTypeDTO);

}
