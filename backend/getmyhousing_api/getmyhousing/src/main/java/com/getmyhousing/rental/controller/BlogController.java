package com.getmyhousing.rental.controller;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.BlogCategory;
import com.getmyhousing.common.domain.BlogSubCategory;
import com.getmyhousing.common.dto.BlogCategoryDTO;
import com.getmyhousing.common.dto.BlogDTO;
import com.getmyhousing.common.dto.BlogSubCategoryDTO;
import com.getmyhousing.common.exception.FieldException;
import com.getmyhousing.rental.service.BlogService;
import com.getmyhousing.rental.validator.BlogValidator;

@RestController
@RequestMapping("/blog")
public class BlogController {
	
	private static Logger LOGGER = LoggerFactory.getLogger(BlogController.class);

	private LinkedHashMap<String, Object> returnMap;

	@Autowired
	private BlogValidator blogValidator;

	@Autowired
	private BlogService blogService;
	
	@RequestMapping(value = "/addBlogCategory", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addBlogCategory(@RequestBody BlogCategoryDTO blogCategoryDTO,
			BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogCategoryDTO.class.getName());
		blogValidator.saveBlogCategory(blogCategoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		blogService.saveBlogCategory(blogCategoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/addBlogSubCategory", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addBlogSubCategory(
			@RequestBody BlogSubCategoryDTO blogSubCategoryDTO, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogSubCategoryDTO.class.getName());
		blogValidator.saveBlogSubCategory(blogSubCategoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		blogService.saveBlogSubCategory(blogSubCategoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/addBlog", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> addBlog(@RequestBody BlogDTO blogDTO, BindingResult result)
			throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		
		MapBindingResult err = new MapBindingResult(map, BlogDTO.class.getName());
		
		blogValidator.saveBlog(blogDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		blogService.saveBlog(blogDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getBlogCategories", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getBlogCategories(@RequestBody BlogCategoryDTO blogCategoryDTO,
			BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogCategoryDTO.class.getName());
		blogValidator.getAllBlogCategory(blogCategoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<BlogCategory> blogCategoryList = blogService.getAllBlogCategory(blogCategoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("blogCategories", blogCategoryList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getBlogSubCategories", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getBlogSubCategories(
			@RequestBody BlogSubCategoryDTO blogSubCategoryDTO, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogSubCategoryDTO.class.getName());
		blogValidator.getAllBlogSubCategory(blogSubCategoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<BlogSubCategory> blogSubCategoryList = blogService.getAllBlogSubCategory(blogSubCategoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("blogSubCategoryList", blogSubCategoryList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getBlogs", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getBlogs(@RequestBody BlogDTO blogDTO, BindingResult result)
			throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogDTO.class.getName());
		blogValidator.getAllBlogs(blogDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<BlogDTO> blogs = blogService.getAllBlogs(blogDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("blogs", blogs);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getBlog", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getBlog(@RequestBody BlogDTO blogDTO, BindingResult result)
			throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogDTO.class.getName());
		blogValidator.getBlogById(blogDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		BlogDTO blog = blogService.getBlogById(blogDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("blog", blog);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/updateBlogCategory", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateBlogCategory(
			@RequestBody BlogCategoryDTO blogCategoryDTO, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogCategoryDTO.class.getName());
		blogValidator.updateBlogCategory(blogCategoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		blogService.updateBlogCategory(blogCategoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/updateBlogSubCategory", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateBlogSubCategory(
			@RequestBody BlogSubCategoryDTO blogSubCategoryDTO, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogSubCategoryDTO.class.getName());
		blogValidator.updateBlogSubCategory(blogSubCategoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		blogService.updateBlogSubCategory(blogSubCategoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/updateBlog", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> updateBlog(@RequestBody BlogDTO blogDTO, BindingResult result)
			throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogDTO.class.getName());
		blogValidator.updateBlog(blogDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		blogService.updateBlog(blogDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/reviewBlog", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> reviewBlog(@RequestBody BlogDTO blogDTO, BindingResult result)
			throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogDTO.class.getName());
		blogValidator.reviewBlog(blogDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		blogService.reviewBlog(blogDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@RequestMapping(value = "/getBlogCategoriesHierarchy", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<LinkedHashMap<String, Object>> getBlogCategoryHierachy(
			@RequestBody BlogCategoryDTO blogCategoryDTO, BindingResult result) throws Exception {
		Map<String, String> map = new HashMap<String, String>();
		MapBindingResult err = new MapBindingResult(map, BlogCategoryDTO.class.getName());
		blogValidator.getBlogCategoryHierachy(blogCategoryDTO, err);
		List<ObjectError> list = err.getAllErrors();
		if (list.size() > 0)
			throw new FieldException(list);

		List<BlogCategoryDTO> blogCategoryList = blogService.getBlogCategoryHierachy(blogCategoryDTO);
		returnMap = new LinkedHashMap<String, Object>();
		returnMap.put("responseCode", Constant.SUCCESSFULL_CODE);
		returnMap.put("responseMessage", Constant.SUCCESSFULL_MSG);
		returnMap.put("blogCategories", blogCategoryList);
		return ResponseEntity.status(HttpStatus.OK).body(returnMap);
	}
	
	@Bean
	private BlogValidator getBlogValidator() {
		return new BlogValidator();
	}

}
