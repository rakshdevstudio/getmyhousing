package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.Blog;
import com.getmyhousing.common.dto.BlogDTO;

public interface BlogDao {

	public Blog saveBlog(BlogDTO blogDTO);

	public List<Blog> getAllBlog(BlogDTO blogDTO);

	public Blog getBlogById(Long id);

}
