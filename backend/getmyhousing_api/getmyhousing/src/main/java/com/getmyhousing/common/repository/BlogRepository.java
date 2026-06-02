package com.getmyhousing.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.getmyhousing.common.domain.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

}
