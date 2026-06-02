package com.getmyhousing.common.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sha12HashUtils {

	private static Logger LOGGER = LoggerFactory.getLogger(Sha12HashUtils.class);

	/**
	 * To create SHA-12 hash for given value
	 * 
	 * @param value
	 * @return
	 */
	public static String createSha12Hash(String value) {
		String returnString = null;

		try {
			// Create a SHA-512 MessageDigest
			MessageDigest digest = MessageDigest.getInstance("SHA-512");

			// Compute the hash
			byte[] hashBytes = digest.digest(value.getBytes(StandardCharsets.UTF_8));

			// Convert the hash to a hexadecimal string
			StringBuilder hashStringBuilder = new StringBuilder();
			for (byte b : hashBytes) {
				hashStringBuilder.append(String.format("%02x", b));
			}
			returnString = hashStringBuilder.toString();
		} catch (Exception e) {
			LOGGER.info("Exception while generating the sha-12 hash::" + e.getMessage());
			e.printStackTrace();
		}

		return returnString;

	}

}
