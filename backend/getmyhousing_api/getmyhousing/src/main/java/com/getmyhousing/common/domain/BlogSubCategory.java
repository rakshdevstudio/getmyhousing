package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "blog_sub_categories")
public class BlogSubCategory extends AbstractEntity {
	
	private static final long serialVersionUID = 1947388623557728387L;

	@Column(name = "category_id")
	private Long categoryId;

	@Column(name = "sub_category")
	private String subCategory;

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
	
	

}
