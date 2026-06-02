package com.getmyhousing.common.daoimpl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.converter.PropertyConverter;
import com.getmyhousing.common.dao.PropertiesDao;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.dto.PropertiesDTO;
import com.getmyhousing.common.dto.PropertyResponse;
import com.getmyhousing.common.dto.PropertySearchDto;
import com.getmyhousing.common.exception.ResourceNotFoundException;
import com.getmyhousing.common.repository.PropertiesRepository;
import com.getmyhousing.common.utils.DateUtils;
import com.getmyhousing.common.utils.PropertyUtility;

@Transactional
@Service("PropertiesDaoImpl")
public class PropertiesDaoImpl implements PropertiesDao {

	private Logger LOGGER = LoggerFactory.getLogger(PropertiesDaoImpl.class);

	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	PropertiesRepository propertiesRepository;

	@Override
	public Properties saveProperty(PropertiesDTO propertiesDTO) {
		Properties property = PropertyConverter.getPropertyByPropertiesDTO(propertiesDTO);
		property = propertiesRepository.save(property);
		return property;
	}

	@Override
	public Properties saveProperty2(PropertiesDTO propertiesDTO, boolean adminFlag) {
		Properties property = PropertyConverter.getPropertyByPropertiesDTO(propertiesDTO, adminFlag);
		
		Properties property2 = propertiesRepository.save(property);

		return property2;
	}

	@Override
	public Properties getPropertyById(Long id) {

		Optional<Properties> db = propertiesRepository.findById(id);

		if (!db.isPresent())
			throw new ResourceNotFoundException("The property not found in the system. id:" + id);
		return db.get();
	}
	
	@Override
	public List<Properties> getAllProperty(PropertiesDTO propertiesDTO) {
		List<Properties> returnList = null;
		StringBuffer sqlQuery = new StringBuffer("from Properties a where 1=1");

		if (null != propertiesDTO.getId())
			sqlQuery.append(" AND a.id = :id");
		if (null != propertiesDTO.getBuildingType())
			sqlQuery.append(" AND a.buildingType = :buildingType");
		if (null != propertiesDTO.getStatus())
			sqlQuery.append(" AND a.status = :status");
		if (null != propertiesDTO.getListingType())
			sqlQuery.append(" AND a.listingType = :listingType");
		if (null != propertiesDTO.getPropertyName())
			sqlQuery.append(" AND a.propertyName = :propertyName");
		if (null != propertiesDTO.getPropertyType())
			sqlQuery.append(" AND a.propertyType = :propertyType");
		if (null != propertiesDTO.getCountry())
			sqlQuery.append(" AND a.country = :country");
		if (null != propertiesDTO.getState())
			sqlQuery.append(" AND a.state = :state");
		if (null != propertiesDTO.getCity())
			sqlQuery.append(" AND a.city = :city");
		if (null != propertiesDTO.getPincode())
			sqlQuery.append(" AND a.pincode = :pincode");
		if (null != propertiesDTO.getPropertyAddress())
			sqlQuery.append(" AND a.propertyAddress = :propertyAddress");
		if (null != propertiesDTO.getCreatedBy())
			sqlQuery.append(" AND a.createdBy = :createdBy");
		if (null != propertiesDTO.getUserPackagesIds() && propertiesDTO.getUserPackagesIds().size() > 0)
			sqlQuery.append(" AND a.userPackagesId IN :userPackagesIds");

		sqlQuery.append(" order by a.id DESC");
		Query query = entityManager.createQuery(sqlQuery.toString());

		if (null != propertiesDTO.getId())
			query.setParameter("id", propertiesDTO.getId());
		if (null != propertiesDTO.getBuildingType())
			query.setParameter("buildingType", propertiesDTO.getBuildingType());
		if (null != propertiesDTO.getStatus())
			query.setParameter("status", propertiesDTO.getStatus());
		if (null != propertiesDTO.getListingType())
			query.setParameter("listingType", propertiesDTO.getListingType());
		if (null != propertiesDTO.getPropertyName())
			query.setParameter("propertyName", propertiesDTO.getPropertyName());
		if (null != propertiesDTO.getPropertyType())
			query.setParameter("propertyType", propertiesDTO.getPropertyType());
		if (null != propertiesDTO.getCountry())
			query.setParameter("country", propertiesDTO.getCountry());
		if (null != propertiesDTO.getState())
			query.setParameter("state", propertiesDTO.getState());
		if (null != propertiesDTO.getCity())
			query.setParameter("city", propertiesDTO.getCity());
		if (null != propertiesDTO.getPincode())
			query.setParameter("pincode", propertiesDTO.getPincode());
		if (null != propertiesDTO.getPropertyAddress())
			query.setParameter("propertyAddress", propertiesDTO.getPropertyAddress());
		if (null != propertiesDTO.getCreatedBy())
			query.setParameter("createdBy", propertiesDTO.getCreatedBy());
		if (null != propertiesDTO.getUserPackagesIds() && propertiesDTO.getUserPackagesIds().size() > 0)
			query.setParameter("userPackagesIds", propertiesDTO.getUserPackagesIds());

		returnList = query.getResultList();

		return returnList;
	}

	/**
	 * To get all properties by filters
	 * 
	 * @param propertiesDTO
	 * @return
	 */
	@Override
	public List<PropertiesDTO> getAllPropertiesByFilters(PropertiesDTO propertiesDTO) {
		List<PropertiesDTO> returnList = new ArrayList<PropertiesDTO>();
		StringBuilder sqlQuery = new StringBuilder("");
		

		sqlQuery.append(
				"SELECT DISTINCT  prop.id, prop.property_name, prop.property_type, prop.property_address, prop.city, prop.state, prop.country, prop.pincode, prop.listing_type, prop.building_type, prop.landmark,prop.created_by, prop.created_date, "
						+ " fs.furnishing_type, pd.builtup_plot_area, pd.super_builtup_area, pd.carpet_area, pd.area_unit, pi.image_type, up.package_expiry_date, ");
//		sqlQuery.append(" STRING_AGG(CAST(pi.image_path AS VARCHAR), ',') AS image_path_list");
//		sqlQuery.append(" FROM properties prop" + " LEFT JOIN furnishing_status fs ON fs.property_id = prop.id"
//				+ " LEFT JOIN property_area_details pd ON pd.property_id = prop.id"
//				+ " LEFT JOIN user_packages up ON up.package_id = prop.user_package_id"
//				+ " LEFT JOIN property_image_gallery pi ON pi.property_id = prop.id where pi.image_type='featured'");

		if (null != propertiesDTO.getId())
			sqlQuery.append(" AND prop.id=" + propertiesDTO.getId());

		if (null != propertiesDTO.getCity())
			sqlQuery.append(" AND prop.city = '" + propertiesDTO.getCity() + "'");

		if (null != propertiesDTO.getState())
			sqlQuery.append(" AND prop.state = '" + propertiesDTO.getState() + "'");

		if (null != propertiesDTO.getCountry())
			sqlQuery.append(" AND prop.country = '" + propertiesDTO.getCountry() + "'");

		if (null != propertiesDTO.getPincode())
			sqlQuery.append(" AND prop.pincode = '" + propertiesDTO.getPincode() + "'");

		if (null != propertiesDTO.getCreatedBy())
			sqlQuery.append(" AND prop.created_by = '" + propertiesDTO.getCreatedBy() + "'");

		if (null != propertiesDTO.getCreatedDate())
			sqlQuery.append(" AND prop.created_date = '" + propertiesDTO.getCreatedDate() + "'");

		sqlQuery.append(
				" GROUP BY prop.id, prop.property_name, prop.property_type, prop.property_address, prop.city, prop.state, prop.country, prop.pincode, prop.listing_type, prop.building_type, prop.landmark,prop.created_by, prop.created_date, "
						+ " fs.furnishing_type, pd.builtup_plot_area, pd.super_builtup_area, pd.carpet_area, pd.area_unit, pi.image_type, up.package_expiry_date");

		sqlQuery.append(" ORDER BY ").append(" prop.id DESC");
		sqlQuery.append(";");

		Query query = entityManager.createNativeQuery(sqlQuery.toString());

		List<Object[]> retList = query.getResultList();

		PropertiesDTO propertyDTO = null;
		for (Object[] object : retList) {
			propertyDTO = new PropertiesDTO();
			propertyDTO.setId(Long.parseLong(String.valueOf(object[0])));
			if (null != object[1])
				propertyDTO.setPropertyName(String.valueOf(object[1]));
			if (null != object[2])
				propertyDTO.setPropertyType(String.valueOf(object[2]));
			if (null != object[3])
				propertyDTO.setPropertyAddress(String.valueOf(object[3]));
			if (null != object[4])
				propertyDTO.setCity(String.valueOf(object[4]));
			if (null != object[5])
				propertyDTO.setState(String.valueOf(object[5]));
			if (null != object[6])
				propertyDTO.setCountry(String.valueOf(object[6]));
			if (null != object[7])
				propertyDTO.setPincode(String.valueOf(object[7]));
			if (null != object[8])
				propertyDTO.setListingType(String.valueOf(object[8]));
			if (null != object[9])
				propertyDTO.setBuildingType(String.valueOf(object[9]));
			if (null != object[10])
				propertyDTO.setLandmark(String.valueOf(object[10]));
			propertyDTO.setCreatedBy(Long.parseLong(String.valueOf(object[11])));
			propertyDTO.setCreatedDate(String.valueOf(object[12]));
			if (null != object[13])
				propertyDTO.setFurnishingType(String.valueOf(object[13]));
			if (null != object[14])
				propertyDTO.setBuiltupPlotArea(String.valueOf(object[14]));
			if (null != object[15])
				propertyDTO.setSuperBuiltupArea(String.valueOf(object[15]));
			if (null != object[16])
				propertyDTO.setCarpetArea(String.valueOf(object[16]));
			if (null != object[17])
				propertyDTO.setAreaUnit(String.valueOf(object[17]));
			if (null != object[18])
				propertyDTO.setGalleryImages(Stream.of(String.valueOf(object[18]).split(",")).map(String::trim)
						.collect(Collectors.toList()));
			if (null != object[19])
				propertyDTO.setPackageExpiryDate(String.valueOf(object[19]));

			returnList.add(propertyDTO);

		}

		return returnList;
	}

	/**
	 * To get count of properties based on statusList and userId
	 * 
	 * @param userId
	 * @param statusList
	 */
	@Override
	public int getPropertyCountByStatusList(Long userId, List<String> statusList, Long userPackageId) {
		StringBuilder sqlQuery = new StringBuilder("");
		
		sqlQuery.append(
				"SELECT COUNT(*) FROM properties WHERE created_by = :userId AND user_package_id = :userPackageId AND  status IN (:statusList)");

		Query query = entityManager.createNativeQuery(sqlQuery.toString());
		query.setParameter("userId", userId);
		query.setParameter("userPackageId", userPackageId);
		query.setParameter("statusList", statusList);

		// Execute the query and get count
		BigInteger countResult = (BigInteger) query.getSingleResult();
		int count = countResult.intValue(); // Convert BigInteger to int
		LOGGER.info("Count: " + count);

		return count;
	}
	

	@Override
	public PropertyResponse getPropertyListByFilter(PropertySearchDto propertySearchDto) {
	    PropertyResponse response = new PropertyResponse();
	    StringBuilder sqlQuery = new StringBuilder("");

	    try {
	        // Create column names
	    	sqlQuery.append(
	    		    "SELECT properties.id, properties.listing_type, properties.building_type, properties.property_type, "
	    		    + "properties.property_name, properties.city, properties.locality, properties.state, "
	    		    + "properties.country, properties.is_exclusive_property, properties.created_date, "
	    		    + "pricing_details.rent, pricing_details.per_sqft_price, property_area_details.no_of_bedrooms, furnishing_status.furnishing_type, "
	    		    + "property_image_gallery.image_path, property_area_details.area_unit, property_area_details.builtup_plot_area, "
	    		    + "property_status.position_status, "
	    		    + "users.full_name, users.whatsapp_number, "	
	    		    + "user_roles.role, "
	    		    + "property_area_details.facing, "
	    		    + "property_area_details.super_builtup_area, properties.approval_status " 
	    		);

	        sqlQuery.append("FROM properties ");

	        sqlQuery.append("JOIN pricing_details ON properties.id = pricing_details.property_id ");
	        sqlQuery.append("JOIN property_area_details ON properties.id = property_area_details.property_id ");
	        sqlQuery.append("JOIN furnishing_status ON properties.id = furnishing_status.property_id ");
	        sqlQuery.append("JOIN property_image_gallery ON properties.id = property_image_gallery.property_id "
	                + "AND property_image_gallery.image_type = 'featured' ");
	        sqlQuery.append("JOIN property_status ON properties.id = property_status.property_id ");
	        sqlQuery.append("JOIN users ON properties.created_by = users.id ");
	        sqlQuery.append("JOIN user_roles ON properties.created_by = user_roles.user_id ");

	        // Add multiple JOINs for each selected amenity
	        List<String> amenities = propertySearchDto.getAmenities();
	        if (amenities != null && !amenities.isEmpty()) {
	            int index = 0;
	            for (String amenity : amenities) {
	                sqlQuery.append("JOIN amenities a" + index + " ON properties.id = a" + index + ".property_id "
	                        + "AND a" + index + ".amenities_facility = '" + amenity + "' ");
	                index++;
	            }
	        }

	        sqlQuery.append("WHERE properties.approval_status IN ('Active', 'Completed') ");

	        // Add filters for rent
	        if (propertySearchDto.getMinRent() != null && propertySearchDto.getMaxRent() != null) {
	            sqlQuery.append("AND pricing_details.rent > " + propertySearchDto.getMinRent()
	                    + " AND pricing_details.rent < " + propertySearchDto.getMaxRent() + " ");
	        } else if (propertySearchDto.getMinRent() != null) {
	            sqlQuery.append("AND pricing_details.rent > " + propertySearchDto.getMinRent() + " ");
	        } else if (propertySearchDto.getMaxRent() != null) {
	            sqlQuery.append("AND pricing_details.rent < " + propertySearchDto.getMaxRent() + " ");
	        }

	        // Add filters for super built-up area
	        if (propertySearchDto.getMinSuperBuiltupArea() != null && propertySearchDto.getMaxSuperBuiltupArea() != null) {
	            sqlQuery.append("AND property_area_details.super_builtup_area >= " + propertySearchDto.getMinSuperBuiltupArea()
	                    + " AND property_area_details.super_builtup_area <= " + propertySearchDto.getMaxSuperBuiltupArea() + " ");
	        } else if (propertySearchDto.getMinSuperBuiltupArea() != null) {
	            sqlQuery.append("AND property_area_details.super_builtup_area >= " + propertySearchDto.getMinSuperBuiltupArea() + " ");
	        } else if (propertySearchDto.getMaxSuperBuiltupArea() != null) {
	            sqlQuery.append("AND property_area_details.super_builtup_area <= " + propertySearchDto.getMaxSuperBuiltupArea() + " ");
	        }

	        // Add other filters
	        if (propertySearchDto.getPropertyName() != null)
	            sqlQuery.append("AND properties.property_name = '" + propertySearchDto.getPropertyName() + "' ");
	        if (propertySearchDto.getListingType() != null)
	            sqlQuery.append("AND properties.listing_type = '" + propertySearchDto.getListingType() + "' ");
	        if (propertySearchDto.getPropertyType() != null)
	            sqlQuery.append("AND properties.property_type = '" + propertySearchDto.getPropertyType() + "' ");
	        if (propertySearchDto.getBuildingType() != null)
	            sqlQuery.append("AND properties.building_type = '" + propertySearchDto.getBuildingType() + "' ");
	        
	     // Add multiple JOINs for each selected BHK
	        List<String> bhk = propertySearchDto.getBhk();
	        if (bhk != null && !bhk.isEmpty()) {
	            sqlQuery.append("AND property_area_details.no_of_bedrooms IN (");
	            for (int i = 0; i < bhk.size(); i++) {
	                sqlQuery.append("'" + bhk.get(i) + "'");
	                if (i < bhk.size() - 1) {
	                    sqlQuery.append(", ");
	                }
	            }
	            sqlQuery.append(") ");
	        }
	        
	        if (propertySearchDto.getPostedOn() != null)
	            sqlQuery.append("AND user_roles.role = '" + propertySearchDto.getPostedOn() + "' ");
	        if (propertySearchDto.getFurnishingType() != null)
	            sqlQuery.append("AND furnishing_status.furnishing_type = '" + propertySearchDto.getFurnishingType() + "' ");
	        
	     // Add multiple JOINs for each selected facing
	        List<String> facing = propertySearchDto.getFacing();
	        if (facing != null && !facing.isEmpty()) {
	            sqlQuery.append("AND property_area_details.facing IN (");
	            for (int i = 0; i < facing.size(); i++) {
	                sqlQuery.append("'" + facing.get(i) + "'");
	                if (i < facing.size() - 1) {
	                    sqlQuery.append(", ");
	                }
	            }
	            sqlQuery.append(") ");
	        }
	        
	        if (propertySearchDto.getSearchText() != null && propertySearchDto.getSearchText().length() > 0) {
	            sqlQuery.append("AND (properties.city = '" + propertySearchDto.getSearchText() + "' OR properties.state = '"
	                    + propertySearchDto.getSearchText() + "' OR properties.property_name = '"
	                    + propertySearchDto.getSearchText() + "' OR properties.locality = '"
	                    + propertySearchDto.getSearchText() + "') ");
	        }
	        if (propertySearchDto.getCity() != null)
	            sqlQuery.append("AND properties.city = '" + propertySearchDto.getCity() + "' ");
	        if (propertySearchDto.getPositionStatus() != null)
	            sqlQuery.append("AND property_status.position_status = '" + propertySearchDto.getPositionStatus() + "' ");
	        if (propertySearchDto.getSuperBuiltupArea() != null)
	            sqlQuery.append("AND property_area_details.super_builtup_area = '"
	                    + propertySearchDto.getSuperBuiltupArea() + "' ");

	     // Order by approval_status and then by id
	        sqlQuery.append("ORDER BY CASE WHEN properties.approval_status = 'Active' THEN 1 ELSE 2 END, properties.id DESC;");

	        // Create the query
	        Query query = entityManager.createNativeQuery(sqlQuery.toString());

	        List<PropertySearchDto> propertyList = new ArrayList<>();
	        List<Object[]> resultList = query.getResultList();

	        for (Object[] result : resultList) {
	            PropertySearchDto dto = new PropertySearchDto();

	            dto.setPropertyId(Long.parseLong(String.valueOf(result[0])));
	            dto.setListingType(String.valueOf(result[1]));
	            dto.setBuildingType(String.valueOf(result[2]));
	            dto.setPropertyType(String.valueOf(result[3]));
	            dto.setPropertyName(String.valueOf(result[4]));
	            dto.setCity(String.valueOf(result[5]));
	            dto.setLocality(String.valueOf(result[6]));
	            dto.setState(String.valueOf(result[7]));
	            dto.setCountry(String.valueOf(result[8]));
	            dto.setIsExclusiveProperty(String.valueOf(result[9]));	
	            dto.setCreatedDate(String.valueOf(result[10]));

	            String rentValue = String.valueOf(result[11]);
	            dto.setRent(rentValue.equals("null") ? null : Long.parseLong(rentValue));
	            
	            String perSqft = String.valueOf(result[12]);
	            dto.setPerSqftPrice(perSqft.equals("null") ? null : String.valueOf(perSqft));

	            dto.setNumOfBedrooms(String.valueOf(result[13]));
	            dto.setFurnishingType(String.valueOf(result[14]));
	            dto.setImageUrl(String.valueOf(result[15]));
	            dto.setAreaUnit(String.valueOf(result[16]));
	            dto.setBuiltupPlotArea(String.valueOf(result[17]));
	            dto.setPositionStatus(String.valueOf(result[18]));
	            
	            
	            String title = PropertyUtility.constructTitle(String.valueOf(result[14]), String.valueOf(result[13]), String.valueOf(result[3]),
	            		String.valueOf(result[1]), String.valueOf(result[6]), String.valueOf(result[5]));
	            
	            dto.setTitle(title);

	            String username = String.valueOf(result[19]);
	            dto.setUsername(username.equals("Admin") ? "Get My Housing" : username);

	            dto.setWhatsappNumber(String.valueOf(result[20]));
	            dto.setUserRole(String.valueOf(result[21]));
//	            dto.setPostedOn(String.valueOf(result[21]));
	            dto.setVastuFacing(String.valueOf(result[22]));
	            
	            dto.setSuperBuiltupArea(String.valueOf(result[23]));
	            dto.setApprovalStatus(String.valueOf(result[24]));

	            // Set amenities if provided
	            if (propertySearchDto.getAmenities() != null) {
	                List<String> amenitiesList = new ArrayList<>();
	                for (int i = 25; i < result.length; i++) {
	                    amenitiesList.add(String.valueOf(result[i]));
	                }
	                dto.setAmenities(amenitiesList);
	            }

	            if (propertySearchDto.getMinSuperBuiltupArea() != null || propertySearchDto.getMaxSuperBuiltupArea() != null) {
	                dto.setSuperBuiltupArea(String.valueOf(result[result.length - 1]));
	            }

	            propertyList.add(dto);
	        }

	        response.setProperties(propertyList);

	    } catch (Exception e) {
	        e.printStackTrace();
	        response.setResponseCode("500");
	        response.setResponseMessage("Internal Server Error: " + e.getMessage());
	    }

	    return response;
	}
		
	
	@Override 
	public List<PropertySearchDto> getRelatedProperties(PropertySearchDto propertySearchDto){
		StringBuilder sqlQuery = new StringBuilder("");

	    try {
	        // Create column names
	    	sqlQuery.append(
	    		    "SELECT properties.id, properties.listing_type, properties.building_type, properties.property_type, "
	    		    + "properties.property_name, properties.city, properties.locality, properties.state, "
	    		    + "properties.country, properties.is_exclusive_property, properties.created_date, "
	    		    + "pricing_details.rent, pricing_details.per_sqft_price, property_area_details.no_of_bedrooms, furnishing_status.furnishing_type, "
	    		    + "property_image_gallery.image_path, property_area_details.area_unit, property_area_details.builtup_plot_area, "
	    		    + "property_status.position_status, "
	    		    + "users.full_name, users.whatsapp_number, "	
	    		    + "user_roles.role, "
	    		    + "property_area_details.facing, "
	    		    + "properties.pincode, "
	    		    + "property_area_details.super_builtup_area, properties.approval_status " 
	    		);

	        sqlQuery.append("FROM properties ");

	        sqlQuery.append("JOIN pricing_details ON properties.id = pricing_details.property_id ");
	        sqlQuery.append("JOIN property_area_details ON properties.id = property_area_details.property_id ");
	        sqlQuery.append("JOIN furnishing_status ON properties.id = furnishing_status.property_id ");
	        sqlQuery.append("JOIN property_image_gallery ON properties.id = property_image_gallery.property_id "
	                + "AND property_image_gallery.image_type = 'featured' ");
	        sqlQuery.append("JOIN property_status ON properties.id = property_status.property_id ");
	        sqlQuery.append("JOIN users ON properties.created_by = users.id ");
	        sqlQuery.append("JOIN user_roles ON properties.created_by = user_roles.user_id ");
	        
	     // Add filters for pincode
	        if (propertySearchDto.getPincode() != null) {
	            sqlQuery.append("AND properties.pincode = '" + propertySearchDto.getPincode() + "' ");
	        }
	        
	     // Add filters for vastuFacing
	        if (propertySearchDto.getVastuFacing() != null) {
	            sqlQuery.append("AND property_area_details.facing = '" + propertySearchDto.getVastuFacing() + "' ");
	        }
	        
	     // Add filters for property type
	        if (propertySearchDto.getPropertyType() != null) {
	            sqlQuery.append("AND properties.property_type = '" + propertySearchDto.getPropertyType() + "' ");
	        }

	        sqlQuery.append("WHERE properties.approval_status IN ('Active') ");

	     // Order by approval_status and then by id
	        sqlQuery.append("ORDER BY CASE WHEN properties.approval_status = 'Active' THEN 1 ELSE 2 END, properties.id DESC;");

	        // Create the query
	        Query query = entityManager.createNativeQuery(sqlQuery.toString());

	        List<PropertySearchDto> propertyList = new ArrayList<>();
	        List<Object[]> resultList = query.getResultList();

	        for (Object[] result : resultList) {
	            PropertySearchDto dto = new PropertySearchDto();

	            dto.setPropertyId(Long.parseLong(String.valueOf(result[0])));
	            dto.setListingType(String.valueOf(result[1]));
	            dto.setBuildingType(String.valueOf(result[2]));
	            dto.setPropertyType(String.valueOf(result[3]));
	            dto.setPropertyName(String.valueOf(result[4]));
	            dto.setCity(String.valueOf(result[5]));
	            dto.setLocality(String.valueOf(result[6]));
	            dto.setState(String.valueOf(result[7]));
	            dto.setCountry(String.valueOf(result[8]));
	            dto.setIsExclusiveProperty(String.valueOf(result[9]));    
	            dto.setCreatedDate(String.valueOf(result[10]));

	            String rentValue = String.valueOf(result[11]);
	            dto.setRent(rentValue.equals("null") ? null : Long.parseLong(rentValue));

	            String perSqft = String.valueOf(result[12]);
	            dto.setPerSqftPrice(perSqft.equals("null") ? null : String.valueOf(perSqft));

	            dto.setNumOfBedrooms(String.valueOf(result[13]));
	            dto.setFurnishingType(String.valueOf(result[14]));
	            dto.setImageUrl(String.valueOf(result[15]));
	            dto.setAreaUnit(String.valueOf(result[16]));
	            dto.setBuiltupPlotArea(String.valueOf(result[17]));
	            dto.setPositionStatus(String.valueOf(result[18]));

	            String title = PropertyUtility.constructTitle(
	                String.valueOf(result[14]), // Furnishing type
	                String.valueOf(result[13]), // Number of bedrooms
	                String.valueOf(result[3]),  // Property type
	                String.valueOf(result[1]),  // Listing type
	                String.valueOf(result[6]),  // Locality
	                String.valueOf(result[5])   // City
	            );
	            dto.setTitle(title);

	            String username = String.valueOf(result[19]);
	            dto.setUsername(username.equals("Admin") ? "Get My Housing" : username);

	            dto.setWhatsappNumber(String.valueOf(result[20]));
	            dto.setUserRole(String.valueOf(result[21]));
	            dto.setVastuFacing(String.valueOf(result[22])); // Set vastuFacing
	            dto.setPincode(String.valueOf(result[23]));     // Set pincode
	            dto.setSuperBuiltupArea(String.valueOf(result[24]));
	            dto.setApprovalStatus(String.valueOf(result[25]));

	            propertyList.add(dto);
	        }
	        
	        return propertyList;

	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    
	    return new ArrayList<>();
	}

	@Override
	public Properties getPropertyByIdAndCity(Long id, String city) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<Properties> findInDescOrder() {
		return entityManager.createQuery("SELECT u FROM Properties u WHERE u.approvalStatus = 'Active' ORDER BY u.id DESC")
                .setMaxResults(10)
                .getResultList();
		
	}
	
	@Override
    public List<Properties> allPropertyListByStatusInDashboard(PropertiesDTO propertiesDTO) {
        // Extract status from propertiesDTO
        String status = propertiesDTO.getStatus();

        // Create query based on dynamic status value
        return entityManager.createQuery("SELECT u FROM Properties u WHERE u.approvalStatus = :status ORDER BY u.id DESC", Properties.class)
                .setParameter("status", status) // Set parameter dynamically
                .getResultList();
    }
	
	@Override
    public List<Properties> getAllExclusiveProperties(PropertiesDTO propertiesDTO) {
		
		String city = propertiesDTO.getCity();

        // Create query based on dynamic status value
        return entityManager.createQuery("SELECT u FROM Properties u WHERE u.isExclusiveProperty = '1' AND u.approvalStatus = 'Active' AND u.city = :city ORDER BY u.id DESC", Properties.class)
                .setParameter("city", city) 
                .getResultList();
    }
	
	@Override
    public List<Properties> allPropertyByStatusAndUserIdInDashboard(PropertiesDTO propertiesDTO) {
        // Extract status from propertiesDTO
        String status = propertiesDTO.getStatus();
        
        Long userId = propertiesDTO.getCreatedBy();

        // Create query based on dynamic status value
        return entityManager.createQuery("SELECT u FROM Properties u WHERE u.approvalStatus = :status AND u.createdBy = :userId ORDER BY u.id DESC", Properties.class)
                .setParameter("status", status)
                .setParameter("userId", userId)
                .getResultList();
    }
	
	@Override
	public PropertyResponse findInDescOrderBySearch(PropertySearchDto propertySearchDTO) {
		
	    // If searchText is null or empty, return an empty list immediately
	    if (propertySearchDTO.getSearchText() == null || propertySearchDTO.getSearchText().isEmpty()) {
	    	PropertyResponse response = new PropertyResponse();
	    	response.setResponseCode(Constant.NOT_FOUND);
	        response.setResponseMessage("No Result");
	        response.setProperties(Collections.emptyList());
	        return response;
	    }

	    PropertyResponse response = new PropertyResponse();
	    StringBuilder sqlQuery = new StringBuilder("");

	    try {
	        // Create column name 
	        sqlQuery.append(
	                "SELECT properties.id, properties.listing_type, properties.building_type, properties.property_type, ");
	        sqlQuery.append("properties.property_name, properties.city, properties.locality, properties.state, ");
	        sqlQuery.append("properties.country, properties.approval_status, properties.created_date, ");
	        sqlQuery.append(
	                "pricing_details.rent , property_area_details.no_of_bedrooms , furnishing_status.furnishing_type, ");
	        sqlQuery.append(
	                "property_image_gallery.image_path , property_area_details.area_unit, property_area_details.builtup_plot_area, ");
	        sqlQuery.append(" property_status.position_status, ");
	        sqlQuery.append(" users.full_name , users.whatsapp_number ,");
	        sqlQuery.append(" user_roles.role ,");
	        sqlQuery.append(" property_area_details.facing ");

	        sqlQuery.append(" ,property_area_details.super_builtup_area ");
//	        sqlQuery.append(" ,properties.approval_status ");
	        
	        sqlQuery.append("FROM properties ");

	        sqlQuery.append("JOIN pricing_details ON properties.id = pricing_details.property_id ");
	        sqlQuery.append("JOIN property_area_details ON properties.id = property_area_details.property_id ");
	        sqlQuery.append("JOIN furnishing_status ON properties.id = furnishing_status.property_id ");
	        sqlQuery.append("JOIN property_image_gallery ON properties.id = property_image_gallery.property_id"
	                + " AND property_image_gallery.image_type = 'featured' ");
	        sqlQuery.append("JOIN property_status ON properties.id = property_status.property_id ");
	        sqlQuery.append("JOIN users ON properties.created_by = users.id ");
	        sqlQuery.append("JOIN user_roles ON properties.created_by = user_roles.user_id ");
	        
	        // Add multiple JOINs for each selected amenity
	        List<String> amenities = propertySearchDTO.getAmenities();
	        if (amenities != null && !amenities.isEmpty()) {
	            int index = 0;
	            for (String amenity : amenities) {
	                sqlQuery.append("JOIN amenities a" + index + " ON properties.id = a" + index + ".property_id "
	                        + "AND a" + index + ".amenities_facility = '" + amenity + "' ");
	                index++;
	            }
	        }

	        // Filter only active or completed properties
	        sqlQuery.append("WHERE properties.approval_status IN ('Active', 'Completed') ");
	        
	        if (propertySearchDTO.getMinRent() != null && propertySearchDTO.getMaxRent() != null) {
	            sqlQuery.append("AND pricing_details.rent > " + propertySearchDTO.getMinRent()
	                    + " AND pricing_details.rent < " + propertySearchDTO.getMaxRent() + " ");
	        } else if (propertySearchDTO.getMinRent() != null) {
	            sqlQuery.append("AND pricing_details.rent > " + propertySearchDTO.getMinRent() + " ");
	        } else if (propertySearchDTO.getMaxRent() != null) {
	            sqlQuery.append("AND pricing_details.rent < " + propertySearchDTO.getMaxRent() + " ");
	        }

	        if (propertySearchDTO.getMinSuperBuiltupArea() != null && propertySearchDTO.getMaxSuperBuiltupArea() != null) {
	            sqlQuery.append("AND property_area_details.super_builtup_area >= " + propertySearchDTO.getMinSuperBuiltupArea()
	                    + " AND property_area_details.super_builtup_area <= " + propertySearchDTO.getMaxSuperBuiltupArea() + " ");
	        } else if (propertySearchDTO.getMinSuperBuiltupArea() != null) {
	            sqlQuery.append("AND property_area_details.super_builtup_area >= " + propertySearchDTO.getMinSuperBuiltupArea() + " ");
	        } else if (propertySearchDTO.getMaxSuperBuiltupArea() != null) {
	            sqlQuery.append("AND property_area_details.super_builtup_area <= " + propertySearchDTO.getMaxSuperBuiltupArea() + " ");
	        }

	        if (null != propertySearchDTO.getPropertyName())
	            sqlQuery.append("AND properties.property_name = '" + propertySearchDTO.getPropertyName() + "' ");

	        if (null != propertySearchDTO.getListingType())
	            sqlQuery.append("AND properties.listing_type = '" + propertySearchDTO.getListingType() + "' ");

	        if (null != propertySearchDTO.getPropertyType())
	            sqlQuery.append("AND properties.property_type = '" + propertySearchDTO.getPropertyType() + "' ");

	        if (null != propertySearchDTO.getBuildingType())
	            sqlQuery.append("AND properties.building_type = '" + propertySearchDTO.getBuildingType() + "' ");

	     // Add multiple JOINs for each selected BHK
	        List<String> bhk = propertySearchDTO.getBhk();
	        if (bhk != null && !bhk.isEmpty()) {
	            sqlQuery.append("AND property_area_details.no_of_bedrooms IN (");
	            for (int i = 0; i < bhk.size(); i++) {
	                sqlQuery.append("'" + bhk.get(i) + "'");
	                if (i < bhk.size() - 1) {
	                    sqlQuery.append(", ");
	                }
	            }
	            sqlQuery.append(") ");
	        }

	        if (null != propertySearchDTO.getPostedOn())
	            sqlQuery.append("AND user_roles.role = '" + propertySearchDTO.getPostedOn() + "' ");
	        
	        if (null != propertySearchDTO.getFurnishingType())
	            sqlQuery.append("AND furnishing_status.furnishing_type = '" + propertySearchDTO.getFurnishingType() + "' ");

		     // Add multiple JOINs for each selected facing
		        List<String> facing = propertySearchDTO.getFacing();
		        if (facing != null && !facing.isEmpty()) {
		            sqlQuery.append("AND property_area_details.facing IN (");
		            for (int i = 0; i < facing.size(); i++) {
		                sqlQuery.append("'" + facing.get(i) + "'");
		                if (i < facing.size() - 1) {
		                    sqlQuery.append(", ");
		                }
		            }
		            sqlQuery.append(") ");
		        }

//	        if (null != propertySearchDTO.getAmenity()) {
//	            sqlQuery.append("AND amenities.amenities_facility = '" + propertySearchDTO.getAmenity() + "' ");
//	        }

	        if (propertySearchDTO.getSearchText() != null && propertySearchDTO.getSearchText().length() > 0) {
	            String searchText = propertySearchDTO.getSearchText() + "%";
	            sqlQuery.append("AND ( properties.city LIKE ? "
	                            + "OR properties.state LIKE ? "
	                            + "OR properties.property_name LIKE ? "
	                            + "OR properties.pincode LIKE ? "
	                            + "OR properties.locality LIKE ? ) ");
	        }


	        if (null != propertySearchDTO.getCity())
	            sqlQuery.append("AND properties.city = '" + propertySearchDTO.getCity() + "' ");

	        if (null != propertySearchDTO.getPositionStatus())
	            sqlQuery.append("AND property_status.position_status = '" + propertySearchDTO.getPositionStatus() + "' ");

	        if (null != propertySearchDTO.getSuperBuiltupArea())
	            sqlQuery.append("AND property_area_details.super_builtup_area = '" + propertySearchDTO.getSuperBuiltupArea() + "' ");

	        sqlQuery.append("ORDER BY CASE WHEN properties.approval_status = 'Active' THEN 0 ELSE 1 END, properties.id DESC");

	        sqlQuery.append(";");

	        // Create the query
	        Query query = entityManager.createNativeQuery(sqlQuery.toString());
	        
	     // Set parameters for searchText if present
	        if (propertySearchDTO.getSearchText() != null && propertySearchDTO.getSearchText().length() > 0) {
	            String searchText = propertySearchDTO.getSearchText() + "%";
	            query.setParameter(1, searchText);
	            query.setParameter(2, searchText);
	            query.setParameter(3, searchText);
	            query.setParameter(4, searchText);
	            query.setParameter(5, searchText);
	        }

	        List<PropertySearchDto> propertyList = new ArrayList<>();
	        List<Object[]> resultList = query.getResultList();
	        
	     // Check if resultList is empty
	        if (resultList.isEmpty()) {
	            response.setResponseCode(Constant.NOT_FOUND);
	            response.setResponseMessage("No Result");
	            response.setProperties(Collections.emptyList());
	            return response;
	        }

	        for (Object[] result : resultList) {

	            PropertySearchDto dto = new PropertySearchDto();

	            dto.setPropertyId(Long.parseLong(String.valueOf(result[0])));
	            dto.setListingType(String.valueOf(result[1]));
	            dto.setBuildingType(String.valueOf(result[2]));
	            dto.setPropertyType(String.valueOf(result[3]));
	            dto.setPropertyName(String.valueOf(result[4]));
	            dto.setCity(String.valueOf(result[5]));
	            dto.setLocality(String.valueOf(result[6]));
	            dto.setState(String.valueOf(result[7]));
	            dto.setCountry(String.valueOf(result[8]));
	            dto.setApprovalStatus(String.valueOf(result[9]));
	            dto.setCreatedDate(String.valueOf(result[10]));

	            String rentValue = String.valueOf(result[11]);
	            dto.setRent(rentValue.equals("null") ? null : Long.parseLong(rentValue));

	            dto.setNumOfBedrooms(String.valueOf(result[12]));
	            dto.setFurnishingType(String.valueOf(result[13]));
	            dto.setImageUrl(String.valueOf(result[14]));
	            dto.setAreaUnit(String.valueOf(result[15]));
	            dto.setBuiltupPlotArea(String.valueOf(result[16]));
	            dto.setPositionStatus(String.valueOf(result[17]));
	            
	            String username = String.valueOf(result[18]);
	            if (username.equals("Admin")) {
	                dto.setUsername("Get My Housing");
	            } else {
	                dto.setUsername(username);
	            }

	            dto.setWhatsappNumber(String.valueOf(result[19]));
	            dto.setUserRole(String.valueOf(result[20]));
	            dto.setPostedOn(String.valueOf(result[21]));
	            
	            if (result != null && result.length > 22) {
	                dto.setVastuFacing(String.valueOf(result[22]));
	            } else {
	                // Handle the case when result array does not have enough elements
	                dto.setVastuFacing(null); // Or some default value or simply continue
	            }

	            if (propertySearchDTO.getAmenity() != null) { 
	                dto.setAmenity(String.valueOf(result[23]));
	            }

	            if (propertySearchDTO.getMinSuperBuiltupArea() != null || propertySearchDTO.getMaxSuperBuiltupArea() != null) {
	                dto.setSuperBuiltupArea(String.valueOf(result[24]));
	            }

				// Set amenities if provided
	            if (propertySearchDTO.getAmenities() != null) {
	                List<String> amenitiesList = new ArrayList<>();
	                for (int i = 23; i < result.length; i++) {
	                    amenitiesList.add(String.valueOf(result[i]));
	                }
	                dto.setAmenities(amenitiesList);
	            }
	            
	         // Set approval status
//	            dto.setApprovalStatus(String.valueOf(result[25]));

	            propertyList.add(dto);  
	        }

	        response.setProperties(propertyList);

	    } catch (Exception e) {
	        e.printStackTrace();
	        response.setResponseCode("500");
	        response.setResponseMessage("Internal Server Error: " + e.getMessage());
	    }

	    return response;
	}
	
	@Override
	public void changePropertyStatusByAdmin(PropertiesDTO propertiesDto) {
		Properties property = propertiesRepository.findById(propertiesDto.getId())
			    .orElseThrow(() -> new ResourceNotFoundException("Property not found with ID: " + propertiesDto.getId()));

		property.setApprovalStatus(propertiesDto.getApprovalStatus());
		
		property.setApprovalActionDate(DateUtils.currentDate());
		
		property.setApprovalRemarks(propertiesDto.getApprovalRemarks());
		
		property.setApprovalActionBy(String.valueOf(propertiesDto.getUpdatedBy()));
		
		propertiesRepository.save(property);
	}

	@Override
	public PropertyResponse getCompletedPropertyListByFilter(PropertySearchDto propertySearchDto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void exclusiveProperty(PropertiesDTO propertiesDto) {
		
		Properties property = propertiesRepository.findById(propertiesDto.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Property not found with " + propertiesDto.getId() + " this Id"));
		
		property.setExclusiveProperty(propertiesDto.isExclusiveProperty());
		
		propertiesRepository.save(property);
	}

	@Override
	public void assignOwnerToProperty(Properties properties) {
		
		propertiesRepository.save(properties);
	}

}
 