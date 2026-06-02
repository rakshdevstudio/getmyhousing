package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "leads")
public class Lead extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "customer_name")
	private String customerName;

	@Column(name = "mobile_number")
	private String mobileNumber;

	@Column(name = "email")
	private String email;
	
	@Column(name = "customer_district")
	private String customerDistrict;
	
	@Column(name = "customer_state")
	private String customerState;

	@Column(name = "lead_source")
	private String leadSource;

	@Column(name = "lead_type")
	private String leadType;

	@Column(name = "assigned_to")
	private Long assignedTo;

	@Column(name = "assigned_by")
	private Long assignedBy;

	@Column(name = "assigned_date")
	private String assignedDate;

	@Column(name = "next_followup_date")
	private String nextFollowupDate;

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
	
	@Column(name = "country_code")
	private String countryCode;
	
	@Column(name = "schedule_date_time")
	private String scheduleDateTime;
	
	@Column(name = "getting_lead_by_property")
	private Long gettingLeadByProperty;
	
	@Column(name = "remarks")
	private String remarks;
	
	@Column(name = "lead_provider_id")
	private Long leadProviderId;
	

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLeadSource() {
		return leadSource;
	}

	public void setLeadSource(String leadSource) {
		this.leadSource = leadSource;
	}

	public String getLeadType() {
		return leadType;
	}

	public void setLeadType(String leadType) {
		this.leadType = leadType;
	}

	public Long getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(Long assignedTo) {
		this.assignedTo = assignedTo;
	}

	public Long getAssignedBy() {
		return assignedBy;
	}

	public void setAssignedBy(Long assignedBy) {
		this.assignedBy = assignedBy;
	}

	public String getAssignedDate() {
		return assignedDate;
	}

	public void setAssignedDate(String assignedDate) {
		this.assignedDate = assignedDate;
	}

	public String getNextFollowupDate() {
		return nextFollowupDate;
	}

	public void setNextFollowupDate(String nextFollowupDate) {
		this.nextFollowupDate = nextFollowupDate;
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

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getScheduleDateTime() {
		return scheduleDateTime;
	}

	public void setScheduleDateTime(String scheduleDateTime) {
		this.scheduleDateTime = scheduleDateTime;
	}

	
	
	
	public String getCustomerDistrict() {
		return customerDistrict;
	}

	public void setCustomerDistrict(String customerDistrict) {
		this.customerDistrict = customerDistrict;
	}

	public String getCustomerState() {
		return customerState;
	}

	public void setCustomerState(String customerState) {
		this.customerState = customerState;
	}

	
	
	
	
	public Long getGettingLeadByProperty() {
		return gettingLeadByProperty;
	}

	public void setGettingLeadByProperty(Long gettingLeadByProperty) {
		this.gettingLeadByProperty = gettingLeadByProperty;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Long getLeadProviderId() {
		return leadProviderId;
	}

	public void setLeadProviderId(Long leadProviderId) {
		this.leadProviderId = leadProviderId;
	}

	@Override
	public String toString() {
		return "Lead [propertyId=" + propertyId + ", customerName=" + customerName + ", mobileNumber=" + mobileNumber
				+ ", email=" + email + ", customerDistrict=" + customerDistrict + ", customerState=" + customerState
				+ ", leadSource=" + leadSource + ", leadType=" + leadType + ", assignedTo=" + assignedTo
				+ ", assignedBy=" + assignedBy + ", assignedDate=" + assignedDate + ", nextFollowupDate="
				+ nextFollowupDate + ", status=" + status + ", createdDate=" + createdDate + ", createdBy=" + createdBy
				+ ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", countryCode=" + countryCode
				+ ", scheduleDateTime=" + scheduleDateTime + ", gettingLeadByProperty=" + gettingLeadByProperty
				+ ", remarks=" + remarks + ", leadProviderId=" + leadProviderId + "]";
	}



	
	
	

}
