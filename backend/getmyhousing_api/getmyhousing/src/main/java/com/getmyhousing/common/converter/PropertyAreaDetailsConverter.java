package com.getmyhousing.common.converter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.PropertyAreaDetails;
import com.getmyhousing.common.dto.PropertyAreaDetailsDTO;

public class PropertyAreaDetailsConverter {

	/**
	 * To convert PropertyAreaDetails to PropertyAreaDetailsDTO
	 * 
	 * @param areaDetails
	 * @return
	 */
	public static PropertyAreaDetailsDTO getAreaDetailsDTOByAreaDetails(PropertyAreaDetails areaDetails) {
	
	// Get the current date and time
				LocalDateTime dateTime = LocalDateTime.now();
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				String currentDateTime = dateTime.format(formatter);
	
		PropertyAreaDetailsDTO areaDetailsDTO = new PropertyAreaDetailsDTO();
		areaDetailsDTO.setId(areaDetails.getId());
		areaDetailsDTO.setPropertyId(areaDetails.getPropertyId());
		areaDetailsDTO.setBuiltupPlotArea(areaDetails.getBuiltupPlotArea());
		areaDetailsDTO.setCarpetArea(areaDetails.getCarpetArea());
		areaDetailsDTO.setSuperBuiltupArea(areaDetails.getSuperBuiltupArea());
		areaDetailsDTO.setAreaUnit(areaDetails.getAreaUnit());
		areaDetailsDTO.setPrivatePoolAvailability(areaDetails.getPrivatePoolAvailability());
		areaDetailsDTO.setPrivateGardenAvailability(areaDetails.getPrivateGardenAvailability());
		areaDetailsDTO.setPrivateGardenArea(areaDetails.getPrivateGardenArea());
		areaDetailsDTO.setNoOfBedrooms(areaDetails.getNoOfBedrooms());
		areaDetailsDTO.setNoOfBathrooms(areaDetails.getNoOfBathrooms());
		areaDetailsDTO.setNoOfBalconies(areaDetails.getNoOfBalconies());
		areaDetailsDTO.setAdditionalRooms(areaDetails.getAdditionalRooms());
		areaDetailsDTO.setFloorNo(areaDetails.getFloorNo());
		areaDetailsDTO.setTowerBlockNo(areaDetails.getTowerBlockNo());
		areaDetailsDTO.setFlatNo(areaDetails.getFlatNo());
		areaDetailsDTO.setPropertyLevel(areaDetails.getPropertyLevel());
		areaDetailsDTO.setCornerFlat(areaDetails.getCornerFlat());
		areaDetailsDTO.setTerraceAreaFlag(areaDetails.getTerraceAreaFlag());
		areaDetailsDTO.setTerraceArea(areaDetails.getTerraceArea());
		areaDetailsDTO.setTerraceAreaUnit(areaDetails.getTerraceAreaUnit());
		areaDetailsDTO.setTotalFloors(areaDetails.getTotalFloors());
		areaDetailsDTO.setOpenSides(areaDetails.getOpenSides());
		areaDetailsDTO.setFacing(areaDetails.getFacing());
		areaDetailsDTO.setOccupancyType(areaDetails.getOccupancyType());
		areaDetailsDTO.setOccupancyCertificate(areaDetails.getOccupancyCertificate());
		areaDetailsDTO.setTerraceAreaFlag(areaDetails.getTerraceAreaFlag());
		areaDetailsDTO.setTerraceArea(areaDetails.getTerraceArea());
		areaDetailsDTO.setTerraceAreaUnit(areaDetails.getTerraceAreaUnit());
		areaDetailsDTO.setTotalFloors(areaDetails.getTotalFloors());
		areaDetailsDTO.setPrivateWashroom(areaDetails.getPrivateWashroom());
		areaDetailsDTO.setPrivateWashroomCount(areaDetails.getPrivateWashroomCount());
		areaDetailsDTO.setPublicWashroom(areaDetails.getPublicWashroom());
		areaDetailsDTO.setPublicWashroomCount(areaDetails.getPublicWashroomCount());
		areaDetailsDTO.setGardenArea(areaDetails.getGardenArea());
		areaDetailsDTO.setPantry(areaDetails.getPantry());
		areaDetailsDTO.setBuildingStatus(areaDetails.getBuildingStatus());
		areaDetailsDTO.setSpaceType(areaDetails.getSpaceType());
		areaDetailsDTO.setBreadthFeet(areaDetails.getBreadthFeet());
		areaDetailsDTO.setLengthFeet(areaDetails.getLengthFeet());
		areaDetailsDTO.setNoOfFloorsAllowed(areaDetails.getNoOfFloorsAllowed());
		areaDetailsDTO.setCompoundWallMade(areaDetails.getCompoundWallMade());
		areaDetailsDTO.setKeepItPrivate(areaDetails.getKeepItPrivate());
		areaDetailsDTO.setStatus(Constant.STATUS_ACTIVE);
		areaDetailsDTO.setUpdatedBy(areaDetails.getCreatedBy());
		areaDetailsDTO.setUpdatedDate(currentDateTime);
		areaDetailsDTO.setCreatedBy(areaDetails.getCreatedBy());
		areaDetailsDTO.setCreatedDate(currentDateTime);
		areaDetailsDTO.setSalableArea(areaDetails.getSalableArea());
		areaDetailsDTO.setKeepItPrivate(areaDetails.getKeepItPrivate());
		areaDetailsDTO.setPlotArea(areaDetails.getPlotArea());


		return areaDetailsDTO;

	}

	/**
	 * To convert PropertyAreaDetailsDTO to PropertyAreaDetails
	 * 
	 * @param areaDetailsDTO
	 * @return
	 */
	public static PropertyAreaDetails getAreaDetailsByAreaDetailsDTO(PropertyAreaDetailsDTO areaDetailsDTO) {
	PropertyAreaDetails areaDetails = new PropertyAreaDetails();
	try {

		// Get the current date and time
				LocalDateTime dateTime = LocalDateTime.now();
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				String currentDateTime = dateTime.format(formatter);
	
		
		areaDetails.setId(areaDetailsDTO.getId());
		areaDetails.setPropertyId(areaDetailsDTO.getPropertyId());
		areaDetails.setBuiltupPlotArea(areaDetailsDTO.getBuiltupPlotArea());
		areaDetails.setCarpetArea(areaDetailsDTO.getCarpetArea());
		areaDetails.setSuperBuiltupArea(areaDetailsDTO.getSuperBuiltupArea());
		areaDetails.setAreaUnit(areaDetailsDTO.getAreaUnit());
		areaDetails.setPrivatePoolAvailability(areaDetailsDTO.getPrivatePoolAvailability());
		areaDetails.setPrivateGardenAvailability(areaDetailsDTO.getPrivateGardenAvailability());
		areaDetails.setPrivateGardenArea(areaDetailsDTO.getPrivateGardenArea());
		areaDetails.setNoOfBedrooms(areaDetailsDTO.getNoOfBedrooms());
		areaDetails.setNoOfBathrooms(areaDetailsDTO.getNoOfBathrooms());
		areaDetails.setNoOfBalconies(areaDetailsDTO.getNoOfBalconies());
		areaDetails.setAdditionalRooms(areaDetailsDTO.getAdditionalRooms());
		areaDetails.setFloorNo(areaDetailsDTO.getFloorNo());
		areaDetails.setTowerBlockNo(areaDetailsDTO.getTowerBlockNo());
		areaDetails.setFlatNo(areaDetailsDTO.getFlatNo());
		areaDetails.setPropertyLevel(areaDetailsDTO.getPropertyLevel());
		areaDetails.setCornerFlat(areaDetailsDTO.getCornerFlat());
		areaDetails.setTerraceAreaFlag(areaDetailsDTO.getTerraceAreaFlag());
		areaDetails.setTerraceArea(areaDetailsDTO.getTerraceArea());
		areaDetails.setTerraceAreaUnit(areaDetailsDTO.getTerraceAreaUnit());
		areaDetails.setTotalFloors(areaDetailsDTO.getTotalFloors());
		areaDetails.setOpenSides(areaDetailsDTO.getOpenSides());
		areaDetails.setFacing(areaDetailsDTO.getFacing());
		areaDetails.setOccupancyType(areaDetailsDTO.getOccupancyType());
		areaDetails.setOccupancyCertificate(areaDetailsDTO.getOccupancyCertificate());
		areaDetails.setTerraceAreaFlag(areaDetailsDTO.getTerraceAreaFlag());
		areaDetails.setTerraceArea(areaDetailsDTO.getTerraceArea());
		areaDetails.setTerraceAreaUnit(areaDetailsDTO.getTerraceAreaUnit());
		areaDetails.setTotalFloors(areaDetailsDTO.getTotalFloors());
		areaDetails.setPrivateWashroom(areaDetailsDTO.getPrivateWashroom());
		areaDetails.setPrivateWashroomCount(areaDetailsDTO.getPrivateWashroomCount());
		areaDetails.setPublicWashroom(areaDetailsDTO.getPublicWashroom());
		areaDetails.setPublicWashroomCount(areaDetailsDTO.getPublicWashroomCount());
		areaDetails.setGardenArea(areaDetailsDTO.getGardenArea());
		areaDetails.setPantry(areaDetailsDTO.getPantry());
		areaDetails.setBuildingStatus(areaDetailsDTO.getBuildingStatus());
		areaDetails.setSpaceType(areaDetailsDTO.getSpaceType());
		areaDetails.setBreadthFeet(areaDetailsDTO.getBreadthFeet());
		areaDetails.setLengthFeet(areaDetailsDTO.getLengthFeet());
		areaDetails.setNoOfFloorsAllowed(areaDetailsDTO.getNoOfFloorsAllowed());
		areaDetails.setCompoundWallMade(areaDetailsDTO.getCompoundWallMade());
		areaDetails.setKeepItPrivate(areaDetailsDTO.getKeepItPrivate());
		areaDetails.setStatus(Constant.STATUS_ACTIVE);
		areaDetails.setUpdatedBy(areaDetailsDTO.getCreatedBy());
		areaDetails.setUpdatedDate(currentDateTime);
		areaDetails.setCreatedBy(areaDetailsDTO.getCreatedBy());
		areaDetails.setCreatedDate(currentDateTime);
		areaDetails.setSalableArea (areaDetailsDTO.getSalableArea());
		areaDetails.setKeepItPrivate(areaDetailsDTO.getKeepItPrivate());
		areaDetails.setPlotArea(areaDetailsDTO.getPlotArea());
} catch(Exception e) {
			
			e.printStackTrace();
		}

		return areaDetails;
	}
}
