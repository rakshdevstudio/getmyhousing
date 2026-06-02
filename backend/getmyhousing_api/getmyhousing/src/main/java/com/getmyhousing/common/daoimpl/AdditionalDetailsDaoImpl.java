package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.AdditionalDetailsConverter;
import com.getmyhousing.common.dao.AdditionalDetailsDao;
import com.getmyhousing.common.domain.AdditionalDetails;
import com.getmyhousing.common.dto.AdditionalDetailsDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.AdditionalDetailsRepository;

@Transactional
@Service("AdditionalDetailsDaoImpl")
public class AdditionalDetailsDaoImpl implements AdditionalDetailsDao {

	private Logger LOGGER = LoggerFactory.getLogger(AdditionalDetailsDaoImpl.class);

	@Autowired
	AdditionalDetailsRepository additionalDetailsRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public AdditionalDetails saveAdditionalDetails(AdditionalDetailsDTO additionalDetailsDTO) {
		AdditionalDetails additionalDetails = AdditionalDetailsConverter
				.getAdditionalDetailsByAdditionalDetailsDTO(additionalDetailsDTO);
		
		return additionalDetailsRepository.save(additionalDetails);
	}

	@Override
	public AdditionalDetails getAdditionalDetailsByPropertyId(Long propertyId) {
		return additionalDetailsRepository.getAdditionalDetailsByPropertyId(propertyId);
	}

	@Override
	public AdditionalDetails getAdditionalDetailsById(Long id) {
		Optional<AdditionalDetails> db = additionalDetailsRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user property not found in the system. id:" + id);
		return db.get();
	}

}
