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

import com.getmyhousing.common.converter.PropertyTypeConverter;
import com.getmyhousing.common.dao.PropertyTypeDao;
import com.getmyhousing.common.domain.PropertyType;
import com.getmyhousing.common.dto.PropertyTypeDTO;
import com.getmyhousing.common.repository.PropertyTypeRepository;

@Transactional
@Service("PropertyTypeDaoImpl")
public class PropertyTypeDaoImpl implements PropertyTypeDao {

	private Logger LOGGER = LoggerFactory.getLogger(PropertyTypeDaoImpl.class);

	@Autowired
	PropertyTypeRepository propertyTypeRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public PropertyType savePropertyType(PropertyTypeDTO propertyTypeDTO) {
		PropertyType propertyType = PropertyTypeConverter.getPropertyTypeByPropertyTypeDTO(propertyTypeDTO);
		return propertyTypeRepository.save(propertyType);
	}

	@Override
	public List<PropertyType> getAllPropertyType(PropertyTypeDTO propertyTypeDTO) {
		List<PropertyType> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from PropertyType a where 1=1");

		if (null != propertyTypeDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != propertyTypeDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");

		sqlQuery.append(" order by a.id ASC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != propertyTypeDTO.getId())
			query.setParameter("id", propertyTypeDTO.getId());
		if (null != propertyTypeDTO.getStatus())
			query.setParameter("status", propertyTypeDTO.getStatus());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public List<String> getAllSubPropertyType(PropertyTypeDTO propertyTypeDTO) {
		List<String> subPropertyTypes = propertyTypeRepository.findAllSubPropertyTypes();
		 return subPropertyTypes;
	}

}
