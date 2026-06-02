package com.getmyhousing.common.converter;

import com.getmyhousing.common.constant.Constant;
import com.getmyhousing.common.domain.PackagePayment;
import com.getmyhousing.common.dto.PackagePaymentDTO;
import com.getmyhousing.common.utils.DateUtils;

public class PackagePaymentConverter {
	
	public static PackagePaymentDTO getPackagePaymentDtoByPackagePayment(PackagePayment packagePayment) {
		PackagePaymentDTO packagePaymentDto = new PackagePaymentDTO();
		
		packagePaymentDto.setId(packagePayment.getId());
		packagePaymentDto.setPackageId(packagePayment.getPackageId());
		packagePaymentDto.setTransactionId(packagePayment.getTransactionId());
		packagePaymentDto.setStatus(packagePayment.getStatus());
		packagePaymentDto.setCreatedDate(packagePayment.getCreatedDate());
		packagePaymentDto.setCreatedBy(packagePayment.getCreatedBy());
		packagePaymentDto.setUpdatedDate(packagePayment.getUpdatedDate());
		packagePaymentDto.setUpdatedBy(packagePayment.getUpdatedBy());
		packagePaymentDto.setUserId(packagePayment.getUserId());
		return packagePaymentDto;
	}
	
	public static PackagePayment getPackagePaymentByPackagePaymentDto(PackagePaymentDTO packagePaymentDto) {
		PackagePayment packagePayment = new PackagePayment();
		
		packagePayment.setId(packagePaymentDto.getId());
		packagePayment.setPackageId(packagePaymentDto.getPackageId());
		packagePayment.setTransactionId(packagePaymentDto.getTransactionId());
		packagePayment.setStatus(Constant.STATUS_PENDING);
		packagePayment.setCreatedDate(DateUtils.currentDate());
		packagePayment.setCreatedBy(packagePaymentDto.getCreatedBy());
		packagePayment.setUpdatedDate(packagePaymentDto.getUpdatedDate());
		packagePayment.setUpdatedBy(packagePaymentDto.getUpdatedBy());
		packagePayment.setUserId(packagePaymentDto.getUserId());
		return packagePayment;
	}

}
