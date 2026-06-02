package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="associate_lead")
public class AssociateLead extends AbstractEntity {
	
	private static final long serialVersionUID = -8924261433695968011L;
	
	@Column(name="image_path")
	private String imagePath;
	
	@Column(name="customer_name")
	private String customerName;
	
	@Column(name="mobile_number")
	private String mobileNumber;
	
	@Column(name="email")
	private String email;
	
	@Column(name="location")
	private String location;
	
	@Column(name="pincode")
	private String pincode;
	
	@Column(name="landmark")
	private String landmark;
	
	@Column(name="type_of_lead")
	private String typeOfLead;
	
	@Column(name="best_time_to_call")
	private String bestTimeToCall;
	
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
	
	@Column(name = "assigned_to")
	private Long assignedTo;

	
	@Column(name = "assigned_by")
	private Long assignedBy;


	@Column(name = "assigned_date")
	private String assignedDate;
	
	@Column(name = "next_followup_date")
	private String followupDate;
	
	@Column(name = "remarks")
	private String remarks;
	
	@Column(name = "associate_lead_provider_id")
	private Long associateLeadProviderId;
	
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

	
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getFollowupDate() {
		return followupDate;
	}

	public void setFollowupDate(String followupDate) {
		this.followupDate = followupDate;
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
		return "AssociateLead [imagePath=" + imagePath + ", customerName=" + customerName + ", mobileNumber="
				+ mobileNumber + ", email=" + email + ", location=" + location + ", pincode=" + pincode + ", landmark="
				+ landmark + ", typeOfLead=" + typeOfLead + ", bestTimeToCall=" + bestTimeToCall + ", status=" + status
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + ", assignedTo=" + assignedTo + ", assignedBy=" + assignedBy
				+ ", assignedDate=" + assignedDate + ", followupDate=" + followupDate + ", remarks=" + remarks
				+ ", associateLeadProviderId=" + associateLeadProviderId + "]";
	}

}
