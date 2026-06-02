package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.CountryPincodeMapping;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;

public interface CountryPincodeMappingDao {

	public List<CountryPincodeMapping> getAllCountryPincodeMapping(CountryPincodeMappingDTO countryPincodeMappingDTO);

	public List<CountryPincodeMapping> getAllCity(CountryPincodeMappingDTO countryPincodeMappingDTO);
	
	public CountryPincodeMapping saveAddress(CountryPincodeMappingDTO countryPincodeMappingDTO);
	
	public List<String> getAllCities();
}
