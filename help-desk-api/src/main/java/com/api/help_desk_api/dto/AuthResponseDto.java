package com.api.help_desk_api.dto;

public class AuthResponseDto {
    private String accessToken;

    public AuthResponseDto(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "AuthResponseDto [accessToken=" + accessToken + "]";
    }

}
