package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.dto.PricingDetailsDTO;

public interface PricingDetailsDao {

	public PricingDetails savePricingDetails(PricingDetailsDTO pricingDetailsDTO);

	public PricingDetails getPricingDetailsByPropertyId(Long propertyId);

	public PricingDetails getPricingDetailsById(Long id);

}
