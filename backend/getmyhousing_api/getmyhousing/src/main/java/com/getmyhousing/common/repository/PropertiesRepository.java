package com.getmyhousing.common.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.dto.PropertiesDTO;

@Repository
public interface PropertiesRepository extends JpaRepository<Properties, Long> {

	List<Properties> findAll();

	@Query("select u from Properties u where u.approvalStatus = 'Active' ORDER BY u.id DESC ")
	List<Properties> findInDescOrder();

	@Query("select u from Properties u where u.approvalStatus = 'Active' ORDER BY u.id DESC ")
	List<Properties> findActiveInDescOrder();

	@Query("select u from Properties u where u.id = :id and u.city = :city ORDER BY u.id DESC ")
	List<Properties> findByIdAndCity(Long id, String city);
	
	@Query(value = "SELECT * FROM properties o WHERE o.created_by = :userId2 ", nativeQuery = true)
	List<Properties> findPropertiesByUserId(@Param("userId2") Long userId2);
	
	List<Properties> findAllByCreatedBy(Long userId);
	
}
