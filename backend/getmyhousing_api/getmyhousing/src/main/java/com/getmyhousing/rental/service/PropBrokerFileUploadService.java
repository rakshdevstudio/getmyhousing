package com.getmyhousing.rental.service;

import org.springframework.web.multipart.MultipartFile;

public interface PropBrokerFileUploadService {

	public String uploadFileToS3(MultipartFile multipartFile, String folderName);

}
