package com.getmyhousing.common.dto;

import java.util.List;

import com.getmyhousing.common.domain.BlogSubCategory;

public class BlogCategoryDTO {
	
	private Long id;
	private String category;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;

	private List<BlogSubCategory> subCategories;
	private List<Long> idList;
	public Long getId() {
		return id;
	}
	public String getCategory() {
		return category;
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
	public List<BlogSubCategory> getSubCategories() {
		return subCategories;
	}
	public List<Long> getIdList() {
		return idList;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setCategory(String category) {
		this.category = category;
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
	public void setSubCategories(List<BlogSubCategory> subCategories) {
		this.subCategories = subCategories;
	}
	public void setIdList(List<Long> idList) {
		this.idList = idList;
	}

}
