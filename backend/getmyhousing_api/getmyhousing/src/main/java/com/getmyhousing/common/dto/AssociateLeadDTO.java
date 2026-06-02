package com.getmyhousing.common.dto;

import java.util.List;

import javax.persistence.Column;

public class AssociateLeadDTO {
	
	private Long id;
	private String imagePath;
	private String customerName;
	private String mobileNumber;
	private String email;
	private String location;
	private String pincode;
	private String landmark;
	private String typeOfLead;
	private String bestTimeToCall;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private Long assignedTo;
	private Long userId;
	private List<Long> associateLeads;
	
	private Long assignedBy;
	private String assignedDate;
	private String statusChangeFrom;
	private String statusChangeTo;
	
	private String callDate;
	private Long callBy;
	private String callResponse;
	private String callNotes;
	private String followupDate;
	private String assignedToName;
	private String assignedToDate;
	private Long associateLeadId;
	private String assignedByName;
	private String remarks;
	private Long associateLeadProviderId;


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
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
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getLandmark() {
		return landmark;
	}
	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}
	public String getTypeOfLead() {
		return typeOfLead;
	}
	public void setTypeOfLead(String typeOfLead) {
		this.typeOfLead = typeOfLead;
	}
	public String getBestTimeToCall() {
		return bestTimeToCall;
	}
	public void setBestTimeToCall(String bestTimeToCall) {
		this.bestTimeToCall = bestTimeToCall;
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
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public List<Long> getAssociateLeads() {
		return associateLeads;
	}
	public void setAssociateLeads(List<Long> associateLeads) {
		this.associateLeads = associateLeads;
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

	

	public String getFollowupDate() {
		return followupDate;
	}

	public void setFollowupDate(String followupDate) {
		this.followupDate = followupDate;
	}
	public String getAssignedToName() {
		return assignedToName;
	}
	public void setAssignedToName(String assignedToName) {
		this.assignedToName = assignedToName;
	}
	public String getAssignedToDate() {
		return assignedToDate;
	}
	public void setAssignedToDate(String assignedToDate) {
		this.assignedToDate = assignedToDate;
	}

	public Long getAssociateLeadId() {
		return associateLeadId;
	}

	public void setAssociateLeadId(Long associateLeadId) {
		this.associateLeadId = associateLeadId;
	}

	public String getAssignedByName() {
		return assignedByName;
	}

	public void setAssignedByName(String assignedByName) {
		this.assignedByName = assignedByName;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Long getAssociateLeadProviderId() {
		return associateLeadProviderId;
	}
	public void setAssociateLeadProviderId(Long associateLeadProviderId) {
		this.associateLeadProviderId = associateLeadProviderId;
	}
	
	public String getPincode() {
		return pincode;
	}
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
	
	@Override
	public String toString() {
		return "AssociateLeadDTO [id=" + id + ", imagePath=" + imagePath + ", customerName=" + customerName
				+ ", mobileNumber=" + mobileNumber + ", email=" + email + ", location=" + location + ", pincode="
				+ pincode + ", landmark=" + landmark + ", typeOfLead=" + typeOfLead + ", bestTimeToCall="
				+ bestTimeToCall + ", status=" + status + ", createdDate=" + createdDate + ", createdBy=" + createdBy
				+ ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", assignedTo=" + assignedTo
				+ ", userId=" + userId + ", associateLeads=" + associateLeads + ", assignedBy=" + assignedBy
				+ ", assignedDate=" + assignedDate + ", statusChangeFrom=" + statusChangeFrom + ", statusChangeTo="
				+ statusChangeTo + ", callDate=" + callDate + ", callBy=" + callBy + ", callResponse=" + callResponse
				+ ", callNotes=" + callNotes + ", followupDate=" + followupDate + ", assignedToName=" + assignedToName
				+ ", assignedToDate=" + assignedToDate + ", associateLeadId=" + associateLeadId + ", assignedByName="
				+ assignedByName + ", remarks=" + remarks + ", associateLeadProviderId=" + associateLeadProviderId
				+ "]";
	}

}
