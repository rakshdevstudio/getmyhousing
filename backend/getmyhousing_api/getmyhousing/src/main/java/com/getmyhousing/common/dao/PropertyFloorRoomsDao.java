package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.PropertyFloorRooms;
import com.getmyhousing.common.dto.PropertyFloorRoomsDTO;

public interface PropertyFloorRoomsDao {

	public PropertyFloorRooms savePropertyFloorRooms(PropertyFloorRoomsDTO propertyFloorRoomsDTO);

	public List<PropertyFloorRooms> getPropertyFloorRoomsByPropertyId(Long propertyId);

	public List<PropertyFloorRooms> saveAllPropertyFloorRooms(List<PropertyFloorRoomsDTO> propertyFloorRoomsDTOList);

	public void deletePropertyFloorRoomsByPropertyId(Long propertyId);

}
