package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.CountryPincodeMapping;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;

public class CountryPincodeMappingConverter {

	/**
	 * To convert CountryPincodeMapping to CountryPincodeMappingDTO
	 * 
	 * @param countryPincodeMapping
	 * @return
	 */
	public static CountryPincodeMappingDTO getCountryPincodeMappingDTOByCountryPincodeMapping(
			CountryPincodeMapping countryPincodeMapping) {
		
		CountryPincodeMappingDTO countryPincodeMappingDTO = new CountryPincodeMappingDTO();
		countryPincodeMappingDTO.setId(countryPincodeMapping.getId());
		countryPincodeMappingDTO.setCountry(countryPincodeMapping.getCountry());
		countryPincodeMappingDTO.setState(countryPincodeMapping.getState());
		countryPincodeMappingDTO.setDistrict(countryPincodeMapping.getDistrict());
		countryPincodeMappingDTO.setPincode(countryPincodeMapping.getPincode());
		countryPincodeMappingDTO.setStatus(countryPincodeMapping.getStatus());
		countryPincodeMappingDTO.setUpdatedBy(countryPincodeMapping.getUpdatedBy());
		countryPincodeMappingDTO.setUpdatedDate(countryPincodeMapping.getUpdatedDate());
		countryPincodeMappingDTO.setCreatedBy(countryPincodeMapping.getCreatedBy());
		countryPincodeMappingDTO.setCreatedDate(countryPincodeMapping.getCreatedDate());

		return countryPincodeMappingDTO;
	}

	/**
	 * To convert CountryPincodeMappingDTO to CountryPincodeMapping
	 * 
	 * @param countryPincodeMappingDTO
	 * @return
	 */
	public static CountryPincodeMapping getCountryPincodeMappingByCountryPincodeMappingDTO(
			CountryPincodeMappingDTO countryPincodeMappingDTO) {
		CountryPincodeMapping countryPincodeMapping = new CountryPincodeMapping();
		countryPincodeMapping.setId(countryPincodeMappingDTO.getId());
		countryPincodeMapping.setCountry(countryPincodeMappingDTO.getCountry());
		countryPincodeMapping.setState(countryPincodeMappingDTO.getState());
		countryPincodeMapping.setDistrict(countryPincodeMappingDTO.getDistrict());
		countryPincodeMapping.setPincode(countryPincodeMappingDTO.getPincode());
		countryPincodeMapping.setStatus(countryPincodeMappingDTO.getStatus());
		countryPincodeMapping.setUpdatedBy(countryPincodeMappingDTO.getUpdatedBy());
		countryPincodeMapping.setUpdatedDate(countryPincodeMappingDTO.getUpdatedDate());
		countryPincodeMapping.setCreatedBy(countryPincodeMappingDTO.getCreatedBy());
		countryPincodeMapping.setCreatedDate(countryPincodeMappingDTO.getCreatedDate());

		return countryPincodeMapping;
	}

}
