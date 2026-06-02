package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PgOwnerDetailsConverter;
import com.getmyhousing.common.dao.PgOwnerDetailsDao;
import com.getmyhousing.common.domain.PgOwnerDetails;
import com.getmyhousing.common.dto.PgOwnerDetailsDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PgOwnerDetailsRepository;

@Transactional
@Service("PgOwnerDetailsDaoImpl")
public class PgOwnerDetailsDaoImpl implements PgOwnerDetailsDao {

	private Logger LOGGER = LoggerFactory.getLogger(PgOwnerDetailsDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	PgOwnerDetailsRepository pgOwnerDetailsRepository;

	@Override
	public PgOwnerDetails savePgOwnerDetails(PgOwnerDetailsDTO pgOwnerDetailsDTO) {
		PgOwnerDetails pgOwnerDetails = PgOwnerDetailsConverter.getDetailsByPgOwnerDetailsDTO(pgOwnerDetailsDTO);
		pgOwnerDetails = pgOwnerDetailsRepository.save(pgOwnerDetails);
		return pgOwnerDetails;
	}

	@Override
	public PgOwnerDetails getPgOwnerDetailsByPropertyId(Long propertyId) {
		return pgOwnerDetailsRepository.getPgOwnerDetailsByPropertyId(propertyId);
	}

	@Override
	public PgOwnerDetails getPgOwnerDetailsById(Long id) {
		Optional<PgOwnerDetails> db = pgOwnerDetailsRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The pgOwner not found in the system. id:" + id);
		return db.get();
	}

}
