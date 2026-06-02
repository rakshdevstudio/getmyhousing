package com.getmyhousing.common.service;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.getmyhousing.common.utils.RandomGeneratorUtil;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service("AwsS3UploadServiceImpl")
public class AwsS3UploadServiceImpl implements AwsS3UploadService {

    private Logger LOGGER = LoggerFactory.getLogger(AwsS3UploadServiceImpl.class);

    @Value("${awsAccessKey}")
    private String awsAccessKey;

    @Value("${awsSecretKey}")
    private String awsSecretKey;

    @Value("${awsUrl}")
    private String awsUrl;

    @Value("${awsBucketName}")
    private String awsBucketName;

    @Override
    public String uploadFile(MultipartFile multipartFile, String folderName) {
        String s3FileUrl = null;

        try {
            AwsBasicCredentials awsCreds = AwsBasicCredentials.create(awsAccessKey, awsSecretKey);
            Region region = Region.AP_SOUTH_1;

            S3Client client = S3Client.builder()
                    .region(region)
                    .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                    .build();

            String uuidFileName = RandomGeneratorUtil.getRandomUUID();
            String fileExtension = "";
            int index = multipartFile.getOriginalFilename().lastIndexOf(".");
            if (index > 0) {
                fileExtension = multipartFile.getOriginalFilename().substring(index);
            }

            StringBuilder s3FileName = new StringBuilder();

            if (null != folderName) {
                String temp = new String(folderName);
                int startIndex = 0;
                int endIndex = folderName.length();
                if (folderName.startsWith("/")) {
                    startIndex = 1;
                }
                if (folderName.endsWith("/")) {
                    endIndex = endIndex - 1;
                }
                folderName = temp.substring(startIndex, endIndex);
            }

            s3FileName.append(folderName)
                    .append("/" + RandomGeneratorUtil.getRandomDigit() + "/" + RandomGeneratorUtil.getRandomDigit() + "/")
                    .append(uuidFileName)
                    .append(fileExtension);

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(awsBucketName)
                    .key(s3FileName.toString())
                    .build();

            // Upload the file directly from the MultipartFile input stream
            client.putObject(request, RequestBody.fromInputStream(multipartFile.getInputStream(), multipartFile.getSize()));

            s3FileUrl = awsUrl + s3FileName;

            LOGGER.info("File uploaded successfully: " + s3FileUrl);
        } catch (S3Exception e) {
            LOGGER.error("Error while uploading a file to the bucket.", e);
        } catch (AwsServiceException e) {
            LOGGER.error("Error while uploading a file to the bucket.", e);
        } catch (SdkClientException e) {
            LOGGER.error("Error while uploading a file to the bucket.", e);
        } catch (IOException e) {
            LOGGER.error("Error while uploading a file to the bucket.", e);
        }

        return s3FileUrl;
    }

}
