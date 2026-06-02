package com.getmyhousing.rental.service;

import java.util.List;

import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.domain.BlogSubCategory;
import com.getmyhousing.common.dto.BlogCategoryDTO;
import com.getmyhousing.common.dto.BlogDTO;
import com.getmyhousing.common.dto.BlogSubCategoryDTO;

public interface BlogService {

	// To save blogCategory
	public void saveBlogCategory(BlogCategoryDTO blogCategoryDTO);

	// To save blogSubCategory
	public void saveBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO);

	// To save Blog
	public void saveBlog(BlogDTO blogDTO);

	// To get all BlogCategories
	public List<BlogCategory> getAllBlogCategory(BlogCategoryDTO blogCategoryDTO);

	// To get all blogSubCategory
	public List<BlogSubCategory> getAllBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO);

	// To get all blogs
	public List<BlogDTO> getAllBlogs(BlogDTO blogDTO);

	// To update BlogCategory
	public void updateBlogCategory(BlogCategoryDTO blogCategoryDTO);

	// To get blog by id
	public BlogDTO getBlogById(BlogDTO blogDTO);

	// To update blog subcategory
	public void updateBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO);

	// To update blog
	public void updateBlog(BlogDTO blogDTO);

	// To approve/reject blog
	public void reviewBlog(BlogDTO blogDTO);

	// To get all categoryHierachy
	public List<BlogCategoryDTO> getBlogCategoryHierachy(BlogCategoryDTO blogCategoryDTO);

}
