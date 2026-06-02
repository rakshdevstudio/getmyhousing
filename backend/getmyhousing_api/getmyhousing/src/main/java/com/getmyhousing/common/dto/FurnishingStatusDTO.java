package com.getmyhousing.common.dto;

import javax.persistence.Column;
public class FurnishingStatusDTO {

	private Long id;
	private Long propertyId;
	private String furnishingType;
	private String wardrobeAvailable;
	private Integer wardrobeCount;
	private String airConditionAvailable;
	private Integer airConditionCount;
	private String bedsAvailable;
	private Integer bedsCount;
	private String ledLightsAvailable;
	private Integer ledLightsCount;
	private String sofaAvailable;
	private String sofaType;
	private Integer sofaCount;

	private String refrigeratorAvailable;
	private Integer refrigeratorCount;
	private String gasConnectionAvailable;
	private Integer gasConnectionCount;
	private String washingMachineAvailable;
	private Integer washingMachineCount;
	private String tvAvailable;
	private Integer tvCount;
	private String officeTables;
	private Integer officeTablesCount;
	private String waterPurifier;
	private Integer waterPurifierCount;
	private String fan;
	private Integer fanCount;
	private String exhaustFan;
	private Integer exhaustFanCount;
	private String stove;
	private Integer stoveCount;
	private String curtains;
	private Integer curtainsCount;
	private String chimney;
	private Integer chimneyCount; 
	private String microWave;
	private Integer microWaveCount;
	private String chairs; 
	private Integer chairsCount;
	private String meetingRooms;
	private Integer meetingRoomsCount;
	private String confernceRooms;
	private Integer confernceRoomsCount;
	private String mediclKits;
	private Integer mediclKitsCount;
	private String recreational;
	private Integer recreationalCount;
	private String printingMachines;
	private Integer printingMachinesCount;
	private String coffeeMachines;
	private Integer coffeeMachinesCount;
	private String smartBoard;
	private Integer smartBoardCount;
	private String projectors;
	private Integer projectorsCount;
	private String diningTables;
	private Integer diningTablesCount;
	private String modularKitchen;
	private Integer modularKitchenCount;

	private String workStationType;
	private String seatType;
	private String noOfSeatsAvailable;
	private String managedType;
	private String officeSpaceType;

	private int offset;
	private int limit;

	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	
	private String wifiAvailable;
	private Integer wifiCount;
	private String geyserAvailable;
	private Integer geyserCount;


	private String tables;
	private Integer tablesCount;
	private String cubical;
	private Integer cubicalCount;
	private String linear;
	private Integer linearCount;

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

	public String getOfficeSpaceType() {
		return officeSpaceType;
	}

	public void setOfficeSpaceType(String officeSpaceType) {
		this.officeSpaceType = officeSpaceType;
	}

	public String getManagedType() {
		return managedType;
	}

	public void setManagedType(String managedType) {
		this.managedType = managedType;
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
