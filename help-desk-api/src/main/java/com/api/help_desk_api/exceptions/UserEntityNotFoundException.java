package com.api.help_desk_api.exceptions;

public class UserEntityNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 2;

    public UserEntityNotFoundException(String message) {
        super(message);
    }
}
