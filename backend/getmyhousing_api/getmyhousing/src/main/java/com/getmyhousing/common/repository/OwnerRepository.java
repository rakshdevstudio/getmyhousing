package com.getmyhousing.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.Blog;
import com.getmyhousing.common.domain.Owner;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
	
	// Fetch owners created by a specific user
    List<Owner> findByCreatedBy(Long createdBy);

}
