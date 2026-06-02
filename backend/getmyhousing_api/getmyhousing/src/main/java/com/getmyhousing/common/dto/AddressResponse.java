package com.getmyhousing.common.dto;

import java.util.List;

import com.getmyhousing.common.domain.CountryPincodeMapping;

public class AddressResponse {
	
	private List<CountryPincodeMappingDTO> content;
	private int pageNumber;
	private int pageSize;
	private long totalElement;
	private int totalPages;
	
	private boolean lastPage;

	public List<CountryPincodeMappingDTO> getContent() {
		return content;
	}

	public void setContent(List<CountryPincodeMappingDTO> content) {
		this.content = content;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public long getTotalElement() {
		return totalElement;
	}

	public void setTotalElement(long totalElement) {
		this.totalElement = totalElement;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public boolean isLastPage() {
		return lastPage;
	}

	public void setLastPage(boolean lastPage) {
		this.lastPage = lastPage;
	}
	
	

}
