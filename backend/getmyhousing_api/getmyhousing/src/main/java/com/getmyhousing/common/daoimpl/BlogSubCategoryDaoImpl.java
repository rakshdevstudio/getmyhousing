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

import com.getmyhousing.common.converter.BlogSubCategoryConverter;
import com.getmyhousing.common.dao.BlogSubCategoryDao;
import com.getmyhousing.common.domain.BlogSubCategory;
import com.getmyhousing.common.dto.BlogSubCategoryDTO;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.BlogSubCategoryRepository;

@Service("BlogSubCategoryDaoImpl")
public class BlogSubCategoryDaoImpl implements BlogSubCategoryDao {

	private Logger LOGGER = LoggerFactory.getLogger(BlogSubCategoryDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private BlogSubCategoryRepository blogSubCategoryRepository;

	@Override
	public BlogSubCategory saveBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO) {
		BlogSubCategory blogSubCategory = BlogSubCategoryConverter
				.getBlogSubCategoryByBlogSubCategoryDTO(blogSubCategoryDTO);
		blogSubCategory = blogSubCategoryRepository.save(blogSubCategory);
		return blogSubCategory;

	}

	@Override
	public List<BlogSubCategory> getAllBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO) {
		List<BlogSubCategory> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from BlogSubCategory a where 1=1");

		if (null != blogSubCategoryDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != blogSubCategoryDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != blogSubCategoryDTO.getCategoryId())
			sqlQuery.append(" AND a.categoryId = :categoryId");
		if (null != blogSubCategoryDTO.getSubCategory())
			sqlQuery.append(" AND a.subCategory = :subCategory");
		if (null != blogSubCategoryDTO.getCategoryIdList() && blogSubCategoryDTO.getCategoryIdList().size() > 0)
			sqlQuery.append(" AND a.categoryId IN :categoryIdList");
		if (null != blogSubCategoryDTO.getIdList() && blogSubCategoryDTO.getIdList().size() > 0)
			sqlQuery.append(" AND a.id IN :idList");

		sqlQuery.append(" ORDER by a.id DESC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != blogSubCategoryDTO.getId())
			query.setParameter("id", blogSubCategoryDTO.getId());
		if (null != blogSubCategoryDTO.getCategoryId())
			query.setParameter("categoryId", blogSubCategoryDTO.getCategoryId());
		if (null != blogSubCategoryDTO.getStatus())
			query.setParameter("status", blogSubCategoryDTO.getStatus());
		if (null != blogSubCategoryDTO.getSubCategory())
			query.setParameter("subCategory", blogSubCategoryDTO.getSubCategory());
		if (null != blogSubCategoryDTO.getCategoryIdList() && blogSubCategoryDTO.getCategoryIdList().size() > 0)
			query.setParameter("categoryIdList", blogSubCategoryDTO.getCategoryIdList());
		if (null != blogSubCategoryDTO.getIdList() && blogSubCategoryDTO.getIdList().size() > 0)
			query.setParameter("idList", blogSubCategoryDTO.getIdList());

		// query.setFirstResult(cartDTO.getOffset());
		// query.setMaxResults(cartDTO.getLimit());

		returnList = query.getResultList();

		return returnList;
	}

	@Override
	public BlogSubCategory getBlogSubCategoryById(Long id) {
		Optional<BlogSubCategory> blogSubCategory = blogSubCategoryRepository.findById(id);
		if (!blogSubCategory.isPresent())
			throw new ResourceNotFoundException("Resource BlogSubCategory not found id:" + id);
		return blogSubCategory.get();
	}

}