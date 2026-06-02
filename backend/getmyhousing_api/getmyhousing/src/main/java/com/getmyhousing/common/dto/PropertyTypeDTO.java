package com.getmyhousing.common.dto;

import java.util.List;

public class PropertyTypeDTO {

	private Long id;
	private String propertyType;
	private String propertySubType;
	private String propertySubTypeIconPath;
	private Integer propertyRankOrder;
	private String propertyTypeIconPath;

	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;

	private List<PropertySubTypesDTO> propertySubTypes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getPropertySubType() {
		return propertySubType;
	}

	public void setPropertySubType(String propertySubType) {
		this.propertySubType = propertySubType;
	}

	public Integer getPropertyRankOrder() {
		return propertyRankOrder;
	}

	public void setPropertyRankOrder(Integer propertyRankOrder) {
		this.propertyRankOrder = propertyRankOrder;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public Long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Long getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Long updatedBy) {
		this.updatedBy = updatedBy;
	}

	public List<PropertySubTypesDTO> getPropertySubTypes() {
		return propertySubTypes;
	}

	public void setPropertySubTypes(List<PropertySubTypesDTO> propertySubTypes) {
		this.propertySubTypes = propertySubTypes;
	}

	public String getPropertySubTypeIconPath() {
		return propertySubTypeIconPath;
	}

	public void setPropertySubTypeIconPath(String propertySubTypeIconPath) {
		this.propertySubTypeIconPath = propertySubTypeIconPath;
	}

	public String getPropertyTypeIconPath() {
		return propertyTypeIconPath;
	}

	public void setPropertyTypeIconPath(String propertyTypeIconPath) {
		this.propertyTypeIconPath = propertyTypeIconPath;
	}

}
