package com.getmyhousing.common.daoimpl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.ContactUsDataConverter;
import com.getmyhousing.common.dao.ContactUsDataDao;
import com.getmyhousing.common.domain.ContactUsData;
import com.getmyhousing.common.dto.ContactUsDataDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.ContactUsDataRepository;

import ch.qos.logback.classic.Logger;

@Transactional
@Service("ContactUsDataDaoImpl")
public class ContactUsDataDaoImpl implements ContactUsDataDao {

//	private Logger LOGGER = LoggerFactory.getLogger(BlogCategoryDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private ContactUsDataRepository contactUsDataRepository;

	@Override
	public ContactUsData saveContactUsData(ContactUsDataDTO contactUsDataDTO) {
		ContactUsData contactUsData = ContactUsDataConverter.getContactUsDataByContactUsDataDTO(contactUsDataDTO);
		return contactUsDataRepository.save(contactUsData);
	}

	@Override
	public List<ContactUsDataDTO> getAllContactUsData(ContactUsDataDTO contactUsDataDTO) {
		List<ContactUsDataDTO> returnList = null;
		StringBuilder sqlQuery = new StringBuilder("from ContactUsData a where 1=1");
		if (contactUsDataDTO.getId() != null) {
			sqlQuery.append(" AND c.id = :id");
		}

		Query query = entityManager.createQuery(sqlQuery.toString());

		if (contactUsDataDTO.getId() != null) {
			query.setParameter("id", contactUsDataDTO.getId());
		}
		// Execute the query
		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public ContactUsData getContactUsDataById(Long id) {
		Optional<ContactUsData> contactUsData = contactUsDataRepository.findById(id);
		if (!contactUsData.isPresent())
			throw new ResourceNotFoundException("The contactUsData is not found in the system. id:" + id);
		return contactUsData.get();
	}

}
