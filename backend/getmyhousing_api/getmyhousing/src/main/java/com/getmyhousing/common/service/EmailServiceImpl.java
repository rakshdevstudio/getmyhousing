package com.getmyhousing.common.service;

import java.io.File;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.getmyhousing.rental.serviceimpl.OtpServiceImpl;

@Service("EmailServiceImpl")
public class EmailServiceImpl implements EmailService {

	@Autowired
	JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String sender;

	private static Logger LOGGER = LoggerFactory.getLogger(EmailServiceImpl.class);

	@Override
	public void sendSimpleMessage(String to, String subject, String body) {
		try {
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

			String[] recipientList = to.split(",");
			InternetAddress[] recipientAddress = new InternetAddress[recipientList.length];
			int counter = 0;
			for (String recipient : recipientList) {
				recipientAddress[counter] = new InternetAddress(recipient.trim());
				counter++;
			}
			mimeMessage.setRecipients(Message.RecipientType.TO, recipientAddress);
			helper.setSubject(subject);
			helper.setFrom(sender);
			helper.setText(body);
			mailSender.send(mimeMessage);

		} catch (MessagingException e) {
			LOGGER.info("Not able to sendMimeMessage mail:" + e);
			e.printStackTrace();
		}
		LOGGER.info("sendMimeMessage : Sent mail Sucecessfully to " + to);

	}

	@Override
	public void sendSimpleBccMessage(String to, String bcc, String subject, String body) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setTo(to);
			message.setBcc(bcc);
			message.setSubject(subject);
			message.setText(body);
			message.setFrom(sender);
			mailSender.send(message);

		} catch (Exception e) {
			LOGGER.info("Not able to send mail:" + e);
			e.printStackTrace();
		}

		LOGGER.info("Mail sent Sucecessfully to " + to);
	}

	@Override
	public void sendMailWithAttachment(String to, String subject, String body, File fileToAttach) {

		try {
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

			String[] recipientList = to.split(",");
			InternetAddress[] recipientAddress = new InternetAddress[recipientList.length];
			int counter = 0;
			for (String recipient : recipientList) {
				recipientAddress[counter] = new InternetAddress(recipient.trim());
				counter++;
			}
			mimeMessage.setRecipients(Message.RecipientType.TO, recipientAddress);
			helper.setSubject(subject);
			helper.setText(body);
			helper.setFrom(sender);
			FileSystemResource file = new FileSystemResource(fileToAttach);
			helper.addAttachment(fileToAttach.getName(), file);
			mailSender.send(mimeMessage);

		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		LOGGER.info("Mail sent Sucecessfully to " + to);
	}

	@Override
	public void sendMailWithHtmlBody(String to, String subject, String body) {

		try {
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

			String[] recipientList = to.split(",");
			InternetAddress[] recipientAddress = new InternetAddress[recipientList.length];
			int counter = 0;
			for (String recipient : recipientList) {
				recipientAddress[counter] = new InternetAddress(recipient.trim());
				counter++;
			}
			mimeMessage.setRecipients(Message.RecipientType.TO, recipientAddress);
			helper.setSubject(subject);
			helper.setFrom(sender);
			helper.setText(body, true);
			mailSender.send(mimeMessage);

		} catch (MessagingException e) {
			LOGGER.error("Error while sending email:" + e);
		}

		LOGGER.info("sendMailWithHtmlBody() : Sent mail Sucecessfully to " + to);
	}

	@Override
	public void sendLoginEmail(String to, String subject, String text) {
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
		
	}
	

}
