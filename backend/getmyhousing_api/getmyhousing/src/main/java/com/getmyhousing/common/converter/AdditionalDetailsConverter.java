package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.AdditionalDetails;
import com.getmyhousing.common.dto.AdditionalDetailsDTO;

public class AdditionalDetailsConverter {

	/**
	 * To convert AdditionalDetails to AdditionalDetailsDTO
	 * 
	 * @param additionalDetails
	 * @return
	 */
	public static AdditionalDetailsDTO getAdditionalDetailsDTOByAdditionalDetails(AdditionalDetails additionalDetails) {
		AdditionalDetailsDTO additionalDetailsDTO = new AdditionalDetailsDTO();
		additionalDetailsDTO.setId(additionalDetails.getId());
		additionalDetailsDTO.setPropertyId(additionalDetails.getPropertyId());
		additionalDetailsDTO.setCurrentlyLeasedOut(additionalDetails.getCurrentlyLeasedOut());
		additionalDetailsDTO.setModifyInterior(additionalDetails.getModifyInterior());
		additionalDetailsDTO.setBrandNewInterior(additionalDetails.getBrandNewInterior());
		additionalDetailsDTO.setInterestedInCoWorking(additionalDetails.getInterestedInCoWorking());
		additionalDetailsDTO.setBuildingGrade(additionalDetails.getBuildingGrade());
		additionalDetailsDTO.setCafeteria(additionalDetails.getCafeteria());
		additionalDetailsDTO.setTaxGovtCharges(additionalDetails.getTaxGovtCharges());
		additionalDetailsDTO.setElectricityCharges(additionalDetails.getElectricityCharges());
		additionalDetailsDTO.setPowerInKv(additionalDetails.getPowerInKv());
		additionalDetailsDTO.setLiftAvailable(additionalDetails.getLiftAvailable());
		additionalDetailsDTO.setLiftCount(additionalDetails.getLiftCount());
		additionalDetailsDTO.setFlooringType(additionalDetails.getFlooringType());
		additionalDetailsDTO.setFlooringLiving(additionalDetails.getFlooringLiving());
		additionalDetailsDTO.setFlooringKitchen(additionalDetails.getFlooringKitchen());
		additionalDetailsDTO.setFlooringBedroom(additionalDetails.getFlooringBedroom());
		additionalDetailsDTO.setFlooringBathroom(additionalDetails.getFlooringBathroom());
		additionalDetailsDTO.setFlooringMasterBedroom(additionalDetails.getFlooringMasterBedroom());
		additionalDetailsDTO.setFlooringBalcony(additionalDetails.getFlooringBalcony());
		additionalDetailsDTO.setFlooringOther(additionalDetails.getFlooringOther());
		additionalDetailsDTO.setParking2Wheeler(additionalDetails.getParking2Wheeler());
		additionalDetailsDTO.setParking2OpenCount(additionalDetails.getParking2OpenCount());
		additionalDetailsDTO.setParking2CoverCount(additionalDetails.getParking2CoverCount());
		additionalDetailsDTO.setParking4Wheeler(additionalDetails.getParking4Wheeler());
		additionalDetailsDTO.setParking4OpenCount(additionalDetails.getParking4OpenCount());
		additionalDetailsDTO.setParking4CoverCount(additionalDetails.getParking4CoverCount());
		additionalDetailsDTO.setPowerBackup(additionalDetails.getPowerBackup());
		additionalDetailsDTO.setWaterSource(additionalDetails.getWaterSource());
		additionalDetailsDTO.setOverLookingView(additionalDetails.getOverLookingView());
		additionalDetailsDTO.setFrontRoadWidth(additionalDetails.getFrontRoadWidth());
		additionalDetailsDTO.setFrontRoadWidthType(additionalDetails.getFrontRoadWidthType());
		additionalDetailsDTO.setServiceLiftAvailability(additionalDetails.getServiceLiftAvailability());
		additionalDetailsDTO.setServiceLiftAvailabilityCount(additionalDetails.getServiceLiftAvailabilityCount());
		additionalDetailsDTO.setStatus(additionalDetails.getStatus());
		additionalDetailsDTO.setUpdatedBy(additionalDetails.getUpdatedBy());
		additionalDetailsDTO.setUpdatedDate(additionalDetails.getUpdatedDate());
		additionalDetailsDTO.setCreatedBy(additionalDetails.getCreatedBy());
		additionalDetailsDTO.setCreatedDate(additionalDetails.getCreatedDate());

		return additionalDetailsDTO;

	}

	/**
	 * To convert AdditionalDetailsDTO to AdditionalDetails
	 * 
	 * @param additionalDetailsDTO
	 * @return
	 */
	public static AdditionalDetails getAdditionalDetailsByAdditionalDetailsDTO(
			AdditionalDetailsDTO additionalDetailsDTO) {
		AdditionalDetails additionalDetails = new AdditionalDetails();
		additionalDetails.setId(additionalDetailsDTO.getId());
		additionalDetails.setPropertyId(additionalDetailsDTO.getPropertyId());
		additionalDetails.setCurrentlyLeasedOut(additionalDetailsDTO.getCurrentlyLeasedOut());
		additionalDetails.setModifyInterior(additionalDetailsDTO.getModifyInterior());
		additionalDetails.setBrandNewInterior(additionalDetailsDTO.getBrandNewInterior());
		additionalDetails.setInterestedInCoWorking(additionalDetailsDTO.getInterestedInCoWorking());
		additionalDetails.setBuildingGrade(additionalDetailsDTO.getBuildingGrade());
		additionalDetails.setCafeteria(additionalDetailsDTO.getCafeteria());
		additionalDetails.setTaxGovtCharges(additionalDetailsDTO.getTaxGovtCharges());
		additionalDetails.setElectricityCharges(additionalDetailsDTO.getElectricityCharges());
		additionalDetails.setPowerInKv(additionalDetailsDTO.getPowerInKv());
		additionalDetails.setLiftAvailable(additionalDetailsDTO.getLiftAvailable());
		additionalDetails.setLiftCount(additionalDetailsDTO.getLiftCount());
		additionalDetails.setFlooringType(additionalDetailsDTO.getFlooringType());
		additionalDetails.setFlooringLiving(additionalDetailsDTO.getFlooringLiving());
		additionalDetails.setFlooringKitchen(additionalDetailsDTO.getFlooringKitchen());
		additionalDetails.setFlooringBedroom(additionalDetailsDTO.getFlooringBedroom());
		additionalDetails.setFlooringMasterBedroom(additionalDetailsDTO.getFlooringMasterBedroom());
		additionalDetails.setFlooringBalcony(additionalDetailsDTO.getFlooringBalcony());
		additionalDetails.setFlooringOther(additionalDetailsDTO.getFlooringOther());
		
		additionalDetails.setParking2Wheeler(additionalDetailsDTO.getParking2Wheeler());
		additionalDetails.setParking2OpenCount(additionalDetailsDTO.getParking2OpenCount());
		additionalDetails.setParking2CoverCount(additionalDetailsDTO.getParking2CoverCount());
		additionalDetails.setParking4Wheeler(additionalDetailsDTO.getParking4Wheeler());
		additionalDetails.setParking4OpenCount(additionalDetailsDTO.getParking4OpenCount());
		additionalDetails.setParking4CoverCount(additionalDetailsDTO.getParking4CoverCount());
		
		
		additionalDetails.setPowerBackup(additionalDetailsDTO.getPowerBackup());
		additionalDetails.setWaterSource(additionalDetailsDTO.getWaterSource());
		
		additionalDetails.setOverLookingView(additionalDetailsDTO.getOverLookingView());
		additionalDetails.setFrontRoadWidth(additionalDetailsDTO.getFrontRoadWidth());
		additionalDetails.setFrontRoadWidthType(additionalDetailsDTO.getFrontRoadWidthType());
		additionalDetails.setServiceLiftAvailability(additionalDetailsDTO.getServiceLiftAvailability());
		additionalDetails.setServiceLiftAvailabilityCount(additionalDetailsDTO.getServiceLiftAvailabilityCount());
		additionalDetails.setStatus(additionalDetailsDTO.getStatus());
		additionalDetails.setUpdatedBy(additionalDetailsDTO.getUpdatedBy());
		additionalDetails.setUpdatedDate(additionalDetailsDTO.getUpdatedDate());
		additionalDetails.setCreatedBy(additionalDetailsDTO.getCreatedBy());
		additionalDetails.setCreatedDate(additionalDetailsDTO.getCreatedDate());
		additionalDetails.setFlooringBathroom(additionalDetailsDTO.getFlooringBathroom());

		
		return additionalDetails;
	}

}
