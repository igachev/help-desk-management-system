package com.api.help_desk_api.dto;

public class AuthResponseDto {
    private String accessToken;
    private int userId;

    public AuthResponseDto(String accessToken,int userId) {
        this.accessToken = accessToken;
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "AuthResponseDto [accessToken=" + accessToken + ", userId=" + userId + "]";
    }

}
