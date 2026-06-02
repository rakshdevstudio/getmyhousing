package com.getmyhousing.common.dto;

import java.util.List;

import javax.persistence.Column;

public class PropertyGroupDTO {

	private long propertyGroupId;
	private long propertyId;
	private long groupId;
	private String groupName;
	private long userId;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private List<Long> propertyIdList;
	private List<PropertySearchDto> properties;
	    
	
	
	
	
	
	public long getPropertyGroupId() {
		return propertyGroupId;
	}

	public void setPropertyGroupId(long propertyGroupId) {
		this.propertyGroupId = propertyGroupId;
	}

	public long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(long propertyId) {
		this.propertyId = propertyId;
	}

	public long getGroupId() {
		return groupId;
	}

	public void setGroupId(long groupId) {
		this.groupId = groupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
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

	public List<Long> getPropertyIdList() {
		return propertyIdList;
	}

	public void setPropertyIdList(List<Long> propertyIdList) {
		this.propertyIdList = propertyIdList;
	}

	@Override
	public String toString() {
		return "PropertyGroupDTO [propertyGroupId=" + propertyGroupId + ", propertyId=" + propertyId + ", groupId="
				+ groupId + ", groupName=" + groupName + ", userId=" + userId + ", status=" + status + ", createdDate="
				+ createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", propertyIdList=" + propertyIdList + "]";
	}

	
	
	
	
	
}
