package com.api.help_desk_api.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.help_desk_api.dto.TicketDto;
import com.api.help_desk_api.models.Ticket;
import com.api.help_desk_api.repositories.TicketRepository;
import com.api.help_desk_api.services.TicketService;

@Service
public class TicketServiceImpl implements TicketService {

    private TicketRepository ticketRepository;

    @Autowired
    public TicketServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public TicketDto createTicket(TicketDto ticketDto) {
        Ticket ticket = new Ticket();
        ticket.setId(ticketDto.getId());
        ticket.setTicketTitle(ticketDto.getTicketTitle());
        ticket.setTicketDescription(ticketDto.getTicketDescription());
        ticket.setLocalDateTime(ticketDto.getLocalDateTime());

        Ticket newTicket = ticketRepository.save(ticket);

        ticketDto.setId(newTicket.getId());
        ticketDto.setLocalDateTime(newTicket.getLocalDateTime());

        return ticketDto;
    }
    
    
}
