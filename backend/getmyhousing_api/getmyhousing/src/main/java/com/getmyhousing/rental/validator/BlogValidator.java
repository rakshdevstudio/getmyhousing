package com.getmyhousing.rental.validator;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.BlogCategoryDTO;
import com.getmyhousing.common.dto.BlogDTO;
import com.getmyhousing.common.dto.BlogSubCategoryDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;

public class BlogValidator implements Validator {

	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;

	private static final List<String> VALID_APPROVAL_STATUS_LIST = Arrays.asList(Constant.STATUS_APPROVED,
			Constant.STATUS_REJECTED);

	@Autowired
	private UserUtils userUtils;

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate(Object target, Errors errors) {
		// TODO Auto-generated method stub

	}

	public void saveBlogCategory(BlogCategoryDTO blogCategoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogCategoryDTO.getCategory()))
			errors.rejectValue("category", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogCategoryDTO.setStatus(Constant.STATUS_ACTIVE);
		blogCategoryDTO.setCreatedBy(logedUserid);
		blogCategoryDTO.setCreatedDate(createDate);

	}

	public void saveBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogSubCategoryDTO.getCategoryId()))
			errors.rejectValue("categoryId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(blogSubCategoryDTO.getSubCategory()))
			errors.rejectValue("subCategory", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogSubCategoryDTO.setStatus(Constant.STATUS_ACTIVE);
		blogSubCategoryDTO.setCreatedBy(logedUserid);
		blogSubCategoryDTO.setCreatedDate(createDate);

	}

	public void saveBlog(BlogDTO blogDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogDTO.getBlogTitle()))
			errors.rejectValue("blogTitle", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(blogDTO.getBlogContent()))
			errors.rejectValue("blogContent", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getBannerImageUrl() && CustomValidator.isEmpty(blogDTO.getBannerImageUrl()))
			errors.rejectValue("bannerImageUrl", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getCategoryId() && CustomValidator.isEmpty(blogDTO.getCategoryId()))
			errors.rejectValue("categoryId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getSubCategoryId() && CustomValidator.isEmpty(blogDTO.getSubCategoryId()))
			errors.rejectValue("subCategoryId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(blogDTO.getSlug()))
			errors.rejectValue("slug", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(blogDTO.getMetaTitle()))
			errors.rejectValue("metaTitle", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(blogDTO.getMetaDescription()))
			errors.rejectValue("metaDescription", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(blogDTO.getKeywords()))
			errors.rejectValue("keywords", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogDTO.setStatus(Constant.STATUS_PENDING_APPROVAL);
		blogDTO.setApprovalStatus(Constant.STATUS_PENDING);
		blogDTO.setCreatedBy(logedUserid);
		blogDTO.setCreatedDate(createDate);

	}

	public void getAllBlogCategory(BlogCategoryDTO blogCategoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		blogCategoryDTO.setUpdatedBy(logedUserid);
		blogCategoryDTO.setUpdatedDate(createDate);

	}

	public void getAllBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		blogSubCategoryDTO.setUpdatedBy(logedUserid);
		blogSubCategoryDTO.setUpdatedDate(createDate);

	}

	public void getAllBlogs(BlogDTO blogDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (0 == blogDTO.getLimit())
			blogDTO.setLimit(10);

		blogDTO.setUpdatedBy(logedUserid);
		blogDTO.setUpdatedDate(createDate);

	}

	public void getBlogById(BlogDTO blogDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogDTO.setUpdatedBy(logedUserid);
		blogDTO.setUpdatedDate(createDate);

	}

	public void updateBlogCategory(BlogCategoryDTO blogCategoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogCategoryDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogCategoryDTO.getCategory() && CustomValidator.isEmpty(blogCategoryDTO.getCategory()))
			errors.rejectValue("category", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogCategoryDTO.getStatus() && !Constant.STATUS_DELETED.equals(blogCategoryDTO.getStatus()))
			errors.rejectValue("status", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogCategoryDTO.setUpdatedBy(logedUserid);
		blogCategoryDTO.setUpdatedDate(createDate);

	}

	public void updateBlogSubCategory(BlogSubCategoryDTO blogSubCategoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogSubCategoryDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogSubCategoryDTO.getCategoryId() && CustomValidator.isEmpty(blogSubCategoryDTO.getCategoryId()))
			errors.rejectValue("categoryId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogSubCategoryDTO.getSubCategory() && CustomValidator.isEmpty(blogSubCategoryDTO.getSubCategory()))
			errors.rejectValue("subCategory", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogSubCategoryDTO.getStatus() && !Constant.STATUS_DELETED.equals(blogSubCategoryDTO.getStatus()))
			errors.rejectValue("status", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogSubCategoryDTO.setUpdatedBy(logedUserid);
		blogSubCategoryDTO.setUpdatedDate(createDate);

	}

	public void updateBlog(BlogDTO blogDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getBlogTitle() && CustomValidator.isEmpty(blogDTO.getBlogTitle()))
			errors.rejectValue("blogTitle", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getBlogContent() && CustomValidator.isEmpty(blogDTO.getBlogContent()))
			errors.rejectValue("blogContent", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getBannerImageUrl() && CustomValidator.isEmpty(blogDTO.getBannerImageUrl()))
			errors.rejectValue("bannerImageUrl", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getCategoryId() && CustomValidator.isEmpty(blogDTO.getCategoryId()))
			errors.rejectValue("categoryId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getSubCategoryId() && CustomValidator.isEmpty(blogDTO.getSubCategoryId()))
			errors.rejectValue("subCategoryId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getSlug() && CustomValidator.isEmpty(blogDTO.getSlug()))
			errors.rejectValue("slug", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getMetaTitle() && CustomValidator.isEmpty(blogDTO.getMetaTitle()))
			errors.rejectValue("metaTitle", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getMetaDescription() && CustomValidator.isEmpty(blogDTO.getMetaDescription()))
			errors.rejectValue("metaDescription", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != blogDTO.getKeywords() && CustomValidator.isEmpty(blogDTO.getKeywords()))
			errors.rejectValue("keywords", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogDTO.setUpdatedBy(logedUserid);
		blogDTO.setUpdatedDate(createDate);
	}

	public void reviewBlog(BlogDTO blogDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(blogDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!VALID_APPROVAL_STATUS_LIST.contains(blogDTO.getStatus()))
			errors.rejectValue("status", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(blogDTO.getApprovalRemarks()))
			errors.rejectValue("approvalRemarks", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		blogDTO.setUpdatedBy(logedUserid);
		blogDTO.setUpdatedDate(createDate);
	}

	public void getBlogCategoryHierachy(BlogCategoryDTO blogCategoryDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		blogCategoryDTO.setStatus(Constant.STATUS_ACTIVE);
		blogCategoryDTO.setUpdatedBy(logedUserid);
		blogCategoryDTO.setUpdatedDate(createDate);

	}

}
