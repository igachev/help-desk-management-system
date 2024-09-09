package com.api.help_desk_api.exceptions;

public class ErrorObject {
    private Integer statusCode;
    private String message;

    public ErrorObject() { }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ErrorObject [statusCode=" + statusCode + ", message=" + message + "]";
    }

    
}
