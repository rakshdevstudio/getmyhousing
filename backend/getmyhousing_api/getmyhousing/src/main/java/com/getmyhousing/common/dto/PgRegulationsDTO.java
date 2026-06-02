package com.getmyhousing.common.dto;

public class PgRegulationsDTO {

	private Long id;
	private Long propertyId;
	private String nonVegAllowed;
	private String oppositeSex;
	private String anyTimeAllowed;
	private String visitorAllowed;
	private String guardianAllowed;
	private String drinkingAllowed;
	private String smokingAllowed;

	private int offset;
	private int limit;

	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;

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

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
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
