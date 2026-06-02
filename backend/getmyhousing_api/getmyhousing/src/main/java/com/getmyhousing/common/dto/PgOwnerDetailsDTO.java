package com.getmyhousing.common.dto;

public class PgOwnerDetailsDTO {

	private Long id;
	private Long propertyId;
	private String propertyManagedBy;
	private String propertyManagerStay;

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

	public String getPropertyManagedBy() {
		return propertyManagedBy;
	}

	public String getPropertyManagerStay() {
		return propertyManagerStay;
	}

	public void setPropertyManagerStay(String propertyManagerStay) {
		this.propertyManagerStay = propertyManagerStay;
	}

	public void setPropertyManagedBy(String propertyManagedBy) {
		this.propertyManagedBy = propertyManagedBy;
	}

}
