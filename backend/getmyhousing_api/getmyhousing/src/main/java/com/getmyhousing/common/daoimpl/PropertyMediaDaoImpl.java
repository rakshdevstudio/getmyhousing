package com.getmyhousing.common.daoimpl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PropertyMediaConverter;
import com.getmyhousing.common.dao.PropertyMediaDao;
import com.getmyhousing.common.domain.PropertyMedia;
import com.getmyhousing.common.dto.PropertyMediaDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PropertyMediaRepository;

@Transactional
@Service("PropertyMediaDaoImpl")
public class PropertyMediaDaoImpl implements PropertyMediaDao {

	private Logger LOGGER = LoggerFactory.getLogger(PropertyMediaDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	PropertyMediaRepository propertyMediaRepository;

	@Override
	public PropertyMedia savePropertyMedia(PropertyMediaDTO propertyMediaDTO) {
		PropertyMedia propertyMedia = PropertyMediaConverter.getPropertyMediaByPropertyMediaDTO(propertyMediaDTO);
		propertyMedia = propertyMediaRepository.save(propertyMedia);
		return propertyMedia;
	}

	@Override
	public List<PropertyMedia> getPropertyMediaByPropertyId(Long propertyId) {
		return propertyMediaRepository.getPropertyMediaByPropertyId(propertyId);
	}

	@Override
	public PropertyMedia getPropertyMediaById(Long id) {
		Optional<PropertyMedia> db = propertyMediaRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The propertyMeadia not found in the system. id:" + id);
		return db.get();
	}

}
