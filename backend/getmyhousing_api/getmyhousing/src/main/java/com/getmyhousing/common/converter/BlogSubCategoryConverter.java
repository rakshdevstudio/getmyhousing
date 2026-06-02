package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.BlogSubCategory;
import com.getmyhousing.common.dto.BlogSubCategoryDTO;

public class BlogSubCategoryConverter {
	
	public static BlogSubCategory getBlogSubCategoryByBlogSubCategoryDTO(BlogSubCategoryDTO blogSubCategoryDTO) {
		BlogSubCategory blogSubCategory = new BlogSubCategory();

		blogSubCategory.setId(blogSubCategoryDTO.getId());
		blogSubCategory.setCategoryId(blogSubCategoryDTO.getCategoryId());
		blogSubCategory.setSubCategory(blogSubCategoryDTO.getSubCategory());
		blogSubCategory.setStatus(blogSubCategoryDTO.getStatus());
		blogSubCategory.setCreatedBy(blogSubCategoryDTO.getCreatedBy());
		blogSubCategory.setCreatedDate(blogSubCategoryDTO.getCreatedDate());
		blogSubCategory.setUpdatedBy(blogSubCategoryDTO.getUpdatedBy());
		blogSubCategory.setUpdatedDate(blogSubCategoryDTO.getUpdatedDate());

		return blogSubCategory;
	}
	
	public static BlogSubCategoryDTO getBlogSubCategoryDTOByBlogSubCategory(BlogSubCategory blogSubCategory) {
		BlogSubCategoryDTO blogSubCategoryDTO = new BlogSubCategoryDTO();

		blogSubCategoryDTO.setId(blogSubCategory.getId());
		blogSubCategoryDTO.setCategoryId(blogSubCategory.getCategoryId());
		blogSubCategoryDTO.setSubCategory(blogSubCategory.getSubCategory());
		blogSubCategoryDTO.setStatus(blogSubCategory.getStatus());
		blogSubCategoryDTO.setCreatedBy(blogSubCategory.getCreatedBy());
		blogSubCategoryDTO.setCreatedDate(blogSubCategory.getCreatedDate());
		blogSubCategoryDTO.setUpdatedBy(blogSubCategory.getUpdatedBy());
		blogSubCategoryDTO.setUpdatedDate(blogSubCategory.getUpdatedDate());

		return blogSubCategoryDTO;
	}

}
