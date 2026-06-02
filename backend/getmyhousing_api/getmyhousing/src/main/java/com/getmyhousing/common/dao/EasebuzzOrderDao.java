package com.getmyhousing.common.dao;

import com.getmyhousing.common.domain.EasebuzzOrder;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;

public interface EasebuzzOrderDao {

	public EasebuzzOrder saveEasebuzzOrder(EasebuzzOrderDTO easebuzzOrderDTO);

	public Long getNextSeriesId();

	public EasebuzzOrder getEasebuzzOrderById(Long id);

}
