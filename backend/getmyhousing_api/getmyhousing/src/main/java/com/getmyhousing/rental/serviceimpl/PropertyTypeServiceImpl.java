package com.getmyhousing.rental.serviceimpl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.dao.PropertyTypeDao;
import com.getmyhousing.common.domain.PropertyType;
import com.getmyhousing.common.dto.PropertySubTypesDTO;
import com.getmyhousing.common.dto.PropertyTypeDTO;
import com.getmyhousing.rental.service.PropertyTypeService;

@Service("PropertyTypeServiceImpl")
public class PropertyTypeServiceImpl implements PropertyTypeService {

	private Logger LOGGER = LoggerFactory.getLogger(PropertyTypeServiceImpl.class);

	@Resource(name = "PropertyTypeDaoImpl")
	private PropertyTypeDao propertyTypeDao;

	@Override
	public PropertyType savePropertyType(PropertyTypeDTO propertyTypeDTO) {
		return propertyTypeDao.savePropertyType(propertyTypeDTO);
	}

	@Override
	public List<PropertyTypeDTO> getPropertyTypes(PropertyTypeDTO propertyTypeDTO) {
		List<PropertyType> propertyTypelist = propertyTypeDao.getAllPropertyType(propertyTypeDTO);
		LOGGER.info("response::" + propertyTypelist);

		Map<String, List<PropertyType>> propertyTypeMap = propertyTypelist.stream()
				.collect(Collectors.groupingBy(PropertyType -> PropertyType.getPropertyType()));

		Map<String, PropertyType> propertyTypeIconMap = propertyTypelist.stream().collect(Collectors
				.toMap(PropertyType::getPropertyType, Function.identity(), (existing, replacement) -> existing));

		List<PropertyTypeDTO> returnList = new ArrayList<PropertyTypeDTO>();
		for (Entry<String, List<PropertyType>> map : propertyTypeMap.entrySet()) {
			String propertyType = map.getKey();
			List<PropertyType> propertyList = map.getValue();
			PropertyTypeDTO dto = new PropertyTypeDTO();
			PropertyType propIcon = propertyTypeIconMap.get(propertyType);
			dto.setPropertyType(propertyType);
			dto.setPropertyTypeIconPath(propIcon.getPropertyTypeIconPath());
			List<PropertySubTypesDTO> subTypeList = new ArrayList<PropertySubTypesDTO>();

			for (PropertyType propType : propertyList) {
				PropertySubTypesDTO propertySubTypes = new PropertySubTypesDTO();
				propertySubTypes.setPropertySubType(propType.getPropertySubType());
				propertySubTypes.setIconPath(propType.getPropertySubTypeIconPath());
				propertySubTypes.setPropertyRankOrder(propType.getPropertyRankOrder());
				subTypeList.add(propertySubTypes);
			}

			// Sorting the subTypeList based on PropertyRankOrder
			List<PropertySubTypesDTO> sortedLidt = subTypeList.stream()
					.sorted(Comparator.comparingInt(PropertySubTypesDTO::getPropertyRankOrder))
					.collect(Collectors.toList());

			dto.setPropertySubTypes(sortedLidt);
			returnList.add(dto);

		}

		return returnList;
	}

	@Override
	public List<String> getSubPropertyTypes(PropertyTypeDTO propertyTypeDTO) {
		List<String> propertyTypelist = propertyTypeDao.getAllSubPropertyType(propertyTypeDTO);
		return propertyTypelist;
	}

}
