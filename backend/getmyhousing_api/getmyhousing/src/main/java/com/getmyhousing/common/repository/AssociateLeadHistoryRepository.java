package com.getmyhousing.common.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.AssociateLeadHistory;
import com.getmyhousing.common.dto.AssociateLeadHistoryDTO;


@Repository
public interface AssociateLeadHistoryRepository extends JpaRepository<AssociateLeadHistory, Long> {

	
	
	@Query("SELECT u FROM AssociateLeadHistory u WHERE u.associateLeadId = :associateLeadId")
	List<AssociateLeadHistory> findAllByLeadId(@Param("associateLeadId") Long associateLeadId);

}
