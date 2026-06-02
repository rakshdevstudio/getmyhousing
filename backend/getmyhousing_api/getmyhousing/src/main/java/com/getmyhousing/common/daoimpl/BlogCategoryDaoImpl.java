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

import com.getmyhousing.common.converter.BlogCategoryConverter;
import com.getmyhousing.common.dao.BlogCategoryDao;
import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.dto.BlogCategoryDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.BlogCategoryRepository;

@Service("BlogCategoryDaoImpl")
public class BlogCategoryDaoImpl implements BlogCategoryDao {

	private Logger LOGGER = LoggerFactory.getLogger(BlogCategoryDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private BlogCategoryRepository blogCategoryRepository;

	@Override
	public BlogCategory saveBlogCategory(BlogCategoryDTO blogCategoryDTO) {
		BlogCategory blogCategory = BlogCategoryConverter.getBlogCategoryByBlogCategoryDTO(blogCategoryDTO);
		blogCategory = blogCategoryRepository.save(blogCategory);
		return blogCategory;

	}

	@Override
	public List<BlogCategory> getAllBlogCategory(BlogCategoryDTO blogCategoryDTO) {
		List<BlogCategory> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from BlogCategory a where 1=1");

		if (null != blogCategoryDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != blogCategoryDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != blogCategoryDTO.getCategory())
			sqlQuery.append(" AND a.category = :category");
		if (null != blogCategoryDTO.getIdList() && blogCategoryDTO.getIdList().size() > 0)
			sqlQuery.append(" AND a.id IN :idList");

		sqlQuery.append(" ORDER by a.id DESC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != blogCategoryDTO.getId())
			query.setParameter("id", blogCategoryDTO.getId());
		if (null != blogCategoryDTO.getStatus())
			query.setParameter("status", blogCategoryDTO.getStatus());
		if (null != blogCategoryDTO.getCategory())
			query.setParameter("category", blogCategoryDTO.getCategory());
		if (null != blogCategoryDTO.getIdList() && blogCategoryDTO.getIdList().size() > 0)
			query.setParameter("idList", blogCategoryDTO.getIdList());

		// query.setFirstResult(cartDTO.getOffset());
		// query.setMaxResults(cartDTO.getLimit());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public BlogCategory getBlogCategoryById(Long id) {
		Optional<BlogCategory> blogCategory = blogCategoryRepository.findById(id);
		if (!blogCategory.isPresent())
			throw new ResourceNotFoundException("Resource BlogCategory not found id:" + id);
		return blogCategory.get();
	}

}
