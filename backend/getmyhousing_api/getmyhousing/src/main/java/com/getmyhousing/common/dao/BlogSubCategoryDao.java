package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.BlogSubCategory;
import com.getmyhousing.common.dto.BlogSubCategoryDTO;

public interface BlogSubCategoryDao {

	public BlogSubCategory saveBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO);

	public List<BlogSubCategory> getAllBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO);

	public BlogSubCategory getBlogSubCategoryById(Long id);

}
