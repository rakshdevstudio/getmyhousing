package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.EasebuzzOrder;

@Repository
public interface EasebuzzOrderRepository extends JpaRepository<EasebuzzOrder, Long> {


	@Query(value = "SELECT nextval('easebuzz_txn_seq');", nativeQuery = true)
	Long getNextSeriesId();
	
}
