package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.DefineProperty;
import com.getmyhousing.common.dto.DefinePropertyDTO;

public class DefinePropertyConverter {

	/**
	 * To convert DefineProperty to DefinePropertyDTO
	 * 
	 * @param defineProperty
	 * @return
	 */
	public static DefinePropertyDTO getDefinePropertyDTOByDefineProperty(DefineProperty defineProperty) {
		DefinePropertyDTO definePropertyDTO = new DefinePropertyDTO();
		definePropertyDTO.setId(defineProperty.getId());
		definePropertyDTO.setPropertyId(defineProperty.getPropertyId());
		definePropertyDTO.setDefineLocation(defineProperty.getDefineLocation());
		definePropertyDTO.setExplainingPrice(defineProperty.getExplainingPrice());
		definePropertyDTO.setExplainingProperty(defineProperty.getExplainingProperty());
		definePropertyDTO.setDefineSizeAndStructure(defineProperty.getDefineSizeAndStructure());
		definePropertyDTO.setStatus(defineProperty.getStatus());
		definePropertyDTO.setUpdatedBy(defineProperty.getUpdatedBy());
		definePropertyDTO.setUpdatedDate(defineProperty.getUpdatedDate());
		definePropertyDTO.setCreatedBy(defineProperty.getCreatedBy());
		definePropertyDTO.setCreatedDate(defineProperty.getCreatedDate());
		definePropertyDTO.setDescription(defineProperty.getDescription());

		return definePropertyDTO;

	}

	/**
	 * To convert DefinePropertyDTO to DefineProperty
	 * 
	 * @param definePropertyDTO
	 * @return
	 */
	public static DefineProperty getDefinePropertyByDefinePropertyDTO(DefinePropertyDTO definePropertyDTO) {
		DefineProperty defineProperty = new DefineProperty();

		defineProperty.setId(definePropertyDTO.getId());
		defineProperty.setPropertyId(definePropertyDTO.getPropertyId());
		defineProperty.setDefineLocation(definePropertyDTO.getDefineLocation());
		defineProperty.setExplainingPrice(definePropertyDTO.getExplainingPrice());
		defineProperty.setExplainingProperty(definePropertyDTO.getExplainingProperty());
		defineProperty.setDefineSizeAndStructure(definePropertyDTO.getDefineSizeAndStructure());
		defineProperty.setStatus(definePropertyDTO.getStatus());
		defineProperty.setUpdatedBy(definePropertyDTO.getUpdatedBy());
		defineProperty.setUpdatedDate(definePropertyDTO.getUpdatedDate());
		defineProperty.setCreatedBy(definePropertyDTO.getCreatedBy());
		defineProperty.setCreatedDate(definePropertyDTO.getCreatedDate());
		defineProperty.setDescription(definePropertyDTO.getDescription());


		return defineProperty;
	}

}
