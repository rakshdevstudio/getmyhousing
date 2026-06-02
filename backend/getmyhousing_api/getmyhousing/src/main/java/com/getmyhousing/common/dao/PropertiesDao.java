package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.PropertyResponse;
import com.getmyhousing.common.dto.PropertySearchDto;

public interface PropertiesDao {

	public Properties saveProperty(PropertiesDTO propertiesDto );
	
	public Properties saveProperty2(PropertiesDTO propertiesDto , boolean adminFlag);

	public Properties getPropertyById(Long id);
	
	public void assignOwnerToProperty(Properties properties);
	
	public List<Properties> getAllProperty(PropertiesDTO poropertiesDTO);

	public List<PropertiesDTO> getAllPropertiesByFilters(PropertiesDTO propertiesDTO);

	public int getPropertyCountByStatusList(Long userId, List<String> statusList, Long userPackageId);

	public PropertyResponse getPropertyListByFilter(PropertySearchDto propertySearchDto);
	
	public List<PropertySearchDto> getRelatedProperties(PropertySearchDto propertySearchDto);

	public Properties getPropertyByIdAndCity(Long id, String city);

	public List<Properties> findInDescOrder();
	
	public List<Properties> allPropertyListByStatusInDashboard(PropertiesDTO propertiesDTO); 
	
	public List<Properties> getAllExclusiveProperties(PropertiesDTO propertiesDTO); 
	
	public List<Properties> allPropertyByStatusAndUserIdInDashboard(PropertiesDTO propertiesDTO);

	public PropertyResponse getCompletedPropertyListByFilter(PropertySearchDto propertySearchDto);
	
	public PropertyResponse findInDescOrderBySearch(PropertySearchDto propertySearchDTO);
	
	public void changePropertyStatusByAdmin(PropertiesDTO propertiesDto);

	public void exclusiveProperty(PropertiesDTO propertiesDto);
}
