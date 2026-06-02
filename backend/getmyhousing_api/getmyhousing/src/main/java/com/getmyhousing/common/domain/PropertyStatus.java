package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "property_status")
public class PropertyStatus extends AbstractEntity {

	private static final long serialVersionUID = 4548818272266898521L;

	@Column(name = "property_id")
	private long propertyId;

	@Column(name = "available_for")
	private String availableFor;

	@Column(name = "position_status")
	private String positionStatus;

	@Column(name = "position_status_type")
	private String positionStatusType;

	@Column(name = "available_from")
	private String availableFrom;

	@Column(name = "available_from_date")
	private String availableFromDate;
	
	@Column(name = "occupancy_days")
	private String occupancyDays;

	@Column(name = "age_of_property")
	private String ageOfProperty;

	@Column(name = "ownership_type")
	private String ownershipType;

	@Column(name = "about_property_suitableFor")
	private String aboutPropertySuitableFor;

	@Column(name = "location_hub")
	private String locationHub;

	@Column(name = "entrance_width")
	private String entranceWidth;

	@Column(name = "height_sealing")
	private String heightSealing;

	@Column(name = "located_near")
	private String locatedNear;

	@Column(name = "govt_approved")
	private String govtApproved;

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
	
	@Column(name = "tenant_pre_leased_unit")
	private String tenantPreLeasedUnit;
	

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

	public String getAvailableFor() {
		return availableFor;
	}

	public void setAvailableFor(String availableFor) {
		this.availableFor = availableFor;
	}

	public String getPositionStatus() {
		return positionStatus;
	}

	public void setPositionStatus(String positionStatus) {
		this.positionStatus = positionStatus;
	}

	public String getPositionStatusType() {
		return positionStatusType;
	}

	public void setPositionStatusType(String positionStatusType) {
		this.positionStatusType = positionStatusType;
	}

	public String getAvailableFrom() {
		return availableFrom;
	}

	public void setAvailableFrom(String availableFrom) {
		this.availableFrom = availableFrom;
	}

	public String getOccupancyDays() {
		return occupancyDays;
	}

	public void setOccupancyDays(String occupancyDays) {
		this.occupancyDays = occupancyDays;
	}

	public String getAgeOfProperty() {
		return ageOfProperty;
	}

	public void setAgeOfProperty(String ageOfProperty) {
		this.ageOfProperty = ageOfProperty;
	}

	public String getOwnershipType() {
		return ownershipType;
	}

	public void setOwnershipType(String ownershipType) {
		this.ownershipType = ownershipType;
	}

	public String getAboutPropertySuitableFor() {
		return aboutPropertySuitableFor;
	}

	public void setAboutPropertySuitableFor(String aboutPropertySuitableFor) {
		this.aboutPropertySuitableFor = aboutPropertySuitableFor;
	}

	public String getLocationHub() {
		return locationHub;
	}

	public void setLocationHub(String locationHub) {
		this.locationHub = locationHub;
	}

	public String getLocatedNear() {
		return locatedNear;
	}

	public String getEntranceWidth() {
		return entranceWidth;
	}

	public void setEntranceWidth(String entranceWidth) {
		this.entranceWidth = entranceWidth;
	}

	public String getHeightSealing() {
		return heightSealing;
	}

	public void setHeightSealing(String heightSealing) {
		this.heightSealing = heightSealing;
	}

	public void setLocatedNear(String locatedNear) {
		this.locatedNear = locatedNear;
	}

	public String getGovtApproved() {
		return govtApproved;
	}

	public void setGovtApproved(String govtApproved) {
		this.govtApproved = govtApproved;
	}

	public String getAvailableFromDate() {
		return availableFromDate;
	}

	public void setAvailableFromDate(String availableFromDate) {
		this.availableFromDate = availableFromDate;
	}

	public String getTenantPreLeasedUnit() {
		return tenantPreLeasedUnit;
	}

	public void setTenantPreLeasedUnit(String tenantPreLeasedUnit) {
		this.tenantPreLeasedUnit = tenantPreLeasedUnit;
	}

	@Override
	public String toString() {
		return "PropertyStatus [propertyId=" + propertyId + ", availableFor=" + availableFor + ", positionStatus="
				+ positionStatus + ", positionStatusType=" + positionStatusType + ", availableFrom=" + availableFrom
				+ ", availableFromDate=" + availableFromDate + ", occupancyDays=" + occupancyDays + ", ageOfProperty="
				+ ageOfProperty + ", ownershipType=" + ownershipType + ", aboutPropertySuitableFor="
				+ aboutPropertySuitableFor + ", locationHub=" + locationHub + ", entranceWidth=" + entranceWidth
				+ ", heightSealing=" + heightSealing + ", locatedNear=" + locatedNear + ", govtApproved=" + govtApproved
				+ ", status=" + status + ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate="
				+ updatedDate + ", updatedBy=" + updatedBy + ", tenantPreLeasedUnit=" + tenantPreLeasedUnit + "]";
	}
	
	
	
	

}
