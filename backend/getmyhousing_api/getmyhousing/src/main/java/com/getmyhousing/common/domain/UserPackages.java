package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_packages")
public class UserPackages {
//	public class UserPackages extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@Column(name = "user_id")
	private Long userId;

	@Column(name = "package_id")
	private Long packageId;

	@Column(name = "package_active_date")
	private String packageActiveDate;

	@Column(name = "package_expiry_date")
	private String packageExpiryDate;

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

	@Override
	public String toString() {
		return "UserPackages [id=" + id + ", userId=" + userId + ", packageId=" + packageId + ", packageActiveDate="
				+ packageActiveDate + ", packageExpiryDate=" + packageExpiryDate + ", status=" + status
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + "]";
	}

	
	
	
	
	
	
	
}
