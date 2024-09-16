package com.api.help_desk_api.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.help_desk_api.dto.TicketDto;
import com.api.help_desk_api.dto.TicketPaginationDto;
import com.api.help_desk_api.exceptions.TicketNotFoundException;
import com.api.help_desk_api.exceptions.UserEntityNotFoundException;
import com.api.help_desk_api.models.Ticket;
import com.api.help_desk_api.models.UserEntity;
import com.api.help_desk_api.repositories.TicketRepository;
import com.api.help_desk_api.repositories.UserEntityRepository;
import com.api.help_desk_api.services.TicketService;
import java.util.stream.Collectors;
import java.util.Date;

@Service
public class TicketServiceImpl implements TicketService {

    private TicketRepository ticketRepository;
    private UserEntityRepository userEntityRepository;

    @Autowired
    public TicketServiceImpl(
        TicketRepository ticketRepository,
        UserEntityRepository userEntityRepository
        ) {
        this.ticketRepository = ticketRepository;
        this.userEntityRepository = userEntityRepository;
    }

    @Override
    public TicketDto createTicket(int userId,TicketDto ticketDto) {
        UserEntity userEntity = userEntityRepository.findById(userId)
        .orElseThrow(() ->
        new UserEntityNotFoundException("User does not exists!"));

        Ticket ticket = new Ticket();
        ticket.setId(ticketDto.getId());
        ticket.setTicketTitle(ticketDto.getTicketTitle());
        ticket.setTicketDescription(ticketDto.getTicketDescription());
        ticket.setCreatedAt(ticketDto.getCreatedAt());
        ticket.setResolved(false);
        ticket.setUser(userEntity);

        Ticket newTicket = ticketRepository.save(ticket);

        ticketDto.setId(newTicket.getId());
        ticketDto.setCreatedAt(newTicket.getCreatedAt());

        return ticketDto;
    }

    @Override
    public TicketPaginationDto getAllTickets(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Ticket> tickets = ticketRepository.findAll(pageable);
        
        List<Ticket> listOfTickets = tickets.getContent();

        List<TicketDto> content = listOfTickets.stream()
        .filter((ticket) -> ticket.isResolved() == false)
        .map((ticket) -> mapToDto(ticket)).collect(Collectors.toList());

        TicketPaginationDto ticketPaginationDto = new TicketPaginationDto();
        ticketPaginationDto.setContent(content);
        ticketPaginationDto.setPageNo(tickets.getNumber());
        ticketPaginationDto.setPageSize(tickets.getSize());
        ticketPaginationDto.setTotalElements(tickets.getTotalElements());
        ticketPaginationDto.setTotalPages(tickets.getTotalPages());
        ticketPaginationDto.setLast(tickets.isLast());

        return ticketPaginationDto;
    }

    @Override
    public TicketPaginationDto getAllResolvedTickets(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        Page<Ticket> tickets = ticketRepository.findAll(pageable);
        
        List<Ticket> listOfTickets = tickets.getContent();

        List<TicketDto> content = listOfTickets.stream()
        .filter((ticket) -> ticket.isResolved() == true)
        .map((ticket) -> mapToDto(ticket)).collect(Collectors.toList());

        TicketPaginationDto ticketPaginationDto = new TicketPaginationDto();
        ticketPaginationDto.setContent(content);
        ticketPaginationDto.setPageNo(tickets.getNumber());
        ticketPaginationDto.setPageSize(tickets.getSize());
        ticketPaginationDto.setTotalElements(tickets.getTotalElements());
        ticketPaginationDto.setTotalPages(tickets.getTotalPages());
        ticketPaginationDto.setLast(tickets.isLast());

        return ticketPaginationDto;
    }
    
    @Override
    public TicketDto getTicket(int ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> 
        new TicketNotFoundException("Ticket not found"));

        return mapToDto(ticket);
    }

    @Override
    public TicketDto editTicket(int ticketId, TicketDto ticketDto,int userId) {
        Ticket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> 
        new TicketNotFoundException("Ticket not found"));

        if(userId != ticket.getUser().getId()) {
            throw new TicketNotFoundException("Error!Only the ticket creator can edit it");
        }

        ticket.setTicketTitle(ticketDto.getTicketTitle());
        ticket.setTicketDescription(ticketDto.getTicketDescription());
        ticket.setCreatedAt(new Date());
        ticketRepository.save(ticket);

        return mapToDto(ticket);
    }

    @Override
    public TicketDto resolveTicket(int ticketId, TicketDto ticketDto,int userId) {
        Ticket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> 
        new TicketNotFoundException("Ticket not found"));

        UserEntity userEntity = userEntityRepository.findById(userId)
        .orElseThrow(() ->
        new UserEntityNotFoundException("User does not exists!"));

        if(userEntity.getEmail().equals("admin@abv.bg")) {
            ticket.setResolved(ticketDto.isResolved());
            ticketRepository.save(ticket);
            return mapToDto(ticket);
        }
        else {
            throw new TicketNotFoundException("Only admin is able to resolve tickets");
        }

    }

    @Override
    public void deleteTicket(int ticketId,int userId) {
        Ticket ticket = ticketRepository.findById(ticketId)
        .orElseThrow(() -> 
        new TicketNotFoundException("Ticket not found"));
        
        if(userId != ticket.getUser().getId()) {
            throw new TicketNotFoundException("Error!Only the ticket creator can delete it");
        }

        ticketRepository.delete(ticket);
    }
    
    private TicketDto mapToDto(Ticket ticket) {
        TicketDto ticketDto = new TicketDto();
        ticketDto.setId(ticket.getId());
        ticketDto.setTicketTitle(ticket.getTicketTitle());
        ticketDto.setTicketDescription(ticket.getTicketDescription());
        ticketDto.setCreatedAt(ticket.getCreatedAt());
        ticketDto.setResolved(ticket.isResolved());
        return ticketDto;
    }
   
    private Ticket mapToEntity(TicketDto ticketDto) {
        Ticket ticket = new Ticket();
        ticket.setId(ticketDto.getId());
        ticket.setTicketTitle(ticketDto.getTicketTitle());
        ticket.setTicketDescription(ticketDto.getTicketDescription());
        ticket.setCreatedAt(ticketDto.getCreatedAt());
        return ticket;
    }

    

    
}
