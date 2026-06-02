package com.getmyhousing.common.dto;

public class DefinePropertyDTO {

	private Long id;
	private Long propertyId;
	private String defineLocation;
	private String explainingPrice;
	private String explainingProperty;
	private String defineSizeAndStructure;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private String description;


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

	public String getDefineLocation() {
		return defineLocation;
	}

	public void setDefineLocation(String defineLocation) {
		this.defineLocation = defineLocation;
	}

	public String getExplainingPrice() {
		return explainingPrice;
	}

	public void setExplainingPrice(String explainingPrice) {
		this.explainingPrice = explainingPrice;
	}

	public String getExplainingProperty() {
		return explainingProperty;
	}

	public void setExplainingProperty(String explainingProperty) {
		this.explainingProperty = explainingProperty;
	}

	public String getDefineSizeAndStructure() {
		return defineSizeAndStructure;
	}

	public void setDefineSizeAndStructure(String defineSizeAndStructure) {
		this.defineSizeAndStructure = defineSizeAndStructure;
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

	
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "DefinePropertyDTO [id=" + id + ", propertyId=" + propertyId + ", defineLocation=" + defineLocation
				+ ", explainingPrice=" + explainingPrice + ", explainingProperty=" + explainingProperty
				+ ", defineSizeAndStructure=" + defineSizeAndStructure + ", status=" + status + ", createdDate="
				+ createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", description=" + description + "]";
	}
	
	

}
