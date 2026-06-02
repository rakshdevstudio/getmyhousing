package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "pg_room_details")
public class PgRoomDetails extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "room_type")
	private String roomType;

	@Column(name = "total_beds_in_room")
	private String totalBedsInRoom;

	@Column(name = "rent")
	private Integer rent;

	@Column(name = "rent_type")
	private String rentType;

	@Column(name = "secured_deposit")
	private String securedDeposit;

	@Column(name = "secured_deposit_amount")
	private Integer securedDepositAmount;

	@Column(name = "parking_2_wheeler")
	private String parking2Wheeler;

	@Column(name = "parking_2_open_type")
	private String parking2OpenType;

	@Column(name = "parking_2_cover_type")
	private String parking2CoverType;

	@Column(name = "parking_4_wheeler")
	private String parking4Wheeler;

	@Column(name = "parking_4_open_type")
	private String parking4OpenType;

	@Column(name = "parking_4_cover_type")
	private String parking4CoverType;

	@Column(name = "facility_offered")
	private String facilityOffered;

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

	public Long getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}

	public String getRoomType() {
		return roomType;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public Integer getRent() {
		return rent;
	}

	public void setRent(Integer rent) {
		this.rent = rent;
	}

	public String getRentType() {
		return rentType;
	}

	public void setRentType(String rentType) {
		this.rentType = rentType;
	}

	public String getSecuredDeposit() {
		return securedDeposit;
	}

	public void setSecuredDeposit(String securedDeposit) {
		this.securedDeposit = securedDeposit;
	}

	public Integer getSecuredDepositAmount() {
		return securedDepositAmount;
	}

	public void setSecuredDepositAmount(Integer securedDepositAmount) {
		this.securedDepositAmount = securedDepositAmount;
	}

	public String getParking2Wheeler() {
		return parking2Wheeler;
	}

	public void setParking2Wheeler(String parking2Wheeler) {
		this.parking2Wheeler = parking2Wheeler;
	}

	public String getParking2OpenType() {
		return parking2OpenType;
	}

	public void setParking2OpenType(String parking2OpenType) {
		this.parking2OpenType = parking2OpenType;
	}

	public String getParking2CoverType() {
		return parking2CoverType;
	}

	public void setParking2CoverType(String parking2CoverType) {
		this.parking2CoverType = parking2CoverType;
	}

	public String getParking4Wheeler() {
		return parking4Wheeler;
	}

	public void setParking4Wheeler(String parking4Wheeler) {
		this.parking4Wheeler = parking4Wheeler;
	}

	public String getParking4OpenType() {
		return parking4OpenType;
	}

	public void setParking4OpenType(String parking4OpenType) {
		this.parking4OpenType = parking4OpenType;
	}

	public String getParking4CoverType() {
		return parking4CoverType;
	}

	public void setParking4CoverType(String parking4CoverType) {
		this.parking4CoverType = parking4CoverType;
	}

	public String getFacilityOffered() {
		return facilityOffered;
	}

	public void setFacilityOffered(String facilityOffered) {
		this.facilityOffered = facilityOffered;
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

	public String getTotalBedsInRoom() {
		return totalBedsInRoom;
	}

	public void setTotalBedsInRoom(String totalBedsInRoom) {
		this.totalBedsInRoom = totalBedsInRoom;
	}
}
