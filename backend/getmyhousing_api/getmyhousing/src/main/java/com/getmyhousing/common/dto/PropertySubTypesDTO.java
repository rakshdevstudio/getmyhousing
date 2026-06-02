package com.getmyhousing.common.dto;

public class PropertySubTypesDTO {

	private String propertySubType;
	private String iconPath;
	private Integer propertyRankOrder;

	public String getPropertySubType() {
		return propertySubType;
	}

	public void setPropertySubType(String propertySubType) {
		this.propertySubType = propertySubType;
	}

	public String getIconPath() {
		return iconPath;
	}

	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}

	public Integer getPropertyRankOrder() {
		return propertyRankOrder;
	}

	public void setPropertyRankOrder(Integer propertyRankOrder) {
		this.propertyRankOrder = propertyRankOrder;
	}

}
