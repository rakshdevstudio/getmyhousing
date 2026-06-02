package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "property_area_details")
public class PropertyAreaDetails extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "builtup_plot_area")
	private String builtupPlotArea;

	@Column(name = "carpet_area")
	private String carpetArea;

	@Column(name = "super_builtup_area")
	private String superBuiltupArea;

	@Column(name = "area_unit")
	private String areaUnit;

	@Column(name = "private_pool_availability")
	private String privatePoolAvailability;

	@Column(name = "private_garden_availability")
	private String privateGardenAvailability;

	@Column(name = "private_garden_area")
	private String privateGardenArea;

	@Column(name = "no_of_bedrooms")
	private String noOfBedrooms;

	@Column(name = "no_of_bathrooms")
	private String noOfBathrooms;

	@Column(name = "no_of_balconies")
	private String noOfBalconies;

	@Column(name = "additional_rooms")
	private String additionalRooms;

	@Column(name = "floor_no")
	private String floorNo;

	@Column(name = "tower_block_no")
	private Integer towerBlockNo;

	@Column(name = "flat_no")
	private Integer flatNo;

	@Column(name = "property_level")
	private String propertyLevel;

	@Column(name = "corner_flat")
	private String cornerFlat;

	@Column(name = "terrace_area_flag")
	private String terraceAreaFlag;

	@Column(name = "terrace_area")
	private String terraceArea;

	@Column(name = "terrace_area_unit")
	private String terraceAreaUnit;

	@Column(name = "total_floors")
	private String totalFloors;

	@Column(name = "open_sides")
	private String openSides;

	@Column(name = "facing")
	private String facing;

	@Column(name = "occupancy_type")
	private String occupancyType;

	@Column(name = "occupancy_certificate")
	private String occupancyCertificate;

	@Column(name = "private_washroom")
	private String privateWashroom;

	@Column(name = "private_washroom_count")
	private String privateWashroomCount;

	@Column(name = "public_washroom")
	private String publicWashroom;

	@Column(name = "public_washroom_count")
	private String publicWashroomCount;

	@Column(name = "garden_area")
	private String gardenArea;

	@Column(name = "pantry")
	private String pantry;

	@Column(name = "building_status")
	private String buildingStatus;

	@Column(name = "space_type")
	private String spaceType;

	@Column(name = "breadth_feet")
	private String breadthFeet;

	@Column(name = "length_feet")
	private String lengthFeet;

	@Column(name = "no_of_floors_allowed")
	private String noOfFloorsAllowed;

	@Column(name = "compound_wall_made")
	private String compoundWallMade;

	@Column(name = "keep_it_private")
	private String keepItPrivate;

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
 
	@Column(name = "saleble_area")
	private String salableArea; 
	
	@Column(name = "plot_area")
	private String plotArea; 
	 
	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getBuiltupPlotArea() {
		return builtupPlotArea;
	}

	public void setBuiltupPlotArea(String builtupPlotArea) {
		this.builtupPlotArea = builtupPlotArea;
	}

	public String getCarpetArea() {
		return carpetArea;
	}

	public void setCarpetArea(String carpetArea) {
		this.carpetArea = carpetArea;
	}

	public String getSuperBuiltupArea() {
		return superBuiltupArea;
	}

	public void setSuperBuiltupArea(String superBuiltupArea) {
		this.superBuiltupArea = superBuiltupArea;
	}

	public String getAreaUnit() {
		return areaUnit;
	}

	public void setAreaUnit(String areaUnit) {
		this.areaUnit = areaUnit;
	}

	public String getPrivatePoolAvailability() {
		return privatePoolAvailability;
	}

	public void setPrivatePoolAvailability(String privatePoolAvailability) {
		this.privatePoolAvailability = privatePoolAvailability;
	}

	public String getPrivateGardenAvailability() {
		return privateGardenAvailability;
	}

	public void setPrivateGardenAvailability(String privateGardenAvailability) {
		this.privateGardenAvailability = privateGardenAvailability;
	}

	public String getPrivateGardenArea() {
		return privateGardenArea;
	}

	public void setPrivateGardenArea(String privateGardenArea) {
		this.privateGardenArea = privateGardenArea;
	}

	public String getNoOfBedrooms() {
		return noOfBedrooms;
	}

	public void setNoOfBedrooms(String noOfBedrooms) {
		this.noOfBedrooms = noOfBedrooms;
	}

	public String getNoOfBathrooms() {
		return noOfBathrooms;
	}

	public void setNoOfBathrooms(String noOfBathrooms) {
		this.noOfBathrooms = noOfBathrooms;
	}

	public String getNoOfBalconies() {
		return noOfBalconies;
	}

	public void setNoOfBalconies(String noOfBalconies) {
		this.noOfBalconies = noOfBalconies;
	}

	public String getAdditionalRooms() {
		return additionalRooms;
	}

	public void setAdditionalRooms(String additionalRooms) {
		this.additionalRooms = additionalRooms;
	}

	public Integer getTowerBlockNo() {
		return towerBlockNo;
	}

	public void setTowerBlockNo(Integer towerBlockNo) {
		this.towerBlockNo = towerBlockNo;
	}

	public Integer getFlatNo() {
		return flatNo;
	}

	public void setFlatNo(Integer flatNo) {
		this.flatNo = flatNo;
	}

	public String getPropertyLevel() {
		return propertyLevel;
	}

	public void setPropertyLevel(String propertyLevel) {
		this.propertyLevel = propertyLevel;
	}

	public String getCornerFlat() {
		return cornerFlat;
	}

	public void setCornerFlat(String cornerFlat) {
		this.cornerFlat = cornerFlat;
	}

	public String getTerraceAreaFlag() {
		return terraceAreaFlag;
	}

	public void setTerraceAreaFlag(String terraceAreaFlag) {
		this.terraceAreaFlag = terraceAreaFlag;
	}

	public String getTerraceArea() {
		return terraceArea;
	}

	public void setTerraceArea(String terraceArea) {
		this.terraceArea = terraceArea;
	}

	public String getTerraceAreaUnit() {
		return terraceAreaUnit;
	}

	public void setTerraceAreaUnit(String terraceAreaUnit) {
		this.terraceAreaUnit = terraceAreaUnit;
	}

	public String getOpenSides() {
		return openSides;
	}

	public void setOpenSides(String openSides) {
		this.openSides = openSides;
	}

	public String getFacing() {
		return facing;
	}

	public void setFacing(String facing) {
		this.facing = facing;
	}

	public String getOccupancyType() {
		return occupancyType;
	}

	public void setOccupancyType(String occupancyType) {
		this.occupancyType = occupancyType;
	}

	public String getOccupancyCertificate() {
		return occupancyCertificate;
	}

	public void setOccupancyCertificate(String occupancyCertificate) {
		this.occupancyCertificate = occupancyCertificate;
	}

	public String getPrivateWashroom() {
		return privateWashroom;
	}

	public void setPrivateWashroom(String privateWashroom) {
		this.privateWashroom = privateWashroom;
	}

	public String getPrivateWashroomCount() {
		return privateWashroomCount;
	}

	public void setPrivateWashroomCount(String privateWashroomCount) {
		this.privateWashroomCount = privateWashroomCount;
	}

	public String getPublicWashroom() {
		return publicWashroom;
	}

	public void setPublicWashroom(String publicWashroom) {
		this.publicWashroom = publicWashroom;
	}

	public String getPublicWashroomCount() {
		return publicWashroomCount;
	}

	public void setPublicWashroomCount(String publicWashroomCount) {
		this.publicWashroomCount = publicWashroomCount;
	}

	public String getGardenArea() {
		return gardenArea;
	}

	public void setGardenArea(String gardenArea) {
		this.gardenArea = gardenArea;
	}

	public String getPantry() {
		return pantry;
	}

	public void setPantry(String pantry) {
		this.pantry = pantry;
	}

	public String getBuildingStatus() {
		return buildingStatus;
	}

	public void setBuildingStatus(String buildingStatus) {
		this.buildingStatus = buildingStatus;
	}

	public String getSpaceType() {
		return spaceType;
	}

	public void setSpaceType(String spaceType) {
		this.spaceType = spaceType;
	}

	public String getBreadthFeet() {
		return breadthFeet;
	}

	public void setBreadthFeet(String breadthFeet) {
		this.breadthFeet = breadthFeet;
	}

	public String getLengthFeet() {
		return lengthFeet;
	}

	public void setLengthFeet(String lengthFeet) {
		this.lengthFeet = lengthFeet;
	}

	public String getNoOfFloorsAllowed() {
		return noOfFloorsAllowed;
	}

	public void setNoOfFloorsAllowed(String noOfFloorsAllowed) {
		this.noOfFloorsAllowed = noOfFloorsAllowed;
	}

	public String getCompoundWallMade() {
		return compoundWallMade;
	}

	public void setCompoundWallMade(String compoundWallMade) {
		this.compoundWallMade = compoundWallMade;
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

	public String getFloorNo() {
		return floorNo;
	}

	public void setFloorNo(String floorNo) {
		this.floorNo = floorNo;
	}

	public String getTotalFloors() {
		return totalFloors;
	}

	public void setTotalFloors(String totalFloors) {
		this.totalFloors = totalFloors;
	}

	public String getKeepItPrivate() {
		return keepItPrivate;
	}

	public void setKeepItPrivate(String keepItPrivate) {
		this.keepItPrivate = keepItPrivate;
	}

	
	
	public String getSalableArea() {
		return salableArea;
	}

	public void setSalableArea(String salableArea) {
		this.salableArea = salableArea;
	}

	public String getPlotArea() {
		return plotArea;
	}

	public void setPlotArea(String plotArea) {
		this.plotArea = plotArea;
	}

	@Override
	public String toString() {
		return "PropertyAreaDetails [propertyId=" + propertyId + ", builtupPlotArea=" + builtupPlotArea
				+ ", carpetArea=" + carpetArea + ", superBuiltupArea=" + superBuiltupArea + ", areaUnit=" + areaUnit
				+ ", privatePoolAvailability=" + privatePoolAvailability + ", privateGardenAvailability="
				+ privateGardenAvailability + ", privateGardenArea=" + privateGardenArea + ", noOfBedrooms="
				+ noOfBedrooms + ", noOfBathrooms=" + noOfBathrooms + ", noOfBalconies=" + noOfBalconies
				+ ", additionalRooms=" + additionalRooms + ", floorNo=" + floorNo + ", towerBlockNo=" + towerBlockNo
				+ ", flatNo=" + flatNo + ", propertyLevel=" + propertyLevel + ", cornerFlat=" + cornerFlat
				+ ", terraceAreaFlag=" + terraceAreaFlag + ", terraceArea=" + terraceArea + ", terraceAreaUnit="
				+ terraceAreaUnit + ", totalFloors=" + totalFloors + ", openSides=" + openSides + ", facing=" + facing
				+ ", occupancyType=" + occupancyType + ", occupancyCertificate=" + occupancyCertificate
				+ ", privateWashroom=" + privateWashroom + ", privateWashroomCount=" + privateWashroomCount
				+ ", publicWashroom=" + publicWashroom + ", publicWashroomCount=" + publicWashroomCount
				+ ", gardenArea=" + gardenArea + ", pantry=" + pantry + ", buildingStatus=" + buildingStatus
				+ ", spaceType=" + spaceType + ", breadthFeet=" + breadthFeet + ", lengthFeet=" + lengthFeet
				+ ", noOfFloorsAllowed=" + noOfFloorsAllowed + ", compoundWallMade=" + compoundWallMade
				+ ", keepItPrivate=" + keepItPrivate + ", status=" + status + ", createdDate=" + createdDate
				+ ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ ", salableArea=" + salableArea + ", plotArea=" + plotArea + "]";
	}

			
	
	

}
