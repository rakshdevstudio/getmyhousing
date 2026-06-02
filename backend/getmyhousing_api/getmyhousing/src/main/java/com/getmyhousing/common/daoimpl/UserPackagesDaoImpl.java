package com.getmyhousing.common.daoimpl;

import java.math.BigDecimal;
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

import com.getmyhousing.common.converter.UserPackageConverter;
import com.getmyhousing.common.dao.UserPackagesDao;
import com.getmyhousing.common.domain.UserPackages;
import com.getmyhousing.common.dto.UserPackagesDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.UserPackagesRepository;

@Transactional
@Service("UserPackagesDaoImpl")
public class UserPackagesDaoImpl implements UserPackagesDao {

	private Logger LOGGER = LoggerFactory.getLogger(UserPackagesDaoImpl.class);

	@Autowired
	UserPackagesRepository userPackagesRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public UserPackages saveUserPackages(UserPackagesDTO userPackagesDTO) {
		UserPackages userPackages = UserPackageConverter.getUserPackagesByUserPackagesDTO(userPackagesDTO);
		return userPackagesRepository.save(userPackages);
	}

	@Override
	public List<UserPackages> getExpiredUserPackages(String date) {
		return userPackagesRepository.getExpiredUserPackages(date);
	}

	@Override
	public List<UserPackages> getAllUserPackages(UserPackagesDTO userPackagesDTO) {
		List<UserPackages> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from UserPackages a where 1=1");

		if (null != userPackagesDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != userPackagesDTO.getUserId())
			sqlQuery.append(" AND a.userId = :userId");
		if (null != userPackagesDTO.getPackageId())
			sqlQuery.append(" AND a.packageId = :packageId");
		if (null != userPackagesDTO.getPackageActiveDate())
			sqlQuery.append(" AND a.packageActiveDate = :packageActiveDate");
		if (null != userPackagesDTO.getPackageExpiryDate())
			sqlQuery.append(" AND a.packageExpiryDate = :packageExpiryDate");
		if (null != userPackagesDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != userPackagesDTO.getCreatedBy())
			sqlQuery.append(" AND a.createdBy = :createdBy");

		sqlQuery.append(" order by a.id ASC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != userPackagesDTO.getId())
			query.setParameter("id", userPackagesDTO.getId());
		if (null != userPackagesDTO.getUserId())
			query.setParameter("userId", userPackagesDTO.getUserId());
		if (null != userPackagesDTO.getPackageId())
			query.setParameter("packageId", userPackagesDTO.getPackageId());
		if (null != userPackagesDTO.getPackageActiveDate())
			query.setParameter("packageActiveDate", userPackagesDTO.getPackageActiveDate());
		if (null != userPackagesDTO.getPackageExpiryDate())
			query.setParameter("packageExpiryDate", userPackagesDTO.getPackageExpiryDate());
		if (null != userPackagesDTO.getStatus())
			query.setParameter("status", userPackagesDTO.getStatus());
		if (null != userPackagesDTO.getCreatedBy())
			query.setParameter("createdBy", userPackagesDTO.getCreatedBy());

		returnList = query.getResultList();
		return returnList;
	}

	@Override
	public UserPackages getUserPackageById(Long id) {
		Optional<UserPackages> db = userPackagesRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user package not found in the system. id:" + id);
		return db.get();
	}

	@Override
	public List<UserPackagesDTO> getUserPackagesList(UserPackagesDTO userPackagesDTO) {
		List<UserPackagesDTO> returnList = new ArrayList<UserPackagesDTO>();
		StringBuilder sqlQuery = new StringBuilder("");

		sqlQuery.append(
				"SELECT  p.package_name, p.listing_type, p.duration_in_days, p.no_of_listings, p.country, p.state, p.district, p.mrp,"
				+ " p.discount, p.selling_price, p.description,"
						+"p.status,"
				+ " up.package_active_date, up.package_expiry_date,"
				+ " COUNT(pi.id) AS noOfPostings");
		sqlQuery.append(" FROM user_packages up" + " LEFT JOIN packages p ON p.id = up.package_id"
				+ " LEFT JOIN properties pi ON pi.user_package_id = up.id WHERE up.status IN ('Active','Expired')");

		
		
		if (null != userPackagesDTO.getUserId())
			sqlQuery.append(" AND up.user_id = '" + userPackagesDTO.getUserId() + "'");

		sqlQuery.append(
				" GROUP BY p.package_name, p.listing_type, p.duration_in_days, p.no_of_listings, p.country, p.state, p.district, p.mrp,"
				+ " p.discount, p.status, p.selling_price, p.description, up.package_active_date, up.package_expiry_date ");

		sqlQuery.append(";");

		Query query = entityManager.createNativeQuery(sqlQuery.toString());

		List<Object[]> retList = query.getResultList();
		UserPackagesDTO userPackageDTO = null;
		for (Object[] object : retList) {
			userPackageDTO = new UserPackagesDTO();
			if (null != object[0])
				userPackageDTO.setPackageName(String.valueOf(object[0]));

			if (null != object[1])
				userPackageDTO.setListingType(String.valueOf(object[1]));

			if (null != object[2])
				userPackageDTO.setDurationInDays(String.valueOf(object[2]));

			if (null != object[3])
				userPackageDTO.setNoOfListings(String.valueOf(object[3]));


			if (null != object[4])
				userPackageDTO.setCountry(String.valueOf(object[4]));

			if (null != object[5])
				userPackageDTO.setState(String.valueOf(object[5]));

			if (null != object[6])
				userPackageDTO.setDistrict(String.valueOf(object[6]));
			if (null != object[7])
				userPackageDTO.setMrp(new BigDecimal(object[7].toString()));
			if (null != object[8])
				userPackageDTO.setDiscount(new BigDecimal(object[8].toString()));
			if (null != object[9])
				userPackageDTO.setSellingPrice(new BigDecimal(object[9].toString()));
			if (null != object[10])
				userPackageDTO.setDescription(String.valueOf(object[10]));

			if (null != object[11])
				userPackageDTO.setStatus(String.valueOf(object[11]));

			
			
			if (null != object[12])
				userPackageDTO.setPackageActiveDate(String.valueOf(object[12]));
			if (null != object[13])
				userPackageDTO.setPackageExpiryDate(String.valueOf(object[13]));
			if (null != object[14])
				userPackageDTO.setNoOfPostings(String.valueOf(object[14]));
			returnList.add(userPackageDTO);

		}

		return returnList;
	}

}
