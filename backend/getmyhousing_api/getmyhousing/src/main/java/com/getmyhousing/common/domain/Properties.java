package com.getmyhousing.common.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "properties")
public class Properties extends AbstractEntity {

	private static final long serialVersionUID = 4548818272266898521L;

	@Column(name = "listing_type")
	private String listingType;

	@Column(name = "building_type")
	private String buildingType;

	@Column(name = "property_name")
	private String propertyName;

	@Column(name = "property_type")
	private String propertyType;

	@Column(name = "zone")
	private String zone;

	@Column(name = "locality")
	private String locality;

	@Column(name = "city")
	private String city;

	@Column(name = "state")
	private String state;

	@Column(name = "country")
	private String country;

	@Column(name = "pincode")
	private String pincode;

	@Column(name = "latitude")
	private BigDecimal latitude;

	@Column(name = "longitude")
	private BigDecimal longitude;

	@Column(name = "property_address")
	private String propertyAddress;

	@Column(name = "user_package_id")
	private Long userPackageId;

	@Column(name = "status")
	private String status;

	@Column(name = "landmark")
	private String landmark;

	@Column(name = "created_date")
	private String createdDate;

	@Column(name = "created_by")
	private Long createdBy;

	@Column(name = "updated_date")
	private String updatedDate;

	@Column(name = "updated_by")
	private Long updatedBy;

	@Column(name = "approval_status")
	private String approvalStatus;

	@Column(name = "approval_remarks")
	private String approvalRemarks;

	@Column(name = "approval_action_by")
	private String approvalActionBy;

	@Column(name = "approval_action_date")
	private String approvalActionDate;

	@Column(name = "youtube_link")
	private String youtubeLink;

	@Column(name = "video_link")
	private String videoLink;
	
	@Column(name = "sub_locality")
	private String subLocality;
	
	@Column(name = "brokerage_type")
	private String brokerageType;
	
	@Column(name = "brokerge_value")
	private String brokergeValue;
	
	@Column(name = "brokerage_unit")
	private String brokerageUnit;
	
	@Column(name = "is_exclusive_property")
	private Boolean isExclusiveProperty;
	
	@Column(name = "property_brochure")
	private String propertyBrochure;
	
	@ManyToOne
    @JoinColumn(name = "owner_id", nullable = true)
    private Owner owner;

	public boolean isExclusiveProperty() {
		return Boolean.TRUE.equals(isExclusiveProperty);
	}

	public void setExclusiveProperty(boolean isExclusiveProperty) {
		this.isExclusiveProperty = isExclusiveProperty;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public BigDecimal getLongitude() {
		return longitude;
	}

	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
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

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getListingType() {
		return listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public String getBuildingType() {
		return buildingType;
	}

	public void setBuildingType(String buildingType) {
		this.buildingType = buildingType;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getZone() {
		return zone;
	}

	public void setZone(String zone) {
		this.zone = zone;
	}

	public String getPropertyAddress() {
		return propertyAddress;
	}

	public void setPropertyAddress(String propertyAddress) {
		this.propertyAddress = propertyAddress;
	}

	public String getLandmark() {
		return landmark;
	}

	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public String getApprovalRemarks() {
		return approvalRemarks;
	}

	public void setApprovalRemarks(String approvalRemarks) {
		this.approvalRemarks = approvalRemarks;
	}

	public String getApprovalActionBy() {
		return approvalActionBy;
	}

	public void setApprovalActionBy(String approvalActionBy) {
		this.approvalActionBy = approvalActionBy;
	}

	public String getApprovalActionDate() {
		return approvalActionDate;
	}

	public void setApprovalActionDate(String approvalActionDate) {
		this.approvalActionDate = approvalActionDate;
	}

	public Long getUserPackageId() {
		return userPackageId;
	}

	public void setUserPackageId(Long userPackageId) {
		this.userPackageId = userPackageId;
	}

	public String getYoutubeLink() {
		return youtubeLink;
	}

	public void setYoutubeLink(String youtubeLink) {
		this.youtubeLink = youtubeLink;
	}

	public String getVideoLink() {
		return videoLink;
	}

	public void setVideoLink(String videoLink) {
		this.videoLink = videoLink;
	}

	
	
	
	
	public String getSubLocality() {
		return subLocality;
	}

	public void setSubLocality(String subLocality) {
		this.subLocality = subLocality;
	}
	
	
	
	

	public String getBrokerageType() {
		return brokerageType;
	}

	public void setBrokerageType(String brokerageType) {
		this.brokerageType = brokerageType;
	}

	public String getBrokergeValue() {
		return brokergeValue;
	}

	public void setBrokergeValue(String brokergeValue) {
		this.brokergeValue = brokergeValue;
	}

	public String getBrokerageUnit() {
		return brokerageUnit;
	}

	public void setBrokerageUnit(String brokerageUnit) {
		this.brokerageUnit = brokerageUnit;
	}

	public String getPropertyBrochure() {
		return propertyBrochure;
	}

	public void setPropertyBrochure(String propertyBrochure) {
		this.propertyBrochure = propertyBrochure;
	}

	public Owner getOwner() {
		return owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	@Override
	public String toString() {
		return "Properties [listingType=" + listingType + ", buildingType=" + buildingType + ", propertyName="
				+ propertyName + ", propertyType=" + propertyType + ", zone=" + zone + ", locality=" + locality
				+ ", city=" + city + ", state=" + state + ", country=" + country + ", pincode=" + pincode
				+ ", latitude=" + latitude + ", longitude=" + longitude + ", propertyAddress=" + propertyAddress
				+ ", userPackageId=" + userPackageId + ", status=" + status + ", landmark=" + landmark
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + ", approvalStatus=" + approvalStatus + ", approvalRemarks="
				+ approvalRemarks + ", approvalActionBy=" + approvalActionBy + ", approvalActionDate="
				+ approvalActionDate + ", youtubeLink=" + youtubeLink + ", videoLink=" + videoLink + ", subLocality="
				+ subLocality + ", brokerageType=" + brokerageType + ", brokergeValue=" + brokergeValue
				+ ", brokerageUnit=" + brokerageUnit + ", isExclusiveProperty=" + isExclusiveProperty
				+ ", propertyBrochure=" + propertyBrochure + "]";
	}

}
