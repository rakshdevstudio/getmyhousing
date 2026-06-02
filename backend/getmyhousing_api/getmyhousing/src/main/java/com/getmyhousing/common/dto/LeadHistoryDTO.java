package com.getmyhousing.common.dto;

public class LeadHistoryDTO {

	private Long id;
	private Long leadId;
	private Long assignedTo;
	private Long assignedBy;
	private String assignedDate;
	private String callDate;
	private Long callBy;
	private String callResponse;
	private String callNotes;
	private String statusChangeFrom;
	private String statusChangeTo;
	private String nextFollowupDate;
	private String status;
	private Long createdBy;
	private Long updatedBy;
	private String createdDate;
	private String updatedDate;

	private String createdByName;
	private String assignToName;
	private String assignedByName;
	
	private String remarks;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLeadId() {
		return leadId;
	}

	public void setLeadId(Long leadId) {
		this.leadId = leadId;
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

	public Long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}

	public Long getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Long updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getCreatedByName() {
		return createdByName;
	}

	public void setCreatedByName(String createdByName) {
		this.createdByName = createdByName;
	}

	public String getAssignToName() {
		return assignToName;
	}

	public void setAssignToName(String assignToName) {
		this.assignToName = assignToName;
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

	@Override
	public String toString() {
		return "LeadHistoryDTO [id=" + id + ", leadId=" + leadId + ", assignedTo=" + assignedTo + ", assignedBy="
				+ assignedBy + ", assignedDate=" + assignedDate + ", callDate=" + callDate + ", callBy=" + callBy
				+ ", callResponse=" + callResponse + ", callNotes=" + callNotes + ", statusChangeFrom="
				+ statusChangeFrom + ", statusChangeTo=" + statusChangeTo + ", nextFollowupDate=" + nextFollowupDate
				+ ", status=" + status + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createdDate="
				+ createdDate + ", updatedDate=" + updatedDate + ", createdByName=" + createdByName + ", assignToName="
				+ assignToName + ", assignedByName=" + assignedByName + ", remarks=" + remarks + "]";
	}

	
	
	
	
	
	
	
	
	

}
