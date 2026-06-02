package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.UserRole;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

	@Modifying
	@Query("DELETE FROM UserRole u WHERE u.userId = :userId")
	void deleteUserRoleByPropertyId(@Param("userId") Long userId);
	
	
	
	@Query("select u from UserRole u where u.userId=:userId")
	UserRole getUserRoleByUserId(@Param("userId") Long userId);


	@Query("select u from UserRole u where u.userId=:userId")
	List<UserRole> findByUserId(Long userId);
	
	// This will retrieve all UserRole entries where userId is in the provided list
    List<UserRole> findByUserIdIn(List<Long> userIds);
	
	
//	@Query("select u from UserRole u where u.userId=:userId and u.role='Telecaller' or u.role='Team Leader' or u.role='Telecaller'  ")
//	List<UserRole> findByUserIdForAssign(Long userId);
	
	
	@Query("SELECT u FROM UserRole u WHERE u.userId = :userId AND (u.role = 'Telecaller' OR u.role = 'Team Leader' or u.role='Associate' )")
	List<UserRole> findByUserIdForAssign(Long userId);


	@Transactional
	@Modifying
	@Query("DELETE FROM UserRole u WHERE u.userId = :userId")
	void deleteByUserId(@Param("userId") Long userId);

}