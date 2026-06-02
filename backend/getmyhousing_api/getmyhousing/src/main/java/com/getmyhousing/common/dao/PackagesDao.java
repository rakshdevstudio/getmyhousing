package com.getmyhousing.common.dao;

import java.util.List;

import com.getmyhousing.common.domain.Packages;
import com.getmyhousing.common.dto.PackagesDTO;

public interface PackagesDao {

	public Packages savePackages(PackagesDTO packagesDTO);

	public List<Packages> getAllPackages(PackagesDTO packagesDTO);

	public Packages getPackagesById(Long id);
}
