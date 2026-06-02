package com.getmyhousing.common.dto;

import java.math.BigDecimal;

public class PackagesDTO {

	private Long id;
	private String packageName;
	private String packageFor;
	private String listingType;
	private Integer durationInDays;
	private Integer noOfListings;
	private String country;
	private String state;
	private String district;
	private String description;
	private BigDecimal mrp;
	private BigDecimal discount;
	private BigDecimal sellingPrice;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private BigDecimal amount;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getPackageFor() {
		return packageFor;
	}

	public void setPackageFor(String packageFor) {
		this.packageFor = packageFor;
	}

	public String getListingType() {
		return listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public Integer getDurationInDays() {
		return durationInDays;
	}

	public void setDurationInDays(Integer durationInDays) {
		this.durationInDays = durationInDays;
	}

	public Integer getNoOfListings() {
		return noOfListings;
	}

	public void setNoOfListings(Integer noOfListings) {
		this.noOfListings = noOfListings;
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

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	@Override
	public String toString() {
		return "PackagesDTO [id=" + id + ", packageName=" + packageName + ", packageFor=" + packageFor
				+ ", listingType=" + listingType + ", durationInDays=" + durationInDays + ", noOfListings="
				+ noOfListings + ", country=" + country + ", state=" + state + ", district=" + district
				+ ", description=" + description + ", mrp=" + mrp + ", discount=" + discount + ", sellingPrice="
				+ sellingPrice + ", status=" + status + ", createdDate=" + createdDate + ", createdBy=" + createdBy
				+ ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", amount=" + amount + "]";
	}

	
	
}
