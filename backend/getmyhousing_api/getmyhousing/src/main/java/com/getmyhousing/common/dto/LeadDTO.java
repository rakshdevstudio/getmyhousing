package com.getmyhousing.common.dto;

import java.util.List;

import javax.persistence.Column;

public class LeadDTO {

	private Long id;
	private Long propertyId;
	private String customerName;
	private String mobileNumber;
	private String email;
	private String leadSource;
	private String leadType;
	private Long assignedTo;
	private Long assignedBy;
	private String assignedDate;
	private String nextFollowupDate;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private int offset;
	private int limit;

	private List<Long> leads;
	private Long userId;

	// For filtering purpose
	private String buildingType;
	private String listingType;
	private String propertyType;
	private String city;
	private String state;
	private String assignedToName;
	private String assignedByName;
	private String leadStartDate;
	private String leadEndDate;
	private String nextFollowupStartDate;
	private String nextFollowupEndDate;

	// For leadHistory
	private Long callBy;
	private String callResponse;
	private String callNotes;
	private String statusChangeFrom;
	private String statusChangeTo;
	private String callDate;
	private boolean unAssignedFlag;
	
	private String countryCode;
	private String scheduleDateTime;
	private String customerDistrict;
	private String customerState;
	private Long gettingLeadByProperty;
	private String remarks;
	private Long leadProviderId;


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

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public List<Long> getLeads() {
		return leads;
	}

	public void setLeads(List<Long> leads) {
		this.leads = leads;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getBuildingType() {
		return buildingType;
	}

	public void setBuildingType(String buildingType) {
		this.buildingType = buildingType;
	}

	public String getListingType() {
		return listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
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

	public String getAssignedToName() {
		return assignedToName;
	}

	public void setAssignedToName(String assignedToName) {
		this.assignedToName = assignedToName;
	}

	public String getLeadStartDate() {
		return leadStartDate;
	}

	public void setLeadStartDate(String leadStartDate) {
		this.leadStartDate = leadStartDate;
	}

	public String getLeadEndDate() {
		return leadEndDate;
	}

	public void setLeadEndDate(String leadEndDate) {
		this.leadEndDate = leadEndDate;
	}

	public String getNextFollowupStartDate() {
		return nextFollowupStartDate;
	}

	public void setNextFollowupStartDate(String nextFollowupStartDate) {
		this.nextFollowupStartDate = nextFollowupStartDate;
	}

	public String getNextFollowupEndDate() {
		return nextFollowupEndDate;
	}

	public void setNextFollowupEndDate(String nextFollowupEndDate) {
		this.nextFollowupEndDate = nextFollowupEndDate;
	}

	public Long getCallBy() {
		return callBy;
	}

	public void setCallBy(Long callBy) {
		this.callBy = callBy;
	}

	public String getCallResponse() {
		return callResponse;
	}

	public void setCallResponse(String callResponse) {
		this.callResponse = callResponse;
	}

	public String getCallNotes() {
		return callNotes;
	}

	public void setCallNotes(String callNotes) {
		this.callNotes = callNotes;
	}

	public String getStatusChangeFrom() {
		return statusChangeFrom;
	}

	public void setStatusChangeFrom(String statusChangeFrom) {
		this.statusChangeFrom = statusChangeFrom;
	}

	public String getStatusChangeTo() {
		return statusChangeTo;
	}

	public void setStatusChangeTo(String statusChangeTo) {
		this.statusChangeTo = statusChangeTo;
	}

	public String getCallDate() {
		return callDate;
	}

	public void setCallDate(String callDate) {
		this.callDate = callDate;
	}

	public boolean isUnAssignedFlag() {
		return unAssignedFlag;
	}

	public void setUnAssignedFlag(boolean unAssignedFlag) {
		this.unAssignedFlag = unAssignedFlag;
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

	public String getAssignedByName() {
		return assignedByName;
	}

	public void setAssignedByName(String assignedByName) {
		this.assignedByName = assignedByName;
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
		return "LeadDTO [id=" + id + ", propertyId=" + propertyId + ", customerName=" + customerName + ", mobileNumber="
				+ mobileNumber + ", email=" + email + ", leadSource=" + leadSource + ", leadType=" + leadType
				+ ", assignedTo=" + assignedTo + ", assignedBy=" + assignedBy + ", assignedDate=" + assignedDate
				+ ", nextFollowupDate=" + nextFollowupDate + ", status=" + status + ", createdDate=" + createdDate
				+ ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", offset="
				+ offset + ", limit=" + limit + ", leads=" + leads + ", userId=" + userId + ", buildingType="
				+ buildingType + ", listingType=" + listingType + ", propertyType=" + propertyType + ", city=" + city
				+ ", state=" + state + ", assignedToName=" + assignedToName + ", assignedByName=" + assignedByName
				+ ", leadStartDate=" + leadStartDate + ", leadEndDate=" + leadEndDate + ", nextFollowupStartDate="
				+ nextFollowupStartDate + ", nextFollowupEndDate=" + nextFollowupEndDate + ", callBy=" + callBy
				+ ", callResponse=" + callResponse + ", callNotes=" + callNotes + ", statusChangeFrom="
				+ statusChangeFrom + ", statusChangeTo=" + statusChangeTo + ", callDate=" + callDate
				+ ", unAssignedFlag=" + unAssignedFlag + ", countryCode=" + countryCode + ", scheduleDateTime="
				+ scheduleDateTime + ", customerDistrict=" + customerDistrict + ", customerState=" + customerState
				+ ", gettingLeadByProperty=" + gettingLeadByProperty + ", remarks=" + remarks + ", leadProviderId="
				+ leadProviderId + "]";
	}


	
	

}
