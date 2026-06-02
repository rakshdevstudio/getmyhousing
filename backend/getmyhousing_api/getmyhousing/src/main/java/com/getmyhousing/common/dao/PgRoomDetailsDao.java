package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.PgRoomDetails;
import com.getmyhousing.common.dto.PgRoomDetailsDTO;

public interface PgRoomDetailsDao {

	public PgRoomDetails savePgRoomDetails(PgRoomDetailsDTO pgRoomDetailsDTO);

	public PgRoomDetails getPgRoomDetailsByPropertyId(Long propertyId);

	public PgRoomDetails getPgRoomDetailsById(Long id);

}
