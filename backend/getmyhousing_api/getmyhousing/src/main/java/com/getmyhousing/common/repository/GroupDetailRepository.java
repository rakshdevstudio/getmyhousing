package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.GroupDetail;


@Repository
public interface GroupDetailRepository extends JpaRepository<GroupDetail, Long> {

	
	@Query(value = "SELECT * FROM group_detail o WHERE o.group_name = :groupName ", nativeQuery = true)
	List<GroupDetail> findByGroupName(@Param("groupName") String groupName);

	

}



