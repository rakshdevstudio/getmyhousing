package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.PropertyAreaDetails;
import com.getmyhousing.common.dto.PropertyAreaDetailsDTO;

public interface PropertyAreaDetailsDao {

	public PropertyAreaDetails saveAreaDetails(PropertyAreaDetailsDTO areaDetailsDTO);

	public PropertyAreaDetails getAreaDetailsByPropertyId(Long propertyId);

	public PropertyAreaDetails getPropertyAreaDetailsById(Long id);

}
