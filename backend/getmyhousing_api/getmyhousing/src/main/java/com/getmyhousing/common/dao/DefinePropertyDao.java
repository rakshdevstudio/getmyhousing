package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.DefineProperty;
import com.getmyhousing.common.dto.DefinePropertyDTO;

public interface DefinePropertyDao {

	public DefineProperty saveDefineProperty(DefinePropertyDTO definePropertyDTO);

	public DefineProperty getDefinePropertyByPropertyId(Long propertyId);

	public DefineProperty getDefinePropertyById(Long id);

}
