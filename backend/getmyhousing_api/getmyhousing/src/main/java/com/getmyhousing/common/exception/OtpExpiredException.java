package com.getmyhousing.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.REQUEST_TIMEOUT)
public class OtpExpiredException extends RuntimeException {
	
	public OtpExpiredException(String message) {
        super(message);
    }
}
