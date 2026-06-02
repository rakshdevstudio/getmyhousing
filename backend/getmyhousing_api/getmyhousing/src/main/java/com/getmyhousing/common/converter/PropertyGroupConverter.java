package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.Lead;
import com.getmyhousing.common.domain.PropertyGroup;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.dto.PropertyGroupDTO;

public class PropertyGroupConverter {

	
	public static PropertyGroupDTO getPropertyGroupDTOByPropertyGroup(PropertyGroup  propertyGroup) {
		
		
		PropertyGroupDTO propertyGroupDTO = new PropertyGroupDTO();
		
		propertyGroupDTO.setPropertyGroupId(propertyGroup.getId());
		propertyGroupDTO.setGroupId(propertyGroup.getGroupId());
		propertyGroupDTO.setCreatedBy(propertyGroup.getCreatedBy());
		propertyGroupDTO.setCreatedDate(propertyGroup.getCreatedDate());
		propertyGroupDTO.setGroupName(propertyGroup.getGroupName());
//		propertyGroupDTO.setPropertyId(propertyGroup.getPropertyId());
		propertyGroupDTO.setStatus(propertyGroup.getStatus());
		propertyGroupDTO.setUpdatedBy(propertyGroup.getUpdatedBy());
		propertyGroupDTO.setUpdatedDate(propertyGroup.getUpdatedDate());
		propertyGroupDTO.setUserId(propertyGroup.getUserId());
		
		
		
		
		
		
//		propertyGroupDTO.setPropertyIdList(propertyGroup.getId());
		
		
		
		return propertyGroupDTO;

	}

	
	
	
	
	
}
