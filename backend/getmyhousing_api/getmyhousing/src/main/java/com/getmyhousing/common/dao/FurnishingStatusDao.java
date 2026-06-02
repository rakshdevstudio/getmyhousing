package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.FurnishingStatus;
import com.getmyhousing.common.dto.FurnishingStatusDTO;

public interface FurnishingStatusDao {

	public FurnishingStatus saveFurnishingStatus(FurnishingStatusDTO furnishingStatusDTO);

	public FurnishingStatus getFurnishingStatusByPropertyId(Long propertyId);

	public FurnishingStatus getFurnishingStatusById(Long id);

}
