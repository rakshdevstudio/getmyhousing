package com.getmyhousing.common.daoimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.PackagesConverter;
import com.getmyhousing.common.dao.PackagesDao;
import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.dto.PackagesDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PackagesRepository;

@Transactional
@Service("PackagesDaoImpl")
public class PackagesDaoImpl implements PackagesDao {

	private Logger LOGGER = LoggerFactory.getLogger(PackagesDaoImpl.class);

	@Autowired
	PackagesRepository packagesRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public Packages savePackages(PackagesDTO packagesDTO) {
		Packages packages = PackagesConverter.getPackagesByPackagesDTO(packagesDTO);
		return packagesRepository.save(packages);
	}

	@Override
	public List<Packages> getAllPackages(PackagesDTO packagesDTO) {
		List<Packages> returnList = null;
		List<Packages> returnPackages =  new ArrayList<>();
		StringBuffer sqlQuery = new StringBuffer("from Packages a where 1=1");

		if (null != packagesDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != packagesDTO.getPackageName() && !packagesDTO.getPackageName().equalsIgnoreCase("admin"))
			sqlQuery.append(" AND a.packageName = :packageName");
		if (null != packagesDTO.getPackageFor())
			sqlQuery.append(" AND a.packageFor = :packageFor");
		if (null != packagesDTO.getListingType())
			sqlQuery.append(" AND a.listingType = :listingType");
		if (null != packagesDTO.getCountry())
			sqlQuery.append(" AND a.country = :country");
		if (null != packagesDTO.getState())
			sqlQuery.append(" AND a.state = :state");
		if (null != packagesDTO.getDistrict())
			sqlQuery.append(" AND a.district = :district");
		if (null != packagesDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");

		sqlQuery.append(" order by a.id ASC");
				
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != packagesDTO.getId())
			query.setParameter("id", packagesDTO.getId());
		if (null != packagesDTO.getPackageName() )
			query.setParameter("packageName", packagesDTO.getPackageName());
		if (null != packagesDTO.getPackageFor())
			query.setParameter("packageFor", packagesDTO.getPackageFor());
		if (null != packagesDTO.getListingType())
			query.setParameter("listingType", packagesDTO.getListingType());
		if (null != packagesDTO.getCountry())
			query.setParameter("country", packagesDTO.getCountry());
		if (null != packagesDTO.getDistrict())
			query.setParameter("district", packagesDTO.getDistrict());
		if (null != packagesDTO.getState())
			query.setParameter("state", packagesDTO.getState());
		if (null != packagesDTO.getStatus())
			query.setParameter("status", packagesDTO.getStatus());

		returnList = query.getResultList();
		
		for(Packages packages : returnList) {
			
			if(!packages.getPackageFor().equalsIgnoreCase("admin")) {

				returnPackages.add(packages);

			}
		}
		
		return returnPackages;
	}

	@Override
	public Packages getPackagesById(Long id) {
		Optional<Packages> db = packagesRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The package id not found in the system. id:" + id);
		return db.get();
	}

}
