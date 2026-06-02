package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.LeadHistory;

@Repository
public interface LeadHistoryRepository extends JpaRepository<LeadHistory, Long> {

	@Query("select u from LeadHistory u where u.leadId=:leadId")
	List<LeadHistory> getLeadHistoryByleadId(@Param("leadId") Long leadId);
	
	
	
	
	

}
