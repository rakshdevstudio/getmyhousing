package com.getmyhousing.common.dao;

import java.util.List;
import java.util.Optional;

import com.getmyhousing.common.domain.Owner;
import com.getmyhousing.common.dto.OwnerDTO;

public interface OwnerDao {
	
	public Owner saveOwner(OwnerDTO ownerDTO);
	
	public List<Owner> getAllOwners(OwnerDTO ownerDTO);
	
	public List<Owner> getOwnersByCreatedBy(OwnerDTO ownerDTO);
	
	public Optional<Owner> getOwnerById(Long id);

}
