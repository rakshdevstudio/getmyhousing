package com.getmyhousing.common.daoimpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.AmenitiesConverter;
import com.getmyhousing.common.converter.PricingDetailsConverter;
import com.getmyhousing.common.dao.AmenitiesDao;
import com.getmyhousing.common.domain.Amenities;
import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.dto.AmenitiesDTO;
import com.getmyhousing.common.dto.PricingDetailsDTO;
import com.getmyhousing.common.repository.AmenititesRepository;

@Transactional
@Service("AmenitiesDaoImpl")
public class AmenitiesDaoImpl implements AmenitiesDao {

	private Logger LOGGER = LoggerFactory.getLogger(AmenitiesDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	AmenititesRepository amenititesRepository;

	@Override
	public Amenities saveAmenities(AmenitiesDTO amenitiesDTO) {
		Amenities amenities = AmenitiesConverter.getAmenitiesByAmenitiesDTO(amenitiesDTO);
		amenities = amenititesRepository.save(amenities);
		
		
		return amenities;
	}

	@Override
	public List<Amenities> getAmenitiesByPropertyId(Long propertyId) {
		return amenititesRepository.getAmenitiesByPropertyId(propertyId);
	}

	@Override
	public void deleteAmenitiesByPropertyId(Long propertyId) {
		amenititesRepository.deleteAmenitiesByPropertyId(propertyId);
	}

	@Override
	public List<Amenities> saveAllAmenities(List<AmenitiesDTO> amenitiesList) {
		List<Amenities> ll = new ArrayList<Amenities>();
		for (AmenitiesDTO amenitiesDTO : amenitiesList)
			ll.add(AmenitiesConverter.getAmenitiesByAmenitiesDTO(amenitiesDTO));

		return amenititesRepository.saveAll(ll);
	}

}
