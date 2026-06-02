package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PgRegulationConverter;
import com.getmyhousing.common.dao.PgRegulationsDao;
import com.getmyhousing.common.domain.PgRegulations;
import com.getmyhousing.common.dto.PgRegulationsDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PgRegulationsRepository;

@Transactional
@Service("PgRegulationsDaoImpl")
public class PgRegulationsDaoImpl implements PgRegulationsDao {

	private Logger LOGGER = LoggerFactory.getLogger(PgRegulationsDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	PgRegulationsRepository pgRegulationsRepository;

	@Override
	public PgRegulations savePgRegualtions(PgRegulationsDTO pgRegulationsDTO) {
		PgRegulations pgRegulations = PgRegulationConverter.getRegulationsByPgRegulationsDTO(pgRegulationsDTO);
		pgRegulations = pgRegulationsRepository.save(pgRegulations);
		return pgRegulations;
	}

	@Override
	public PgRegulations getPgRegulationsByPropertyId(Long propertyId) {
		return pgRegulationsRepository.getPgRegulationsByPropertyId(propertyId);
	}

	@Override
	public PgRegulations getPgRegulationsById(Long id) {
		Optional<PgRegulations> db = pgRegulationsRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The pgRegulations not found in the system. id:" + id);
		return db.get();
	}

}
