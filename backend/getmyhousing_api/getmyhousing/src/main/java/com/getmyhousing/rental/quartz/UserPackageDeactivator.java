package com.getmyhousing.rental.quartz;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.rental.service.UserPackageDeactivatorService;

@Component
public class UserPackageDeactivator {

	private Logger LOGGER = LoggerFactory.getLogger(UserPackageDeactivator.class);

	@Autowired
	UserPackageDeactivatorService packageDeactivatorService;

	private static SimpleDateFormat sdfdb = new SimpleDateFormat(Constant.DATABASE_DB_FORAMT);

	@Scheduled(cron = "0 0 1 * * ?")
	public void userPackageDeactivator() {
		LOGGER.info("user package deactivator job triggers at " + sdfdb.format(new Date()));

		packageDeactivatorService.userPackageDeactivator();

		LOGGER.info("user package deactivator job completed at " + sdfdb.format(new Date()));

	}
}
