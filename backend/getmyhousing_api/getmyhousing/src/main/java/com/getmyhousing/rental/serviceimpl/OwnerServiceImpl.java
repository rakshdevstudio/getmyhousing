package com.getmyhousing.rental.serviceimpl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.getmyhousing.common.cache.UserCache;
import com.getmyhousing.common.converter.OwnerConverter;
import com.getmyhousing.common.dao.BlogSubCategoryDao;
import com.getmyhousing.common.dao.OwnerDao;
import com.getmyhousing.common.domain.Owner;
import com.getmyhousing.common.dto.LeadDTO;
import com.getmyhousing.common.dto.OwnerDTO;
import com.getmyhousing.common.exception.UnAuthorizedException;
import com.getmyhousing.common.service.LoginService;
import com.getmyhousing.common.validator.RoleEnum;
import com.getmyhousing.rental.service.OwnerService;

@Service("OwnerServiceImpl")
public class OwnerServiceImpl implements OwnerService {
	
	private static Logger LOGGER = LoggerFactory.getLogger(BlogServiceImpl.class);
	
	@Resource(name = "LoginServiceImpl")
	private LoginService loginService;
	
	@Resource(name = "OwnerDaoImpl")
	private OwnerDao ownerDao;
	
	@Autowired
	UserCache userCache;

	@Override
	public void saveOwner(OwnerDTO ownerDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.ASSOCIATE.getRole(), RoleEnum.AGENT.getRole());
		
		boolean userAcccess = loginService.isUserAccessible(ownerDTO.getCreatedBy(), roleList);
		
		if (!userAcccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to add/update owner API details.");
		
		// Save blogCategory
		ownerDao.saveOwner(ownerDTO);
		LOGGER.info("BlogCategory added successfully by " + ownerDTO.getCreatedBy());

	}

	@Override
	public List<OwnerDTO> getOwnersByRole(OwnerDTO ownerDTO) {
		List<String> adminRoleList = Arrays.asList(RoleEnum.ADMIN.getRole());
		
		boolean adminAcccess = loginService.isUserAccessible(ownerDTO.getUpdatedBy(), adminRoleList);
		
		List<String> userRoleList = Arrays.asList(RoleEnum.AGENT.getRole(), RoleEnum.ASSOCIATE.getRole());
		
		boolean agentAssociateAccess = loginService.isUserAccessible(ownerDTO.getUpdatedBy(), userRoleList);
		
		if (!(adminAcccess || agentAssociateAccess))
			throw new UnAuthorizedException("LogedIn User does't have permissions to getOwners API details.");
		
		List<Owner> returnList = new ArrayList<>();
		
		if (adminAcccess) {
			returnList = ownerDao.getAllOwners(ownerDTO);
		}else {
			returnList = ownerDao.getOwnersByCreatedBy(ownerDTO);
		}
		
		// Convert List<Owner> to List<OwnerDTO>
	    List<OwnerDTO> ownerDTOList = returnList.stream()
	            .map(OwnerConverter::getOwnerDTOByOwner) // Use the OwnerConverter to convert each Owner to OwnerDTO
	            .collect(Collectors.toList());

	    return ownerDTOList;
	}

	@Override
	public List<OwnerDTO> getOwners(OwnerDTO ownerDTO) {
		List<String> roleList = Arrays.asList(RoleEnum.ADMIN.getRole(), RoleEnum.AGENT.getRole(), RoleEnum.ASSOCIATE.getRole());
		
		boolean acccess = loginService.isUserAccessible(ownerDTO.getUpdatedBy(), roleList);
		
		if (!acccess)
			throw new UnAuthorizedException("LogedIn User does't have permissions to getOwners API details.");
		
		List<Owner> returnList = new ArrayList<>();
		returnList = ownerDao.getAllOwners(ownerDTO);
		
		// Convert List<Owner> to List<OwnerDTO>
	    List<OwnerDTO> ownerDTOList = returnList.stream()
	            .map(OwnerConverter::getOwnerDTOByOwner) // Use the OwnerConverter to convert each Owner to OwnerDTO
	            .collect(Collectors.toList());

	    return ownerDTOList;
	}

}
