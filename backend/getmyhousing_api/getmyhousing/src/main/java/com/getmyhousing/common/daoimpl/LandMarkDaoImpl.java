package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.LandMarkConverter;
import com.getmyhousing.common.dao.LandMarkDao;
import com.getmyhousing.common.domain.LandMark;
import com.getmyhousing.common.dto.LandMarkDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.LandMarkRepository;

@Transactional
@Service("LandMarkDaoImpl")
public class LandMarkDaoImpl implements LandMarkDao {

	private Logger LOGGER = LoggerFactory.getLogger(LandMarkDaoImpl.class);

	@Autowired
	LandMarkRepository landMarkRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public LandMark saveLandMark(LandMarkDTO landMarkDTO) {
		LandMark landMark = LandMarkConverter.getLandMarkByLandMarkDTO(landMarkDTO);
		
		return landMarkRepository.save(landMark);
	}

	@Override
	public LandMark getLandMarkByPropertyId(Long propertyId) {
		return landMarkRepository.getLandMarkByPropertyId(propertyId);
	}

	@Override
	public LandMark getLandMarkById(Long id) {
		Optional<LandMark> db = landMarkRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user property not found in the system. id:" + id);
		return db.get();
	}

}
