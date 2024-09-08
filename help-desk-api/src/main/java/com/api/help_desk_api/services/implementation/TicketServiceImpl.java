package com.api.help_desk_api.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.help_desk_api.dto.TicketDto;
import com.api.help_desk_api.dto.TicketPaginationDto;
import com.api.help_desk_api.models.Ticket;
import com.api.help_desk_api.repositories.TicketRepository;
import com.api.help_desk_api.services.TicketService;
import java.util.stream.Collectors;

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

    @Override
    public TicketPaginationDto getAllTickets(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Ticket> tickets = ticketRepository.findAll(pageable);
        System.out.println("tickets: " + tickets);
        List<Ticket> listOfTickets = tickets.getContent();
        System.out.println("listOfTickets: " + listOfTickets);

        List<TicketDto> content = listOfTickets.stream()
        .map((ticket) -> mapToDto(ticket)).collect(Collectors.toList());
        System.out.println("content: " + content);

        TicketPaginationDto ticketPaginationDto = new TicketPaginationDto();
        ticketPaginationDto.setContent(content);
        ticketPaginationDto.setPageNo(tickets.getNumber());
        ticketPaginationDto.setPageSize(tickets.getSize());
        ticketPaginationDto.setTotalElements(tickets.getTotalElements());
        ticketPaginationDto.setTotalPages(tickets.getTotalPages());
        ticketPaginationDto.setLast(tickets.isLast());

        return ticketPaginationDto;
    }
    
    
    private TicketDto mapToDto(Ticket ticket) {
        TicketDto ticketDto = new TicketDto();
        ticketDto.setId(ticket.getId());
        ticketDto.setTicketTitle(ticket.getTicketTitle());
        ticketDto.setTicketDescription(ticket.getTicketDescription());
        ticketDto.setLocalDateTime(ticket.getLocalDateTime());
        return ticketDto;
    }

}
