package com.getmyhousing.common.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "land_mark")
public class LandMark extends AbstractEntity {

	private static final long serialVersionUID = -8924261433695968011L;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "hospital_distance")
	private String hospitalDistance;

	@Column(name = "hospital_distance_type")
	private String hospitalDistanceType;

	@Column(name = "airport_distance")
	private String airportDistance;

	@Column(name = "airport_distance_type")
	private String airportDistanceType;

	@Column(name = "railway_station_distance")
	private String railwayStationDistance;

	@Column(name = "railway_station_distance_type")
	private String railwayStationDistanceType;

	@Column(name = "atm_distance")
	private String atmDistance;

	@Column(name = "atm_distance_type")
	private String atmDistanceType;

	@Column(name = "school_distance")
	private String schoolDistance;

	@Column(name = "school_distance_type")
	private String schoolDistanceType;

	@Column(name = "shopping_mall_distance")
	private String shoppingMallDistance;

	@Column(name = "shopping_mall_distance_type")
	private String shoppingMallDistanceType;

	@Column(name = "bank_distance")
	private String bankDistance;

	@Column(name = "bank_distance_type")
	private String bankDistanceType;

	@Column(name = "bus_stop_distance")
	private String busStopDistance;

	@Column(name = "bus_stop_distance_type")
	private String busStopDistanceType;

	@Column(name = "metro_station_distance")
	private String metroStationDistance;

	@Column(name = "metro_station_distance_type")
	private String metroStationDistanceType;

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

	public String getHospitalDistance() {
		return hospitalDistance;
	}

	public void setHospitalDistance(String hospitalDistance) {
		this.hospitalDistance = hospitalDistance;
	}

	public String getHospitalDistanceType() {
		return hospitalDistanceType;
	}

	public void setHospitalDistanceType(String hospitalDistanceType) {
		this.hospitalDistanceType = hospitalDistanceType;
	}

	public String getAirportDistance() {
		return airportDistance;
	}

	public void setAirportDistance(String airportDistance) {
		this.airportDistance = airportDistance;
	}

	public String getAirportDistanceType() {
		return airportDistanceType;
	}

	public void setAirportDistanceType(String airportDistanceType) {
		this.airportDistanceType = airportDistanceType;
	}

	public String getRailwayStationDistance() {
		return railwayStationDistance;
	}

	public void setRailwayStationDistance(String railwayStationDistance) {
		this.railwayStationDistance = railwayStationDistance;
	}

	public String getRailwayStationDistanceType() {
		return railwayStationDistanceType;
	}

	public void setRailwayStationDistanceType(String railwayStationDistanceType) {
		this.railwayStationDistanceType = railwayStationDistanceType;
	}

	public String getAtmDistance() {
		return atmDistance;
	}

	public void setAtmDistance(String atmDistance) {
		this.atmDistance = atmDistance;
	}

	public String getAtmDistanceType() {
		return atmDistanceType;
	}

	public void setAtmDistanceType(String atmDistanceType) {
		this.atmDistanceType = atmDistanceType;
	}

	public String getSchoolDistance() {
		return schoolDistance;
	}

	public void setSchoolDistance(String schoolDistance) {
		this.schoolDistance = schoolDistance;
	}

	public String getSchoolDistanceType() {
		return schoolDistanceType;
	}

	public void setSchoolDistanceType(String schoolDistanceType) {
		this.schoolDistanceType = schoolDistanceType;
	}

	public String getShoppingMallDistance() {
		return shoppingMallDistance;
	}

	public void setShoppingMallDistance(String shoppingMallDistance) {
		this.shoppingMallDistance = shoppingMallDistance;
	}

	public String getShoppingMallDistanceType() {
		return shoppingMallDistanceType;
	}

	public void setShoppingMallDistanceType(String shoppingMallDistanceType) {
		this.shoppingMallDistanceType = shoppingMallDistanceType;
	}

	public String getBankDistance() {
		return bankDistance;
	}

	public void setBankDistance(String bankDistance) {
		this.bankDistance = bankDistance;
	}

	public String getBankDistanceType() {
		return bankDistanceType;
	}

	public void setBankDistanceType(String bankDistanceType) {
		this.bankDistanceType = bankDistanceType;
	}

	public String getBusStopDistance() {
		return busStopDistance;
	}

	public void setBusStopDistance(String busStopDistance) {
		this.busStopDistance = busStopDistance;
	}

	public String getBusStopDistanceType() {
		return busStopDistanceType;
	}

	public void setBusStopDistanceType(String busStopDistanceType) {
		this.busStopDistanceType = busStopDistanceType;
	}

	public String getMetroStationDistance() {
		return metroStationDistance;
	}

	public void setMetroStationDistance(String metroStationDistance) {
		this.metroStationDistance = metroStationDistance;
	}

	public String getMetroStationDistanceType() {
		return metroStationDistanceType;
	}

	public void setMetroStationDistanceType(String metroStationDistanceType) {
		this.metroStationDistanceType = metroStationDistanceType;
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
		return "LandMark [propertyId=" + propertyId + ", hospitalDistance=" + hospitalDistance
				+ ", hospitalDistanceType=" + hospitalDistanceType + ", airportDistance=" + airportDistance
				+ ", airportDistanceType=" + airportDistanceType + ", railwayStationDistance=" + railwayStationDistance
				+ ", railwayStationDistanceType=" + railwayStationDistanceType + ", atmDistance=" + atmDistance
				+ ", atmDistanceType=" + atmDistanceType + ", schoolDistance=" + schoolDistance
				+ ", schoolDistanceType=" + schoolDistanceType + ", shoppingMallDistance=" + shoppingMallDistance
				+ ", shoppingMallDistanceType=" + shoppingMallDistanceType + ", bankDistance=" + bankDistance
				+ ", bankDistanceType=" + bankDistanceType + ", busStopDistance=" + busStopDistance
				+ ", busStopDistanceType=" + busStopDistanceType + ", metroStationDistance=" + metroStationDistance
				+ ", metroStationDistanceType=" + metroStationDistanceType + ", status=" + status + ", createdDate="
				+ createdDate + ", createdBy=" + createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy
				+ "]";
	}

	
	
	
}
