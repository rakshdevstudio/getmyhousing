package com.getmyhousing.common.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.Lead;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    @Query("select u from Lead u where u.propertyId=:propertyId")
    Lead getLeadByPropertyId(@Param("propertyId") Long propertyId);
    
    List<Lead> findByEmailAndMobileNumberAndPropertyId(String email, String phoneNumber, Long propertyId);

    @Query("select u from Lead u where u.assignedTo IS NULL ")
    List<Lead> getLeadByAssignedTo(@Param("assignedTo") Long assignedTo);

    @Query("select u from Lead u where u.createdBy = :id and u.leadType = 'Customer'")
    List<Lead> getLeadByUserId(@Param("id") Long id);
    
    List<Lead> findAllByLeadProviderId(long userId);
    
    List<Lead> findAllByPropertyId(long propertyId);
    
    List<Lead> findAllByAssignedTo(long userId);

}
