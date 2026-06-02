package com.getmyhousing.common.daoimpl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.BlogCategoryConverter;
import com.getmyhousing.common.converter.OwnerConverter;
import com.getmyhousing.common.dao.OwnerDao;
import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.domain.Owner;
import com.getmyhousing.common.dto.OwnerDTO;
import com.getmyhousing.common.repository.BlogSubCategoryRepository;
import com.getmyhousing.common.repository.OwnerRepository;

@Service("OwnerDaoImpl")
public class OwnerDaoImpl implements OwnerDao {
	
	private Logger LOGGER = LoggerFactory.getLogger(BlogSubCategoryDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	private OwnerRepository ownerRepository;

	@Override
	public Owner saveOwner(OwnerDTO ownerDTO) {
		Owner owner = OwnerConverter.getOwnerByOwnerDTO(ownerDTO);
		owner = ownerRepository.save(owner);
		return owner;
	}

	@Override
	public List<Owner> getAllOwners(OwnerDTO ownerDTO) {
		// Fetch all owners from the database
        return ownerRepository.findAll();
	}

	@Override
	public List<Owner> getOwnersByCreatedBy(OwnerDTO ownerDTO) {
		// Fetch owners created by a specific user
        Long createdBy = ownerDTO.getUpdatedBy(); // Assuming OwnerDTO has a getCreatedBy() method
        return ownerRepository.findByCreatedBy(createdBy);
	}

	@Override
	public Optional<Owner> getOwnerById(Long id) {
		
		return ownerRepository.findById(id);
	}

}
