package com.getmyhousing.common.daoimpl;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.dao.IncludedGroupPropertyDao;
import com.getmyhousing.common.domain.FurnishingStatus;
import com.getmyhousing.common.domain.PricingDetails;
import com.getmyhousing.common.domain.Properties;
import com.getmyhousing.common.domain.PropertyAreaDetails;
import com.getmyhousing.common.domain.PropertyImageGallery;
import com.getmyhousing.common.domain.PropertyStatus;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.domain.UserRole;
import com.getmyhousing.common.dto.IncludedGroupPropertyDTO;
import com.getmyhousing.common.repository.FurnishingStatusRepository;
import com.getmyhousing.common.repository.PricingDetailsRepository;
import com.getmyhousing.common.repository.PropertyAreaDetailsRepository;
import com.getmyhousing.common.repository.PropertyGroupRepository;
import com.getmyhousing.common.repository.PropertyImageGalleryRepository;
import com.getmyhousing.common.repository.PropertyStatusRepository;
import com.getmyhousing.common.repository.UserRepository;
import com.getmyhousing.common.repository.UserRoleRepository;

@Transactional
@Service("IncludedGroupPropertyDaoImpl")
public class IncludedGroupPropertyDaoImpl implements IncludedGroupPropertyDao {

	@Autowired
	private PropertyGroupRepository propertyGroupRepository;

	@Autowired
	private PropertyAreaDetailsRepository propertyAreaDetailsRepository;

	@Autowired
	private PricingDetailsRepository pricingDetailsRepository;

	@Autowired
	private FurnishingStatusRepository furnishingStatusRepository;

	@Autowired
	private PropertyStatusRepository propertyStatusRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private PropertyImageGalleryRepository propertyImageGalleryRepository;

	@Override
	public IncludedGroupPropertyDTO addGroupProperty(Properties properties) {
		IncludedGroupPropertyDTO includedGroupPropertyDTO = new IncludedGroupPropertyDTO();
		try {

			Long propertyId = properties.getId();
			Long userId = properties.getCreatedBy();

			includedGroupPropertyDTO.setPropertyId(properties.getId());
			includedGroupPropertyDTO.setCreatedDate(properties.getCreatedDate());
			includedGroupPropertyDTO.setPropertyType(properties.getPropertyType());
			includedGroupPropertyDTO.setPropertyName(properties.getPropertyName());
			includedGroupPropertyDTO.setPropertyAddress(properties.getPropertyAddress());
			includedGroupPropertyDTO.setBuildingType(properties.getBuildingType());
			includedGroupPropertyDTO.setLocality(properties.getLocality());
			includedGroupPropertyDTO.setCity(properties.getCity());
			includedGroupPropertyDTO.setState(properties.getState());
			includedGroupPropertyDTO.setCountry(properties.getCountry());
			includedGroupPropertyDTO.setListingType(properties.getListingType());

			Optional<PricingDetails> optionalPricingDetails = pricingDetailsRepository.findByPropertyId(propertyId);
			Optional<PropertyAreaDetails> optionalPropertyAreaDetails = propertyAreaDetailsRepository
					.findByPropertyId(propertyId);
			Optional<FurnishingStatus> optionalFurnishingStatus = furnishingStatusRepository
					.findByPropertyId(propertyId);
			Optional<PropertyStatus> optionalPropertyStatus = propertyStatusRepository.findByPropertyId(propertyId);

			Optional<User> optionalUserRepository = userRepository.findById(userId);
			List<UserRole> findRoleByUserIds = userRoleRepository.findByUserId(userId);

			PropertyImageGallery propertyImageByPropertyId = propertyImageGalleryRepository
					.getPropertyImageByPropertyId(propertyId);

			if (optionalPricingDetails.isPresent()) {
				PricingDetails pricingDetails = optionalPricingDetails.get();
				includedGroupPropertyDTO.setRent(pricingDetails.getRent());
			}

			if (optionalPropertyAreaDetails.isPresent()) {
				PropertyAreaDetails propertyAreaDetails = optionalPropertyAreaDetails.get();
				includedGroupPropertyDTO.setAreaUnit(propertyAreaDetails.getAreaUnit());
				includedGroupPropertyDTO.setBuiltupPlotArea(propertyAreaDetails.getBuiltupPlotArea());
				includedGroupPropertyDTO.setNumOfBedrooms(propertyAreaDetails.getNoOfBedrooms());
				includedGroupPropertyDTO.setSuperBuiltupArea(propertyAreaDetails.getSuperBuiltupArea());
				includedGroupPropertyDTO.setVastuFacing(propertyAreaDetails.getFacing());
//				includedGroupPropertyDTO.setCarpetArea(propertyAreaDetails.getCarpetArea());
//				includedGroupPropertyDTO.setGardenArea(propertyAreaDetails.getGardenArea());
//				includedGroupPropertyDTO.setSalebleArea(propertyAreaDetails.getSalableArea());
//				includedGroupPropertyDTO.setTerraceArea(propertyAreaDetails.getTerraceArea());

				
				
				includedGroupPropertyDTO.setMinSuperBuiltupArea("");
				includedGroupPropertyDTO.setMaxSuperBuiltupArea("");
			}

			if (optionalFurnishingStatus.isPresent()) {
				FurnishingStatus furnishingStatus = optionalFurnishingStatus.get();
				includedGroupPropertyDTO.setFurnishingType(furnishingStatus.getFurnishingType());
			}

			if (optionalPropertyStatus.isPresent()) {
				PropertyStatus propertyStatus = optionalPropertyStatus.get();
				includedGroupPropertyDTO.setPositionStatus(propertyStatus.getPositionStatus());
			}

			if (optionalUserRepository.isPresent()) {
				User userDetails = optionalUserRepository.get();
				includedGroupPropertyDTO.setUsername(userDetails.getFullName());
			}

			String role = "";
			for (UserRole findRoleByUserId : findRoleByUserIds) {
				role = findRoleByUserId.getRole();

			}

			includedGroupPropertyDTO.setUserRole(role);

			includedGroupPropertyDTO.setImageUrl(propertyImageByPropertyId.getImagePath());

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return includedGroupPropertyDTO;
	}

}
