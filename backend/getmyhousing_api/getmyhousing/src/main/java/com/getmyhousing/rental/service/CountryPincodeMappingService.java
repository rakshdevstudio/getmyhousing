package com.getmyhousing.rental.service;

import java.util.List;

import com.fasterxml.jackson.databind.node.ArrayNode;
import com.getmyhousing.common.domain.CountryPincodeMapping;
import com.getmyhousing.common.dto.AddressResponse;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;

public interface CountryPincodeMappingService {

	public ArrayNode getCountryPincodeMapping(CountryPincodeMappingDTO countryPincodeMappingDTO);

	// To get all cities
	public List<String> getAllCity(CountryPincodeMappingDTO countryPincodeMappingDTO);
	
	public AddressResponse getAddress(Integer pageNumber, Integer pageSize, String search);
	
	public void saveAddress(CountryPincodeMappingDTO countryPincodeMappingDTO);
}
