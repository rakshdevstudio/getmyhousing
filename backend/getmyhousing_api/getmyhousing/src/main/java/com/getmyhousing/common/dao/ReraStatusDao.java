package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.ReraStatus;
import com.getmyhousing.common.dto.ReraStatusDTO;

public interface ReraStatusDao {

	public ReraStatus saveReraStatus(ReraStatusDTO reraStatusDTO);

	public ReraStatus getReraStatusByPropertyId(Long propertyId);

	public ReraStatus getReraStatusById(Long id);

}
