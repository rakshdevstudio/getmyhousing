package com.getmyhousing.rental.service;

import java.util.List;

import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.PropertyGroup;
import com.getmyhousing.common.dto.AdditionalDetailsDTO;
import com.getmyhousing.common.dto.AmenitiesDTO;
import com.getmyhousing.common.dto.CountryPincodeMappingDTO;
import com.getmyhousing.common.dto.DefinePropertyDTO;
import com.getmyhousing.common.dto.FurnishingStatusDTO;
import com.getmyhousing.common.dto.LandMarkDTO;
import com.getmyhousing.common.dto.PgDetailsDTO;
import com.getmyhousing.common.dto.PgOwnerDetailsDTO;
import com.getmyhousing.common.dto.PgRegulationsDTO;
import com.getmyhousing.common.dto.PgRoomDetailsDTO;
import com.getmyhousing.common.dto.PricingDetailsDTO;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.PropertyAreaDetailsDTO;
import com.getmyhousing.common.dto.PropertyFloorRoomsDTO;
import com.getmyhousing.common.dto.PropertyGroupDTO;
import com.getmyhousing.common.dto.PropertyMediaDTO;
import com.getmyhousing.common.dto.PropertyResponse;
import com.getmyhousing.common.dto.PropertySearchDto;
import com.getmyhousing.common.dto.PropertyStatusDTO;
import com.getmyhousing.common.dto.ReraStatusDTO;
import com.getmyhousing.common.dto.TenantStatusDTO;

public interface RentalService {

	public void saveProperty(PropertiesDTO propertiesDto);

	public PropertiesDTO getCompleteProperty(PropertiesDTO propertiesDto);

	public void updateProperty(PropertiesDTO propertiesDto);

	public void updateTenantStatus(TenantStatusDTO tenantStatusDto);

	public void updateReraStatus(ReraStatusDTO reraStatusDto);

	public void updatePropertyStatus(PropertyStatusDTO propertyStatusDto);

	public void updatePropertyMedia(PropertyMediaDTO propertyMediaDto);

	public void updateAdditionalDetails(AdditionalDetailsDTO additionalDetailsDTO);

	public void updateDefineProperty(DefinePropertyDTO definePropertyDTO);

	public void updateFurnishingStatus(FurnishingStatusDTO furnishingStatusDTO);

	public void updateLandMark(LandMarkDTO landMarkDTO);
	
	public List<Properties> myPropertyList(PropertiesDTO propertiesDTO);
	
	public List<Properties> getSiteMapProperties();

	public void updatePgDetails(PgDetailsDTO pgDetailsDTO);

	public void updatePgOwnerDetails(PgOwnerDetailsDTO pgOwnerDetailsDTO);

	public void updatePgRegulations(PgRegulationsDTO pgRegulationsDTO);

	public void updatePricingDetails(PricingDetailsDTO pricingDetailsDTO);

	public void updatePropertyAreaDetails(PropertyAreaDetailsDTO propertyAreaDetailsDTO);

	public void updateAmenities(AmenitiesDTO amenitiesDTO);

	public void updatePropertyFloorRooms(PropertyFloorRoomsDTO propertyFloorRoomsDTO);

	public void updatePgRoomDetails(PgRoomDetailsDTO pgRoomDetailsDTO);
	
	public List<Object> propertyListInDashboard(PropertiesDTO propertiesDTO);
	
	public List<Object> getAllExclusiveProperties(PropertiesDTO propertiesDTO);
	
	public void assignOwnerToProperty(PropertiesDTO propertiesDTO);

	public List<Properties> myPropertyListInDashboard(PropertiesDTO propertiesDTO);

	public void acceptedPropertyByAdmin(Properties properties);

	public PropertyResponse getPropertiesByFilter(PropertySearchDto propertySearchDto);	
	
	public List<PropertySearchDto> getRelatedProperties(PropertySearchDto propertySearchDto);

	public List<PropertyGroupDTO> getPropertyGroupWiseForAdmin();

	public List<PropertyGroupDTO> getPropertyGroupWiseForUser(long userId);

	public PropertyResponse getCompletedPropertiesByFilter(PropertySearchDto propertySearchDto);
	
	public PropertyResponse myPropertyListBySearch(PropertySearchDto propertySearchDTO);
	
	public void changePropertyStatusByAdmin(PropertiesDTO propertiesDto);

	public void verifyPropertyAddress(CountryPincodeMappingDTO countryPincodeMappingDTO);
	
	public void exclusiveProperty(PropertiesDTO propertiesDto);
}
