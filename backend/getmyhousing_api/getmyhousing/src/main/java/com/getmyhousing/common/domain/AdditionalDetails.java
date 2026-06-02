package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "additional_details")
public class AdditionalDetails extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "currently_leased_out")
	private String currentlyLeasedOut;

	@Column(name = "modify_interior")
	private String modifyInterior;

	@Column(name = "brand_new_interior")
	private String brandNewInterior;

	@Column(name = "interested_in_co_working")
	private String interestedInCoWorking;

	@Column(name = "building_grade")
	private String buildingGrade;

	@Column(name = "cafeteria")
	private String cafeteria;

	@Column(name = "tax_govt_charges")
	private String taxGovtCharges;

	@Column(name = "electricity_charges")
	private String electricityCharges;

	@Column(name = "power_in_kv")
	private String powerInKv;

	@Column(name = "lift_available")
	private String liftAvailable;

	@Column(name = "lift_count")
	private String liftCount;

	@Column(name = "flooring_type")
	private String flooringType;

	@Column(name = "flooring_living")
	private String flooringLiving;

	@Column(name = "flooring_kitchen")
	private String flooringKitchen;

	@Column(name = "flooring_bedroom")
	private String flooringBedroom;

	@Column(name = "flooring_master_bedroom")
	private String flooringMasterBedroom;

	@Column(name = "flooring_balcony")
	private String flooringBalcony;

	@Column(name = "flooring_other")
	private String flooringOther;

	@Column(name = "parking_2_wheeler")
	private String parking2Wheeler;

	@Column(name = "parking_2_open_count")
	private Integer parking2OpenCount;

	@Column(name = "parking_2_cover_count")
	private Integer parking2CoverCount;
	

	@Column(name = "parking_4_wheeler")
	private String parking4Wheeler;

	@Column(name = "parking_4_open_count")
	private Integer parking4OpenCount;

	@Column(name = "parking_4_cover_count")
	private Integer parking4CoverCount;
	

	@Column(name = "power_backup")
	private String powerBackup;

	@Column(name = "water_source")
	private String waterSource;

	@Column(name = "over_looking_view")
	private String overLookingView;

	@Column(name = "front_road_width")
	private Long frontRoadWidth;

	@Column(name = "front_road_width_type")
	private String frontRoadWidthType;

	@Column(name = "service_lift_availability")
	private String serviceLiftAvailability;

	@Column(name = "service_lift_availability_count")
	private Integer serviceLiftAvailabilityCount;

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
	
	@Column(name = "flooring_bathroom")
	private String flooringBathroom;

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getCurrentlyLeasedOut() {
		return currentlyLeasedOut;
	}

	public void setCurrentlyLeasedOut(String currentlyLeasedOut) {
		this.currentlyLeasedOut = currentlyLeasedOut;
	}

	public String getModifyInterior() {
		return modifyInterior;
	}

	public void setModifyInterior(String modifyInterior) {
		this.modifyInterior = modifyInterior;
	}

	public String getBrandNewInterior() {
		return brandNewInterior;
	}

	public void setBrandNewInterior(String brandNewInterior) {
		this.brandNewInterior = brandNewInterior;
	}

	public String getInterestedInCoWorking() {
		return interestedInCoWorking;
	}

	public void setInterestedInCoWorking(String interestedInCoWorking) {
		this.interestedInCoWorking = interestedInCoWorking;
	}

	public String getBuildingGrade() {
		return buildingGrade;
	}

	public void setBuildingGrade(String buildingGrade) {
		this.buildingGrade = buildingGrade;
	}

	public String getCafeteria() {
		return cafeteria;
	}

	public void setCafeteria(String cafeteria) {
		this.cafeteria = cafeteria;
	}

	public String getTaxGovtCharges() {
		return taxGovtCharges;
	}

	public void setTaxGovtCharges(String taxGovtCharges) {
		this.taxGovtCharges = taxGovtCharges;
	}

	public String getElectricityCharges() {
		return electricityCharges;
	}

	public void setElectricityCharges(String electricityCharges) {
		this.electricityCharges = electricityCharges;
	}

	public String getPowerInKv() {
		return powerInKv;
	}

	public void setPowerInKv(String powerInKv) {
		this.powerInKv = powerInKv;
	}

	public String getLiftAvailable() {
		return liftAvailable;
	}

	public void setLiftAvailable(String liftAvailable) {
		this.liftAvailable = liftAvailable;
	}

	public String getLiftCount() {
		return liftCount;
	}

	public void setLiftCount(String liftCount) {
		this.liftCount = liftCount;
	}

	public String getFlooringType() {
		return flooringType;
	}

	public void setFlooringType(String flooringType) {
		this.flooringType = flooringType;
	}

	public String getFlooringLiving() {
		return flooringLiving;
	}

	public void setFlooringLiving(String flooringLiving) {
		this.flooringLiving = flooringLiving;
	}

	public String getFlooringKitchen() {
		return flooringKitchen;
	}

	public void setFlooringKitchen(String flooringKitchen) {
		this.flooringKitchen = flooringKitchen;
	}

	public String getFlooringBedroom() {
		return flooringBedroom;
	}

	public void setFlooringBedroom(String flooringBedroom) {
		this.flooringBedroom = flooringBedroom;
	}

	public String getFlooringMasterBedroom() {
		return flooringMasterBedroom;
	}

	public void setFlooringMasterBedroom(String flooringMasterBedroom) {
		this.flooringMasterBedroom = flooringMasterBedroom;
	}

	public String getFlooringBalcony() {
		return flooringBalcony;
	}

	public void setFlooringBalcony(String flooringBalcony) {
		this.flooringBalcony = flooringBalcony;
	}

	public String getFlooringOther() {
		return flooringOther;
	}

	public void setFlooringOther(String flooringOther) {
		this.flooringOther = flooringOther;
	}

	public String getParking2Wheeler() {
		return parking2Wheeler;
	}

	public void setParking2Wheeler(String parking2Wheeler) {
		this.parking2Wheeler = parking2Wheeler;
	}

	public Integer getParking2OpenCount() {
		return parking2OpenCount;
	}

	public void setParking2OpenCount(Integer parking2OpenCount) {
		this.parking2OpenCount = parking2OpenCount;
	}

	public Integer getParking2CoverCount() {
		return parking2CoverCount;
	}

	public void setParking2CoverCount(Integer parking2CoverCount) {
		this.parking2CoverCount = parking2CoverCount;
	}

	public String getParking4Wheeler() {
		return parking4Wheeler;
	}

	public void setParking4Wheeler(String parking4Wheeler) {
		this.parking4Wheeler = parking4Wheeler;
	}

	public Integer getParking4OpenCount() {
		return parking4OpenCount;
	}

	public void setParking4OpenCount(Integer parking4OpenCount) {
		this.parking4OpenCount = parking4OpenCount;
	}

	public Integer getParking4CoverCount() {
		return parking4CoverCount;
	}

	public void setParking4CoverCount(Integer parking4CoverCount) {
		this.parking4CoverCount = parking4CoverCount;
	}

	public String getPowerBackup() {
		return powerBackup;
	}

	public void setPowerBackup(String powerBackup) {
		this.powerBackup = powerBackup;
	}

	public String getWaterSource() {
		return waterSource;
	}

	public void setWaterSource(String waterSource) {
		this.waterSource = waterSource;
	}

	public Long getFrontRoadWidth() {
		return frontRoadWidth;
	}

	public void setFrontRoadWidth(Long frontRoadWidth) {
		this.frontRoadWidth = frontRoadWidth;
	}

	public String getFrontRoadWidthType() {
		return frontRoadWidthType;
	}

	public void setFrontRoadWidthType(String frontRoadWidthType) {
		this.frontRoadWidthType = frontRoadWidthType;
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

	public String getOverLookingView() {
		return overLookingView;
	}

	public void setOverLookingView(String overLookingView) {
		this.overLookingView = overLookingView;
	}

	public String getServiceLiftAvailability() {
		return serviceLiftAvailability;
	}

	public void setServiceLiftAvailability(String serviceLiftAvailability) {
		this.serviceLiftAvailability = serviceLiftAvailability;
	}

	public Integer getServiceLiftAvailabilityCount() {
		return serviceLiftAvailabilityCount;
	}

	public void setServiceLiftAvailabilityCount(Integer serviceLiftAvailabilityCount) {
		this.serviceLiftAvailabilityCount = serviceLiftAvailabilityCount;
	}

	
	
	
	public String getFlooringBathroom() {
		return flooringBathroom;
	}

	public void setFlooringBathroom(String flooringBathroom) {
		this.flooringBathroom = flooringBathroom;
	}

	@Override
	public String toString() {
		return "AdditionalDetails [propertyId=" + propertyId + ", currentlyLeasedOut=" + currentlyLeasedOut
				+ ", modifyInterior=" + modifyInterior + ", brandNewInterior=" + brandNewInterior
				+ ", interestedInCoWorking=" + interestedInCoWorking + ", buildingGrade=" + buildingGrade
				+ ", cafeteria=" + cafeteria + ", taxGovtCharges=" + taxGovtCharges + ", electricityCharges="
				+ electricityCharges + ", powerInKv=" + powerInKv + ", liftAvailable=" + liftAvailable + ", liftCount="
				+ liftCount + ", flooringType=" + flooringType + ", flooringLiving=" + flooringLiving
				+ ", flooringKitchen=" + flooringKitchen + ", flooringBedroom=" + flooringBedroom
				+ ", flooringMasterBedroom=" + flooringMasterBedroom + ", flooringBalcony=" + flooringBalcony
				+ ", flooringOther=" + flooringOther + ", parking2Wheeler=" + parking2Wheeler + ", parking2OpenCount="
				+ parking2OpenCount + ", parking2CoverCount=" + parking2CoverCount + ", parking4Wheeler="
				+ parking4Wheeler + ", parking4OpenCount=" + parking4OpenCount + ", parking4CoverCount="
				+ parking4CoverCount + ", powerBackup=" + powerBackup + ", waterSource=" + waterSource
				+ ", overLookingView=" + overLookingView + ", frontRoadWidth=" + frontRoadWidth
				+ ", frontRoadWidthType=" + frontRoadWidthType + ", serviceLiftAvailability=" + serviceLiftAvailability
				+ ", serviceLiftAvailabilityCount=" + serviceLiftAvailabilityCount + ", status=" + status
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + ", flooringBathroom=" + flooringBathroom + "]";
	}

	
	
	
}
