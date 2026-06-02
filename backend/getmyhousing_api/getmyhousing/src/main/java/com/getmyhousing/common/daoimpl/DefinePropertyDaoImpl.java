package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.DefinePropertyConverter;
import com.getmyhousing.common.dao.DefinePropertyDao;
import com.getmyhousing.common.domain.DefineProperty;
import com.getmyhousing.common.dto.DefinePropertyDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.DefinePropertyRepository;

@Transactional
@Service("DefinePropertyDaoImpl")
public class DefinePropertyDaoImpl implements DefinePropertyDao {

	private Logger LOGGER = LoggerFactory.getLogger(DefinePropertyDaoImpl.class);

	@Autowired
	DefinePropertyRepository definePropertyRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public DefineProperty saveDefineProperty(DefinePropertyDTO definePropertyDTO) {
		DefineProperty defineProperty = DefinePropertyConverter.getDefinePropertyByDefinePropertyDTO(definePropertyDTO);
		return definePropertyRepository.save(defineProperty);
	}

	@Override
	public DefineProperty getDefinePropertyByPropertyId(Long propertyId) {
		return definePropertyRepository.getDefinePropertyByPropertyId(propertyId);
	}

	@Override
	public DefineProperty getDefinePropertyById(Long id) {
		Optional<DefineProperty> db = definePropertyRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user property not found in the system. id:" + id);
		return db.get();
	}

}
