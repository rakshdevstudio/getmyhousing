package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.LandMark;
import com.getmyhousing.common.dto.LandMarkDTO;

public interface LandMarkDao {

	public LandMark saveLandMark(LandMarkDTO landMarkDTO);

	public LandMark getLandMarkByPropertyId(Long propertyId);

	public LandMark getLandMarkById(Long id);

}
