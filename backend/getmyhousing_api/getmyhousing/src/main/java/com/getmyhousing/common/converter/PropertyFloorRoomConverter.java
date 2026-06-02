package com.getmyhousing.common.converter;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.PropertyFloorRooms;
import com.getmyhousing.common.dto.PropertyFloorRoomsDTO;

public class PropertyFloorRoomConverter {

	/**
	 * To convert PropertyFloorRooms to PropertyFloorRoomsDTO
	 * 
	 * @param propertyFloorRooms
	 * @return
	 */
	public static PropertyFloorRoomsDTO getPropertyFloorRoomsDTOByPropertyFloorRooms(
			PropertyFloorRooms propertyFloorRooms) {
		PropertyFloorRoomsDTO propertyFloorRoomsDTO = new PropertyFloorRoomsDTO();
		propertyFloorRoomsDTO.setId(propertyFloorRooms.getId());
		propertyFloorRoomsDTO.setPropertyId(propertyFloorRooms.getPropertyId());
		propertyFloorRoomsDTO.setFloorNo(propertyFloorRooms.getFloorNo());
		propertyFloorRoomsDTO.setNoOfRooms(propertyFloorRooms.getNoOfRooms());
		propertyFloorRoomsDTO.setStatus(propertyFloorRooms.getStatus());
		propertyFloorRoomsDTO.setUpdatedBy(propertyFloorRooms.getUpdatedBy());
		propertyFloorRoomsDTO.setUpdatedDate(propertyFloorRooms.getUpdatedDate());
		propertyFloorRoomsDTO.setCreatedBy(propertyFloorRooms.getCreatedBy());
		propertyFloorRoomsDTO.setCreatedDate(propertyFloorRooms.getCreatedDate());

		return propertyFloorRoomsDTO;
	}

	/**
	 * To convert PropertyFloorRoomsDTO to PropertyFloorRooms
	 * 
	 * @param propertyFloorRoomsDTO
	 * @return
	 */
	public static PropertyFloorRooms getPropertyFloorRoomsByPropertyFloorRoomsDTO(
			PropertyFloorRoomsDTO propertyFloorRoomsDTO) {
		PropertyFloorRooms propertyFloorRooms = new PropertyFloorRooms();
		propertyFloorRooms.setId(propertyFloorRoomsDTO.getId());
		propertyFloorRooms.setPropertyId(propertyFloorRoomsDTO.getPropertyId());
		propertyFloorRooms.setFloorNo(propertyFloorRoomsDTO.getFloorNo());
		propertyFloorRooms.setNoOfRooms(propertyFloorRoomsDTO.getNoOfRooms());
//		propertyFloorRooms.setStatus(propertyFloorRoomsDTO.getStatus());
//		propertyFloorRooms.setStatus(Constant.STATUS_ACTIVE);    
		
		propertyFloorRooms.setStatus(Constant.STATUS_ACTIVE);     
		propertyFloorRooms.setUpdatedBy(propertyFloorRoomsDTO.getUpdatedBy());
		propertyFloorRooms.setUpdatedDate(propertyFloorRoomsDTO.getUpdatedDate());
		propertyFloorRooms.setCreatedBy(propertyFloorRoomsDTO.getCreatedBy());
		propertyFloorRooms.setCreatedDate(propertyFloorRoomsDTO.getCreatedDate());

		return propertyFloorRooms;
	}
}
