package com.getmyhousing.common.validator;

import java.util.Arrays;

public enum RoleEnum {

	Builder("Builder"), OWNER("Owner"), AGENT("Agent"), TEAM_LEADER("Team Leader"), ADMIN("Admin"),
	TELECALLER("Telecaller") , DEVELOPER("Developer"), BLOG_AUTHOR("Blog Author"), BLOG_MODERATOR("Blog Moderator"),
	AUTHOR("Author"), ASSOCIATE("Associate"), CUSTOMER("Customer"), OPERATOR("Operator"), CHANNELPARTNER("Channel Partner")
	; 

	private String role;

	RoleEnum(String role) {
		this.role = role;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public static boolean isInEnum(String value, Class<RoleEnum> enumClass) {
		return Arrays.stream(enumClass.getEnumConstants()).anyMatch(e -> e.getRole().equals(value));
	}
}
