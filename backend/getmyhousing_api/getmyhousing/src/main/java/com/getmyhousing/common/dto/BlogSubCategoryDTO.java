package com.getmyhousing.common.dto;

import java.util.List;

public class BlogSubCategoryDTO {
	
	private Long id;
	private Long categoryId;
	private String subCategory;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;

	private List<Long> categoryIdList;
	private List<Long> idList;
	public Long getId() {
		return id;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public String getSubCategory() {
		return subCategory;
	}
	public String getStatus() {
		return status;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public Long getCreatedBy() {
		return createdBy;
	}
	public String getUpdatedDate() {
		return updatedDate;
	}
	public Long getUpdatedBy() {
		return updatedBy;
	}
	public List<Long> getCategoryIdList() {
		return categoryIdList;
	}
	public List<Long> getIdList() {
		return idList;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}
	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}
	public void setUpdatedBy(Long updatedBy) {
		this.updatedBy = updatedBy;
	}
	public void setCategoryIdList(List<Long> categoryIdList) {
		this.categoryIdList = categoryIdList;
	}
	public void setIdList(List<Long> idList) {
		this.idList = idList;
	}
	
	

}
