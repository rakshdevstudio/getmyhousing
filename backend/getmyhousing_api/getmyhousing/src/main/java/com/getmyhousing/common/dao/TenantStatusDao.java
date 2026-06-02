package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.TenantStatus;
import com.getmyhousing.common.dto.TenantStatusDTO;

public interface TenantStatusDao {

	public TenantStatus saveTenantStatus(TenantStatusDTO tenantStatusDTO);

	public TenantStatus getTenantStatusByPropertyId(Long propertyId);

	public TenantStatus getTenantStatusById(Long id);

}
