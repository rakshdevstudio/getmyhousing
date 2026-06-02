package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "blogs")
public class Blog extends AbstractEntity {

	private static final long serialVersionUID = 1947388623557728387L;

	@Column(name = "blog_title")
	private String blogTitle;

	@Column(name = "blog_content")
	private String blogContent;

	@Column(name = "banner_image_url")
	private String bannerImageUrl;

	@Column(name = "category_id")
	private Long categoryId;

	@Column(name = "sub_category_id")
	private Long subCategoryId;

	@Column(name = "slug")
	private String slug;

	@Column(name = "meta_title")
	private String metaTitle;

	@Column(name = "meta_description")
	private String metaDescription;

	@Column(name = "keywords")
	private String keywords;

	@Column(name = "approval_status")
	private String approvalStatus;

	@Column(name = "approval_action_by")
	private Long approvalActionBy;

	@Column(name = "approval_action_on")
	private String approvalActionOn;

	@Column(name = "approval_remarks")
	private String approvalRemarks;

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

	public String getBlogTitle() {
		return blogTitle;
	}

	public String getBlogContent() {
		return blogContent;
	}

	public String getBannerImageUrl() {
		return bannerImageUrl;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public Long getSubCategoryId() {
		return subCategoryId;
	}

	public String getSlug() {
		return slug;
	}

	public String getMetaTitle() {
		return metaTitle;
	}

	public String getMetaDescription() {
		return metaDescription;
	}

	public String getKeywords() {
		return keywords;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public Long getApprovalActionBy() {
		return approvalActionBy;
	}

	public String getApprovalActionOn() {
		return approvalActionOn;
	}

	public String getApprovalRemarks() {
		return approvalRemarks;
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

	public void setBlogTitle(String blogTitle) {
		this.blogTitle = blogTitle;
	}

	public void setBlogContent(String blogContent) {
		this.blogContent = blogContent;
	}

	public void setBannerImageUrl(String bannerImageUrl) {
		this.bannerImageUrl = bannerImageUrl;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public void setSubCategoryId(Long subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public void setMetaTitle(String metaTitle) {
		this.metaTitle = metaTitle;
	}

	public void setMetaDescription(String metaDescription) {
		this.metaDescription = metaDescription;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public void setApprovalActionBy(Long approvalActionBy) {
		this.approvalActionBy = approvalActionBy;
	}

	public void setApprovalActionOn(String approvalActionOn) {
		this.approvalActionOn = approvalActionOn;
	}

	public void setApprovalRemarks(String approvalRemarks) {
		this.approvalRemarks = approvalRemarks;
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
