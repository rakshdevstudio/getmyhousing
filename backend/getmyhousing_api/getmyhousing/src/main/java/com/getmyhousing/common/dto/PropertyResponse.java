package com.getmyhousing.common.dto;

import java.util.ArrayList;
import java.util.List;

public class PropertyResponse {

	
		private String responseCode;
	    private String responseMessage;
	    private List<PropertySearchDto> properties;
	    
	    public PropertyResponse() {
	    }

	    public String getResponseCode() {
	        return responseCode;
	    }

	    public void setResponseCode(String responseCode) {
	        this.responseCode = responseCode;
	    }

	    public String getResponseMessage() {
	        return responseMessage;
	    }

	    public void setResponseMessage(String responseMessage) {
	        this.responseMessage = responseMessage;
	    }


	    public List<PropertySearchDto> getProperties() {
	        return properties;
	    }

	    public void setProperties(List<PropertySearchDto> properties) {
	        this.properties = properties;
	    }


		@Override
		public String toString() {
			return "PropertyResponse [responseCode=" + responseCode + ", responseMessage=" + responseMessage
					+ ", properties=" + properties + ", includedGroupProperty=" + "" + "]";
		}


	    
	
	
}
