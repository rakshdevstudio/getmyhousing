package com.getmyhousing.common.dto;

import java.util.List;

public class TenantStatusDTO {

	private Long id;
	private Long propertyId;
	private String tenantType;
	private String religiousType;
	private String workPreference;
	private String petsAllowed;
	private String foodPreference;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private String bachelorsAllowed;
	private String sprinstersAllowed;

	private List<String> bachelorsAllowedList;

	private List<String> sprinstersAllowedList;

	private List<String> tenantTypeList;

	public List<String> getTenantTypeList() {
		return tenantTypeList;
	}

	public void setTenantTypeList(List<String> tenantTypeList) {
		this.tenantTypeList = tenantTypeList;
	}

	public List<String> getBachelorsAllowedList() {
		return bachelorsAllowedList;
	}

	public void setBachelorsAllowedList(List<String> bachelorsAllowedList) {
		this.bachelorsAllowedList = bachelorsAllowedList;
	}

	public List<String> getSprinstersAllowedList() {
		return sprinstersAllowedList;
	}

	public void setSprinstersAllowedList(List<String> sprinstersAllowedList) {
		this.sprinstersAllowedList = sprinstersAllowedList;
	}

	public String getBachelorsAllowed() {
		return bachelorsAllowed;
	}

	public void setBachelorsAllowed(String bachelorsAllowed) {
		this.bachelorsAllowed = bachelorsAllowed;
	}

	public String getSprinstersAllowed() {
		return sprinstersAllowed;
	}

	public void setSprinstersAllowed(String sprinstersAllowed) {
		this.sprinstersAllowed = sprinstersAllowed;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getTenantType() {
		return tenantType;
	}

	public void setTenantType(String tenantType) {
		this.tenantType = tenantType;
	}

	public String getReligiousType() {
		return religiousType;
	}

	public void setReligiousType(String religiousType) {
		this.religiousType = religiousType;
	}

	public String getPetsAllowed() {
		return petsAllowed;
	}

	public void setPetsAllowed(String petsAllowed) {
		this.petsAllowed = petsAllowed;
	}

	public String getFoodPreference() {
		return foodPreference;
	}

	public void setFoodPreference(String foodPreference) {
		this.foodPreference = foodPreference;
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

	public String getWorkPreference() {
		return workPreference;
	}

	public void setWorkPreference(String workPreference) {
		this.workPreference = workPreference;
	}

}
