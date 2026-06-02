package com.getmyhousing.common.daoimpl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.CountryPincodeMappingConverter;
import com.getmyhousing.common.dao.CountryPincodeMappingDao;
import com.getmyhousing.common.domain.CountryPincodeMapping;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.repository.CountryPincodeMappingRepository;

@Transactional
@Service("CountryPincodeMappingDaoImpl")
public class CountryPincodeMappingDaoImpl implements CountryPincodeMappingDao {

	private Logger LOGGER = LoggerFactory.getLogger(CountryPincodeMappingDaoImpl.class);

	@Autowired
	CountryPincodeMappingRepository countryPincodeMappingRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public List<CountryPincodeMapping> getAllCountryPincodeMapping(CountryPincodeMappingDTO countryPincodeMappingDTO) {
		List<CountryPincodeMapping> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from CountryPincodeMapping a where 1=1");

		if (null != countryPincodeMappingDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != countryPincodeMappingDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");

		sqlQuery.append(" order by a.id ASC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != countryPincodeMappingDTO.getId())
			query.setParameter("id", countryPincodeMappingDTO.getId());
		if (null != countryPincodeMappingDTO.getStatus())
			query.setParameter("status", countryPincodeMappingDTO.getStatus());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public List<CountryPincodeMapping> getAllCity(CountryPincodeMappingDTO countryPincodeMappingDTO) {
		List<CountryPincodeMapping> returnList = null;
		StringBuilder sqlQuery = new StringBuilder("from CountryPincodeMapping a where 1=1");

		if (countryPincodeMappingDTO.getId() != null)
			sqlQuery.append(" AND a.id = :id");
		if (countryPincodeMappingDTO.getDistrict() != null)
			sqlQuery.append(" AND a.district = :district");

		sqlQuery.append(" order by a.id ASC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (countryPincodeMappingDTO.getId() != null)
			query.setParameter("id", countryPincodeMappingDTO.getId());
		if (countryPincodeMappingDTO.getDistrict() != null)
			query.setParameter("district", countryPincodeMappingDTO.getDistrict());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public CountryPincodeMapping saveAddress(CountryPincodeMappingDTO countryPincodeMappingDTO) {
		
		boolean exitsValue = countryPincodeMappingRepository.existsByCountryAndStateAndDistrictAndPincode(countryPincodeMappingDTO.getCountry(), countryPincodeMappingDTO.getState(), countryPincodeMappingDTO.getDistrict(), countryPincodeMappingDTO.getPincode());
		
		if (exitsValue) {
            throw new FieldException("Address with country '" + countryPincodeMappingDTO.getCountry() + 
                                                "', state '" + countryPincodeMappingDTO.getState() + 
                                                "', district '" + countryPincodeMappingDTO.getDistrict() + 
                                                "', and pincode '" + countryPincodeMappingDTO.getPincode() + "' already exists");
        }
		
		CountryPincodeMapping convertedData = CountryPincodeMappingConverter.getCountryPincodeMappingByCountryPincodeMappingDTO(countryPincodeMappingDTO);
		
		return countryPincodeMappingRepository.save(convertedData);
	}
	
	@Override
	public List<String> getAllCities(){
		return countryPincodeMappingRepository.findDistinctDistricts();
	}

}
