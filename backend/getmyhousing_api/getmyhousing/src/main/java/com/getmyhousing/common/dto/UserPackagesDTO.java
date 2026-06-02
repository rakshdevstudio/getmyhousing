package com.getmyhousing.common.dto;

import java.math.BigDecimal;

public class UserPackagesDTO {

	private Long id;
	private Long userId;
	private Long packageId;
	private String packageActiveDate;
	private String packageExpiryDate;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;

	private String packageName;
	private String listingType;
	private String noOfListings;
	private String durationInDays;
	private String noOfPostings;
	private String country;
	private String state;
	private String district;
	private String description;
	private BigDecimal mrp;
	private BigDecimal discount;
	private BigDecimal sellingPrice;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getPackageId() {
		return packageId;
	}

	public void setPackageId(Long packageId) {
		this.packageId = packageId;
	}

	public String getPackageActiveDate() {
		return packageActiveDate;
	}

	public void setPackageActiveDate(String packageActiveDate) {
		this.packageActiveDate = packageActiveDate;
	}

	public String getPackageExpiryDate() {
		return packageExpiryDate;
	}

	public void setPackageExpiryDate(String packageExpiryDate) {
		this.packageExpiryDate = packageExpiryDate;
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

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getListingType() {
		return listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public String getNoOfListings() {
		return noOfListings;
	}

	public void setNoOfListings(String noOfListings) {
		this.noOfListings = noOfListings;
	}

	public String getDurationInDays() {
		return durationInDays;
	}

	public void setDurationInDays(String durationInDays) {
		this.durationInDays = durationInDays;
	}

	public String getNoOfPostings() {
		return noOfPostings;
	}

	public void setNoOfPostings(String noOfPostings) {
		this.noOfPostings = noOfPostings;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getMrp() {
		return mrp;
	}

	public void setMrp(BigDecimal mrp) {
		this.mrp = mrp;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public BigDecimal getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(BigDecimal sellingPrice) {
		this.sellingPrice = sellingPrice;
	}

}
