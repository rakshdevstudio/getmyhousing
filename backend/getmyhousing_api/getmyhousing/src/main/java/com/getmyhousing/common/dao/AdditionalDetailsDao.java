package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.AdditionalDetails;
import com.getmyhousing.common.dto.AdditionalDetailsDTO;

public interface AdditionalDetailsDao {

	public AdditionalDetails saveAdditionalDetails(AdditionalDetailsDTO additionalDetailsDTO);

	public AdditionalDetails getAdditionalDetailsByPropertyId(Long propertyId);

	public AdditionalDetails getAdditionalDetailsById(Long id);

}
