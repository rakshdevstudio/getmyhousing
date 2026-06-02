package com.getmyhousing.common.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "easebuzz_orders")
public class EasebuzzOrder extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "user_id")
	private Long userId;

	@Column(name = "full_name")
	private String fullName;

	@Column(name = "email")
	private String email;

	@Column(name = "mobile_number")
	private String mobileNumber;

	@Column(name = "package_id")
	private Long packageId;

	@Column(name = "amount")
	private BigDecimal amount;

	@Column(name = "easebuzz_txn_id")
	private String easebuzzTxnId;

	@Column(name = "order_status")
	private String orderStatus;

	@Column(name = "bank_ref_num")
	private String bankRefNum;

	@Column(name = "easepay_id")
	private String easepayId;

	@Column(name = "bank_name")
	private String bankName;

	@Column(name = "card_type")
	private String cardType;

	@Column(name = "name_on_card")
	private String nameOnCard;

	@Column(name = "card_num")
	private String cardNum;

	@Column(name = "mode")
	private String mode;

	@Column(name = "upi_va")
	private String upiVa;

	@Column(name = "message")
	private String message;

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

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public Long getPackageId() {
		return packageId;
	}

	public void setPackageId(Long packageId) {
		this.packageId = packageId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getEasebuzzTxnId() {
		return easebuzzTxnId;
	}

	public void setEasebuzzTxnId(String easebuzzTxnId) {
		this.easebuzzTxnId = easebuzzTxnId;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getBankRefNum() {
		return bankRefNum;
	}

	public void setBankRefNum(String bankRefNum) {
		this.bankRefNum = bankRefNum;
	}

	public String getEasepayId() {
		return easepayId;
	}

	public void setEasepayId(String easepayId) {
		this.easepayId = easepayId;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public String getNameOnCard() {
		return nameOnCard;
	}

	public void setNameOnCard(String nameOnCard) {
		this.nameOnCard = nameOnCard;
	}

	public String getCardNum() {
		return cardNum;
	}

	public void setCardNum(String cardNum) {
		this.cardNum = cardNum;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getUpiVa() {
		return upiVa;
	}

	public void setUpiVa(String upiVa) {
		this.upiVa = upiVa;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
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

	
	@Override
	public String toString() {
		return "EasebuzzOrder [userId=" + userId + ", fullName=" + fullName + ", email=" + email + ", mobileNumber="
				+ mobileNumber + ", packageId=" + packageId + ", amount=" + amount + ", easebuzzTxnId=" + easebuzzTxnId
				+ ", orderStatus=" + orderStatus + ", bankRefNum=" + bankRefNum + ", easepayId=" + easepayId
				+ ", bankName=" + bankName + ", cardType=" + cardType + ", nameOnCard=" + nameOnCard + ", cardNum="
				+ cardNum + ", mode=" + mode + ", upiVa=" + upiVa + ", message=" + message + ", status=" + status
				+ ", createdDate=" + createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate
				+ ", updatedBy=" + updatedBy + "]";
	}
	
	

}
