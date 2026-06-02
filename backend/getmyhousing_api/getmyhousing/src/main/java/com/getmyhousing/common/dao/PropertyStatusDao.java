package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.PropertyStatus;
import com.getmyhousing.common.dto.PropertyStatusDTO;

public interface PropertyStatusDao {

	public PropertyStatus savePropertyStatus(PropertyStatusDTO propertyStatusDTO);

	public PropertyStatus getPropertyStatusByPropertyId(Long propertyId);

	public PropertyStatus getPropertyStatusById(Long id);

}
