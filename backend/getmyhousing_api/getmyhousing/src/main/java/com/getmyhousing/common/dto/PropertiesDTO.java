package com.getmyhousing.common.dto;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.getmyhousing.common.domain.PropertyImageGallery;

public class PropertiesDTO {

	private Long id;
	private String listingType;

	private String buildingType;
	private String propertyName;
	private String propertyType;
	private String zone;
	private String landmark;
	private String propertyAddress;
	private String locality;
	private String city;
	private String state;
	private String country;
	private String pincode;
	private BigDecimal latitude;
	private BigDecimal longitude;
	private String approvalStatus;
	private String approvalRemarks;
	private String approvalActionBy;
	private String approvalActionDate;
	private Long userPackageId;
	private String title;
	private int offset;
	private int limit;
	private String status;
	private String createdDate;
	private Long createdBy;
	private String updatedDate;
	private Long updatedBy;
	private TenantStatusDTO tenantStatus;
	private PropertyStatusDTO propertyStatus;
	private PricingDetailsDTO pricingDetails;
	private ReraStatusDTO reraStatus;
	private AdditionalDetailsDTO additionalDetails;
	private LandMarkDTO landMarks;
	private DefinePropertyDTO defineProperty;
	private FurnishingStatusDTO furnishingStatus;
	private PgDetailsDTO pgDetails;
	private PgRoomDetailsDTO pgRoomDetails;
	private AmenitiesDTO amenities;
	private List<AmenitiesDTO> amenitiesList;
	private PropertyAreaDetailsDTO propertyAreaDetails;
	private PgRegulationsDTO pgRegulations;
	private PgOwnerDetailsDTO pgOwnerDetails;
	private String furnishingType;
	private String builtupPlotArea;
	private String superBuiltupArea;
	private String areaUnit;
	private String carpetArea;
	private String imagePath;
	private String imageType;
	private String youtubeLink;
	private String videoLink;
	private String packageExpiryDate;
	private List<String> galleryImages;
	private List<Long> userPackagesIds;
	private List<PropertyFloorRoomsDTO> propertyFloorRooms;
	private List<PropertyMediaDTO> PropertyMedia;
	private List<PropertyImageGalleryDTO> propertyImages;
	private List<PropertyImageGallery> propertyGalleryImages;
	private String username;
	private String userRole;
	private String userWhatsappNumber;
	private String maskedUserWhatsappNumber;
	private String subLocality;
	private String searchProperties;
	private String brokerageType;
	private String brokergeValue;
	private String brokerageUnit;
	private String propertyBrochure;
	private Long ownerId;
	
	@JsonProperty("isExclusiveProperty")
	private boolean isExclusiveProperty;

	private List<IncludedGroupPropertyDTO> includedGroupProperty;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}



	public String getListingType() {
		return listingType;
	}



	public void setListingType(String listingType) {
		this.listingType = listingType;
	}



	public String getBuildingType() {
		return buildingType;
	}

	public void setBuildingType(String buildingType) {
		this.buildingType = buildingType;
	}

	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}



	public String getPropertyType() {
		return propertyType;
	}



	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}



	public String getZone() {
		return zone;
	}



	public void setZone(String zone) {
		this.zone = zone;
	}



	public String getLandmark() {
		return landmark;
	}



	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}



	public String getPropertyAddress() {
		return propertyAddress;
	}



	public void setPropertyAddress(String propertyAddress) {
		this.propertyAddress = propertyAddress;
	}



	public String getLocality() {
		return locality;
	}



	public void setLocality(String locality) {
		this.locality = locality;
	}



	public String getCity() {
		return city;
	}



	public void setCity(String city) {
		this.city = city;
	}



	public String getState() {
		return state;
	}



	public void setState(String state) {
		this.state = state;
	}



	public String getCountry() {
		return country;
	}



	public void setCountry(String country) {
		this.country = country;
	}



	public String getPincode() {
		return pincode;
	}



	public void setPincode(String pincode) {
		this.pincode = pincode;
	}



	public BigDecimal getLatitude() {
		return latitude;
	}



	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}



	public BigDecimal getLongitude() {
		return longitude;
	}



	public void setLongitude(BigDecimal longitude) {
		this.longitude = longitude;
	}



	public String getApprovalStatus() {
		return approvalStatus;
	}



	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}



	public String getApprovalRemarks() {
		return approvalRemarks;
	}



	public void setApprovalRemarks(String approvalRemarks) {
		this.approvalRemarks = approvalRemarks;
	}



	public String getApprovalActionBy() {
		return approvalActionBy;
	}



	public void setApprovalActionBy(String approvalActionBy) {
		this.approvalActionBy = approvalActionBy;
	}



	public String getApprovalActionDate() {
		return approvalActionDate;
	}



	public void setApprovalActionDate(String approvalActionDate) {
		this.approvalActionDate = approvalActionDate;
	}



	public Long getUserPackageId() {
		return userPackageId;
	}



	public void setUserPackageId(Long userPackageId) {
		this.userPackageId = userPackageId;
	}



	public String getTitle() {
		return title;
	}



	public void setTitle(String title) {
		this.title = title;
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



	public TenantStatusDTO getTenantStatus() {
		return tenantStatus;
	}



	public void setTenantStatus(TenantStatusDTO tenantStatus) {
		this.tenantStatus = tenantStatus;
	}



	public PropertyStatusDTO getPropertyStatus() {
		return propertyStatus;
	}



	public void setPropertyStatus(PropertyStatusDTO propertyStatus) {
		this.propertyStatus = propertyStatus;
	}



	public PricingDetailsDTO getPricingDetails() {
		return pricingDetails;
	}



	public void setPricingDetails(PricingDetailsDTO pricingDetails) {
		this.pricingDetails = pricingDetails;
	}



	public ReraStatusDTO getReraStatus() {
		return reraStatus;
	}



	public void setReraStatus(ReraStatusDTO reraStatus) {
		this.reraStatus = reraStatus;
	}



	public AdditionalDetailsDTO getAdditionalDetails() {
		return additionalDetails;
	}



	public void setAdditionalDetails(AdditionalDetailsDTO additionalDetails) {
		this.additionalDetails = additionalDetails;
	}



	public LandMarkDTO getLandMarks() {
		return landMarks;
	}



	public void setLandMarks(LandMarkDTO landMarks) {
		this.landMarks = landMarks;
	}



	public DefinePropertyDTO getDefineProperty() {
		return defineProperty;
	}



	public void setDefineProperty(DefinePropertyDTO defineProperty) {
		this.defineProperty = defineProperty;
	}



	public FurnishingStatusDTO getFurnishingStatus() {
		return furnishingStatus;
	}



	public void setFurnishingStatus(FurnishingStatusDTO furnishingStatus) {
		this.furnishingStatus = furnishingStatus;
	}



	public PgDetailsDTO getPgDetails() {
		return pgDetails;
	}



	public void setPgDetails(PgDetailsDTO pgDetails) {
		this.pgDetails = pgDetails;
	}



	public PgRoomDetailsDTO getPgRoomDetails() {
		return pgRoomDetails;
	}



	public void setPgRoomDetails(PgRoomDetailsDTO pgRoomDetails) {
		this.pgRoomDetails = pgRoomDetails;
	}



	public AmenitiesDTO getAmenities() {
		return amenities;
	}



	public void setAmenities(AmenitiesDTO amenities) {
		this.amenities = amenities;
	}



	public List<AmenitiesDTO> getAmenitiesList() {
		return amenitiesList;
	}



	public void setAmenitiesList(List<AmenitiesDTO> amenitiesList) {
		this.amenitiesList = amenitiesList;
	}



	public PropertyAreaDetailsDTO getPropertyAreaDetails() {
		return propertyAreaDetails;
	}



	public void setPropertyAreaDetails(PropertyAreaDetailsDTO propertyAreaDetails) {
		this.propertyAreaDetails = propertyAreaDetails;
	}



	public PgRegulationsDTO getPgRegulations() {
		return pgRegulations;
	}



	public void setPgRegulations(PgRegulationsDTO pgRegulations) {
		this.pgRegulations = pgRegulations;
	}



	public PgOwnerDetailsDTO getPgOwnerDetails() {
		return pgOwnerDetails;
	}



	public void setPgOwnerDetails(PgOwnerDetailsDTO pgOwnerDetails) {
		this.pgOwnerDetails = pgOwnerDetails;
	}



	public String getFurnishingType() {
		return furnishingType;
	}



	public void setFurnishingType(String furnishingType) {
		this.furnishingType = furnishingType;
	}



	public String getBuiltupPlotArea() {
		return builtupPlotArea;
	}



	public void setBuiltupPlotArea(String builtupPlotArea) {
		this.builtupPlotArea = builtupPlotArea;
	}



	public String getSuperBuiltupArea() {
		return superBuiltupArea;
	}



	public void setSuperBuiltupArea(String superBuiltupArea) {
		this.superBuiltupArea = superBuiltupArea;
	}



	public String getAreaUnit() {
		return areaUnit;
	}



	public void setAreaUnit(String areaUnit) {
		this.areaUnit = areaUnit;
	}



	public String getCarpetArea() {
		return carpetArea;
	}



	public void setCarpetArea(String carpetArea) {
		this.carpetArea = carpetArea;
	}



	public String getImagePath() {
		return imagePath;
	}



	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}



	public String getImageType() {
		return imageType;
	}



	public void setImageType(String imageType) {
		this.imageType = imageType;
	}



	public String getYoutubeLink() {
		return youtubeLink;
	}



	public void setYoutubeLink(String youtubeLink) {
		this.youtubeLink = youtubeLink;
	}



	public String getVideoLink() {
		return videoLink;
	}



	public void setVideoLink(String videoLink) {
		this.videoLink = videoLink;
	}



	public String getPackageExpiryDate() {
		return packageExpiryDate;
	}



	public void setPackageExpiryDate(String packageExpiryDate) {
		this.packageExpiryDate = packageExpiryDate;
	}



	public List<String> getGalleryImages() {
		return galleryImages;
	}



	public void setGalleryImages(List<String> galleryImages) {
		this.galleryImages = galleryImages;
	}



	public List<Long> getUserPackagesIds() {
		return userPackagesIds;
	}



	public void setUserPackagesIds(List<Long> userPackagesIds) {
		this.userPackagesIds = userPackagesIds;
	}



	public List<PropertyFloorRoomsDTO> getPropertyFloorRooms() {
		return propertyFloorRooms;
	}



	public void setPropertyFloorRooms(List<PropertyFloorRoomsDTO> propertyFloorRooms) {
		this.propertyFloorRooms = propertyFloorRooms;
	}



	public List<PropertyMediaDTO> getPropertyMedia() {
		return PropertyMedia;
	}



	public void setPropertyMedia(List<PropertyMediaDTO> propertyMedia) {
		PropertyMedia = propertyMedia;
	}



	public List<PropertyImageGalleryDTO> getPropertyImages() {
		return propertyImages;
	}



	public void setPropertyImages(List<PropertyImageGalleryDTO> propertyImages) {
		this.propertyImages = propertyImages;
	}



	public List<PropertyImageGallery> getPropertyGalleryImages() {
		return propertyGalleryImages;
	}



	public void setPropertyGalleryImages(List<PropertyImageGallery> propertyGalleryImages) {
		this.propertyGalleryImages = propertyGalleryImages;
	}



	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getUserRole() {
		return userRole;
	}



	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}



	public String getUserWhatsappNumber() {
		return userWhatsappNumber;
	}



	public void setUserWhatsappNumber(String userWhatsappNumber) {
		this.userWhatsappNumber = userWhatsappNumber;
	}



	public String getSubLocality() {
		return subLocality;
	}



	public void setSubLocality(String subLocality) {
		this.subLocality = subLocality;
	}



	public String getSearchProperties() {
		return searchProperties;
	}



	public void setSearchProperties(String searchProperties) {
		this.searchProperties = searchProperties;
	}



	public String getBrokerageType() {
		return brokerageType;
	}



	public void setBrokerageType(String brokerageType) {
		this.brokerageType = brokerageType;
	}



	public String getBrokergeValue() {
		return brokergeValue;
	}



	public void setBrokergeValue(String brokergeValue) {
		this.brokergeValue = brokergeValue;
	}



	public String getBrokerageUnit() {
		return brokerageUnit;
	}



	public void setBrokerageUnit(String brokerageUnit) {
		this.brokerageUnit = brokerageUnit;
	}



	public boolean isExclusiveProperty() {
		return isExclusiveProperty;
	}



	public void setExclusiveProperty(boolean isExclusiveProperty) {
		this.isExclusiveProperty = isExclusiveProperty;
	}



	public List<IncludedGroupPropertyDTO> getIncludedGroupProperty() {
		return includedGroupProperty;
	}



	public void setIncludedGroupProperty(List<IncludedGroupPropertyDTO> includedGroupProperty) {
		this.includedGroupProperty = includedGroupProperty;
	}

	public String getPropertyBrochure() {
		return propertyBrochure;
	}

	public void setPropertyBrochure(String propertyBrochure) {
		this.propertyBrochure = propertyBrochure;
	}

	public String getMaskedUserWhatsappNumber() {
		return maskedUserWhatsappNumber;
	}

	public void setMaskedUserWhatsappNumber(String maskedUserWhatsappNumber) {
		this.maskedUserWhatsappNumber = maskedUserWhatsappNumber;
	}

	public Long getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}

	@Override
	public String toString() {
		return "PropertiesDTO [id=" + id + ", listingType=" + listingType + ", buildingType=" + buildingType
				+ ", propertyName=" + propertyName + ", propertyType=" + propertyType + ", zone=" + zone + ", landmark="
				+ landmark + ", propertyAddress=" + propertyAddress + ", locality=" + locality + ", city=" + city
				+ ", state=" + state + ", country=" + country + ", pincode=" + pincode + ", latitude=" + latitude
				+ ", longitude=" + longitude + ", approvalStatus=" + approvalStatus + ", approvalRemarks="
				+ approvalRemarks + ", approvalActionBy=" + approvalActionBy + ", approvalActionDate="
				+ approvalActionDate + ", userPackageId=" + userPackageId + ", title=" + title + ", offset=" + offset
				+ ", limit=" + limit + ", status=" + status + ", createdDate=" + createdDate + ", createdBy="
				+ createdBy + ", updatedDate=" + updatedDate + ", updatedBy=" + updatedBy + ", tenantStatus="
				+ tenantStatus + ", propertyStatus=" + propertyStatus + ", pricingDetails=" + pricingDetails
				+ ", reraStatus=" + reraStatus + ", additionalDetails=" + additionalDetails + ", landMarks=" + landMarks
				+ ", defineProperty=" + defineProperty + ", furnishingStatus=" + furnishingStatus + ", pgDetails="
				+ pgDetails + ", pgRoomDetails=" + pgRoomDetails + ", amenities=" + amenities + ", amenitiesList="
				+ amenitiesList + ", propertyAreaDetails=" + propertyAreaDetails + ", pgRegulations=" + pgRegulations
				+ ", pgOwnerDetails=" + pgOwnerDetails + ", furnishingType=" + furnishingType + ", builtupPlotArea="
				+ builtupPlotArea + ", superBuiltupArea=" + superBuiltupArea + ", areaUnit=" + areaUnit
				+ ", carpetArea=" + carpetArea + ", imagePath=" + imagePath + ", imageType=" + imageType
				+ ", youtubeLink=" + youtubeLink + ", videoLink=" + videoLink + ", packageExpiryDate="
				+ packageExpiryDate + ", galleryImages=" + galleryImages + ", userPackagesIds=" + userPackagesIds
				+ ", propertyFloorRooms=" + propertyFloorRooms + ", PropertyMedia=" + PropertyMedia
				+ ", propertyImages=" + propertyImages + ", propertyGalleryImages=" + propertyGalleryImages
				+ ", username=" + username + ", userRole=" + userRole + ", userWhatsappNumber=" + userWhatsappNumber
				+ ", maskedUserWhatsappNumber=" + maskedUserWhatsappNumber + ", subLocality=" + subLocality
				+ ", searchProperties=" + searchProperties + ", brokerageType=" + brokerageType + ", brokergeValue="
				+ brokergeValue + ", brokerageUnit=" + brokerageUnit + ", propertyBrochure=" + propertyBrochure
				+ ", isExclusiveProperty=" + isExclusiveProperty + ", includedGroupProperty=" + includedGroupProperty
				+ "]";
	}
	

}
