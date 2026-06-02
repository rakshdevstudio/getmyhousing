package com.getmyhousing.common.domain;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.EasebuzzOrderConverter;
import com.getmyhousing.common.dao.EasebuzzOrderDao;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.EasebuzzOrderRepository;

@Transactional
@Service("EasebuzzOrderDaoImpl")
public class EasebuzzOrderDaoImpl implements EasebuzzOrderDao {

	private Logger LOGGER = LoggerFactory.getLogger(EasebuzzOrderDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private EasebuzzOrderRepository easebuzzOrderRepository;

	@Override
	public EasebuzzOrder saveEasebuzzOrder(EasebuzzOrderDTO easebuzzOrderDTO) {
		EasebuzzOrder order = EasebuzzOrderConverter.getEasebuzzOrderByEasebuzzOrderDTO(easebuzzOrderDTO);
		order = easebuzzOrderRepository.save(order);
		return order;
	}

	@Override
	public Long getNextSeriesId() {

		Long nextSeriesId = easebuzzOrderRepository.getNextSeriesId();

		return easebuzzOrderRepository.getNextSeriesId();

	}

	@Override
	public EasebuzzOrder getEasebuzzOrderById(Long id) {
		Optional<EasebuzzOrder> db = easebuzzOrderRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The EasebuzzOrder id not found in the system. id:" + id);
		return db.get();
	}

}
