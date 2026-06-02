package com.getmyhousing.common.constant;

public class Constant {

	// List of Status
	public static final String STATUS_ACTIVE = "Active";
	public static final String STATUS_USED = "Used";
	public static final String STATUS_DEACTIVATED = "Deactivated";
	public static final String STATUS_DELETED = "Deleted";
	public static final String STATUS_PENDING = "Pending";
	public static final String STATUS_REJECTED = "Rejected";
	public static final String STATUS_COMPLETED = "Completed";
	public static final String STATUS_APPROVED = "Approved";
	public static final String STATUS_ACCEPTED = "Accepted";
	public static final String STATUS_DECLINED = "Declined";
	public static final String STATUS_REVOKED = "Revoked";
	public static final String STATUS_RESIGNED = "Resigned";
	public static final String STATUS_INACTIVE = "Inactive";
	public static final String STATUS_DISABLED = "Disabled";
	public static final String STATUS_ENABLED = "Enabled";
	public static final String STATUS_EXPIRED = "Expired";
	public static final String STATUS_CANCELLED = "Cancelled";
	public static final String STATUS_PENDING_APPROVAL = "Pending Approval";
	public static final String STATUS_PENDING_REVIEW = "Pending Review";
	public static final String STATUS_SOLD_OUT = "Sold Out";
	public static final String STATUS_EXPIRED_PR = "Expired-PR";
	public static final String STATUS_NEW = "New";
	public static final String STATUS_ASSIGNED = "Assigned";
	public static final String STATUS_CONVERTED = "Converted";
	public static final String STATUS_FAKE = "Fake";
	public static final String STATUS_CLOSED = "Closed";

	// Yes/No flag
	public static final String CONSTANT_YES = "Yes";
	public static final String CONSTANT_NO = "No";

	// Response Constants
	public static final String RESPONSE_CODE_KEY = "responseCode";
	public static final String RESPONSE_MSG_KEY = "responseMessage";
	public static final String SUCCESSFULL_CODE = "200";
	public static final String SUCCESSFULL_MSG = "Successful";
	public static final String BAD_REQUEST_ERROR_CD = "400";
	public static final String NOT_FOUND = "404";
	public static final String SERVER_ERROR = "500";

	// Date should be saved in this format
	public static final String TIMEZONE_ASIA = "Asia/Kolkata";
	public static final String DATABASE_DB_FORAMT = "yyyy-MM-dd HH:mm:ss";
	public static final String DATE_FORAMT = "yyyy-MM-dd";
	public static final String TIME_FORMAT = "HH:mm";
	public static final String PREORDER_TIME_FORMAT = "yyyy-MM-dd HH";

	public static final String EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
			+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

	public static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$";

	// Latitude (- 90.000000 to 90.000000) and longitude range (- 180.000000 to
	// 180.000000)
	public static final String LATITUDE_PATTERN = "^(\\+|-)?(?:90(?:(?:\\.0{1,60})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,60})?))$";
	public static final String LONGITUDE_PATTERN = "^(\\+|-)?(?:180(?:(?:\\.0{1,60})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,60})?))$";

	// Address fields: Regular expressions
	public static final String PINCODE_PATTERN = "^[0-9]{6}$";
	public static final String MOBILE_PATTERN = "^[0-9]{10}";
	public static final String COUNTRY_CODE_PATTERN = "^\\+[0-9]{1,3}";
	public static final String OTP_PATTERN = "^[0-9]{6}";
	public static final String DATE_FIELD_PATTERN = "^2[0-9]{3}-(0[1-9]{1}|1[0-2]{1})-([0-2]{1}[0-9]{1}|3[0-1])$";
	public static final String GST_FIELD_PATTERN = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z1-9]{2}[A-Z0-9]{1}";
	public static final String FSSAI_FILED_PATTERN = "^[0-9]{14}";
	public static final String TIME_PATTREN = "^([01][0-9]|2[0-3]):[0-5][0-9]$";

	public static final String OTP_ACTION_TYPE_LOGIN = "Login";
	public static final String OTP_ACTION_TYPE_CHANGE_MOBILE = "ChangeMobile";
	public static final String PRIMARY_FLAG = "primary";

	// For property image gallery
	public static final String FEATURED_FLAG = "featured";
	public static final String GALLERY_FLAG = "gallery";

	// for lead validations
	public static final String LEAD_TYPE_OWN = "Own";
	public static final String LEAD_TYPE_CUSTOMER = "Customer";
	public static final String LEAD_SOURCE_ONILNE = "Online";
	public static final String LEAD_SOURCE_OFFLINE = "Offline";

	// package listingType validations
	public static final String LISTING_TYPE_RENT = "Rent";
	public static final String LISTING_TYPE_SALE = "Sale";
	public static final String LISTING_TYPE_LEASE = "Lease";
	public static final String LISTING_TYPE_PROJECTS = "Projects";

	// Payment status
	public static final String PAYMENT_PENDING_STATUS = "Pending";
	public static final String EASEBUZZ_TXN_SUCCESS_STATUS = "success";
	public static final String PAYMENT_SUCCESS_STATUS = "Payment Success";
	public static final String EASEBUZZ_TXN_FAILURE_STATUS = "Failure";
	public static final String PAYMENT_FAILURE_STATUS = "Payment Failure";

}
