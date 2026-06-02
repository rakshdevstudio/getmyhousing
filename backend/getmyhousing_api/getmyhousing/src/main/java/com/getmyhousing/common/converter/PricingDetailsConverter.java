package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.dto.PricingDetailsDTO;

public class PricingDetailsConverter {

	/**
	 * To convert PricingDetails to PricingDetailsDTO
	 * 
	 * @param pricingDetails
	 * @return
	 */
	
	
//	 public static PricingDetailsDTO getPricingDetailsDTOByPricingDetails(PricingDetails pricingDetails) {
//	        PricingDetailsDTO pricingDetailsDTO = new PricingDetailsDTO();
//	        // Mapping fields from PricingDetails to PricingDetailsDTO
//	        pricingDetailsDTO.setSelectPriceInclude(pricingDetails.getSelectPriceInclude());
//	        // Set other fields as needed
//	        return pricingDetailsDTO;
//	    }
//
//	    public static PricingDetails getPricingDetailsByPricingDetailsDTO(PricingDetailsDTO pricingDetailsDTO) {
//	        PricingDetails pricingDetails = new PricingDetails();
//	        // Mapping fields from PricingDetailsDTO to PricingDetails
//	        pricingDetails.setSelectPriceInclude(pricingDetailsDTO.getSelectPriceInclude());
//	        // Set other fields as needed
//	        return pricingDetails;
//	    }
//	
	
	
	
	public static PricingDetailsDTO getPricingDetailsDTOByPricingDetails(PricingDetails pricingDetails) {
		PricingDetailsDTO pricingDetailsDTO = new PricingDetailsDTO();
		pricingDetailsDTO.setId(pricingDetails.getId());
		pricingDetailsDTO.setPropertyId(pricingDetails.getPropertyId());
		pricingDetailsDTO.setRent(pricingDetails.getRent());
		pricingDetailsDTO.setRentType(pricingDetails.getRentType());
		pricingDetailsDTO.setMaintananceCost(pricingDetails.getMaintananceCost());
		pricingDetailsDTO.setMaintananceCostType(pricingDetails.getMaintananceCostType());
		pricingDetailsDTO.setSecurityDeposit(pricingDetails.getSecurityDeposit());
		pricingDetailsDTO.setDepositAmount(pricingDetails.getDepositAmount());
		pricingDetailsDTO.setBookingAmount(pricingDetails.getBookingAmount());
		pricingDetailsDTO.setLockInPeriod(pricingDetails.getLockInPeriod());
		pricingDetailsDTO.setLockInPeriodType(pricingDetails.getLockInPeriodType());
		pricingDetailsDTO.setRentIncrement(pricingDetails.getRentIncrement());
		pricingDetailsDTO.setStatus(pricingDetails.getStatus());
		pricingDetailsDTO.setUpdatedBy(pricingDetails.getUpdatedBy());
		pricingDetailsDTO.setUpdatedDate(pricingDetails.getUpdatedDate());
		pricingDetailsDTO.setCreatedBy(pricingDetails.getCreatedBy());
		pricingDetailsDTO.setCreatedDate(pricingDetails.getCreatedDate());
        pricingDetailsDTO.setSelectPriceInclude(pricingDetails.getSelectPriceInclude());
        pricingDetailsDTO.setPerSqftPrice(pricingDetails.getPerSqftPrice());
        //		pricingDetailsDTO.setSelectePriceInclude(pricingDetails.getSelectePriceInclude());

		

		return pricingDetailsDTO;

	}

	/**
	 * To convert PricingDetailsDTO to PricingDetails
	 * 
	 * @param pricingDetailsDTO
	 * @return
	 */
	public static PricingDetails getPricingDetailsByPricingDetailsDTO(PricingDetailsDTO pricingDetailsDTO) {
		PricingDetails pricingDetails = new PricingDetails();
		pricingDetails.setId(pricingDetailsDTO.getId());
		pricingDetails.setPropertyId(pricingDetailsDTO.getPropertyId());
		pricingDetails.setRent(pricingDetailsDTO.getRent());
		pricingDetails.setRentType(pricingDetailsDTO.getRentType());
		pricingDetails.setMaintananceCost(pricingDetailsDTO.getMaintananceCost());
		pricingDetails.setMaintananceCostType(pricingDetailsDTO.getMaintananceCostType());
		pricingDetails.setSecurityDeposit(pricingDetailsDTO.getSecurityDeposit());
		pricingDetails.setDepositAmount(pricingDetailsDTO.getDepositAmount());
		pricingDetails.setBookingAmount(pricingDetailsDTO.getBookingAmount());
		pricingDetails.setLockInPeriod(pricingDetailsDTO.getLockInPeriod());
		pricingDetails.setLockInPeriodType(pricingDetailsDTO.getLockInPeriodType());
		pricingDetails.setRentIncrement(pricingDetailsDTO.getRentIncrement());
		pricingDetails.setStatus(pricingDetailsDTO.getStatus());
		pricingDetails.setUpdatedBy(pricingDetailsDTO.getUpdatedBy());
		pricingDetails.setUpdatedDate(pricingDetailsDTO.getUpdatedDate());
		pricingDetails.setCreatedBy(pricingDetailsDTO.getCreatedBy());
		pricingDetails.setCreatedDate(pricingDetailsDTO.getCreatedDate());
        pricingDetails.setSelectPriceInclude(pricingDetailsDTO.getSelectPriceInclude());
        pricingDetails.setPerSqftPrice(pricingDetailsDTO.getPerSqftPrice());

        
		return pricingDetails;
	}
}
