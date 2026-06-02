package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserPackages;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query("select u from User u where u.email=:email")
	User getUserByEmail(@Param("email") String email);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.createdBy = :createdBy")
    long countByCreatedBy(@Param("createdBy") Long createdBy);
	
	@Query("select u from User u where u.pincode=:pincode")
	List<User> findAllByPincode(@Param("pincode") String pincode);

	
//	@Query(value = "SELECT * FROM user_packages WHERE id = :userPackageId", nativeQuery = true)
//	User findByUserId3(@Param("userPackageId") Long userPackageId);

}
