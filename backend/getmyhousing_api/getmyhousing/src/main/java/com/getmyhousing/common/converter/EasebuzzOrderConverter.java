package com.getmyhousing.common.converter;

import com.getmyhousing.common.domain.EasebuzzOrder;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;

public class EasebuzzOrderConverter {

	/**
	 * convert EasebuzzOrderDTO to EasebuzzOrder.
	 * 
	 * @param orderDTO
	 * @return
	 */
	public static EasebuzzOrder getEasebuzzOrderByEasebuzzOrderDTO(EasebuzzOrderDTO orderDTO) {
		EasebuzzOrder rorder = new EasebuzzOrder();

		rorder.setId(orderDTO.getId());
		rorder.setUserId(orderDTO.getUserId());
		rorder.setFullName(orderDTO.getFullName());
		rorder.setEmail(orderDTO.getEmail());
		rorder.setMobileNumber(orderDTO.getMobileNumber());
		rorder.setPackageId(orderDTO.getPackageId());
		rorder.setAmount(orderDTO.getAmount());
		rorder.setEasebuzzTxnId(orderDTO.getEasebuzzTxnId());
		rorder.setOrderStatus(orderDTO.getOrderStatus());
		rorder.setBankRefNum(orderDTO.getBankRefNum());
		rorder.setCardType(orderDTO.getCardType());
		rorder.setBankName(orderDTO.getBankName());
		rorder.setCardNum(orderDTO.getCardNum());
		rorder.setNameOnCard(orderDTO.getNameOnCard());
		rorder.setEasepayId(orderDTO.getEasepayId());
		rorder.setMode(orderDTO.getMode());
		rorder.setUpiVa(orderDTO.getUpiVa());
		rorder.setMessage(orderDTO.getMessage());
		rorder.setStatus(orderDTO.getStatus());
		rorder.setCreatedDate(orderDTO.getCreatedDate());
		rorder.setCreatedBy(orderDTO.getCreatedBy());
		rorder.setUpdatedDate(orderDTO.getUpdatedDate());
		rorder.setUpdatedBy(orderDTO.getUpdatedBy());
		return rorder;
	}

	/**
	 * convert EasebuzzOrderDTO to EasebuzzOrder.
	 * 
	 * @param orderDTO
	 * @return
	 */
	public static EasebuzzOrderDTO getEasebuzzOrderDTOByEasebuzzOrder(EasebuzzOrder easebuzzOrder) {
		EasebuzzOrderDTO easebuzzOrderDTO = new EasebuzzOrderDTO();

		easebuzzOrderDTO.setId(easebuzzOrder.getId());
		easebuzzOrderDTO.setUserId(easebuzzOrder.getUserId());
		easebuzzOrderDTO.setFullName(easebuzzOrder.getFullName());
		easebuzzOrderDTO.setEmail(easebuzzOrder.getEmail());
		easebuzzOrderDTO.setMobileNumber(easebuzzOrder.getMobileNumber());
		easebuzzOrderDTO.setPackageId(easebuzzOrder.getPackageId());
		easebuzzOrderDTO.setAmount(easebuzzOrder.getAmount());
		easebuzzOrderDTO.setEasebuzzTxnId(easebuzzOrder.getEasebuzzTxnId());
		easebuzzOrderDTO.setOrderStatus(easebuzzOrder.getOrderStatus());
		easebuzzOrderDTO.setBankRefNum(easebuzzOrder.getBankRefNum());
		easebuzzOrderDTO.setCardType(easebuzzOrder.getCardType());
		easebuzzOrderDTO.setBankName(easebuzzOrder.getBankName());
		easebuzzOrderDTO.setCardNum(easebuzzOrder.getCardNum());
		easebuzzOrderDTO.setNameOnCard(easebuzzOrder.getNameOnCard());
		easebuzzOrderDTO.setEasepayId(easebuzzOrder.getEasepayId());
		easebuzzOrderDTO.setMode(easebuzzOrder.getMode());
		easebuzzOrderDTO.setUpiVa(easebuzzOrder.getUpiVa());
		easebuzzOrderDTO.setMessage(easebuzzOrder.getMessage());
		easebuzzOrderDTO.setStatus(easebuzzOrder.getStatus());
		easebuzzOrderDTO.setCreatedDate(easebuzzOrder.getCreatedDate());
		easebuzzOrderDTO.setCreatedBy(easebuzzOrder.getCreatedBy());
		easebuzzOrderDTO.setUpdatedDate(easebuzzOrder.getUpdatedDate());
		easebuzzOrderDTO.setUpdatedBy(easebuzzOrder.getUpdatedBy());
		return easebuzzOrderDTO;
	}
}
