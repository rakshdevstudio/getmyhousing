package com.getmyhousing.common.daoimpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PropertyFloorRoomConverter;
import com.getmyhousing.common.dao.PropertyFloorRoomsDao;
import com.getmyhousing.common.domain.PropertyFloorRooms;
import com.getmyhousing.common.dto.PropertyFloorRoomsDTO;
import com.getmyhousing.common.repository.PropertyFloorRoomsRepository;

@Transactional
@Service("PropertyFloorRoomsDaoImpl")
public class PropertyFloorRoomsDaoImpl implements PropertyFloorRoomsDao {

	private Logger LOGGER = LoggerFactory.getLogger(PropertyFloorRoomsDaoImpl.class);

	@Autowired
	PropertyFloorRoomsRepository propertyFloorRoomsRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public PropertyFloorRooms savePropertyFloorRooms(PropertyFloorRoomsDTO propertyFloorRoomsDTO) {
		PropertyFloorRooms propertyFloorRooms = PropertyFloorRoomConverter
				.getPropertyFloorRoomsByPropertyFloorRoomsDTO(propertyFloorRoomsDTO);
		return propertyFloorRoomsRepository.save(propertyFloorRooms);
	}

	@Override
	public List<PropertyFloorRooms> getPropertyFloorRoomsByPropertyId(Long propertyId) {
		return propertyFloorRoomsRepository.getPropertyFloorRoomsByPropertyId(propertyId);
	}

	@Override
	public void deletePropertyFloorRoomsByPropertyId(Long propertyId) {
		propertyFloorRoomsRepository.deletePropertyFloorRoomsByPropertyId(propertyId);
	}

	@Override
	public List<PropertyFloorRooms> saveAllPropertyFloorRooms(List<PropertyFloorRoomsDTO> propertyFloorRoomsDTOList) {
		List<PropertyFloorRooms> propertyFloorRoomsList = new ArrayList<PropertyFloorRooms>();
		for (PropertyFloorRoomsDTO propertyFloorRoomsDTO : propertyFloorRoomsDTOList)
			propertyFloorRoomsList.add(
					PropertyFloorRoomConverter.getPropertyFloorRoomsByPropertyFloorRoomsDTO(propertyFloorRoomsDTO));
		return propertyFloorRoomsRepository.saveAll(propertyFloorRoomsList);
	}

}
