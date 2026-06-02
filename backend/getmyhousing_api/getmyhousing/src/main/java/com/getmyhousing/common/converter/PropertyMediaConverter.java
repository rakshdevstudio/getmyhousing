package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.PropertyMedia;
import com.getmyhousing.common.dto.PropertyMediaDTO;

public class PropertyMediaConverter {

	/**
	 * To convert PropertyMedia to PropertyMediaDTO
	 * 
	 * @param propertyMedia
	 * @return
	 */
	public static PropertyMediaDTO getPropertyMediaDTOByPropertyMedia(PropertyMedia propertyMedia) {
		PropertyMediaDTO propertyMediaDTO = new PropertyMediaDTO();
		propertyMediaDTO.setId(propertyMedia.getId());
		propertyMediaDTO.setPropertyId(propertyMedia.getPropertyId());
		propertyMediaDTO.setCategory(propertyMedia.getCategory());
		propertyMediaDTO.setMediaUrl(propertyMedia.getMediaUrl());
		propertyMediaDTO.setRankOrder(propertyMedia.getRankOrder());
		propertyMediaDTO.setStatus(propertyMedia.getStatus());
		propertyMediaDTO.setUpdatedBy(propertyMedia.getUpdatedBy());
		propertyMediaDTO.setUpdatedDate(propertyMedia.getUpdatedDate());
		propertyMediaDTO.setCreatedBy(propertyMedia.getCreatedBy());
		propertyMediaDTO.setCreatedDate(propertyMedia.getCreatedDate());

		return propertyMediaDTO;

	}

	/**
	 * To convert PropertyMediaDTO to PropertyMedia
	 * 
	 * @param propertyMediaDTO
	 * @return
	 */
	public static PropertyMedia getPropertyMediaByPropertyMediaDTO(PropertyMediaDTO propertyMediaDTO) {
		PropertyMedia propertyMedia = new PropertyMedia();
		propertyMedia.setId(propertyMediaDTO.getId());
		propertyMedia.setPropertyId(propertyMediaDTO.getPropertyId());
		propertyMedia.setCategory(propertyMediaDTO.getCategory());
		propertyMedia.setMediaUrl(propertyMediaDTO.getMediaUrl());
		propertyMedia.setRankOrder(propertyMediaDTO.getRankOrder());
		propertyMedia.setStatus(propertyMediaDTO.getStatus());
		propertyMedia.setUpdatedBy(propertyMediaDTO.getUpdatedBy());
		propertyMedia.setUpdatedDate(propertyMediaDTO.getUpdatedDate());
		propertyMedia.setCreatedBy(propertyMediaDTO.getCreatedBy());
		propertyMedia.setCreatedDate(propertyMediaDTO.getCreatedDate());

		return propertyMedia;
	}

}
