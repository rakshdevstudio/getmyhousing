package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "pg_regulations")
public class PgRegulations extends AbstractEntity {

	private static final long serialVersionUID = 4548818272266898521L;

	@Column(name = "property_id")
	private long propertyId;

	@Column(name = "non_veg_allowed")
	private String nonVegAllowed;

	@Column(name = "opposite_sex")
	private String oppositeSex;

	@Column(name = "any_time_allowed")
	private String anyTimeAllowed;

	@Column(name = "visitor_allowed")
	private String visitorAllowed;

	@Column(name = "guardian_allowed")
	private String guardianAllowed;

	@Column(name = "drinking_allowed")
	private String drinkingAllowed;

	@Column(name = "smoking_allowed")
	private String smokingAllowed;

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

	public long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(long propertyId) {
		this.propertyId = propertyId;
	}

	public String getOppositeSex() {
		return oppositeSex;
	}

	public void setOppositeSex(String oppositeSex) {
		this.oppositeSex = oppositeSex;
	}

	public String getAnyTimeAllowed() {
		return anyTimeAllowed;
	}

	public void setAnyTimeAllowed(String anyTimeAllowed) {
		this.anyTimeAllowed = anyTimeAllowed;
	}

	public String getVisitorAllowed() {
		return visitorAllowed;
	}

	public void setVisitorAllowed(String visitorAllowed) {
		this.visitorAllowed = visitorAllowed;
	}

	public String getSmokingAllowed() {
		return smokingAllowed;
	}

	public void setSmokingAllowed(String smokingAllowed) {
		this.smokingAllowed = smokingAllowed;
	}

	public String getNonVegAllowed() {
		return nonVegAllowed;
	}

	public void setNonVegAllowed(String nonVegAllowed) {
		this.nonVegAllowed = nonVegAllowed;
	}

	public String getGuardianAllowed() {
		return guardianAllowed;
	}

	public void setGuardianAllowed(String guardianAllowed) {
		this.guardianAllowed = guardianAllowed;
	}

	public String getDrinkingAllowed() {
		return drinkingAllowed;
	}

	public void setDrinkingAllowed(String drinkingAllowed) {
		this.drinkingAllowed = drinkingAllowed;
	}

}
