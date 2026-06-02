package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "furnishing_status")
public class FurnishingStatus extends AbstractEntity {

	private static final long serialVersionUID = 4548818272266898521L;

	@Column(name = "property_id")
	private long propertyId;

	@Column(name = "furnishing_type")
	private String furnishingType;

	@Column(name = "wardrobe_available")
	private String wardrobeAvailable;

	@Column(name = "wardrobe_count")
	private Integer wardrobeCount;

	@Column(name = "air_condition_available")
	private String airConditionAvailable;

	@Column(name = "air_condition_count")
	private Integer airConditionCount;

	@Column(name = "beds_available")
	private String bedsAvailable;

	@Column(name = "beds_count")
	private Integer bedsCount;

	@Column(name = "led_lights_available")
	private String ledLightsAvailable;

	@Column(name = "led_lights_count")
	private Integer ledLightsCount;

	@Column(name = "sofa_available")
	private String sofaAvailable;

	@Column(name = "sofa_type")
	private String sofaType;

	@Column(name = "sofa_count")
	private Integer sofaCount;

	@Column(name = "refrigerator_available")
	private String refrigeratorAvailable;

	@Column(name = "refrigerator_count")
	private Integer refrigeratorCount;

	@Column(name = "gas_connection_available")
	private String gasConnectionAvailable;

	@Column(name = "gas_connection_count")
	private Integer gasConnectionCount;

	@Column(name = "washing_machine_available")
	private String washingMachineAvailable;

	@Column(name = "washing_machine_count")
	private Integer washingMachineCount;

	@Column(name = "tv_available")
	private String tvAvailable;

	@Column(name = "tv_count")
	private Integer tvCount;

	@Column(name = "office_tables")
	private String officeTables;

	@Column(name = "office_tables_count")
	private Integer officeTablesCount;

	@Column(name = "water_purifier")
	private String waterPurifier;

	@Column(name = "water_purifier_count")
	private Integer waterPurifierCount;

	@Column(name = "fan")
	private String fan;

	@Column(name = "fan_count")
	private Integer fanCount;

	@Column(name = "exhaust")
	private String exhaustFan;

	@Column(name = "exhaust_count")
	private Integer exhaustFanCount;

	@Column(name = "stove")
	private String stove;

	@Column(name = "stove_count")
	private Integer stoveCount;

	@Column(name = "curtains")
	private String curtains;

	@Column(name = "curtains_count")
	private Integer curtainsCount;

	@Column(name = "chimney")
	private String chimney;

	@Column(name = "chimney_count")
	private Integer chimneyCount;

	@Column(name = "microwave")
	private String microWave;

	@Column(name = "microwave_count")
	private Integer microWaveCount;

	@Column(name = "chairs")
	private String chairs;

	@Column(name = "chairs_count")
	private Integer chairsCount;

	@Column(name = "meeting_rooms")
	private String meetingRooms;

	@Column(name = "meeting_rooms_count")
	private Integer meetingRoomsCount;

	@Column(name = "conference_rooms")
	private String confernceRooms; 

	@Column(name = "conference_rooms_count")
	private Integer confernceRoomsCount;

	@Column(name = "medical_kits")
	private String mediclKits; 

	@Column(name = "medical_kits_count")
	private Integer mediclKitsCount;

	@Column(name = "recreational_facility")
	private String recreational;     

	@Column(name = "recreational_facility_count")
	private Integer recreationalCount;

	@Column(name = "printing_machines")
	private String printingMachines;

	@Column(name = "printing_machines_count")
	private Integer printingMachinesCount;

	@Column(name = "coffee_machines")
	private String coffeeMachines;

	@Column(name = "coffee_machines_count")
	private Integer coffeeMachinesCount;

	@Column(name = "smart_board")
	private String smartBoard;

	@Column(name = "smart_board_count")
	private Integer smartBoardCount;

	@Column(name = "projectors")
	private String projectors;

	@Column(name = "projectors_count")
	private Integer projectorsCount;

	@Column(name = "dining_tables")
	private String diningTables;

	@Column(name = "dining_tables_count")
	private Integer diningTablesCount;

	@Column(name = "modular_kitchen")
	private String modularKitchen;

	@Column(name = "modular_kitchen_count")
	private Integer modularKitchenCount;

	@Column(name = "work_station_type")
	private String workStationType;

	@Column(name = "seat_type")
	private String seatType;

	@Column(name = "no_of_seats_available")
	private String noOfSeatsAvailable;

	@Column(name = "managed_type")
	private String managedType;

	@Column(name = "office_space_type")
	private String officeSpaceType;

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
	
	
	@Column(name = "wifi_available")
	private String wifiAvailable;

	@Column(name = "wifi_count")
	private Integer wifiCount;
	
	@Column(name = "geyser_count")
	private Integer geyserCount;
	
	@Column(name = "geyser_available")
	private String geyserAvailable;

	@Column(name = "tables_available")
	private String tables;

	@Column(name = "tables_count")
	private Integer tablesCount;
	
	@Column(name = "cubical_workstations_available")
	private String cubical;

	@Column(name = "cubical_workstations_count")
	private Integer cubicalCount;
	
	@Column(name = "linear_workstations_available")
	private String linear;

	@Column(name = "linear_workstations_count")
	private Integer linearCount;


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

	public long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(long propertyId) {
		this.propertyId = propertyId;
	}

	public String getFurnishingType() {
		return furnishingType;
	}

	public void setFurnishingType(String furnishingType) {
		this.furnishingType = furnishingType;
	}

	public String getWardrobeAvailable() {
		return wardrobeAvailable;
	}

	public void setWardrobeAvailable(String wardrobeAvailable) {
		this.wardrobeAvailable = wardrobeAvailable;
	}

	public Integer getWardrobeCount() {
		return wardrobeCount;
	}

	public void setWardrobeCount(Integer wardrobeCount) {
		this.wardrobeCount = wardrobeCount;
	}

	public String getAirConditionAvailable() {
		return airConditionAvailable;
	}

	public void setAirConditionAvailable(String airConditionAvailable) {
		this.airConditionAvailable = airConditionAvailable;
	}

	public Integer getAirConditionCount() {
		return airConditionCount;
	}

	public void setAirConditionCount(Integer airConditionCount) {
		this.airConditionCount = airConditionCount;
	}

	public String getBedsAvailable() {
		return bedsAvailable;
	}

	public void setBedsAvailable(String bedsAvailable) {
		this.bedsAvailable = bedsAvailable;
	}

	public Integer getBedsCount() {
		return bedsCount;
	}

	public void setBedsCount(Integer bedsCount) {
		this.bedsCount = bedsCount;
	}

	public String getLedLightsAvailable() {
		return ledLightsAvailable;
	}

	public void setLedLightsAvailable(String ledLightsAvailable) {
		this.ledLightsAvailable = ledLightsAvailable;
	}

	public Integer getLedLightsCount() {
		return ledLightsCount;
	}

	public void setLedLightsCount(Integer ledLightsCount) {
		this.ledLightsCount = ledLightsCount;
	}

	public String getSofaAvailable() {
		return sofaAvailable;
	}

	public void setSofaAvailable(String sofaAvailable) {
		this.sofaAvailable = sofaAvailable;
	}

	public String getSofaType() {
		return sofaType;
	}

	public void setSofaType(String sofaType) {
		this.sofaType = sofaType;
	}

	public Integer getSofaCount() {
		return sofaCount;
	}

	public void setSofaCount(Integer sofaCount) {
		this.sofaCount = sofaCount;
	}

	public String getRefrigeratorAvailable() {
		return refrigeratorAvailable;
	}

	public void setRefrigeratorAvailable(String refrigeratorAvailable) {
		this.refrigeratorAvailable = refrigeratorAvailable;
	}

	public Integer getRefrigeratorCount() {
		return refrigeratorCount;
	}

	public void setRefrigeratorCount(Integer refrigeratorCount) {
		this.refrigeratorCount = refrigeratorCount;
	}

	public String getGasConnectionAvailable() {
		return gasConnectionAvailable;
	}

	public void setGasConnectionAvailable(String gasConnectionAvailable) {
		this.gasConnectionAvailable = gasConnectionAvailable;
	}

	public Integer getGasConnectionCount() {
		return gasConnectionCount;
	}

	public void setGasConnectionCount(Integer gasConnectionCount) {
		this.gasConnectionCount = gasConnectionCount;
	}

	public String getWashingMachineAvailable() {
		return washingMachineAvailable;
	}

	public void setWashingMachineAvailable(String washingMachineAvailable) {
		this.washingMachineAvailable = washingMachineAvailable;
	}

	public Integer getWashingMachineCount() {
		return washingMachineCount;
	}

	public void setWashingMachineCount(Integer washingMachineCount) {
		this.washingMachineCount = washingMachineCount;
	}

	public String getTvAvailable() {
		return tvAvailable;
	}

	public void setTvAvailable(String tvAvailable) {
		this.tvAvailable = tvAvailable;
	}

	public Integer getTvCount() {
		return tvCount;
	}

	public void setTvCount(Integer tvCount) {
		this.tvCount = tvCount;
	}

	public String getOfficeTables() {
		return officeTables;
	}

	public void setOfficeTables(String officeTables) {
		this.officeTables = officeTables;
	}

	public Integer getOfficeTablesCount() {
		return officeTablesCount;
	}

	public void setOfficeTablesCount(Integer officeTablesCount) {
		this.officeTablesCount = officeTablesCount;
	}

	public String getWaterPurifier() {
		return waterPurifier;
	}

	public void setWaterPurifier(String waterPurifier) {
		this.waterPurifier = waterPurifier;
	}

	public Integer getWaterPurifierCount() {
		return waterPurifierCount;
	}

	public void setWaterPurifierCount(Integer waterPurifierCount) {
		this.waterPurifierCount = waterPurifierCount;
	}

	public String getFan() {
		return fan;
	}

	public void setFan(String fan) {
		this.fan = fan;
	}

	public Integer getFanCount() {
		return fanCount;
	}

	public void setFanCount(Integer fanCount) {
		this.fanCount = fanCount;
	}

	public String getExhaustFan() {
		return exhaustFan;
	}

	public void setExhaustFan(String exhaustFan) {
		this.exhaustFan = exhaustFan;
	}

	public Integer getExhaustFanCount() {
		return exhaustFanCount;
	}

	public void setExhaustFanCount(Integer exhaustFanCount) {
		this.exhaustFanCount = exhaustFanCount;
	}

	public String getStove() {
		return stove;
	}

	public void setStove(String stove) {
		this.stove = stove;
	}

	public Integer getStoveCount() {
		return stoveCount;
	}

	public void setStoveCount(Integer stoveCount) {
		this.stoveCount = stoveCount;
	}

	public String getCurtains() {
		return curtains;
	}

	public void setCurtains(String curtains) {
		this.curtains = curtains;
	}

	public Integer getCurtainsCount() {
		return curtainsCount;
	}

	public void setCurtainsCount(Integer curtainsCount) {
		this.curtainsCount = curtainsCount;
	}

	public String getChimney() {
		return chimney;
	}

	public void setChimney(String chimney) {
		this.chimney = chimney;
	}

	public Integer getChimneyCount() {
		return chimneyCount;
	}

	public void setChimneyCount(Integer chimneyCount) {
		this.chimneyCount = chimneyCount;
	}

	public String getMicroWave() {
		return microWave;
	}

	public void setMicroWave(String microWave) {
		this.microWave = microWave;
	}

	public Integer getMicroWaveCount() {
		return microWaveCount;
	}

	public void setMicroWaveCount(Integer microWaveCount) {
		this.microWaveCount = microWaveCount;
	}

	public String getChairs() {
		return chairs;
	}

	public void setChairs(String chairs) {
		this.chairs = chairs;
	}

	public Integer getChairsCount() {
		return chairsCount;
	}

	public void setChairsCount(Integer chairsCount) {
		this.chairsCount = chairsCount;
	}

	public String getMeetingRooms() {
		return meetingRooms;
	}

	public void setMeetingRooms(String meetingRooms) {
		this.meetingRooms = meetingRooms;
	}

	public Integer getMeetingRoomsCount() {
		return meetingRoomsCount;
	}

	public void setMeetingRoomsCount(Integer meetingRoomsCount) {
		this.meetingRoomsCount = meetingRoomsCount;
	}

	public String getConfernceRooms() {
		return confernceRooms;
	}

	public void setConfernceRooms(String confernceRooms) {
		this.confernceRooms = confernceRooms;
	}

	public Integer getConfernceRoomsCount() {
		return confernceRoomsCount;
	}

	public void setConfernceRoomsCount(Integer confernceRoomsCount) {
		this.confernceRoomsCount = confernceRoomsCount;
	}

	public String getMediclKits() {
		return mediclKits;
	}

	public void setMediclKits(String mediclKits) {
		this.mediclKits = mediclKits;
	}

	public Integer getMediclKitsCount() {
		return mediclKitsCount; 
	}

	public void setMediclKitsCount(Integer mediclKitsCount) {
		this.mediclKitsCount = mediclKitsCount;
	}

	public String getRecreational() {
		return recreational;
	}

	public void setRecreational(String recreational) {
		this.recreational = recreational;
	}

	public Integer getRecreationalCount() {
		return recreationalCount;
	}

	public void setRecreationalCount(Integer recreationalCount) {
		this.recreationalCount = recreationalCount;
	}

	public String getPrintingMachines() {
		return printingMachines;
	}

	public void setPrintingMachines(String printingMachines) {
		this.printingMachines = printingMachines;
	}

	public Integer getPrintingMachinesCount() {
		return printingMachinesCount;
	}

	public void setPrintingMachinesCount(Integer printingMachinesCount) {
		this.printingMachinesCount = printingMachinesCount;
	}

	public String getCoffeeMachines() {
		return coffeeMachines;
	}

	public void setCoffeeMachines(String coffeeMachines) {
		this.coffeeMachines = coffeeMachines;
	}

	public Integer getCoffeeMachinesCount() {
		return coffeeMachinesCount;
	}

	public void setCoffeeMachinesCount(Integer coffeeMachinesCount) {
		this.coffeeMachinesCount = coffeeMachinesCount;
	}

	public String getSmartBoard() {
		return smartBoard;
	}

	public void setSmartBoard(String smartBoard) {
		this.smartBoard = smartBoard;
	}

	public Integer getSmartBoardCount() {
		return smartBoardCount;
	}

	public void setSmartBoardCount(Integer smartBoardCount) {
		this.smartBoardCount = smartBoardCount;
	}

	public String getProjectors() {
		return projectors;
	}

	public void setProjectors(String projectors) {
		this.projectors = projectors;
	}

	public Integer getProjectorsCount() {
		return projectorsCount;
	}

	public void setProjectorsCount(Integer projectorsCount) {
		this.projectorsCount = projectorsCount;
	}

	public String getDiningTables() {
		return diningTables;
	}

	public void setDiningTables(String diningTables) {
		this.diningTables = diningTables;
	}

	public Integer getDiningTablesCount() {
		return diningTablesCount;
	}

	public void setDiningTablesCount(Integer diningTablesCount) {
		this.diningTablesCount = diningTablesCount;
	}

	public String getModularKitchen() {
		return modularKitchen;
	}

	public void setModularKitchen(String modularKitchen) {
		this.modularKitchen = modularKitchen;
	}

	public Integer getModularKitchenCount() {
		return modularKitchenCount;
	}

	public void setModularKitchenCount(Integer modularKitchenCount) {
		this.modularKitchenCount = modularKitchenCount;
	}

	public String getWorkStationType() {
		return workStationType;
	}

	public void setWorkStationType(String workStationType) {
		this.workStationType = workStationType;
	}

	public String getSeatType() {
		return seatType;
	}

	public void setSeatType(String seatType) {
		this.seatType = seatType;
	}

	public String getManagedType() {
		return managedType;
	}

	public void setManagedType(String managedType) {
		this.managedType = managedType;
	}

	public String getOfficeSpaceType() {
		return officeSpaceType;
	}

	public void setOfficeSpaceType(String officeSpaceType) {
		this.officeSpaceType = officeSpaceType;
	}

	public String getNoOfSeatsAvailable() {
		return noOfSeatsAvailable;
	}

	public void setNoOfSeatsAvailable(String noOfSeatsAvailable) {
		this.noOfSeatsAvailable = noOfSeatsAvailable;
	}
	
	public String getWifiAvailable() {
		return wifiAvailable;
	}

	public void setWifiAvailable(String wifiAvailable) {
		this.wifiAvailable = wifiAvailable;
	}

	public Integer getWifiCount() {
		return wifiCount;
	}

	public void setWifiCount(Integer wifiCount) {
		this.wifiCount = wifiCount;
	}

	public String getGeyserAvailable() {
		return geyserAvailable;
	}

	public void setGeyserAvailable(String geyserAvailable) {
		this.geyserAvailable = geyserAvailable;
	}

	public Integer getGeyserCount() {
		return geyserCount;
	}

	public void setGeyserCount(Integer geyserCount) {
		this.geyserCount = geyserCount;
	}

	public String getTables() {
		return tables;
	}

	public void setTables(String tables) {
		this.tables = tables;
	}

	public Integer getTablesCount() {
		return tablesCount;
	}

	public void setTablesCount(Integer tablesCount) {
		this.tablesCount = tablesCount;
	}

	public String getCubical() {
		return cubical;
	}

	public void setCubical(String cubical) {
		this.cubical = cubical;
	}

	public Integer getCubicalCount() {
		return cubicalCount;
	}

	public void setCubicalCount(Integer cubicalCount) {
		this.cubicalCount = cubicalCount;
	}

	public String getLinear() {
		return linear;
	}

	public void setLinear(String linear) {
		this.linear = linear;
	}

	public Integer getLinearCount() {
		return linearCount;
	}

	public void setLinearCount(Integer linearCount) {
		this.linearCount = linearCount;
	}

}
