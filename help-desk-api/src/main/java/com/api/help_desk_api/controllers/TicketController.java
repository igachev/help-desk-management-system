package com.api.help_desk_api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.help_desk_api.dto.TicketDto;
import com.api.help_desk_api.dto.TicketPaginationDto;
import com.api.help_desk_api.services.TicketService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;




@RestController

@RequestMapping("/api/")
public class TicketController {
    
    private TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("tickets/create/{userId}")
    public ResponseEntity<TicketDto> createTicket(
        @RequestBody TicketDto ticketDto,
        @PathVariable(name = "userId",required = true) int userId
        ) {
    return new ResponseEntity<>(ticketService.createTicket(userId,ticketDto),HttpStatus.CREATED);
    }
    
    @GetMapping("tickets")
    public ResponseEntity<TicketPaginationDto> getAllTickets(
@RequestParam(value="pageNo",defaultValue="0",required=false) int pageNo,
@RequestParam(value ="pageSize",defaultValue ="4",required=false) int pageSize
        ) {
        return new ResponseEntity<>(ticketService.getAllTickets(pageNo, pageSize),HttpStatus.OK);
    }

    @GetMapping("tickets/{ticketId}")
    public ResponseEntity<TicketDto> getTicket(
        @PathVariable(name = "ticketId") int ticketId
        ) {
return new ResponseEntity<>(ticketService.getTicket(ticketId),HttpStatus.OK);
    }
    
    @PutMapping("tickets/edit/{ticketId}/{userId}")
    public ResponseEntity<TicketDto> editTicket(
        @PathVariable(name = "ticketId") int ticketId,
        @PathVariable(name = "userId") int userId, 
        @RequestBody TicketDto ticketDto
        ) {
return new ResponseEntity<>(ticketService.editTicket(ticketId, ticketDto,userId),HttpStatus.OK);
    }

    @PutMapping("tickets/resolve/{ticketId}/{userId}")
    public ResponseEntity<TicketDto> resolveTicket(
        @PathVariable(name = "ticketId") int ticketId,
        @RequestBody TicketDto ticketDto,
        @PathVariable(name = "userId") int userId
        ) {
return new ResponseEntity<>(ticketService.resolveTicket(ticketId, ticketDto,userId),HttpStatus.OK);
    }

    @DeleteMapping("tickets/delete/{ticketId}/{userId}")
    public ResponseEntity<String> deleteTicket(
        @PathVariable(name = "ticketId") int ticketId,
        @PathVariable(name = "userId") int userId
    ) {
        ticketService.deleteTicket(ticketId,userId);
        return new ResponseEntity<>("Ticket deleted successfully",HttpStatus.OK);
    }
}
