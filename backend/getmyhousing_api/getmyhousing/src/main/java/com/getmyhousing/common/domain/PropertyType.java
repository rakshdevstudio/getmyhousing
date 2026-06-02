package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "property_types")
public class PropertyType extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_type")
	private String propertyType;

	@Column(name = "property_sub_type")
	private String propertySubType;

	@Column(name = "property_sub_type_icon_path")
	private String propertySubTypeIconPath;

	@Column(name = "property_rank_order")
	private Integer propertyRankOrder;

	@Column(name = "property_type_icon_path")
	private String propertyTypeIconPath;

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

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}

	public String getPropertySubType() {
		return propertySubType;
	}

	public void setPropertySubType(String propertySubType) {
		this.propertySubType = propertySubType;
	}

	public Integer getPropertyRankOrder() {
		return propertyRankOrder;
	}

	public void setPropertyRankOrder(Integer propertyRankOrder) {
		this.propertyRankOrder = propertyRankOrder;
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

	public String getPropertySubTypeIconPath() {
		return propertySubTypeIconPath;
	}

	public void setPropertySubTypeIconPath(String propertySubTypeIconPath) {
		this.propertySubTypeIconPath = propertySubTypeIconPath;
	}

	public String getPropertyTypeIconPath() {
		return propertyTypeIconPath;
	}

	public void setPropertyTypeIconPath(String propertyTypeIconPath) {
		this.propertyTypeIconPath = propertyTypeIconPath;
	}

}