package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PropertyStatusConverter;
import com.getmyhousing.common.dao.PropertyStatusDao;
import com.getmyhousing.common.domain.PropertyStatus;
import com.getmyhousing.common.dto.PropertyStatusDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PropertyStatusRepository;

@Transactional
@Service("PropertyStatusDaoImpl")
public class PropertyStatusDaoImpl implements PropertyStatusDao {

	private Logger LOGGER = LoggerFactory.getLogger(PropertyStatusDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	PropertyStatusRepository propertyStatusRepository;

	@Override
	public PropertyStatus savePropertyStatus(PropertyStatusDTO propertyStatusDTO) {
		PropertyStatus property = PropertyStatusConverter.getPropertyByPropertyStatusDTO(propertyStatusDTO);
		property = propertyStatusRepository.save(property);
		return property;
	}

	@Override
	public PropertyStatus getPropertyStatusByPropertyId(Long propertyId) {
		return propertyStatusRepository.getPropertyStatusByPropertyId(propertyId);
	}

	@Override
	public PropertyStatus getPropertyStatusById(Long id) {
		Optional<PropertyStatus> db = propertyStatusRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The propertyStaus not found in the system. id:" + id);
		return db.get();
	}

}
