package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.PgRegulations;
import com.getmyhousing.common.dto.PgRegulationsDTO;

public interface PgRegulationsDao {

	public PgRegulations savePgRegualtions(PgRegulationsDTO pgRegulationsDTO);

	public PgRegulations getPgRegulationsByPropertyId(Long propertyId);

	public PgRegulations getPgRegulationsById(Long id);

}
