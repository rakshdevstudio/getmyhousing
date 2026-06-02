package com.getmyhousing.rental.validator;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;
import com.getmyhousing.common.dto.PackagesDTO;
import com.getmyhousing.common.dto.UserPackagesDTO;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.UserUtils;
import com.getmyhousing.common.validator.CustomValidator;
import com.getmyhousing.common.validator.RoleEnum;

public class PackagesValidator implements Validator {

	private static final String BAD_REQUEST_ERROR_CD = Constant.BAD_REQUEST_ERROR_CD;
	private static final Pattern VALID_DATE_FIELD_PATTERN = Pattern.compile(Constant.DATE_FIELD_PATTERN);
	private static final List<String> VALID_LISTING_TYPE = Arrays.asList(Constant.LISTING_TYPE_LEASE,
			Constant.LISTING_TYPE_PROJECTS, Constant.LISTING_TYPE_RENT, Constant.LISTING_TYPE_SALE);
	@Autowired
	UserUtils userUtils;

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate(Object target, Errors errors) {
		// TODO Auto-generated method stub

	}

	public void savePackage(PackagesDTO packagesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(packagesDTO.getPackageName()))
			errors.rejectValue("packageName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

//		if (null != packagesDTO.getPackageFor() && !RoleEnum.isInEnum(packagesDTO.getPackageFor(), RoleEnum.class))
//			errors.rejectValue("packageFor", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (!VALID_LISTING_TYPE.contains(packagesDTO.getListingType()))
			errors.rejectValue("listingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getDurationInDays()))
			errors.rejectValue("durationInDays", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getNoOfListings()))
			errors.rejectValue("noOfListings", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getCountry()))
			errors.rejectValue("country", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getState()))
			errors.rejectValue("state", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getDistrict()))
			errors.rejectValue("district", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getDescription()))
			errors.rejectValue("description", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getMrp()))
			errors.rejectValue("mrp", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getDiscount()))
			errors.rejectValue("discount", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getSellingPrice()))
			errors.rejectValue("sellingPrice", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		packagesDTO.setStatus(Constant.STATUS_ACTIVE);
		packagesDTO.setCreatedDate(createdDate);
		packagesDTO.setCreatedBy(logedUserid);
		packagesDTO.setUpdatedDate(createdDate);
		packagesDTO.setUpdatedBy(logedUserid);

	}

	public void getAllPackages(PackagesDTO packagesDTO, Errors errors) {
	}

	public void updatePackage(PackagesDTO packagesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(packagesDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getPackageName() && CustomValidator.isEmpty(packagesDTO.getPackageName()))
			errors.rejectValue("packageName", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getPackageFor() && CustomValidator.isEmpty(packagesDTO.getPackageFor()))
			errors.rejectValue("packageFor", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getListingType() && CustomValidator.isEmpty(packagesDTO.getListingType()))
			errors.rejectValue("listingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getDurationInDays() && CustomValidator.isEmpty(packagesDTO.getDurationInDays()))
			errors.rejectValue("durationInDays", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getNoOfListings() && CustomValidator.isEmpty(packagesDTO.getNoOfListings()))
			errors.rejectValue("noOfListings", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getCountry() && CustomValidator.isEmpty(packagesDTO.getCountry()))
			errors.rejectValue("country", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getState() && CustomValidator.isEmpty(packagesDTO.getState()))
			errors.rejectValue("state", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getDistrict() && CustomValidator.isEmpty(packagesDTO.getDistrict()))
			errors.rejectValue("district", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getDescription() && CustomValidator.isEmpty(packagesDTO.getDescription()))
			errors.rejectValue("description", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getMrp() && CustomValidator.isEmpty(packagesDTO.getMrp()))
			errors.rejectValue("mrp", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getDiscount() && CustomValidator.isEmpty(packagesDTO.getDiscount()))
			errors.rejectValue("discount", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (null != packagesDTO.getSellingPrice() && CustomValidator.isEmpty(packagesDTO.getSellingPrice()))
			errors.rejectValue("sellingPrice", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		packagesDTO.setUpdatedDate(createdDate);
		packagesDTO.setUpdatedBy(logedUserid);

	}

	public void deletePackage(PackagesDTO packagesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.hasValidValue(packagesDTO.getId())) {
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

			packagesDTO.setUpdatedDate(createdDate);
			packagesDTO.setUpdatedBy(logedUserid);
		}
	}

	public void saveUserPackage(UserPackagesDTO userPackagesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(userPackagesDTO.getUserId()))
			errors.rejectValue("userId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(userPackagesDTO.getPackageId()))
			errors.rejectValue("packageId", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		userPackagesDTO.setStatus(Constant.STATUS_ACTIVE);
		userPackagesDTO.setCreatedDate(createdDate);
		userPackagesDTO.setCreatedBy(logedUserid);
		userPackagesDTO.setUpdatedDate(createdDate);
		userPackagesDTO.setUpdatedBy(logedUserid);

	}

	public void getUserPackages(UserPackagesDTO userPackagesDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		userPackagesDTO.setUserId(logedUserid);
	}

	public void verifyUserPackage(PackagesDTO packagesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		packagesDTO.setUpdatedDate(createdDate);
		packagesDTO.setUpdatedBy(logedUserid);

	}

	public void verifyUserPackageByListingType(PackagesDTO packagesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(packagesDTO.getListingType()))
			errors.rejectValue("listingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		packagesDTO.setUpdatedDate(createdDate);
		packagesDTO.setUpdatedBy(logedUserid);

	}

	public void verifyUserPackageByCity(PackagesDTO packagesDTO, Errors errors) {
		String createdDate = DateUtils.getAsiaLocalDateTimeInCustomFormat();
		Long logedUserid = userUtils.getLogedInUser();

		if (CustomValidator.isEmpty(packagesDTO.getDistrict()))
			errors.rejectValue("district", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getListingType()))
			errors.rejectValue("listingType", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		packagesDTO.setUpdatedDate(createdDate);
		packagesDTO.setUpdatedBy(logedUserid);

	}

	public void getPackageById(PackagesDTO packagesDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(packagesDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		packagesDTO.setUpdatedBy(logedUserid);
		packagesDTO.setUpdatedDate(createdTime);
	}

	public void purchasePackage(PackagesDTO packagesDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(packagesDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		if (CustomValidator.isEmpty(packagesDTO.getAmount()))
			errors.rejectValue("amount", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		packagesDTO.setUpdatedBy(logedUserid);
		packagesDTO.setUpdatedDate(createdTime);

	}

	public void updatePurchasePkgSuccess(EasebuzzOrderDTO easebuzzOrderDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(easebuzzOrderDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		easebuzzOrderDTO.setUpdatedBy(logedUserid);
		easebuzzOrderDTO.setUpdatedDate(createdTime);
	}

	public void updatePurchasePkgFailure(EasebuzzOrderDTO easebuzzOrderDTO, Errors errors) {
		Long logedUserid = userUtils.getLogedInUser();
		String createdTime = DateUtils.getAsiaLocalDateTimeInCustomFormat();

		if (CustomValidator.isEmpty(easebuzzOrderDTO.getId()))
			errors.rejectValue("id", BAD_REQUEST_ERROR_CD, "is an empty or not in valid format");

		easebuzzOrderDTO.setUpdatedBy(logedUserid);
		easebuzzOrderDTO.setUpdatedDate(createdTime);
	}

}
