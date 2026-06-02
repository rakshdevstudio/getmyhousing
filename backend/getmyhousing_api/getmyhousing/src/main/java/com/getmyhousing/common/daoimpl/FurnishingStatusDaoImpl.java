package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.FurnishingStatusConverter;
import com.getmyhousing.common.dao.FurnishingStatusDao;
import com.getmyhousing.common.domain.FurnishingStatus;
import com.getmyhousing.common.dto.FurnishingStatusDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.FurnishingStatusRepository;

@Transactional
@Service("FurnishingStatusDaoImpl")
public class FurnishingStatusDaoImpl implements FurnishingStatusDao {

	private Logger LOGGER = LoggerFactory.getLogger(FurnishingStatusDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	FurnishingStatusRepository furnishingStatusRepository;

	@Override
	public FurnishingStatus saveFurnishingStatus(FurnishingStatusDTO furnishingStatusDTO) {
		FurnishingStatus furnishingStatus = FurnishingStatusConverter
				.getFurnishByFurnshingStatusDTO(furnishingStatusDTO);
		furnishingStatus = furnishingStatusRepository.save(furnishingStatus);
		return furnishingStatus;
	}

	@Override
	public FurnishingStatus getFurnishingStatusByPropertyId(Long propertyId) {
		return furnishingStatusRepository.getFurnishingStatusByPropertyId(propertyId);
	}

	@Override
	public FurnishingStatus getFurnishingStatusById(Long id) {
		Optional<FurnishingStatus> db = furnishingStatusRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user property not found in the system. id:" + id);
		return db.get();
	}

}
