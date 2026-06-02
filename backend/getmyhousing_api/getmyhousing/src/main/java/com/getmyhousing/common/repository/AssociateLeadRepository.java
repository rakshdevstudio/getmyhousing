package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.AssociateLead;

@Repository
public interface AssociateLeadRepository extends JpaRepository<AssociateLead, Long> {

//	List<AssociateLead> findByCreatedBy(Long userId);

	
	@Query("select u from AssociateLead u where u.createdBy = :userId")
	List<AssociateLead> findByCreatedBy(@Param("userId") Long userId);
	
	@Query("select u from AssociateLead u where u.assignedTo = :userId")
	List<AssociateLead> findByAssignedTo(@Param("userId") Long userId);

	
}
