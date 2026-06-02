package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.PropertyAreaDetails;
import com.getmyhousing.common.domain.PropertyFloorRooms;

@Repository
public interface PropertyFloorRoomsRepository extends JpaRepository<PropertyFloorRooms, Long> {

	@Query("select u from PropertyFloorRooms u where u.propertyId=:propertyId")
	List<PropertyFloorRooms> getPropertyFloorRoomsByPropertyId(@Param("propertyId") Long propertyId);

	@Modifying
	@Query("DELETE FROM PropertyFloorRooms u WHERE u.propertyId = :propertyId")
	void deletePropertyFloorRoomsByPropertyId(@Param("propertyId") Long propertyId);

//	@Query("select * from PropertyFloorRooms u where u.property_id = :propertyId", nativeQuery = true)
//	PropertyFloorRooms gettingPropertyFloorRoomsByPropertyId( Long propertyId);

//	@Query(value = "SELECT * FROM car o WHERE o.status = 'active'", nativeQuery = true)
	
//	@Query(value = "SELECT * FROM property_floor_rooms u WHERE u.property_id=:propertyId", nativeQuery = true)
//	PropertyFloorRooms gettingPropertyFloorRoomsByPropertyId(@Param("propertyId") Long propertyId);
	
	@Query("select u from PropertyFloorRooms u where u.propertyId=:propertyId")
	PropertyFloorRooms gettingPropertyFloorRoomsByPropertyId(@Param("propertyId") Long propertyId);



}
