package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.ContactUsData;
import com.getmyhousing.common.dto.ContactUsDataDTO;

public interface ContactUsDataDao {
	
	public ContactUsData saveContactUsData(ContactUsDataDTO contactUsDataDTO);

	public List<ContactUsDataDTO> getAllContactUsData(ContactUsDataDTO contactUsDataDTO);

	public ContactUsData getContactUsDataById(Long id);

}
