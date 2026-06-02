package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "define_property")
public class DefineProperty extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "define_location")
	private String defineLocation;

	@Column(name = "explaining_price")
	private String explainingPrice;

	@Column(name = "explaining_property")
	private String explainingProperty;

	@Column(name = "define_size_and_structure")
	private String defineSizeAndStructure;

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
	
	@Column(name = "description")
	private String description;

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
		return "DefineProperty [propertyId=" + propertyId + ", defineLocation=" + defineLocation + ", explainingPrice="
				+ explainingPrice + ", explainingProperty=" + explainingProperty + ", defineSizeAndStructure="
				+ defineSizeAndStructure + ", status=" + status + ", createdDate=" + createdDate + ", createdBy="
				+ createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", description="
				+ description + "]";
	}
	
	

}
