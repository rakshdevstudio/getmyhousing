package com.getmyhousing.common.daoimpl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.converter.BlogConverter;
import com.getmyhousing.common.dao.BlogDao;
import com.getmyhousing.common.domain.Blog;
import com.getmyhousing.common.dto.BlogDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.BlogRepository;

@Service("BlogDaoImpl")
public class BlogDaoImpl implements BlogDao {

	private Logger LOGGER = LoggerFactory.getLogger(BlogDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private BlogRepository blogRepository;

	@Override
	public Blog saveBlog(BlogDTO blogDTO) {
		Blog blog = BlogConverter.getBlogByBlogDTO(blogDTO);
		blog = blogRepository.save(blog);
		return blog;

	}

	@Override
	public List<Blog> getAllBlog(BlogDTO blogDTO) {
		List<Blog> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from Blog a where 1=1");

		if (null != blogDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != blogDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != blogDTO.getCategoryId())
			sqlQuery.append(" AND a.categoryId = :categoryId");
		if (null != blogDTO.getSubCategoryId())
			sqlQuery.append(" AND a.subCategoryId = :subCategoryId");

		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != blogDTO.getId())
			query.setParameter("id", blogDTO.getId());
		if (null != blogDTO.getStatus())
			query.setParameter("status", blogDTO.getStatus());
		if (null != blogDTO.getCategoryId())
			query.setParameter("categoryId", blogDTO.getCategoryId());
		if (null != blogDTO.getSubCategoryId())
			query.setParameter("subCategoryId", blogDTO.getSubCategoryId());

		query.setFirstResult(blogDTO.getOffset());
		query.setMaxResults(blogDTO.getLimit());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public Blog getBlogById(Long id) {
		Optional<Blog> Blog = blogRepository.findById(id);
		if (!Blog.isPresent())
			throw new ResourceNotFoundException("Resource Blog not found id:" + id);
		return Blog.get();
	}

}