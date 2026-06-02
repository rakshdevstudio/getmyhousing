package com.getmyhousing.common.dto;

public class PgDetailsDTO {

	private Long id;
	private Long propertyId;
	private Integer totalBeds;
	private String pgFor;
	private String bestSuitedFor;
	private String mealsAvailable;
	private Integer noticePeriod;
	private Integer lockInPeriod;
	private String commonAreas;

	private int offset;
	private int limit;

	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;

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
