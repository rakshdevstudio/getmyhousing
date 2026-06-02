package com.getmyhousing.rental.service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

public interface OtpService {
	
	String generateOtp(String email);
    boolean verifyOtp(String email, String otp);
    void sendOtpEmail(String email, String otp);

}
