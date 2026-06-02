package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PricingDetailsConverter;
import com.getmyhousing.common.dao.PricingDetailsDao;
import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.dto.PricingDetailsDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PricingDetailsRepository;

@Transactional
@Service("PricingDetailsDaoImpl")
public class PricingDetailsDaoImpl implements PricingDetailsDao {

	private Logger LOGGER = LoggerFactory.getLogger(PricingDetailsDaoImpl.class);

	@Autowired
	PricingDetailsRepository pricingDetailsRepository;

	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public PricingDetails savePricingDetails(PricingDetailsDTO pricingDetailsDTO) {
		
		PricingDetails pricingDetails = PricingDetailsConverter.getPricingDetailsByPricingDetailsDTO(pricingDetailsDTO);
	    pricingDetails.setSelectPriceInclude(pricingDetailsDTO.getSelectPriceInclude());
	    
		return pricingDetailsRepository.save(pricingDetails);
	}

	@Override
	public PricingDetails getPricingDetailsByPropertyId(Long propertyId) {
		return pricingDetailsRepository.getPricingDetailsByPropertyId(propertyId);
	}

	@Override
	public PricingDetails getPricingDetailsById(Long id) {
		Optional<PricingDetails> db = pricingDetailsRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user property not found in the system. id:" + id);
		return db.get();
	}

}
