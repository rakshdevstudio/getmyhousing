package com.getmyhousing.rental.serviceimpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.getmyhousing.common.service.AwsS3UploadService;
import com.getmyhousing.rental.service.PropBrokerFileUploadService;

@Service("PropBrokerFileUploadServiceImpl")
public class PropBrokerFileUploadServiceImpl implements PropBrokerFileUploadService {

	@Resource(name = "AwsS3UploadServiceImpl")
	private AwsS3UploadService awsS3UploadService;

	@Override
	public String uploadFileToS3(MultipartFile multipartFile, String folderName) {
		return awsS3UploadService.uploadFile(multipartFile, folderName);

	}

}
