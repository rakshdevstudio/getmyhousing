package com.getmyhousing.rental.service;

import java.util.List;

import com.getmyhousing.common.dto.OwnerDTO;

public interface OwnerService {
	
		// To save blogCategory
		public void saveOwner(OwnerDTO ownerDTO);
		
		//		
		public List<OwnerDTO> getOwnersByRole(OwnerDTO ownerDTO);
		
		public List<OwnerDTO> getOwners(OwnerDTO ownerDTO);

}
