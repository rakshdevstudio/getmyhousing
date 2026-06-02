package com.getmyhousing.rental.service;

import java.util.List;

import com.getmyhousing.common.domain.ContactUsData;
import com.getmyhousing.common.dto.ContactUsDataDTO;

public interface ContactUsDataService {
	
	public void saveContactUsData(ContactUsDataDTO contactUsDataDTO);

	public ContactUsData getContactUsDataById(ContactUsDataDTO contactUsDataDTO);

	public List<ContactUsDataDTO> getAllContactUsData(ContactUsDataDTO contactUsDataDTO);

}
