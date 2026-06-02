package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "pg_details")
public class PgDetails extends AbstractEntity {

	private static final long serialVersionUID = 4548818272266898521L;

	@Column(name = "property_id")
	private long propertyId;

	@Column(name = "total_beds")
	private Integer totalBeds;

	@Column(name = "pg_for")
	private String pgFor;

	@Column(name = "best_suited_for")
	private String bestSuitedFor;

	@Column(name = "meals_available")
	private String mealsAvailable;

	@Column(name = "notice_period")
	private Integer noticePeriod;

	@Column(name = "lock_in_period")
	private Integer lockInPeriod;

	@Column(name = "common_areas")
	private String commonAreas;

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

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(long propertyId) {
		this.propertyId = propertyId;
	}

	public Integer getTotalBeds() {
		return totalBeds;
	}

	public void setTotalBeds(Integer totalBeds) {
		this.totalBeds = totalBeds;
	}

	public String getPgFor() {
		return pgFor;
	}

	public void setPgFor(String pgFor) {
		this.pgFor = pgFor;
	}

	public String getBestSuitedFor() {
		return bestSuitedFor;
	}

	public void setBestSuitedFor(String bestSuitedFor) {
		this.bestSuitedFor = bestSuitedFor;
	}

	public String getMealsAvailable() {
		return mealsAvailable;
	}

	public void setMealsAvailable(String mealsAvailable) {
		this.mealsAvailable = mealsAvailable;
	}

	public Integer getNoticePeriod() {
		return noticePeriod;
	}

	public void setNoticePeriod(Integer noticePeriod) {
		this.noticePeriod = noticePeriod;
	}

	public Integer getLockInPeriod() {
		return lockInPeriod;
	}

	public void setLockInPeriod(Integer lockInPeriod) {
		this.lockInPeriod = lockInPeriod;
	}

	public String getCommonAreas() {
		return commonAreas;
	}

	public void setCommonAreas(String commonAreas) {
		this.commonAreas = commonAreas;
	}

}
