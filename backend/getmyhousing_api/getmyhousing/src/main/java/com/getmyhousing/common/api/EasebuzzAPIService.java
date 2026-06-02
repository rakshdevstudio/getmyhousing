package com.getmyhousing.common.api;

import org.springframework.util.MultiValueMap;

import com.getmyhousing.common.dto.EasebuzzOrderDTO;
import com.getmyhousing.common.dto.PackagesDTO;

public interface EasebuzzAPIService {

	public MultiValueMap<String, String> createEaseBuzzOrder(PackagesDTO packageDTO, String sequnceid);

	public String getEaseBuzzOrderInfo(EasebuzzOrderDTO easebuzzOrderDTO);

}
