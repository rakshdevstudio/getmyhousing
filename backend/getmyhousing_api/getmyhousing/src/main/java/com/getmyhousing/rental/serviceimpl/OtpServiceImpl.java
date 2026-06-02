package com.getmyhousing.rental.serviceimpl;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.exception.OtpExpiredException;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.rental.service.OtpService;

@Service
public class OtpServiceImpl implements OtpService {

    @Autowired
    private JavaMailSender javaMailSender;
    
    @Value("${spring.mail.username}")
	private String sender;

    private Map<String, String> otpData = new HashMap<>();
    private Map<String, LocalDateTime> otpCreationTime = new HashMap<>();
    private static final int OTP_LENGTH = 6;
    private Random random = new SecureRandom();

    @Override
    public String generateOtp(String email) {
    	
    	LocalDateTime dateTime = LocalDateTime.now();
    	
        String otp = String.format("%06d", random.nextInt(1000000));
        otpData.put(email, otp);
        otpCreationTime.put(email, dateTime);
        
        return otp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        if (otpData.containsKey(email)) {
            LocalDateTime creationTime = otpCreationTime.get(email);
            LocalDateTime now = LocalDateTime.now();
            if (creationTime.plusMinutes(5).isAfter(now)) {
                String storedOtp = otpData.get(email);
                if (storedOtp.equals(otp)) {
                    otpData.remove(email);
                    otpCreationTime.remove(email);
                    return true;
                }
            } else {
                // OTP expired
                otpData.remove(email);
                otpCreationTime.remove(email);
                throw new OtpExpiredException("OTP is expired");
            }
        }
        return false;
    }

    @Override
    public void sendOtpEmail(String email, String otp) {
        String subject = "Your OTP Code for Property Broker";
        String message = "<html>"
                + "<body>"
                + "<h2>Dear User,</h2>"
                + "<p>Thank you for using Property Broker.</p>"
                + "<p>Your OTP code is: <strong>" + otp + "</strong></p>"
                + "<p>Above the OTP Valid for 5min</p>"
                + "<p>Please enter this code in the provided field to reset your password.</p>"
                + "<p>If you did not request a password reset, please ignore this email.</p>"
                + "<br>"
                + "<p>Best regards,<br>Property Broker Team</p>"
                + "</body>"
                + "</html>";

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(mimeMessage, true);
            helper.setText(message, true); 
            helper.setTo(email);
            helper.setSubject(subject);
            helper.setFrom(sender);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
