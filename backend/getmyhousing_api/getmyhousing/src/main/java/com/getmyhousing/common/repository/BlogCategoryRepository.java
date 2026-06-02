package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.BlogCategory;

@Repository
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {

}
