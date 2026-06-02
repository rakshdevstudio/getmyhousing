package com.getmyhousing.rental.serviceimpl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.PropertyConverter;
import com.getmyhousing.common.converter.UserPackageConverter;
import com.getmyhousing.common.dao.PropertiesDao;
import com.getmyhousing.common.dao.UserPackagesDao;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.UserPackagesDTO;
import com.getmyhousing.rental.service.UserPackageDeactivatorService;

@Service("UserPackageDeactivatorServiceImpl")
public class UserPackageDeactivatorServiceImpl implements UserPackageDeactivatorService {

	private Logger LOGGER = LoggerFactory.getLogger(UserPackageDeactivatorServiceImpl.class);

	@Resource(name = "UserPackagesDaoImpl")
	private UserPackagesDao userPackagesDao;

	@Resource(name = "PropertiesDaoImpl")
	private PropertiesDao propertiesDao;

	private static SimpleDateFormat sdf = new SimpleDateFormat(Constant.DATE_FORAMT);
	private static SimpleDateFormat sdfdb = new SimpleDateFormat(Constant.DATABASE_DB_FORAMT);

	@Override
	public void userPackageDeactivator() {
		String todayDate = sdf.format(new Date());
		LOGGER.info("We are checking the expired user packages on::" + todayDate);
		List<UserPackages> packageList = userPackagesDao.getExpiredUserPackages(todayDate);

		if (packageList.size() == 0) {
			LOGGER.info("No expired user packages found on::" + todayDate);
			return;
		}

		// Collect usepackgeIds and check properties
		List<Long> ids = packageList.stream().map(UserPackages::getId).collect(Collectors.toList());

		PropertiesDTO dto = new PropertiesDTO();
		dto.setUserPackagesIds(ids);
		List<Properties> propertyList = propertiesDao.getAllProperty(dto);
		Map<Long, List<Properties>> propertyMap = propertyList.stream()
				.collect(Collectors.groupingBy(Properties::getUserPackageId));

		String updatedDate = sdfdb.format(new Date());
		for (UserPackages userPackages : packageList) {
			UserPackagesDTO packagesDTO = UserPackageConverter.getUserPackagesDTOByUserPackages(userPackages);
			packagesDTO.setStatus(Constant.STATUS_EXPIRED);
			packagesDTO.setUpdatedBy((long) 1);
			packagesDTO.setUpdatedDate(updatedDate);
			userPackagesDao.saveUserPackages(packagesDTO);
			LOGGER.info("The user packages for userId " + userPackages.getUserId() + " is expired on " + todayDate
					+ ", so we changing the status as expired.");

			// Checking if userPackages has any properties
			List<Properties> prptyList = propertyMap.get(userPackages.getId());
			if (null != prptyList && prptyList.size() > 0) {
				for (Properties properties : prptyList) {
					PropertiesDTO prprtyDTO = PropertyConverter.getPropertyDTOIntoProperties(properties);

					// If status is active changes status as expired
					if (Constant.STATUS_ACTIVE.equals(prprtyDTO.getStatus()))
						prprtyDTO.setStatus(Constant.STATUS_EXPIRED);
					else if (Constant.STATUS_PENDING_REVIEW.equals(prprtyDTO.getStatus()))
						prprtyDTO.setStatus(Constant.STATUS_EXPIRED_PR);

					prprtyDTO.setUpdatedDate(updatedDate);
					prprtyDTO.setUpdatedBy((long) 1);
					propertiesDao.saveProperty(prprtyDTO);
					LOGGER.info("The property status has changed to " + prprtyDTO.getStatus()
							+ ", because user package is expired.");
				}
			}

		}

	}

}
