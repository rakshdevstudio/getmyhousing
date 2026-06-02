package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PgRoomDetailsConverter;
import com.getmyhousing.common.dao.PgRoomDetailsDao;
import com.getmyhousing.common.domain.PgRoomDetails;
import com.getmyhousing.common.dto.PgRoomDetailsDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PgRoomDetailsRepository;

@Transactional
@Service("PgRoomDetailsDaoImpl")
public class PgRoomDetailsDaoImpl implements PgRoomDetailsDao {

	private Logger LOGGER = LoggerFactory.getLogger(PgRoomDetailsDaoImpl.class);

	@Autowired
	PgRoomDetailsRepository pgRoomDetailsRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public PgRoomDetails savePgRoomDetails(PgRoomDetailsDTO pgRoomDetailsDTO) {
		PgRoomDetails pgRoomDetails = PgRoomDetailsConverter.getPgRoomDetailsByPgRoomDetailsDTO(pgRoomDetailsDTO);
		return pgRoomDetailsRepository.save(pgRoomDetails);
	}

	@Override
	public PgRoomDetails getPgRoomDetailsByPropertyId(Long propertyId) {
		return pgRoomDetailsRepository.getPgRoomDetailsByPropertyId(propertyId);
	}

	@Override
	public PgRoomDetails getPgRoomDetailsById(Long id) {
		Optional<PgRoomDetails> db = pgRoomDetailsRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The pgRoomDetails not found in the system. id:" + id);
		return db.get();
	}

}
