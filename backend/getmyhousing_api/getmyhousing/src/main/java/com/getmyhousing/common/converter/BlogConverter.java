package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.Blog;
import com.getmyhousing.common.dto.BlogDTO;

public class BlogConverter {
	
	public static Blog getBlogByBlogDTO(BlogDTO blogDTO) {
		Blog blog = new Blog();

		blog.setId(blogDTO.getId());
		blog.setBlogTitle(blogDTO.getBlogTitle());
		blog.setBlogContent(blogDTO.getBlogContent());
		blog.setBannerImageUrl(blogDTO.getBannerImageUrl());
		blog.setCategoryId(blogDTO.getCategoryId());
		blog.setSubCategoryId(blogDTO.getSubCategoryId());
		blog.setSlug(blogDTO.getSlug());
		blog.setMetaTitle(blogDTO.getMetaTitle());
		blog.setMetaDescription(blogDTO.getMetaDescription());
		blog.setKeywords(blogDTO.getKeywords());
		blog.setApprovalStatus(blogDTO.getApprovalStatus());
		blog.setApprovalActionBy(blogDTO.getApprovalActionBy());
		blog.setApprovalActionOn(blogDTO.getApprovalActionOn());
		blog.setApprovalRemarks(blogDTO.getApprovalRemarks());
		blog.setStatus(blogDTO.getStatus());
		blog.setCreatedBy(blogDTO.getCreatedBy());
		blog.setCreatedDate(blogDTO.getCreatedDate());
		blog.setUpdatedBy(blogDTO.getUpdatedBy());
		blog.setUpdatedDate(blogDTO.getUpdatedDate());

		return blog;
	}
	
	public static BlogDTO getBlogDTOByBlog(Blog blog) {
		BlogDTO blogDTO = new BlogDTO();

		blogDTO.setId(blog.getId());
		blogDTO.setBlogTitle(blog.getBlogTitle());
		blogDTO.setBlogContent(blog.getBlogContent());
		blogDTO.setBannerImageUrl(blog.getBannerImageUrl());
		blogDTO.setCategoryId(blog.getCategoryId());
		blogDTO.setSubCategoryId(blog.getSubCategoryId());
		blogDTO.setSlug(blog.getSlug());
		blogDTO.setMetaTitle(blog.getMetaTitle());
		blogDTO.setMetaDescription(blog.getMetaDescription());
		blogDTO.setKeywords(blog.getKeywords());
		blogDTO.setApprovalStatus(blog.getApprovalStatus());
		blogDTO.setApprovalActionBy(blog.getApprovalActionBy());
		blogDTO.setApprovalActionOn(blog.getApprovalActionOn());
		blogDTO.setApprovalRemarks(blog.getApprovalRemarks());
		blogDTO.setStatus(blog.getStatus());
		blogDTO.setCreatedBy(blog.getCreatedBy());
		blogDTO.setCreatedDate(blog.getCreatedDate());
		blogDTO.setUpdatedBy(blog.getUpdatedBy());
		blogDTO.setUpdatedDate(blog.getUpdatedDate());

		return blogDTO;
	}

}
