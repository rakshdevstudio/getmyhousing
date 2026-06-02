package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.ContactUsData;

@Repository
public interface ContactUsDataRepository extends JpaRepository<ContactUsData, Long> {

}
