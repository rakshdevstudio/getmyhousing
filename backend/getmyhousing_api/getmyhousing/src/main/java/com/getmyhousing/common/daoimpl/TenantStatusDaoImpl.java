package com.getmyhousing.common.daoimpl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.TenantStatusConverter;
import com.getmyhousing.common.dao.TenantStatusDao;
import com.getmyhousing.common.domain.TenantStatus;
import com.getmyhousing.common.dto.TenantStatusDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.TenantStatusRepository;

@Transactional
@Service("TenantStatusDaoImpl")
public class TenantStatusDaoImpl implements TenantStatusDao {

	private Logger LOGGER = LoggerFactory.getLogger(TenantStatusDaoImpl.class);

	@Autowired
	TenantStatusRepository tenantStatusRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public TenantStatus saveTenantStatus(TenantStatusDTO tenantStatusDTO) {
		TenantStatus tenantStatus = TenantStatusConverter.getTenantStatusByTenantStatusDTO(tenantStatusDTO);
		return tenantStatusRepository.save(tenantStatus);
	}

	@Override
	public TenantStatus getTenantStatusByPropertyId(Long propertyId) {
		return tenantStatusRepository.getTenantStatusByPropertyId(propertyId);
	}

	@Override
	public TenantStatus getTenantStatusById(Long id) {
		Optional<TenantStatus> db = tenantStatusRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The tenantStatus not found in the system. id:" + id);
		return db.get();
	}

}
