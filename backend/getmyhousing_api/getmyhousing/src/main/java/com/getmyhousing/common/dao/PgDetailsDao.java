package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.PgDetails;
import com.getmyhousing.common.dto.PgDetailsDTO;

public interface PgDetailsDao {

	public PgDetails savePgDetails(PgDetailsDTO pgDetailsDTO);

	public PgDetails getPgDetailsByPropertyId(Long propertyId);

	public PgDetails getPgDetailsById(Long id);

}
