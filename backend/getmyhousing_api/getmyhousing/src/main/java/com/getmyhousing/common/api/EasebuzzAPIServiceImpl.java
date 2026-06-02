package com.getmyhousing.common.api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.getmyhousing.common.cache.UserCache;
import com.getmyhousing.common.domain.User;
import com.getmyhousing.common.dto.EasebuzzOrderDTO;
import com.getmyhousing.common.dto.PackagesDTO;
import com.getmyhousing.common.utils.Sha12HashUtils;

@Service("EasebuzzAPIServiceImpl")
public class EasebuzzAPIServiceImpl implements EasebuzzAPIService {

	private static Logger LOGGER = LoggerFactory.getLogger(EasebuzzAPIServiceImpl.class);

	@Value("${easeBuzz.baseUrl}")
	private String easeBuzzBaseUrl;

	@Value("${easeBuzz.key}")
	private String easeBuzzKey;

	@Value("${easeBuzz.salt}")
	private String easeBuzzSalt;

	@Value("${easeBuzz.productInfo}")
	private String easeBuzzProductInfo;

	@Value("${easeBuzz.getPaymentUrl}")
	private String easeBuzzgetPaymentUrl;

	@Autowired
	private UserCache userCache;

	@Autowired
	private ObjectMapper mapper;

	@Override
	public MultiValueMap<String, String> createEaseBuzzOrder(PackagesDTO packageDTO, String sequnceid) {
		String url = easeBuzzBaseUrl + "/payment/initiateLink";

		// Take userDetails
		User user = userCache.getUser(packageDTO.getUpdatedBy());

		// Forming the payLoad
		MultiValueMap<String, String> payload = new LinkedMultiValueMap<>();
		payload.add("key", easeBuzzKey);
		payload.add("txnid", sequnceid);
		payload.add("amount", packageDTO.getAmount().toString());
		payload.add("productinfo", easeBuzzProductInfo);
		payload.add("firstname", user.getFullName());
		payload.add("phone", user.getMobileNumber());
		payload.add("email", user.getEmail());
		payload.add("surl", "https://propertboker.com");
		payload.add("furl", "https://propertboker.com");
		payload.add("hash", createEseBzOrdHashToCrteOrd(packageDTO, user, sequnceid));

		
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(payload, getHeaders());
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = null;

		try {
			response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
			LOGGER.info("Response from createEaseBuzzOrder::" + response.getBody());
			JsonNode actualObj = mapper.readTree(response.getBody());
			payload.add("data", actualObj.get("data").asText());
					
		} catch (Exception e) {
			LOGGER.info("Exception while creating EaseBuzz order:" + e.getMessage());
			e.printStackTrace();
		}

		return payload;
	}

	@Override
	public String getEaseBuzzOrderInfo(EasebuzzOrderDTO easebuzzOrderDTO) {
		String url = easeBuzzgetPaymentUrl + "/transaction/v1/retrieve";

		// Forming the payLoad
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("txnid", easebuzzOrderDTO.getEasebuzzTxnId());
		formData.add("key", easeBuzzKey);
		formData.add("amount", easebuzzOrderDTO.getAmount().toString());
		formData.add("email", easebuzzOrderDTO.getEmail());
		formData.add("phone", easebuzzOrderDTO.getMobileNumber());
		formData.add("hash", createEseBzOrdHashToGetTxnDtls(easebuzzOrderDTO));

		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, getHeaders());
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = null;
		try {
			response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
			LOGGER.info("Response from getEaseBuzzOrderInfo::" + response.getBody());
		} catch (Exception e) {
			LOGGER.info("Exception while getting the order details from easebuzz::" + e.getMessage());
			e.printStackTrace();
		}

		return response.getBody();

	}

	private HttpHeaders getHeaders() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		return headers;
	}

	/**
	 * To get SHA-12 hash for creating EaseBuzz order
	 * 
	 * @param orderWraDTO
	 * @param user
	 * @param sequnceid
	 * @return
	 */

	private String createEseBzOrdHashToCrteOrd(PackagesDTO packageDTO, User user, String sequnceid) {
		// Concatenate the values to createEaseBuzzOrderHash
		String concatenatedString = easeBuzzKey + "|" + sequnceid + "|" + packageDTO.getAmount().toString() + "|"
				+ easeBuzzProductInfo + "|" + user.getFullName() + "|" + user.getEmail() + "|" + "|" + "|" + "|" + "|"
				+ "|" + "|" + "|" + "|" + "|" + "|" + easeBuzzSalt;

		return Sha12HashUtils.createSha12Hash(concatenatedString);
	}

	/**
	 * To get SHA-12 hash to get easebuzz order details
	 * 
	 * @param easebuzzOrderDTO
	 * @return
	 */

	private String createEseBzOrdHashToGetTxnDtls(EasebuzzOrderDTO easebuzzOrderDTO) {

		// Concatenate the values to createEaseBuzzOrderHash
		String concatenatedString = easeBuzzKey + "|" + easebuzzOrderDTO.getEasebuzzTxnId() + "|"
				+ easebuzzOrderDTO.getAmount().floatValue() + "|" + easebuzzOrderDTO.getEmail() + "|"
				+ easebuzzOrderDTO.getMobileNumber() + "|" + easeBuzzSalt;

		return Sha12HashUtils.createSha12Hash(concatenatedString);
	}
}
