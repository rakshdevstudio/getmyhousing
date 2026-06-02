package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.LandMark;
import com.getmyhousing.common.dto.LandMarkDTO;

public class LandMarkConverter {

	/**
	 * To convert LandMark to LandMarkDTO
	 * 
	 * @param landMark
	 * @return
	 */
	public static LandMarkDTO getLandMarkDTOByLandMark(LandMark landMark) {
		
		
		LandMarkDTO landMarkDTO = new LandMarkDTO();
		landMarkDTO.setId(landMark.getId());
		landMarkDTO.setPropertyId(landMark.getPropertyId());
		landMarkDTO.setHospitalDistance(landMark.getHospitalDistance());
		landMarkDTO.setHospitalDistanceType(landMark.getHospitalDistanceType());
		landMarkDTO.setAirportDistance(landMark.getAirportDistance());
		landMarkDTO.setAirportDistanceType(landMark.getAirportDistanceType());
		landMarkDTO.setRailwayStationDistance(landMark.getRailwayStationDistance());
		landMarkDTO.setRailwayStationDistanceType(landMark.getRailwayStationDistanceType());
		landMarkDTO.setAtmDistance(landMark.getAtmDistance());
		
		landMarkDTO.setAtmDistanceType(landMark.getAtmDistanceType());
		landMarkDTO.setSchoolDistance(landMark.getSchoolDistance());
		landMarkDTO.setSchoolDistanceType(landMark.getSchoolDistanceType());
		landMarkDTO.setShoppingMallDistance(landMark.getShoppingMallDistance());
		landMarkDTO.setShoppingMallDistanceType(landMark.getShoppingMallDistanceType());
		landMarkDTO.setBankDistance(landMark.getBankDistance());
		landMarkDTO.setBankDistanceType(landMark.getBankDistanceType());
		landMarkDTO.setBusStopDistance(landMark.getBusStopDistance());
		landMarkDTO.setBusStopDistanceType(landMark.getBusStopDistanceType());
		landMarkDTO.setMetroStationDistance(landMark.getMetroStationDistance());
		landMarkDTO.setMetroStationDistanceType(landMark.getMetroStationDistanceType());
		landMarkDTO.setStatus(landMark.getStatus());
		landMarkDTO.setUpdatedBy(landMark.getUpdatedBy());
		landMarkDTO.setUpdatedDate(landMark.getUpdatedDate());
		landMarkDTO.setCreatedBy(landMark.getCreatedBy());
		landMarkDTO.setCreatedDate(landMark.getCreatedDate());


		return landMarkDTO;

	}

	/**
	 * To convert LandMarkDTO to LandMark
	 * 
	 * @param landMarkDTO
	 * @return
	 */
	public static LandMark getLandMarkByLandMarkDTO(LandMarkDTO landMarkDTO) {
		LandMark landMark = new LandMark();
		landMark.setId(landMarkDTO.getId());
		landMark.setPropertyId(landMarkDTO.getPropertyId());
		landMark.setHospitalDistance(landMarkDTO.getHospitalDistance());
		landMark.setHospitalDistanceType(landMarkDTO.getHospitalDistanceType());
		landMark.setAirportDistance(landMarkDTO.getAirportDistance());
		landMark.setAirportDistanceType(landMarkDTO.getAirportDistanceType());
		landMark.setRailwayStationDistance(landMarkDTO.getRailwayStationDistance());
		landMark.setRailwayStationDistanceType(landMarkDTO.getRailwayStationDistanceType());
		landMark.setAtmDistance(landMarkDTO.getAtmDistance());
		landMark.setAtmDistanceType(landMarkDTO.getAtmDistanceType());
		landMark.setSchoolDistance(landMarkDTO.getSchoolDistance());
		landMark.setSchoolDistanceType(landMarkDTO.getSchoolDistanceType());
		landMark.setShoppingMallDistance(landMarkDTO.getShoppingMallDistance());
		landMark.setShoppingMallDistanceType(landMarkDTO.getShoppingMallDistanceType());
		landMark.setBankDistance(landMarkDTO.getBankDistance());
		landMark.setBankDistanceType(landMarkDTO.getBankDistanceType());
		landMark.setBusStopDistance(landMarkDTO.getBusStopDistance());
		landMark.setBusStopDistanceType(landMarkDTO.getBusStopDistanceType());
		landMark.setMetroStationDistance(landMarkDTO.getMetroStationDistance());
		landMark.setMetroStationDistanceType(landMarkDTO.getMetroStationDistanceType());
		landMark.setStatus(landMarkDTO.getStatus());
		landMark.setUpdatedBy(landMarkDTO.getUpdatedBy());
		landMark.setUpdatedDate(landMarkDTO.getUpdatedDate());
		landMark.setCreatedBy(landMarkDTO.getCreatedBy());
		landMark.setCreatedDate(landMarkDTO.getCreatedDate());

		return landMark;
	}

}
