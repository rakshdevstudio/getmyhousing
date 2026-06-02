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

import com.getmyhousing.common.converter.UserRoleConverter;
import com.getmyhousing.common.dao.UserRoleDao;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.UserRoleDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.UserRoleRepository;

@Transactional
@Service("UserRoleDaoImpl")
public class UserRoleDaoImpl implements UserRoleDao {

	private Logger LOGGER = LoggerFactory.getLogger(UserDaoImpl.class);

	@Autowired
	UserRoleRepository userRoleRepository;

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public UserRole saveUserRole(UserRoleDTO userRoleDTO) {
		UserRole userRole = UserRoleConverter.getUserRoleByUserRoleDTO(userRoleDTO);		
		return userRoleRepository.save(userRole);
	}

	@Override
	public UserRole getUserRoleById(Long id) {
		Optional<UserRole> db = userRoleRepository.findById(id);
		if (!db.isPresent())
			throw new ResourceNotFoundException("The user property not found in the system. id:" + id);
		return db.get();
	}

	@Override
	public void deleteUserRoleByUserId(Long userId) {
		userRoleRepository.deleteUserRoleByPropertyId(userId);
	}

	@Override
	public List<UserRole> saveAllUserRole(List<UserRoleDTO> roleList) {
		List<UserRole> ll = new ArrayList<UserRole>();
		for (UserRoleDTO userRoleDTO : roleList)
			ll.add(UserRoleConverter.getUserRoleByUserRoleDTO(userRoleDTO));
		return userRoleRepository.saveAll(ll);
	}

	@Override
	public List<UserRole> getAllRoles(UserRoleDTO roleDTO) {
		List<UserRole> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from UserRole a where 1=1");

		if (null != roleDTO.getUserId())
			sqlQuery.append(" AND a.userId = :userId");
		if (null != roleDTO.getRole())
			sqlQuery.append(" AND a.role = :role");
		if (null != roleDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != roleDTO.getRoles() && roleDTO.getRoles().size() > 0)
			sqlQuery.append(" AND a.role IN :roles");

		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != roleDTO.getUserId())
			query.setParameter("userId", roleDTO.getUserId());
		if (null != roleDTO.getRole())
			query.setParameter("role", roleDTO.getRole());
		if (null != roleDTO.getStatus())
			query.setParameter("status", roleDTO.getStatus());
		if (null != roleDTO.getRoles())
			query.setParameter("roles", roleDTO.getRoles());

		// query.setFirstResult(userDTO.getOffset());
		/// query.setMaxResults(userDTO.getLimit());

		returnList = query.getResultList();

		return returnList;
	}
}
