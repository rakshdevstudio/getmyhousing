package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "lead_history")
public class LeadHistory extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "lead_id")
	private Long leadId;

	@Column(name = "assigned_to")
	private Long assignedTo;

	@Column(name = "assigned_by")
	private Long assignedBy;

	@Column(name = "assigned_date")
	private String assignedDate;

	@Column(name = "call_date")
	private String callDate;

	@Column(name = "call_by")
	private Long callBy;

	@Column(name = "call_response")
	private String callResponse;

	@Column(name = "call_notes")
	private String callNotes;

	@Column(name = "status_change_from")
	private String statusChangeFrom;

	@Column(name = "status_change_to")
	private String statusChangeTo;

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
	
	@Column(name = "remarks")
	private String remarks;

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

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Override
	public String toString() {
		return "LeadHistory [leadId=" + leadId + ", assignedTo=" + assignedTo + ", assignedBy=" + assignedBy
				+ ", assignedDate=" + assignedDate + ", callDate=" + callDate + ", callBy=" + callBy + ", callResponse="
				+ callResponse + ", callNotes=" + callNotes + ", statusChangeFrom=" + statusChangeFrom
				+ ", statusChangeTo=" + statusChangeTo + ", nextFollowupDate=" + nextFollowupDate + ", status=" + status
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + ", remarks=" + remarks + "]";
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
