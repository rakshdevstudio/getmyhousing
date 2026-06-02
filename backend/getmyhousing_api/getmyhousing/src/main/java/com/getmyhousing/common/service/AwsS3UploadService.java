package com.getmyhousing.common.service;

import org.springframework.web.multipart.MultipartFile;

public interface AwsS3UploadService {

	public String uploadFile(MultipartFile multipartFile, String folderName);

}
