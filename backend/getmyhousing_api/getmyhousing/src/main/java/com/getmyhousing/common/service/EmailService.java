package com.getmyhousing.common.service;

import java.io.File;

public interface EmailService {

	public void sendSimpleMessage(String to, String subject, String body);

	public void sendSimpleBccMessage(String to, String bcc, String subject, String body);

	public void sendMailWithAttachment(String to, String subject, String body, File fileToAttach);

	public void sendMailWithHtmlBody(String to, String subject, String body);
	
	void sendLoginEmail(String to, String subject, String text);

}
