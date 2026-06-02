package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.ReraStatusConverter;
import com.getmyhousing.common.dao.ReraStatusDao;
import com.getmyhousing.common.domain.ReraStatus;
import com.getmyhousing.common.dto.ReraStatusDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.ReraStatusRepository;

@Transactional
@Service("ReraStatusDaoImpl")
public class ReraStatusDaoImpl implements ReraStatusDao {

	private Logger LOGGER = LoggerFactory.getLogger(ReraStatusDaoImpl.class);

	@Autowired
	ReraStatusRepository reraStatusRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public ReraStatus saveReraStatus(ReraStatusDTO reraStatusDTO) {
		ReraStatus reraStatus = ReraStatusConverter.getReraStatusByReraStatusDTO(reraStatusDTO);
		return reraStatusRepository.save(reraStatus);
	}

	@Override
	public ReraStatus getReraStatusByPropertyId(Long propertyId) {
		return reraStatusRepository.getReraStatusByPropertyId(propertyId);
	}

	@Override
	public ReraStatus getReraStatusById(Long id) {
		Optional<ReraStatus> db = reraStatusRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The rera status not found in the system. id:" + id);
		return db.get();
	}

}
