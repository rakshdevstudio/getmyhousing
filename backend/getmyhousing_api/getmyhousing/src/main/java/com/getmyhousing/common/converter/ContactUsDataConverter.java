package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.ContactUsData;
import com.getmyhousing.common.dto.ContactUsDataDTO;

public class ContactUsDataConverter {
	
	public static ContactUsData getContactUsDataByContactUsDataDTO(ContactUsDataDTO contactUsDataDTO) {
		ContactUsData contactUsData = new ContactUsData();
		contactUsData.setId(contactUsDataDTO.getId());
		contactUsData.setName(contactUsDataDTO.getName());
		contactUsData.setEmail(contactUsDataDTO.getEmail());
		contactUsData.setMobileNumber(contactUsDataDTO.getMobileNumber());
		contactUsData.setSubject(contactUsDataDTO.getSubject());
		contactUsData.setMessage(contactUsDataDTO.getMessage());
		contactUsData.setStatus(contactUsDataDTO.getStatus());
		contactUsData.setCreatedDate(contactUsDataDTO.getCreatedDate());
		return contactUsData;

	}
	
	public static ContactUsDataDTO getcontactUsDataDTOBycontactUsData(ContactUsData contactUsData) {
		ContactUsDataDTO contactUsDataDTO = new ContactUsDataDTO();
		contactUsDataDTO.setId(contactUsData.getId());
		contactUsDataDTO.setName(contactUsData.getName());
		contactUsDataDTO.setEmail(contactUsData.getEmail());
		contactUsDataDTO.setMobileNumber(contactUsData.getMobileNumber());
		contactUsDataDTO.setMessage(contactUsData.getMessage());
		contactUsDataDTO.setSubject(contactUsData.getSubject());
		contactUsDataDTO.setStatus(contactUsData.getStatus());
		contactUsDataDTO.setCreatedDate(contactUsData.getCreatedDate());
		return contactUsDataDTO;
	}

}
