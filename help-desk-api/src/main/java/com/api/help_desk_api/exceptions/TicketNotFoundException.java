package com.api.help_desk_api.exceptions;

public class TicketNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1;

    public TicketNotFoundException(String message) {
        super(message);
    }
    
}
