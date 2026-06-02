package com.getmyhousing.common.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

@Entity
@Table(name = "pricing_details")
public class PricingDetails extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId; 

	@Column(name = "rent")
	private Long rent;

	@Column(name = "rent_type")
	private String rentType;

	@Column(name = "maintenance_cost")
	private Long maintananceCost;

	@Column(name = "maintenance_cost_type")
	private String maintananceCostType;

	@Column(name = "security_deposit")
	private String securityDeposit;

	@Column(name = "deposit_amount")
	private Long depositAmount;

	@Column(name = "booking_amount")
	private Long bookingAmount;

	@Column(name = "lock_in_period") 
	private Integer lockInPeriod;

	@Column(name = "lock_in_period_type")
	private String lockInPeriodType;

	@Column(name = "rent_increment")
	private String rentIncrement;
	
	@Column(name = "per_sqft_price")
	private String perSqftPrice;

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
	
	@ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "pricing_details_price_include", joinColumns = @JoinColumn(name = "pricing_details_id"))
	@Column(name = "select_price_include")
	private List<String> selectPriceInclude = new ArrayList<>();

	
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
		return "PricingDetails [propertyId=" + propertyId + ", rent=" + rent + ", rentType=" + rentType
				+ ", maintananceCost=" + maintananceCost + ", maintananceCostType=" + maintananceCostType
				+ ", securityDeposit=" + securityDeposit + ", depositAmount=" + depositAmount + ", bookingAmount="
				+ bookingAmount + ", lockInPeriod=" + lockInPeriod + ", lockInPeriodType=" + lockInPeriodType
				+ ", rentIncrement=" + rentIncrement + ", perSqftPrice=" + perSqftPrice + ", status=" + status
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + ", selectPriceInclude=" + selectPriceInclude + "]";
	}
}
