package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PgDetailsConverter;
import com.getmyhousing.common.dao.PgDetailsDao;
import com.getmyhousing.common.domain.PgDetails;
import com.getmyhousing.common.dto.PgDetailsDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PgDetailsRepository;

@Transactional
@Service("PgDetailsDaoImpl")
public class PgDetailsDaoImpl implements PgDetailsDao {

	private Logger LOGGER = LoggerFactory.getLogger(PgDetailsDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	PgDetailsRepository pgDetailsRepository;

	@Override
	public PgDetails savePgDetails(PgDetailsDTO pgDetailsDTO) {
		PgDetails pgDetails = PgDetailsConverter.getPgDetailsByPgDetailsDTO(pgDetailsDTO);
		pgDetails = pgDetailsRepository.save(pgDetails);
		return pgDetails;
	}

	@Override
	public PgDetails getPgDetailsByPropertyId(Long propertyId) {
		return pgDetailsRepository.getPgDetailsByPropertyId(propertyId);
	}

	@Override
	public PgDetails getPgDetailsById(Long id) {
		Optional<PgDetails> db = pgDetailsRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The pgdetails not found in the system. id:" + id);
		return db.get();
	}

}
