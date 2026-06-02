package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "email", unique = true)
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "full_name")
	private String fullName;

	@Column(name = "mobile_number")
	private String mobileNumber;

	@Column(name = "whatsapp_number")
	private String whatsappNumber;

	@Column(name = "country")
	private String country;

	@Column(name = "state")
	private String state;

	@Column(name = "district")
	private String district;

	@Column(name = "city")
	private String city;

	@Column(name = "password_change_on_login")
	private String passwordChangeOnLogin;

	@Column(name = "status")
	private String status;

	@Column(name = "created_date")
	private String createdDate;

	@Column(name = "created_by")
	private Long createdBy;

	@Column(name = "updated_date")
	private String updatedDate;

	@Column(name = "updated_by")
	private Long updatedBy;                

	@Column(name = "company_name")
	private String companyName;  
	
	@Column(name = "pincode")
	private String pincode;
	
	@Column(name = "country_code")
	private String countryCode;
	
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
	
	
	 // Constructor for selected fields
    public User(Long id, String mobileNumber, String status) {
    	 setId(id);
        this.mobileNumber = mobileNumber;
        this.status = status;
    }

    
    
    
	public User(Long id,String fullName, String email, String mobileNumber,String whatsappNumber, String country,
			String state, String district) {

		setId(id);
		this.fullName = fullName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.whatsappNumber = whatsappNumber;
		this.country = country;
		this.state = state;
		this.district = district;

		
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	
	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	@Override
	public String toString() {
		return "User [email=" + email + ", password=" + password + ", fullName=" + fullName + ", mobileNumber="
				+ mobileNumber + ", whatsappNumber=" + whatsappNumber + ", country=" + country + ", state=" + state
				+ ", district=" + district + ", city=" + city + ", passwordChangeOnLogin=" + passwordChangeOnLogin
				+ ", status=" + status + ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate="
				+ updatedDate + ", updatedBy=" + updatedBy + ", companyName=" + companyName + ", pincode=" + pincode
				+ ", countryCode=" + countryCode + "]";
	}

	
}
