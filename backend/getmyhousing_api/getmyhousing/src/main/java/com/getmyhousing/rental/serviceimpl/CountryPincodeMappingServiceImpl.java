package com.getmyhousing.rental.serviceimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.getmyhousing.common.converter.CountryPincodeMappingConverter;
import com.getmyhousing.common.dao.CountryPincodeMappingDao;
import com.getmyhousing.common.domain.CountryPincodeMapping;
import com.getmyhousing.common.dto.AddressResponse;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.repository.CountryPincodeMappingRepository;
import com.getmyhousing.rental.service.CountryPincodeMappingService;

@Service("CountryPincodeMappingServiceImpl")
public class CountryPincodeMappingServiceImpl implements CountryPincodeMappingService {

	private Logger LOGGER = LoggerFactory.getLogger(CountryPincodeMappingServiceImpl.class);

	@Resource(name = "CountryPincodeMappingDaoImpl")
	private CountryPincodeMappingDao countryPincodeMappingDao;
	
	@Autowired
	CountryPincodeMappingRepository countryPincodeMappingRepository;

	@Autowired
	ObjectMapper mapper;

	@Override
	public ArrayNode getCountryPincodeMapping(CountryPincodeMappingDTO countryPincodeMappingDTO) {
		List<CountryPincodeMapping> countryAreaMappingList = countryPincodeMappingDao
				.getAllCountryPincodeMapping(countryPincodeMappingDTO);

		Map<String, Map<String, Map<String, List<String>>>> countryStateDistrictMap = new TreeMap<>();
		// Use TreeMap to automatically sort keys alphabetically

		for (CountryPincodeMapping zoneMapping : countryAreaMappingList) {
			String country = zoneMapping.getCountry();
			String state = zoneMapping.getState();
			String district = zoneMapping.getDistrict();
			String pincode = zoneMapping.getPincode();

			countryStateDistrictMap.computeIfAbsent(country, k -> new TreeMap<>())
					.computeIfAbsent(state, k -> new TreeMap<>()).computeIfAbsent(district, k -> new ArrayList<>())
					.add(pincode);
		}

		ObjectMapper mapper = new ObjectMapper();
		ObjectNode rootNode = mapper.createObjectNode();
		ArrayNode countriesArray = rootNode.putArray("countries");

		for (Entry<String, Map<String, Map<String, List<String>>>> countryEntry : countryStateDistrictMap.entrySet()) {
			String countryName = countryEntry.getKey();
			Map<String, Map<String, List<String>>> stateDistrictMap = countryEntry.getValue();

			ObjectNode countryNode = rootNode.objectNode();
			countryNode.put("countryName", countryName);
			ArrayNode statesArray = countryNode.putArray("states");

			for (Entry<String, Map<String, List<String>>> stateEntry : stateDistrictMap.entrySet()) {
				String stateName = stateEntry.getKey();
				Map<String, List<String>> districtPincodeMap = stateEntry.getValue();

				ObjectNode stateNode = rootNode.objectNode();
				stateNode.put("stateName", stateName);
				ArrayNode districtsArray = stateNode.putArray("districts");

				for (Entry<String, List<String>> districtEntry : districtPincodeMap.entrySet()) {
					String districtName = districtEntry.getKey();
					List<String> pincode = districtEntry.getValue();

					ObjectNode districtNode = rootNode.objectNode();
					districtNode.put("districtName", districtName);
					ArrayNode pincodeArray = districtNode.putArray("pincodes");

					for (String pincodes : pincode) {
						ObjectNode pincodeNode = rootNode.objectNode();
						pincodeNode.put("pincode", pincodes);
						pincodeArray.add(pincodeNode);
					}

					districtsArray.add(districtNode);
				}

				statesArray.add(stateNode);
			}

			countriesArray.add(countryNode);
		}

		return countriesArray;
	}

	@Override
	public AddressResponse getAddress(Integer pageNumber, Integer pageSize, String search) {
	    try {
	        AddressResponse addressResponse = new AddressResponse();
	        Pageable pageable = PageRequest.of(pageNumber, pageSize);
	        Page<CountryPincodeMapping> pageAddress;

	        if (search != null && !search.isEmpty()) {
	            pageAddress = countryPincodeMappingRepository.findByMultipleFieldsContaining(search, pageable);
	        } else {
	            pageAddress = countryPincodeMappingRepository.findAll(pageable);
	        }

	        List<CountryPincodeMapping> allAddress = pageAddress.getContent();
	        List<CountryPincodeMappingDTO> listDto = allAddress.stream()
	                .map(CountryPincodeMappingConverter::getCountryPincodeMappingDTOByCountryPincodeMapping)
	                .collect(Collectors.toList());

	        addressResponse.setContent(listDto); 
	        addressResponse.setPageNumber(pageAddress.getNumber());
	        addressResponse.setPageSize(pageAddress.getSize());
	        addressResponse.setTotalElement(pageAddress.getTotalElements());
	        addressResponse.setTotalPages(pageAddress.getTotalPages());

	        return addressResponse;
	    } catch (Exception ex) {
	        System.err.println("Error occurred in getAddress method: " + ex.getMessage());
	        ex.printStackTrace();
	        // You might want to throw a custom exception or handle the error in another way
	        return null; // Return null or an empty list depending on your error handling strategy
	    }
	}

	@Override
	public List<String> getAllCity(CountryPincodeMappingDTO countryPincodeMappingDTO) {
		
		return countryPincodeMappingDao.getAllCities();
	}

	@Override
	public void saveAddress(CountryPincodeMappingDTO countryPincodeMappingDTO) {
		
		countryPincodeMappingDao.saveAddress(countryPincodeMappingDTO);
	}


}
