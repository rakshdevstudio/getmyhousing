package com.getmyhousing.common.daoimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.PropertyImageGalleryConverter;
import com.getmyhousing.common.dao.PropertyImageGalleryDao;
import com.getmyhousing.common.domain.PropertyImageGallery;
import com.getmyhousing.common.dto.PropertyImageGalleryDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.repository.PropertyImageGalleryRepository;

@Transactional
@Service("PropertyImageGalleryDaoImpl")
public class PropertyImageGalleryDaoImpl implements PropertyImageGalleryDao {

	private static Logger LOGGER = LoggerFactory.getLogger(PropertyImageGalleryDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	PropertyImageGalleryRepository propertyImageGalleryRepository;

	@Override
	public PropertyImageGallery savePropertyImageGallery(PropertyImageGalleryDTO propertyImageGalleryDTO) {
		PropertyImageGallery propertyImageGallery = PropertyImageGalleryConverter
				.getPropertyImageGalleryByHCImageGalleryDTO(propertyImageGalleryDTO);
		return propertyImageGalleryRepository.save(propertyImageGallery);
	}

	@Override
	public List<PropertyImageGallery> getAllPropertyImageGallery(PropertyImageGalleryDTO propertyImageGalleryDTO) {
		List<PropertyImageGallery> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from PropertyImageGallery a where 1=1");

		if (null != propertyImageGalleryDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != propertyImageGalleryDTO.getPropertyId())
			sqlQuery.append(" AND a.propertyId = :propertyId");
		if (null != propertyImageGalleryDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");

		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != propertyImageGalleryDTO.getId())
			query.setParameter("id", propertyImageGalleryDTO.getId());
		if (null != propertyImageGalleryDTO.getPropertyId())
			query.setParameter("propertyId", propertyImageGalleryDTO.getPropertyId());
		if (null != propertyImageGalleryDTO.getStatus())
			query.setParameter("status", propertyImageGalleryDTO.getStatus());

//		query.setFirstResult(userDTO.getOffset());
//		query.setMaxResults(userDTO.getLimit());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public void updatePropertyImages(Long propertyId, List<PropertyImageGalleryDTO> list) {
		PropertyImageGalleryDTO imageGalleryDTO = new PropertyImageGalleryDTO();
		imageGalleryDTO.setPropertyId(propertyId);

		List<PropertyImageGallery> dbList = getAllPropertyImageGallery(imageGalleryDTO);
		Map<Long, PropertyImageGallery> dbMap = new HashMap<Long, PropertyImageGallery>();

		for (PropertyImageGallery imageGallery : dbList) {
			dbMap.put(imageGallery.getId(), imageGallery);
		}

		StringBuilder errorBuilder = new StringBuilder();
		boolean errorFlag = false;

		List<PropertyImageGallery> updatedList = new ArrayList<PropertyImageGallery>();
		for (PropertyImageGalleryDTO imageDTO : list) {

			PropertyImageGallery exitingRecord = null;
			if (null == imageDTO.getId()) {
				// Fresh upload Scenerio
				imageDTO.setStatus(Constant.STATUS_ACTIVE);
				updatedList.add(PropertyImageGalleryConverter.getPropertyImageGalleryByHCImageGalleryDTO(imageDTO));
			} else {

				// update scnerios.
				exitingRecord = dbMap.get(imageDTO.getId());
				if (null == exitingRecord) {
					errorFlag = true;
					errorBuilder.append("The respective entity id:" + imageDTO.getId()
							+ " not associated to HomeChef id:" + propertyId);
				} else {

					if (Constant.STATUS_DELETED.equals(imageDTO.getStatus())
							&& Constant.FEATURED_FLAG.equals(exitingRecord.getImageType())) {
						errorFlag = true;
						errorBuilder.append("The featured image cant be deleted id:" + imageDTO.getId());
						continue;
					}

					if (null != imageDTO.getStatus()) {
						exitingRecord.setStatus(imageDTO.getStatus());

						if (null != imageDTO.getImageType())
							exitingRecord.setImageType(imageDTO.getImageType());

						if (null != imageDTO.getImagePath())
							exitingRecord.setImagePath(imageDTO.getImagePath());

						exitingRecord.setUpdatedBy(imageDTO.getUpdatedBy());
						exitingRecord.setUpdatedDate(imageDTO.getUpdatedDate());
					}
				}
				updatedList.add(exitingRecord);

			}
		}

		if (errorFlag) {
			LOGGER.info("updateProperGalleryImages() failed to update recods. " + errorBuilder.toString());
			throw new FieldException(errorBuilder.toString());
		}

		if (updatedList.size() > 0) {
			saveAllPropertyimages(updatedList);
		}

	}

	@Override
	public List<PropertyImageGallery> saveAllPropertyimages(List<PropertyImageGallery> imageGalleryList) {
		return propertyImageGalleryRepository.saveAll(imageGalleryList);
	}

}
