package com.getmyhousing.common.dto;

import java.util.List;

public class PropertyDto {

	
	private Long propertyId;
    private String propertyType;
    private String listingType;
    private String buildingType;
    private String locality;
    private String city;
    private String state;
    private String country;
    private String propertyAddress;
    private String propertyName;
    private String createdDate;
    private List<String> imagePaths; // Add this field
    private String imageUrl;

    private List<ImageDto> imageData; // Add this field
    
	private Long rent;
	private Long minRent;
	private Long maxRent;

	private String areaUnit;
	private String builtupPlotArea;
	private String numOfBedrooms;
	private String furnishingType;
	private String positionStatus;
	private String username;
	private String userRole;
	private String searchText;
    
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
	public String getBuildingType() {
		return buildingType;
	}
	public void setBuildingType(String buildingType) {
		this.buildingType = buildingType;
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
	public List<String> getImagePaths() {
		return imagePaths;
	}
	public void setImagePaths(List<String> imagePaths) {
		this.imagePaths = imagePaths;
	}
	public List<ImageDto> getImageData() {
		return imageData;
	}
	public void setImageData(List<ImageDto> imageData) {
		this.imageData = imageData;
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
	public Long getMinRent() {
		return minRent;
	}
	public void setMinRent(Long minRent) {
		this.minRent = minRent;
	}
	public Long getMaxRent() {
		return maxRent;
	}
	public void setMaxRent(Long maxRent) {
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
	
    
    

}
