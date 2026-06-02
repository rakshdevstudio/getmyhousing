package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.BlogSubCategory;

@Repository
public interface BlogSubCategoryRepository extends JpaRepository<BlogSubCategory, Long> {

}
