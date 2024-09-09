package com.api.help_desk_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(TicketNotFoundException.class)
    public ResponseEntity<ErrorObject> handleTicketNotFound(
        TicketNotFoundException ex, 
        WebRequest request
        ) {
        ErrorObject errorObject = new ErrorObject();
        errorObject.setStatusCode(HttpStatus.NOT_FOUND.value());
        errorObject.setMessage(ex.getMessage());

        return new ResponseEntity<>(errorObject,HttpStatus.NOT_FOUND);
    }
}
