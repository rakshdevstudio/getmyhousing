package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.PgOwnerDetails;
import com.getmyhousing.common.dto.PgOwnerDetailsDTO;

public interface PgOwnerDetailsDao {

	public PgOwnerDetails savePgOwnerDetails(PgOwnerDetailsDTO pgOwnerDetailsDTO);

	public PgOwnerDetails getPgOwnerDetailsByPropertyId(Long propertyId);

	public PgOwnerDetails getPgOwnerDetailsById(Long id);

}
