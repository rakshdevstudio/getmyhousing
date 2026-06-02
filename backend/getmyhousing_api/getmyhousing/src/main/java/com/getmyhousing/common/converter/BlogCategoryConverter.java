package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.dto.BlogCategoryDTO;

public class BlogCategoryConverter {
	
	public static BlogCategory getBlogCategoryByBlogCategoryDTO(BlogCategoryDTO blogCategoryDTO) {
		BlogCategory blogCategory = new BlogCategory();

		blogCategory.setId(blogCategoryDTO.getId());
		blogCategory.setCategory(blogCategoryDTO.getCategory());
		blogCategory.setStatus(blogCategoryDTO.getStatus());
		blogCategory.setCreatedBy(blogCategoryDTO.getCreatedBy());
		blogCategory.setCreatedDate(blogCategoryDTO.getCreatedDate());
		blogCategory.setUpdatedBy(blogCategoryDTO.getUpdatedBy());
		blogCategory.setUpdatedDate(blogCategoryDTO.getUpdatedDate());
		return blogCategory;
	}
	
	public static BlogCategoryDTO getBlogCategoryDTOByBlogCategory(BlogCategory blogCategory) {
		BlogCategoryDTO blogCategoryDTO = new BlogCategoryDTO();

		blogCategoryDTO.setId(blogCategory.getId());
		blogCategoryDTO.setCategory(blogCategory.getCategory());
		blogCategoryDTO.setStatus(blogCategory.getStatus());
		blogCategoryDTO.setCreatedBy(blogCategory.getCreatedBy());
		blogCategoryDTO.setCreatedDate(blogCategory.getCreatedDate());
		blogCategoryDTO.setUpdatedBy(blogCategory.getUpdatedBy());
		blogCategoryDTO.setUpdatedDate(blogCategory.getUpdatedDate());
		return blogCategoryDTO;
	}

}
