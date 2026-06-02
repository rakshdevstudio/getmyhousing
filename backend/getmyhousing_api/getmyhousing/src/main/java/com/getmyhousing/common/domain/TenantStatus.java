package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tenant_status")
public class TenantStatus extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "tenant_type")
	private String tenantType;

	@Column(name = "religious_type")
	private String religiousType;

	@Column(name = "work_preference")
	private String workPreference;

	@Column(name = "pets_allowed")
	private String petsAllowed;

	@Column(name = "food_preference")
	private String foodPreference;

	@Column(name = "status")
	private String status;

	@Column(name = "created_date")
	private String createdDate;

	@Column(name = "created_by")
	private Long createdBy;

	@Column(name = "updated_date")
	private String updatedDate;

	@Column(name = "updated_by")
	private Long updatedBy;

	@Column(name = "bachelors_allowed")
	private String bachelorsAllowed;

	@Column(name = "sprinsters_allowed")
	private String sprinstersAllowed;

	public Long getPropertyId() {
		return propertyId;
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

	public String getWorkPreference() {
		return workPreference;
	}

	public void setWorkPreference(String workPreference) {
		this.workPreference = workPreference;
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

}
