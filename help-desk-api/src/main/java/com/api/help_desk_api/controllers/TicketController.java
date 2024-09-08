package com.api.help_desk_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.help_desk_api.dto.TicketDto;
import com.api.help_desk_api.services.TicketService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/")
public class TicketController {
    
    private TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("ticket/create")
    public ResponseEntity<TicketDto> createTicket(@RequestBody TicketDto ticketDto) {
    return new ResponseEntity<>(ticketService.createTicket(ticketDto),HttpStatus.CREATED);
    }
    
}
