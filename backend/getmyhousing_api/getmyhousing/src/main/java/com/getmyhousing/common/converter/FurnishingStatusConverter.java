package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.FurnishingStatus;
import com.getmyhousing.common.dto.FurnishingStatusDTO;

public class FurnishingStatusConverter {

	/**
	 * To convert FurnishingStatusDTO to FurnishingStatus
	 * 
	 * @param furnishingStatusDTO
	 * @return
	 */
	public static FurnishingStatus getFurnishByFurnshingStatusDTO(FurnishingStatusDTO furnishingStatusDTO) {
		FurnishingStatus furnishingStatus = new FurnishingStatus();

		furnishingStatus.setId(furnishingStatusDTO.getId());
		furnishingStatus.setPropertyId(furnishingStatusDTO.getPropertyId());
		furnishingStatus.setAirConditionAvailable(furnishingStatusDTO.getAirConditionAvailable());
		furnishingStatus.setAirConditionCount(furnishingStatusDTO.getAirConditionCount());
		furnishingStatus.setBedsAvailable(furnishingStatusDTO.getBedsAvailable());
		furnishingStatus.setBedsCount(furnishingStatusDTO.getBedsCount());
		furnishingStatus.setFurnishingType(furnishingStatusDTO.getFurnishingType());
		furnishingStatus.setGasConnectionAvailable(furnishingStatusDTO.getGasConnectionAvailable());
		furnishingStatus.setGasConnectionCount(furnishingStatusDTO.getGasConnectionCount());
		furnishingStatus.setRefrigeratorAvailable(furnishingStatusDTO.getRefrigeratorAvailable());
		furnishingStatus.setRefrigeratorCount(furnishingStatusDTO.getRefrigeratorCount());
		furnishingStatus.setLedLightsAvailable(furnishingStatusDTO.getLedLightsAvailable());
		furnishingStatus.setLedLightsCount(furnishingStatusDTO.getLedLightsCount());
		furnishingStatus.setSofaAvailable(furnishingStatusDTO.getSofaAvailable());
		furnishingStatus.setSofaCount(furnishingStatusDTO.getSofaCount());
		furnishingStatus.setSofaType(furnishingStatusDTO.getSofaType());
		furnishingStatus.setTvAvailable(furnishingStatusDTO.getTvAvailable());
		furnishingStatus.setTvCount(furnishingStatusDTO.getTvCount());
		furnishingStatus.setWardrobeAvailable(furnishingStatusDTO.getWardrobeAvailable());
		furnishingStatus.setWardrobeCount(furnishingStatusDTO.getWardrobeCount());
		furnishingStatus.setWashingMachineAvailable(furnishingStatusDTO.getWashingMachineAvailable());
		furnishingStatus.setWashingMachineCount(furnishingStatusDTO.getWashingMachineCount());
		furnishingStatus.setOfficeTables(furnishingStatusDTO.getOfficeTables());
		furnishingStatus.setOfficeTablesCount(furnishingStatusDTO.getOfficeTablesCount());
		furnishingStatus.setFan(furnishingStatusDTO.getFan());
		furnishingStatus.setFanCount(furnishingStatusDTO.getFanCount());
		furnishingStatus.setWaterPurifier(furnishingStatusDTO.getWaterPurifier());
		furnishingStatus.setWaterPurifierCount(furnishingStatusDTO.getWaterPurifierCount());
		furnishingStatus.setExhaustFan(furnishingStatusDTO.getExhaustFan());
		furnishingStatus.setExhaustFanCount(furnishingStatusDTO.getExhaustFanCount());
		furnishingStatus.setStove(furnishingStatusDTO.getStove());
		furnishingStatus.setStoveCount(furnishingStatusDTO.getStoveCount());
		furnishingStatus.setCurtains(furnishingStatusDTO.getCurtains());
		furnishingStatus.setCurtainsCount(furnishingStatusDTO.getCurtainsCount());
		furnishingStatus.setChimney(furnishingStatusDTO.getChimney());
		furnishingStatus.setChimneyCount(furnishingStatusDTO.getChimneyCount());
		furnishingStatus.setMicroWave(furnishingStatusDTO.getMicroWave());
		furnishingStatus.setMicroWaveCount(furnishingStatusDTO.getMicroWaveCount());
		furnishingStatus.setChairs(furnishingStatusDTO.getChairs());
		furnishingStatus.setChairsCount(furnishingStatusDTO.getChairsCount());
		furnishingStatus.setMeetingRooms(furnishingStatusDTO.getMeetingRooms());
		furnishingStatus.setMeetingRoomsCount(furnishingStatusDTO.getMeetingRoomsCount());
		furnishingStatus.setConfernceRooms(furnishingStatusDTO.getConfernceRooms());
		furnishingStatus.setConfernceRoomsCount(furnishingStatusDTO.getConfernceRoomsCount());
		furnishingStatus.setMediclKits(furnishingStatusDTO.getMediclKits());
		furnishingStatus.setMediclKitsCount(furnishingStatusDTO.getMediclKitsCount());
		furnishingStatus.setRecreational(furnishingStatusDTO.getRecreational());
		furnishingStatus.setRecreationalCount(furnishingStatusDTO.getRecreationalCount());
		furnishingStatus.setPrintingMachines(furnishingStatusDTO.getPrintingMachines());
		furnishingStatus.setPrintingMachinesCount(furnishingStatusDTO.getPrintingMachinesCount());
		furnishingStatus.setCoffeeMachines(furnishingStatusDTO.getCoffeeMachines());
		furnishingStatus.setCoffeeMachinesCount(furnishingStatusDTO.getCoffeeMachinesCount());
		furnishingStatus.setSmartBoard(furnishingStatusDTO.getSmartBoard());
		furnishingStatus.setSmartBoardCount(furnishingStatusDTO.getSmartBoardCount());
		furnishingStatus.setProjectors(furnishingStatusDTO.getProjectors());
		furnishingStatus.setProjectorsCount(furnishingStatusDTO.getProjectorsCount());
		furnishingStatus.setDiningTables(furnishingStatusDTO.getDiningTables());
		furnishingStatus.setDiningTablesCount(furnishingStatusDTO.getDiningTablesCount());
		furnishingStatus.setModularKitchen(furnishingStatusDTO.getModularKitchen());
		furnishingStatus.setModularKitchenCount(furnishingStatusDTO.getModularKitchenCount());
		furnishingStatus.setWorkStationType(furnishingStatusDTO.getWorkStationType());
		furnishingStatus.setSeatType(furnishingStatusDTO.getSeatType());
		furnishingStatus.setNoOfSeatsAvailable(furnishingStatusDTO.getNoOfSeatsAvailable());
		furnishingStatus.setManagedType(furnishingStatusDTO.getSeatType());
		furnishingStatus.setOfficeSpaceType(furnishingStatusDTO.getOfficeSpaceType());
		furnishingStatus.setStatus(furnishingStatusDTO.getStatus());
		furnishingStatus.setUpdatedDate(furnishingStatusDTO.getUpdatedDate());
		furnishingStatus.setUpdatedBy(furnishingStatusDTO.getUpdatedBy());
		furnishingStatus.setCreatedBy(furnishingStatusDTO.getCreatedBy());
		furnishingStatus.setCreatedDate(furnishingStatusDTO.getCreatedDate());
		furnishingStatus.setWifiCount(furnishingStatusDTO.getWifiCount());
		furnishingStatus.setWifiAvailable(furnishingStatusDTO.getWifiAvailable());
		furnishingStatus.setGeyserCount(furnishingStatusDTO.getGeyserCount());
		furnishingStatus.setGeyserAvailable(furnishingStatusDTO.getGeyserAvailable());
		
		furnishingStatus.setTables(furnishingStatusDTO.getTables());
		furnishingStatus.setTablesCount(furnishingStatusDTO.getTablesCount());
		furnishingStatus.setCubical(furnishingStatusDTO.getCubical());
		furnishingStatus.setCubicalCount(furnishingStatusDTO.getCubicalCount());
		furnishingStatus.setLinear(furnishingStatusDTO.getLinear());
		furnishingStatus.setLinearCount(furnishingStatusDTO.getLinearCount());

		return furnishingStatus;
	}

	/**
	 * To convert FurnishingStatus to FurnishingStatusDTO
	 * 
	 * @param furnishingStatus
	 * @return
	 */
	public static FurnishingStatusDTO getFurnishingDTOIntoFurnishingStatus(FurnishingStatus furnishingStatus) {
		FurnishingStatusDTO dto = new FurnishingStatusDTO();

		dto.setId(furnishingStatus.getId());
		dto.setPropertyId(furnishingStatus.getPropertyId());
		dto.setAirConditionAvailable(furnishingStatus.getAirConditionAvailable());
		dto.setAirConditionCount(furnishingStatus.getAirConditionCount());
		dto.setBedsAvailable(furnishingStatus.getBedsAvailable());
		dto.setBedsCount(furnishingStatus.getBedsCount());
		dto.setFurnishingType(furnishingStatus.getFurnishingType());
		dto.setGasConnectionAvailable(furnishingStatus.getGasConnectionAvailable());
		dto.setGasConnectionCount(furnishingStatus.getGasConnectionCount());
		dto.setLedLightsAvailable(furnishingStatus.getLedLightsAvailable());
		dto.setLedLightsCount(furnishingStatus.getLedLightsCount());
		dto.setSofaAvailable(furnishingStatus.getSofaAvailable());
		dto.setSofaCount(furnishingStatus.getSofaCount());
		dto.setSofaType(furnishingStatus.getSofaType());
		dto.setTvAvailable(furnishingStatus.getTvAvailable());
		dto.setTvCount(furnishingStatus.getTvCount());
		dto.setOfficeTables(furnishingStatus.getOfficeTables());
		dto.setOfficeTablesCount(furnishingStatus.getOfficeTablesCount());
		dto.setFan(furnishingStatus.getFan());
		dto.setFanCount(furnishingStatus.getFanCount());
		dto.setWaterPurifier(furnishingStatus.getWaterPurifier());
		dto.setWaterPurifierCount(furnishingStatus.getWaterPurifierCount());
		dto.setExhaustFan(furnishingStatus.getExhaustFan());
		dto.setExhaustFanCount(furnishingStatus.getExhaustFanCount());
		dto.setStove(furnishingStatus.getStove());
		dto.setStoveCount(furnishingStatus.getStoveCount());
		dto.setCurtains(furnishingStatus.getCurtains());
		dto.setCurtainsCount(furnishingStatus.getCurtainsCount());
		dto.setChimney(furnishingStatus.getChimney());
		dto.setChimneyCount(furnishingStatus.getChimneyCount());
		dto.setMicroWave(furnishingStatus.getMicroWave());
		dto.setMicroWaveCount(furnishingStatus.getMicroWaveCount());
		dto.setChairs(furnishingStatus.getChairs());
		dto.setChairsCount(furnishingStatus.getChairsCount());
		dto.setMeetingRooms(furnishingStatus.getMeetingRooms());
		dto.setMeetingRoomsCount(furnishingStatus.getMeetingRoomsCount());
		dto.setConfernceRooms(furnishingStatus.getConfernceRooms());
		dto.setConfernceRoomsCount(furnishingStatus.getConfernceRoomsCount());
		dto.setMediclKits(furnishingStatus.getMediclKits());
		dto.setMediclKitsCount(furnishingStatus.getMediclKitsCount());
		dto.setRecreational(furnishingStatus.getRecreational());
		dto.setRecreationalCount(furnishingStatus.getRecreationalCount());
		dto.setPrintingMachines(furnishingStatus.getPrintingMachines());
		dto.setPrintingMachinesCount(furnishingStatus.getPrintingMachinesCount());
		dto.setCoffeeMachines(furnishingStatus.getCoffeeMachines());
		dto.setCoffeeMachinesCount(furnishingStatus.getCoffeeMachinesCount());
		dto.setSmartBoard(furnishingStatus.getSmartBoard());
		dto.setSmartBoardCount(furnishingStatus.getSmartBoardCount());
		dto.setProjectors(furnishingStatus.getProjectors());
		dto.setProjectorsCount(furnishingStatus.getProjectorsCount());
		dto.setDiningTables(furnishingStatus.getDiningTables());
		dto.setDiningTablesCount(furnishingStatus.getDiningTablesCount());
		dto.setModularKitchen(furnishingStatus.getModularKitchen());
		dto.setModularKitchenCount(furnishingStatus.getModularKitchenCount());
		dto.setWardrobeAvailable(furnishingStatus.getWardrobeAvailable());
		dto.setWardrobeCount(furnishingStatus.getWardrobeCount());
		dto.setWashingMachineAvailable(furnishingStatus.getWashingMachineAvailable());
		dto.setWashingMachineCount(furnishingStatus.getWashingMachineCount());
		dto.setWorkStationType(furnishingStatus.getWorkStationType());
		dto.setSeatType(furnishingStatus.getSeatType());
		dto.setNoOfSeatsAvailable(furnishingStatus.getNoOfSeatsAvailable());
		dto.setManagedType(furnishingStatus.getManagedType());
		dto.setOfficeSpaceType(furnishingStatus.getOfficeSpaceType());
		dto.setStatus(furnishingStatus.getStatus());
		dto.setUpdatedDate(furnishingStatus.getUpdatedDate());
		dto.setCreatedBy(furnishingStatus.getCreatedBy());
		dto.setCreatedDate(furnishingStatus.getCreatedDate());
		dto.setUpdatedBy(furnishingStatus.getUpdatedBy());
		dto.setWifiCount(furnishingStatus.getWifiCount());
		dto.setWifiAvailable(furnishingStatus.getWifiAvailable());
		dto.setGeyserCount(furnishingStatus.getGeyserCount());
		dto.setGeyserAvailable(furnishingStatus.getGeyserAvailable());
		dto.setRefrigeratorAvailable(furnishingStatus.getRefrigeratorAvailable());
		dto.setRefrigeratorCount(furnishingStatus.getRefrigeratorCount());
		dto.setTables(furnishingStatus.getTables());
		dto.setTablesCount(furnishingStatus.getTablesCount());
		dto.setCubical(furnishingStatus.getCubical());
		dto.setCubicalCount(furnishingStatus.getCubicalCount());
		dto.setLinear(furnishingStatus.getLinear());
		dto.setLinearCount(furnishingStatus.getLinearCount());
		return dto;
	}

}
