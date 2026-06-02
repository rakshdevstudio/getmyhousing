package com.getmyhousing.common.dto;

import java.util.List;

public class PricingDetailsDTO {

	private Long id;
	private Long propertyId;
	private Long rent;
	private String rentType;
	private Long maintananceCost;
	private String maintananceCostType;
	private String securityDeposit;
	private Long depositAmount;
	private Long bookingAmount;
	private Integer lockInPeriod;
	private String lockInPeriodType;
	private String rentIncrement;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private String perSqftPrice;
	private List<String> selectPriceInclude;


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

	public Long getRent() {
		return rent;
	}

	public void setRent(Long rent) {
		this.rent = rent;
	}

	public String getRentType() {
		return rentType;
	}

	public void setRentType(String rentType) {
		this.rentType = rentType;
	}

	public Long getMaintananceCost() {
		return maintananceCost;
	}

	public void setMaintananceCost(Long maintananceCost) {
		this.maintananceCost = maintananceCost;
	}

	public String getMaintananceCostType() {
		return maintananceCostType;
	}

	public void setMaintananceCostType(String maintananceCostType) {
		this.maintananceCostType = maintananceCostType;
	}

	public String getSecurityDeposit() {
		return securityDeposit;
	}

	public void setSecurityDeposit(String securityDeposit) {
		this.securityDeposit = securityDeposit;
	}

	public Long getDepositAmount() {
		return depositAmount;
	}

	public void setDepositAmount(Long depositAmount) {
		this.depositAmount = depositAmount;
	}

	public Long getBookingAmount() {
		return bookingAmount;
	}

	public void setBookingAmount(Long bookingAmount) {
		this.bookingAmount = bookingAmount;
	}

	public Integer getLockInPeriod() {
		return lockInPeriod;
	}

	public void setLockInPeriod(Integer lockInPeriod) {
		this.lockInPeriod = lockInPeriod;
	}

	public String getLockInPeriodType() {
		return lockInPeriodType;
	}

	public void setLockInPeriodType(String lockInPeriodType) {
		this.lockInPeriodType = lockInPeriodType;
	}

	public String getRentIncrement() {
		return rentIncrement;
	}

	public void setRentIncrement(String rentIncrement) {
		this.rentIncrement = rentIncrement;
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

	public List<String> getSelectPriceInclude() {
		return selectPriceInclude;
	}

	public void setSelectPriceInclude(List<String> selectPriceInclude) {
		this.selectPriceInclude = selectPriceInclude;
	}

	public String getPerSqftPrice() {
		return perSqftPrice;
	}

	public void setPerSqftPrice(String perSqftPrice) {
		this.perSqftPrice = perSqftPrice;
	}

	@Override
	public String toString() {
		return "PricingDetailsDTO [id=" + id + ", propertyId=" + propertyId + ", rent=" + rent + ", rentType="
				+ rentType + ", maintananceCost=" + maintananceCost + ", maintananceCostType=" + maintananceCostType
				+ ", securityDeposit=" + securityDeposit + ", depositAmount=" + depositAmount + ", bookingAmount="
				+ bookingAmount + ", lockInPeriod=" + lockInPeriod + ", lockInPeriodType=" + lockInPeriodType
				+ ", rentIncrement=" + rentIncrement + ", status=" + status + ", createdDate=" + createdDate
				+ ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", perSqftPrice=" + perSqftPrice + ", selectPriceInclude=" + selectPriceInclude + "]";
	}
	
}
