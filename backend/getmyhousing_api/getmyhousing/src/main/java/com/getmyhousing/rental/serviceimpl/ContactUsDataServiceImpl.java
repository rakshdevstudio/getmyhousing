package com.getmyhousing.rental.serviceimpl;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.cache.UserCache;
import com.getmyhousing.common.dao.ContactUsDataDao;
import com.getmyhousing.common.domain.ContactUsData;
import com.getmyhousing.common.dto.ContactUsDataDTO;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.rental.service.ContactUsDataService;

@Service("ContactUsDataServiceImpl")
public class ContactUsDataServiceImpl implements ContactUsDataService {
	
	private static Logger LOGGER = LoggerFactory.getLogger(ContactUsDataServiceImpl.class);
	
	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;

	@Resource(name = "ContactUsDataDaoImpl")
	private ContactUsDataDao contactUsDataDao;

	@Autowired
	UserCache userCache;
	
	@Override
	public void saveContactUsData(ContactUsDataDTO contactUsDataDTO) {
		contactUsDataDao.saveContactUsData(contactUsDataDTO);
		LOGGER.info("contactUsData added successfully by " + contactUsDataDTO.getCreatedDate());
	}

	@Override
	public ContactUsData getContactUsDataById(ContactUsDataDTO contactUsDataDTO) {
		return contactUsDataDao.getContactUsDataById(contactUsDataDTO.getId());
	}

	@Override
	public List<ContactUsDataDTO> getAllContactUsData(ContactUsDataDTO contactUsDataDTO) {
		return contactUsDataDao.getAllContactUsData(contactUsDataDTO);
	}

}
