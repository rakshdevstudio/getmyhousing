package com.getmyhousing.common.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PropertySearchDto {

	private Long propertyId;
	private String propertyType;
	private String listingType;
	private String buildingType;
	private String locality;
	private String pincode;
	private String city;
	private String state;
	private String country;
	private String propertyAddress;
	private String propertyName;
	private String createdDate;			
	private String imageUrl;

	private Long rent;
	private String areaUnit;
	private String builtupPlotArea;
	private String carpetArea;
	private String salableArea;
	private String plotArea;
	private String numOfBedrooms;
	private String furnishingType;
	private String positionStatus;
	private String username;
	private String userRole;
	private String minRent;
	private String maxRent;
	private String searchText;
	private String postedOn;
	private String vastuFacing;
	
	private String perSqftPrice;
	
	private String title;
	
	private List<String> amenities;
	private List<String> facing;
	private List<String> bhk;
	
	private String amenity;
	private String superBuiltupArea;
	private String minSuperBuiltupArea;
	private String maxSuperBuiltupArea;
	private String whatsappNumber;
	private String approvalStatus;
	
	@JsonProperty("isExclusiveProperty")
	private String isExclusiveProperty;

	public String getIsExclusiveProperty() {
		return isExclusiveProperty;
	}

	public void setIsExclusiveProperty(String isExclusiveProperty) {
		this.isExclusiveProperty = isExclusiveProperty;
	}

	private List<IncludedGroupPropertyDTO> includedGroupProperty;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBuildingType() {
		return buildingType;
	}

	public void setBuildingType(String buildingType) {
		this.buildingType = buildingType;
	}

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getListingType() {
		return listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
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

	public String getPropertyAddress() {
		return propertyAddress;
	}

	public void setPropertyAddress(String propertyAddress) {
		this.propertyAddress = propertyAddress;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	

	public Long getRent() {
		return rent;
	}

	public void setRent(Long rent) {
		this.rent = rent;
	}

	public String getAreaUnit() {
		return areaUnit;
	}

	public void setAreaUnit(String areaUnit) {
		this.areaUnit = areaUnit;
	}

	public String getBuiltupPlotArea() {
		return builtupPlotArea;
	}

	public void setBuiltupPlotArea(String builtupPlotArea) {
		this.builtupPlotArea = builtupPlotArea;
	}

	public String getNumOfBedrooms() {
		return numOfBedrooms;
	}

	public void setNumOfBedrooms(String numOfBedrooms) {
		this.numOfBedrooms = numOfBedrooms;
	}

	public String getFurnishingType() {
		return furnishingType;
	}

	public void setFurnishingType(String furnishingType) {
		this.furnishingType = furnishingType;
	}

	public String getPositionStatus() {
		return positionStatus;
	}

	public void setPositionStatus(String positionStatus) {
		this.positionStatus = positionStatus;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	
	public String getMinRent() {
		return minRent;
	}

	public void setMinRent(String minRent) {
		this.minRent = minRent;
	}

	public String getMaxRent() {
		return maxRent;
	}

	public void setMaxRent(String maxRent) {
		this.maxRent = maxRent;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getSearchText() {
		return searchText;
	}

	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}
	
	public String getPostedOn() {
		return postedOn;
	}

	public void setPostedOn(String postedOn) {
		this.postedOn = postedOn;
	}

	public String getVastuFacing() {
		return vastuFacing;
	}

	public void setVastuFacing(String vastuFacing) {
		this.vastuFacing = vastuFacing;
	}

	public String getAmenity() {
		return amenity;
	}

	public void setAmenity(String amenity) {
		this.amenity = amenity;
	}

	public String getSuperBuiltupArea() {
		return superBuiltupArea;
	}

	public void setSuperBuiltupArea(String superBuiltupArea) {
		this.superBuiltupArea = superBuiltupArea;
	}
	

	public String getMinSuperBuiltupArea() {
		return minSuperBuiltupArea;
	}

	public void setMinSuperBuiltupArea(String minSuperBuiltupArea) {
		this.minSuperBuiltupArea = minSuperBuiltupArea;
	}

	public String getMaxSuperBuiltupArea() {
		return maxSuperBuiltupArea;
	}

	public void setMaxSuperBuiltupArea(String maxSuperBuiltupArea) {
		this.maxSuperBuiltupArea = maxSuperBuiltupArea;
	}
	
	public List<String> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<String> amenities) {
		this.amenities = amenities;
	}

	public List<String> getFacing() {
		return facing;
	}

	public void setFacing(List<String> facing) {
		this.facing = facing;
	}

	public List<String> getBhk() {
		return bhk;
	}

	public void setBhk(List<String> bhk) {
		this.bhk = bhk;
	}

	public List<IncludedGroupPropertyDTO> getIncludedGroupProperty() {
		return includedGroupProperty;
	}

	public void setIncludedGroupProperty(List<IncludedGroupPropertyDTO> includedGroupProperty) {
		this.includedGroupProperty = includedGroupProperty;
	}
	
	public String getWhatsappNumber() {
		return whatsappNumber;
	}

	public void setWhatsappNumber(String whatsappNumber) {
		this.whatsappNumber = whatsappNumber;
	}

	public String getCarpetArea() {
		return carpetArea;
	}

	public void setCarpetArea(String carpetArea) {
		this.carpetArea = carpetArea;
	}

	public String getSalableArea() {
		return salableArea;
	}

	public void setSalableArea(String salableArea) {
		this.salableArea = salableArea;
	}

	public String getPlotArea() {
		return plotArea;
	}

	public void setPlotArea(String plotArea) {
		this.plotArea = plotArea;
	}

	public String getPerSqftPrice() {
		return perSqftPrice;
	}

	public void setPerSqftPrice(String perSqftPrice) {
		this.perSqftPrice = perSqftPrice;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	@Override
	public String toString() {
		return "PropertySearchDto [propertyId=" + propertyId + ", propertyType=" + propertyType + ", listingType="
				+ listingType + ", buildingType=" + buildingType + ", locality=" + locality + ", pincode=" + pincode
				+ ", city=" + city + ", state=" + state + ", country=" + country + ", propertyAddress="
				+ propertyAddress + ", propertyName=" + propertyName + ", createdDate=" + createdDate + ", imageUrl="
				+ imageUrl + ", rent=" + rent + ", areaUnit=" + areaUnit + ", builtupPlotArea=" + builtupPlotArea
				+ ", carpetArea=" + carpetArea + ", salableArea=" + salableArea + ", plotArea=" + plotArea
				+ ", numOfBedrooms=" + numOfBedrooms + ", furnishingType=" + furnishingType + ", positionStatus="
				+ positionStatus + ", username=" + username + ", userRole=" + userRole + ", minRent=" + minRent
				+ ", maxRent=" + maxRent + ", searchText=" + searchText + ", postedOn=" + postedOn + ", vastuFacing="
				+ vastuFacing + ", perSqftPrice=" + perSqftPrice + ", title=" + title + ", amenities=" + amenities
				+ ", facing=" + facing + ", bhk=" + bhk + ", amenity=" + amenity + ", superBuiltupArea="
				+ superBuiltupArea + ", minSuperBuiltupArea=" + minSuperBuiltupArea + ", maxSuperBuiltupArea="
				+ maxSuperBuiltupArea + ", whatsappNumber=" + whatsappNumber + ", approvalStatus=" + approvalStatus
				+ ", isExclusiveProperty=" + isExclusiveProperty + ", includedGroupProperty=" + includedGroupProperty
				+ "]";
	}
	
}
