package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.Owner;
import com.getmyhousing.common.dto.OwnerDTO;

public class OwnerConverter {
	
	public static OwnerDTO getOwnerDTOByOwner(Owner owner) {
        OwnerDTO dto = new OwnerDTO();
        dto.setId(owner.getId());
        dto.setFullName(owner.getFullName());
        dto.setEmail(owner.getEmail());
        dto.setMobileNumber(owner.getMobileNumber());
        dto.setWhatsappNumber(owner.getWhatsappNumber());
        dto.setAddress(owner.getAddress());
        dto.setCity(owner.getCity());
        dto.setState(owner.getState());
        dto.setCountry(owner.getCountry());
        dto.setPincode(owner.getPincode());
        dto.setCreatedBy(owner.getCreatedBy());
        dto.setCreatedDate(owner.getCreatedDate());
        dto.setUpdatedBy(owner.getUpdatedBy());
        dto.setUpdatedDate(owner.getUpdatedDate());
        dto.setStatus(owner.getStatus());
        return dto;
    }

    public static Owner getOwnerByOwnerDTO(OwnerDTO dto) {
        Owner owner = new Owner();
        owner.setId(dto.getId());
        owner.setFullName(dto.getFullName());
        owner.setEmail(dto.getEmail());
        owner.setMobileNumber(dto.getMobileNumber());
        owner.setWhatsappNumber(dto.getWhatsappNumber());
        owner.setAddress(dto.getAddress());
        owner.setCity(dto.getCity());
        owner.setState(dto.getState());
        owner.setCountry(dto.getCountry());
        owner.setPincode(dto.getPincode());
        owner.setCreatedBy(dto.getCreatedBy());
        owner.setCreatedDate(dto.getCreatedDate());
        owner.setUpdatedBy(dto.getUpdatedBy());
        owner.setUpdatedDate(dto.getUpdatedDate());
        owner.setStatus(dto.getStatus());
        return owner;
    }

}
