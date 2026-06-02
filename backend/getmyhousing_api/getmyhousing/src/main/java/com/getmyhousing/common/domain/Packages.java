package com.getmyhousing.common.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "packages")
public class Packages extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "package_name")
	private String packageName;

	@Column(name = "package_for")
	private String packageFor;

	@Column(name = "listing_type")
	private String listingType;

	@Column(name = "duration_in_days")
	private Integer durationInDays;

	@Column(name = "no_of_listings")
	private Integer noOfListings;

	@Column(name = "country")
	private String country;

	@Column(name = "state")
	private String state;

	@Column(name = "district")
	private String district;

	@Column(name = "description")
	private String description;

	@Column(name = "mrp")
	private BigDecimal mrp;

	@Column(name = "discount")
	private BigDecimal discount;

	@Column(name = "selling_price")
	private BigDecimal sellingPrice;

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

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getPackageFor() {
		return packageFor;
	}

	public void setPackageFor(String packageFor) {
		this.packageFor = packageFor;
	}

	public String getListingType() {
		return listingType;
	}

	public void setListingType(String listingType) {
		this.listingType = listingType;
	}

	public Integer getDurationInDays() {
		return durationInDays;
	}

	public void setDurationInDays(Integer durationInDays) {
		this.durationInDays = durationInDays;
	}

	public Integer getNoOfListings() {
		return noOfListings;
	}

	public void setNoOfListings(Integer noOfListings) {
		this.noOfListings = noOfListings;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getMrp() {
		return mrp;
	}

	public void setMrp(BigDecimal mrp) {
		this.mrp = mrp;
	}

	public BigDecimal getDiscount() {
		return discount;
	}

	public void setDiscount(BigDecimal discount) {
		this.discount = discount;
	}

	public BigDecimal getSellingPrice() {
		return sellingPrice;
	}

	public void setSellingPrice(BigDecimal sellingPrice) {
		this.sellingPrice = sellingPrice;
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
		return "Packages [id=" + id + ", packageName=" + packageName + ", packageFor=" + packageFor + ", listingType="
				+ listingType + ", durationInDays=" + durationInDays + ", noOfListings=" + noOfListings + ", country="
				+ country + ", state=" + state + ", district=" + district + ", description=" + description + ", mrp="
				+ mrp + ", discount=" + discount + ", sellingPrice=" + sellingPrice + ", status=" + status
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + "]";
	}

	

	
	
}
