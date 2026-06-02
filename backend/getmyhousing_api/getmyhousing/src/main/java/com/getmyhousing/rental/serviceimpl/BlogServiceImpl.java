package com.getmyhousing.rental.serviceimpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.cache.UserCache;
import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.BlogCategoryConverter;
import com.getmyhousing.common.converter.BlogConverter;
import com.getmyhousing.common.converter.BlogSubCategoryConverter;
import com.getmyhousing.common.dao.BlogCategoryDao;
import com.getmyhousing.common.dao.BlogDao;
import com.getmyhousing.common.dao.BlogSubCategoryDao;
import com.getmyhousing.common.domain.Blog;
import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.domain.BlogSubCategory;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.BlogCategoryDTO;
import com.getmyhousing.common.dto.BlogDTO;
import com.getmyhousing.common.dto.BlogSubCategoryDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.exception.UnAuthorizedException;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.validator.RoleEnum;
import com.getmyhousing.rental.service.BlogService;

@Service("BlogServiceImpl")
public class BlogServiceImpl implements BlogService {

	private static Logger LOGGER = LoggerFactory.getLogger(BlogServiceImpl.class);

	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;

	@Resource(name = "BlogCategoryDaoImpl")
	private BlogCategoryDao blogCategoryDao;

	@Resource(name = "BlogDaoImpl")
	private BlogDao blogDao;

	@Resource(name = "BlogSubCategoryDaoImpl")
	private BlogSubCategoryDao blogSubCategoryDao;

	@Autowired
	UserCache userCache;

	@Override
	public void saveBlogCategory(BlogCategoryDTO blogCategoryDTO) {

		// To check authorization for admin and blogAuthor
		checkAuthForAdminAndBlogModerator(blogCategoryDTO.getCreatedBy());

		// Save blogCategory
		blogCategoryDao.saveBlogCategory(blogCategoryDTO);
		LOGGER.info("BlogCategory added successfully by " + blogCategoryDTO.getCreatedBy());
	}

	@Override
	public void saveBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO) {

		// To check authorization for admin and blogAuthor
		checkAuthForAdminAndBlogModerator(blogSubCategoryDTO.getCreatedBy());

		// Check categoryId is present in db or not
		blogCategoryDao.getBlogCategoryById(blogSubCategoryDTO.getCategoryId());

		// Save BlogSubCategory details
		blogSubCategoryDao.saveBlogSubCategory(blogSubCategoryDTO);
		LOGGER.info("BlogSubCategory added successfully by " + blogSubCategoryDTO.getCreatedBy());
	}

	@Override
	public void saveBlog(BlogDTO blogDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole(),
				RoleEnum.BLOG_AUTHOR.getRole(), RoleEnum.ASSOCIATE.getRole());
		boolean userAcccess = loginService.isUserAccessible(blogDTO.getCreatedBy(), roleList);
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to add/update blog API details.");

		// Check categoryId is present in db or not
		if (null != blogDTO.getCategoryId())
			blogCategoryDao.getBlogCategoryById(blogDTO.getCategoryId());

		// Check subCategoryId is present in db or not
		if (null != blogDTO.getSubCategoryId())
			blogSubCategoryDao.getBlogSubCategoryById(blogDTO.getSubCategoryId());

		// Save blog details
		blogDao.saveBlog(blogDTO);
		LOGGER.info("Blog added successfully by " + blogDTO.getCreatedBy());
	}

	@Override
	public List<BlogCategory> getAllBlogCategory(BlogCategoryDTO blogCategoryDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole(),
				RoleEnum.BLOG_AUTHOR.getRole());
		boolean userAcccess = loginService.isUserAccessible(blogCategoryDTO.getUpdatedBy(), roleList);
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to getBlogCategories API details.");

		return blogCategoryDao.getAllBlogCategory(blogCategoryDTO);
	}

	@Override
	public List<BlogSubCategory> getAllBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole(),
				RoleEnum.BLOG_AUTHOR.getRole());
		boolean userAcccess = loginService.isUserAccessible(blogSubCategoryDTO.getUpdatedBy(), roleList);
		if (!userAcccess)
			throw new UnAuthorizedException(
					"LogedIn User does't have permissions to getBlogSubCategories API details.");

		return blogSubCategoryDao.getAllBlogSubCategory(blogSubCategoryDTO);
	}

	@Override
	public List<BlogDTO> getAllBlogs(BlogDTO blogDTO) {
		boolean internalEmpFlag = false;
		if (null != blogDTO.getUpdatedBy()) {
			List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole(),
					RoleEnum.BLOG_AUTHOR.getRole());
			internalEmpFlag = loginService.isUserAccessible(blogDTO.getUpdatedBy(), roleList);

		}

		// If logedIn user is not employee set status active
		if (!internalEmpFlag)
			blogDTO.setStatus(Constant.STATUS_ACTIVE);

		List<BlogDTO> returnList = new ArrayList<BlogDTO>();
		List<Blog> blogList = blogDao.getAllBlog(blogDTO);
		// Order by updated date DESC
		Collections.sort(blogList,
				Comparator.comparing(Blog::getUpdatedDate, Comparator.nullsLast(Comparator.reverseOrder())));

		List<Long> categoryIds = blogList.stream().filter(x -> null != x.getCategoryId()).map(Blog::getCategoryId)
				.collect(Collectors.toList());

		List<Long> subCategoryIds = blogList.stream().filter(x -> null != x.getSubCategoryId())
				.map(Blog::getSubCategoryId).collect(Collectors.toList());

		BlogCategoryDTO categoryDTO = new BlogCategoryDTO();
		categoryDTO.setIdList(categoryIds);
		List<BlogCategory> categoryList = blogCategoryDao.getAllBlogCategory(categoryDTO);
		Map<Long, BlogCategory> categoryMap = categoryList.stream()
				.collect(Collectors.toMap(BlogCategory::getId, Function.identity()));

		BlogSubCategoryDTO subCategoryDTO = new BlogSubCategoryDTO();
		subCategoryDTO.setIdList(subCategoryIds);
		List<BlogSubCategory> subCategoryList = blogSubCategoryDao.getAllBlogSubCategory(subCategoryDTO);
		Map<Long, BlogSubCategory> subCategoryMap = subCategoryList.stream()
				.collect(Collectors.toMap(BlogSubCategory::getId, Function.identity()));

		for (Blog blog : blogList) {
			BlogDTO dbBlogDTO = BlogConverter.getBlogDTOByBlog(blog);
			dbBlogDTO.setBlogAuthorName(userCache.getUser(dbBlogDTO.getCreatedBy()).getFullName());

			if (null != dbBlogDTO.getCategoryId())
				dbBlogDTO.setCategoryName(categoryMap.get(dbBlogDTO.getCategoryId()).getCategory());

			if (null != dbBlogDTO.getSubCategoryId())
				dbBlogDTO.setSubCategoryName(subCategoryMap.get(dbBlogDTO.getSubCategoryId()).getSubCategory());

			returnList.add(dbBlogDTO);
		}

		return returnList;
	}

	@Override
	public BlogDTO getBlogById(BlogDTO blogDTO) {
		boolean internalEmpFlag = false;
		if (null != blogDTO.getUpdatedBy()) {
			List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole(),
					RoleEnum.BLOG_AUTHOR.getRole());
			internalEmpFlag = loginService.isUserAccessible(blogDTO.getUpdatedBy(), roleList);
		}

		Blog dbblog = blogDao.getBlogById(blogDTO.getId());
		BlogDTO dbBlogDTO = BlogConverter.getBlogDTOByBlog(dbblog);
		if (!internalEmpFlag) {
			if (!Constant.STATUS_ACTIVE.equals(dbblog.getStatus()))
				throw new ResourceNotFoundException("Resource Blog not found with Active status Id:" + blogDTO.getId());
		}

		dbBlogDTO.setBlogAuthorName(userCache.getUser(dbBlogDTO.getCreatedBy()).getFullName());
		if (null != dbBlogDTO.getCategoryId())
			dbBlogDTO.setCategoryName(blogCategoryDao.getBlogCategoryById(dbBlogDTO.getCategoryId()).getCategory());

		if (null != dbBlogDTO.getSubCategoryId())
			dbBlogDTO.setSubCategoryName(
					blogSubCategoryDao.getBlogSubCategoryById(dbBlogDTO.getSubCategoryId()).getSubCategory());

		return dbBlogDTO;
	}

	@Override
	public void updateBlogCategory(BlogCategoryDTO blogCategoryDTO) {

		// To check authorization for admin and blogAuthor
		checkAuthForAdminAndBlogModerator(blogCategoryDTO.getUpdatedBy());

		// To check id is in db or not and update
		BlogCategory blogCategory = blogCategoryDao.getBlogCategoryById(blogCategoryDTO.getId());
		BlogCategoryDTO dbBlogCategoryDTO = BlogCategoryConverter.getBlogCategoryDTOByBlogCategory(blogCategory);

		// Check BlogCategoryId is present in blog table or not
		if (null != blogCategoryDTO.getStatus() && Constant.STATUS_DELETED.equals(blogCategoryDTO.getStatus())) {
			BlogDTO blogDTO = new BlogDTO();
			blogDTO.setCategoryId(blogCategoryDTO.getId());
			blogDTO.setLimit(100);
			List<Blog> blogList = blogDao.getAllBlog(blogDTO);
			if (null != blogList && blogList.size() > 0)
				throw new FieldException("You cannot delete the blogCategory, it is linked with blog.");

			dbBlogCategoryDTO.setStatus(blogCategoryDTO.getStatus());
		}

		if (null != blogCategoryDTO.getCategory())
			dbBlogCategoryDTO.setCategory(blogCategoryDTO.getCategory());

		dbBlogCategoryDTO.setUpdatedBy(blogCategoryDTO.getUpdatedBy());
		dbBlogCategoryDTO.setUpdatedDate(blogCategoryDTO.getUpdatedDate());
		blogCategoryDao.saveBlogCategory(dbBlogCategoryDTO);
		LOGGER.info("BlogCategory " + blogCategoryDTO.getId() + " updated successfully by "
				+ blogCategoryDTO.getUpdatedBy());

	}

	@Override
	public void updateBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO) {

		// To check authorization for admin and blogAuthor
		checkAuthForAdminAndBlogModerator(blogSubCategoryDTO.getUpdatedBy());

		// To check id is in db or not
		BlogSubCategory blogSubCategory = blogSubCategoryDao.getBlogSubCategoryById(blogSubCategoryDTO.getId());
		BlogSubCategoryDTO dbBlogSubCategoryDTO = BlogSubCategoryConverter
				.getBlogSubCategoryDTOByBlogSubCategory(blogSubCategory);

		// Check BlogSubCategoryId is present in blog table or not
		if (null != blogSubCategoryDTO.getStatus() && Constant.STATUS_DELETED.equals(blogSubCategoryDTO.getStatus())) {
			BlogDTO blogDTO = new BlogDTO();
			blogDTO.setSubCategoryId(blogSubCategoryDTO.getId());
			blogDTO.setLimit(100);
			List<Blog> blogList = blogDao.getAllBlog(blogDTO);
			if (null != blogList && blogList.size() > 0)
				throw new FieldException("You cannot delete the blogSubCategory, it is linked with blogg.");

			dbBlogSubCategoryDTO.setStatus(blogSubCategoryDTO.getStatus());
		}

		if (null != blogSubCategoryDTO.getCategoryId()) {
			blogCategoryDao.getBlogCategoryById(blogSubCategoryDTO.getCategoryId());
			dbBlogSubCategoryDTO.setCategoryId(blogSubCategoryDTO.getCategoryId());
		}

		if (null != blogSubCategoryDTO.getSubCategory())
			dbBlogSubCategoryDTO.setSubCategory(blogSubCategoryDTO.getSubCategory());

		dbBlogSubCategoryDTO.setUpdatedBy(blogSubCategoryDTO.getUpdatedBy());
		dbBlogSubCategoryDTO.setUpdatedDate(blogSubCategoryDTO.getUpdatedDate());
		blogSubCategoryDao.saveBlogSubCategory(dbBlogSubCategoryDTO);
		LOGGER.info("BlogSubCategory " + blogSubCategoryDTO.getId() + " updated successfully by "
				+ blogSubCategoryDTO.getUpdatedBy());
	}

	@Override
	public void updateBlog(BlogDTO blogDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole(),
				RoleEnum.BLOG_AUTHOR.getRole());
		boolean userAcccess = loginService.isUserAccessible(blogDTO.getUpdatedBy(), roleList);
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to add/update blog API details.");

		// To check id is present in db or not
		Blog blog = blogDao.getBlogById(blogDTO.getId());
		BlogDTO dbBlogDTO = BlogConverter.getBlogDTOByBlog(blog);

		if (null != blogDTO.getBlogTitle())
			dbBlogDTO.setBlogTitle(blogDTO.getBlogTitle());

		if (null != blogDTO.getBlogContent())
			dbBlogDTO.setBlogContent(blogDTO.getBlogContent());

		if (null != blogDTO.getBannerImageUrl())
			dbBlogDTO.setBannerImageUrl(blogDTO.getBannerImageUrl());

		if (null != blogDTO.getCategoryId()) {
			blogCategoryDao.getBlogCategoryById(blogDTO.getCategoryId());
			dbBlogDTO.setCategoryId(blogDTO.getCategoryId());
		}

		if (null != blogDTO.getSubCategoryId()) {
			blogSubCategoryDao.getBlogSubCategoryById(blogDTO.getSubCategoryId());
			dbBlogDTO.setSubCategoryId(blogDTO.getSubCategoryId());
		}

		if (null != blogDTO.getSlug())
			dbBlogDTO.setSlug(blogDTO.getSlug());

		if (null != blogDTO.getMetaTitle())
			dbBlogDTO.setMetaTitle(blogDTO.getMetaTitle());

		if (null != blogDTO.getMetaDescription())
			dbBlogDTO.setMetaDescription(blogDTO.getMetaDescription());

		if (null != blogDTO.getKeywords())
			dbBlogDTO.setKeywords(blogDTO.getKeywords());

		dbBlogDTO.setStatus(Constant.STATUS_PENDING_APPROVAL);
		if (null != blogDTO.getStatus() && Constant.STATUS_DELETED.equals(blogDTO.getStatus()))
			dbBlogDTO.setStatus(blogDTO.getStatus());

		dbBlogDTO.setApprovalStatus(Constant.STATUS_PENDING);
		dbBlogDTO.setUpdatedBy(blogDTO.getUpdatedBy());
		dbBlogDTO.setUpdatedDate(blogDTO.getUpdatedDate());
		blogDao.saveBlog(dbBlogDTO);
		LOGGER.info("Blog " + blogDTO.getId() + " updated successfully by " + blogDTO.getUpdatedBy());
	}

	@Override
	public void reviewBlog(BlogDTO blogDTO) {
		List<UserRole> userRoles = loginService.getAllUserRoles(blogDTO.getUpdatedBy());
		boolean blogModeratorFlag = userRoles.stream()
				.anyMatch(x -> x.getRole().equals(RoleEnum.BLOG_MODERATOR.getRole()));
		boolean adminFlag = userRoles.stream().anyMatch(x -> x.getRole().equals(RoleEnum.ADMIN.getRole()));

		if (!(blogModeratorFlag || adminFlag))
			throw new UnAuthorizedException("LogedIn User does't have permissions to review blog details.");

		// To check id is present in db or not
		Blog blog = blogDao.getBlogById(blogDTO.getId());
		BlogDTO dbBlogDTO = BlogConverter.getBlogDTOByBlog(blog);

		// Check blogModerator cannot review his own Blog
		if (blogModeratorFlag) {
			if (blogDTO.getUpdatedBy().equals(dbBlogDTO.getCreatedBy()))
				throw new FieldException("BlogModerator cannot review his own Blog");

		}

		if (Constant.STATUS_APPROVED.equals(blogDTO.getStatus())) {
			dbBlogDTO.setStatus(Constant.STATUS_ACTIVE);
			dbBlogDTO.setApprovalStatus(Constant.STATUS_APPROVED);
		} else {
			dbBlogDTO.setStatus(blogDTO.getStatus());
			dbBlogDTO.setApprovalStatus(blogDTO.getStatus());
		}

		dbBlogDTO.setApprovalActionBy(blogDTO.getUpdatedBy());
		dbBlogDTO.setApprovalActionOn(blogDTO.getUpdatedDate());
		dbBlogDTO.setApprovalRemarks(blogDTO.getApprovalRemarks());
		dbBlogDTO.setUpdatedBy(blogDTO.getUpdatedBy());
		dbBlogDTO.setUpdatedDate(blogDTO.getUpdatedDate());
		blogDao.saveBlog(dbBlogDTO);
		LOGGER.info("Blog " + blogDTO.getId() + " reviwed with status " + blogDTO.getStatus() + " successfully");
	}

	@Override
	public List<BlogCategoryDTO> getBlogCategoryHierachy(BlogCategoryDTO blogCategoryDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole(),
				RoleEnum.BLOG_AUTHOR.getRole());
//		boolean userAcccess = loginService.isUserAccessible(blogCategoryDTO.getUpdatedBy(), roleList);
//		if (!userAcccess)
//			throw new UnAuthorizedException("LogedIn User does't have permissions to getBlogCategoryHierachy details.");

		List<BlogCategoryDTO> returnList = new ArrayList<BlogCategoryDTO>();
		List<BlogCategory> categoryList = blogCategoryDao.getAllBlogCategory(blogCategoryDTO);
		if (null == categoryList || categoryList.size() == 0)
			return returnList;

		// Collect all ids
		List<Long> idList = categoryList.stream().map(BlogCategory::getId).collect(Collectors.toList());
		BlogSubCategoryDTO subCatgrydto = new BlogSubCategoryDTO();
		subCatgrydto.setCategoryIdList(idList);
		subCatgrydto.setStatus(Constant.STATUS_ACTIVE);
		List<BlogSubCategory> subCatgryList = blogSubCategoryDao.getAllBlogSubCategory(subCatgrydto);

		Map<Long, List<BlogSubCategory>> subCatgryMap = subCatgryList.stream()
				.collect(Collectors.groupingBy(BlogSubCategory::getCategoryId));

		for (BlogCategory blogCategory : categoryList) {
			BlogCategoryDTO catgryDTO = BlogCategoryConverter.getBlogCategoryDTOByBlogCategory(blogCategory);
			catgryDTO.setSubCategories(subCatgryMap.get(blogCategory.getId()));
			returnList.add(catgryDTO);
		}

		return returnList;
	}

	/**
	 * To check auhtorization for admin and Blog Moderator
	 * 
	 * @param userId
	 */
	private void checkAuthForAdminAndBlogModerator(Long userId) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.BLOG_MODERATOR.getRole());
		boolean userAcccess = loginService.isUserAccessible(userId, roleList);
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to add/update blog API details.");

	}

}
