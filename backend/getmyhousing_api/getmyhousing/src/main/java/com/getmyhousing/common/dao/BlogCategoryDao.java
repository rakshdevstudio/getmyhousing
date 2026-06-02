package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.dto.BlogCategoryDTO;

public interface BlogCategoryDao {

	public BlogCategory saveBlogCategory(BlogCategoryDTO blogCategoryDTO);

	public List<BlogCategory> getAllBlogCategory(BlogCategoryDTO blogCategoryDTO);

	public BlogCategory getBlogCategoryById(Long id);

}

