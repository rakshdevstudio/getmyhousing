package com.getmyhousing.common.dto;

import java.util.List;

public class UserDTO {

	private Long id;
	private String email;
	private String password;
	private String fullName;
	private String mobileNumber;
	private String whatsappNumber;
	private String country;
	private String state;
	private String district;
	private String city;
	private String role;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private int offset;
	private int limit;
	
	private Long TotalRefered;

	private List<String> roles;
	private List<Long> ids;
	private String passwordChangeOnLogin;
	private String newPassword;
	private String confirmNewPassword;
	private String companyName;
	
	private String pincode;
	private String countryCode;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public Long getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Long createdBy) {
		this.createdBy = createdBy;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Long getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Long updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getWhatsappNumber() {
		return whatsappNumber;
	}

	public void setWhatsappNumber(String whatsappNumber) {
		this.whatsappNumber = whatsappNumber;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public List<Long> getIds() {
		return ids;
	}

	public void setIds(List<Long> ids) {
		this.ids = ids;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getConfirmNewPassword() {
		return confirmNewPassword;
	}

	public void setConfirmNewPassword(String confirmNewPassword) {
		this.confirmNewPassword = confirmNewPassword;
	}

	public String getPasswordChangeOnLogin() {
		return passwordChangeOnLogin;
	}

	public void setPasswordChangeOnLogin(String passwordChangeOnLogin) {
		this.passwordChangeOnLogin = passwordChangeOnLogin;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	
	
	
	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}
	
	

	public Long getTotalRefered() {
		return TotalRefered;
	}

	public void setTotalRefered(Long totalRefered) {
		TotalRefered = totalRefered;
	}

	public UserDTO(Long id,String fullName, String email, String mobileNumber,String whatsappNumber, String country,
			String state, String district ,String role  ) {

		setId(id);
		this.fullName = fullName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.whatsappNumber = whatsappNumber;
		this.country = country;
		this.state = state;
		this.district = district;
		this.role = role;

		
	}
	
	
	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "UserDTO [id=" + id + ", email=" + email + ", password=" + password + ", fullName=" + fullName
				+ ", mobileNumber=" + mobileNumber + ", whatsappNumber=" + whatsappNumber + ", country=" + country
				+ ", state=" + state + ", district=" + district + ", city=" + city + ", role=" + role + ", status="
				+ status + ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + ", offset=" + offset + ", limit=" + limit + ", TotalRefered=" + TotalRefered + ", roles=" + roles + ", ids=" + ids
				+ ", passwordChangeOnLogin=" + passwordChangeOnLogin + ", newPassword=" + newPassword
				+ ", confirmNewPassword=" + confirmNewPassword + ", companyName=" + companyName + ", pincode=" + pincode
				+ ", countryCode=" + countryCode + "]";
	}
}
