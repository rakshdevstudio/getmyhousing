package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PropertyAreaDetailsConverter;
import com.getmyhousing.common.dao.PropertyAreaDetailsDao;
import com.getmyhousing.common.domain.PropertyAreaDetails;
import com.getmyhousing.common.dto.PropertyAreaDetailsDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PropertyAreaDetailsRepository;

@Transactional
@Service("PropertyAreaDetailsDaoImpl")
public class PropertyAreaDetailsDaoImpl implements PropertyAreaDetailsDao {

	private Logger LOGGER = LoggerFactory.getLogger(PropertyAreaDetailsDaoImpl.class);

	@Autowired
	PropertyAreaDetailsRepository areaDetailsRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public PropertyAreaDetails saveAreaDetails(PropertyAreaDetailsDTO areaDetailsDTO) {
		PropertyAreaDetails areaDetails = PropertyAreaDetailsConverter.getAreaDetailsByAreaDetailsDTO(areaDetailsDTO);
		return areaDetailsRepository.save(areaDetails);
	}

	@Override
	public PropertyAreaDetails getAreaDetailsByPropertyId(Long propertyId) {
		return areaDetailsRepository.getAreaDetailsByPropertyId(propertyId);
	}

	@Override
	public PropertyAreaDetails getPropertyAreaDetailsById(Long id) {
		Optional<PropertyAreaDetails> db = areaDetailsRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The property areadetails not found in the system. id:" + id);
		return db.get();
	}

}
