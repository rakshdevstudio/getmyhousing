package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.getmyhousing.common.domain.PropertyGroup;


@Repository
public interface PropertyGroupRepository extends JpaRepository<PropertyGroup, Long> {
	
	@Query(value = "SELECT * FROM property_group o WHERE o.user_id = :userId ", nativeQuery = true)
	List<PropertyGroup> findByUserId(@Param("userId") long userId);

	
	@Query(value = "SELECT * FROM property_group o WHERE o.group_name = :groupName ", nativeQuery = true)
	List<PropertyGroup> findByGroupName(@Param("groupName") String groupName);


	@Query(value = "SELECT * FROM property_group o WHERE o.property_id = :propertyId ", nativeQuery = true)
	List<PropertyGroup> findAllByPropertyId(@Param("propertyId") Long propertyId);

	@Query(value = "SELECT * FROM property_group o WHERE o.group_id = :groupId ", nativeQuery = true)
	List<PropertyGroup> findByGroupId(long groupId);

	

}








