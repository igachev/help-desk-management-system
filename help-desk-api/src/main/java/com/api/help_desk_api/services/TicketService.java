package com.api.help_desk_api.services;

import com.api.help_desk_api.dto.TicketDto;
import com.api.help_desk_api.dto.TicketPaginationDto;

public interface TicketService {
    TicketDto createTicket(int userId,TicketDto ticketDto);
    TicketPaginationDto getAllTickets(int pageNo, int pageSize);
    TicketDto getTicket(int ticketId);
    TicketDto editTicket(int ticketId,TicketDto ticketDto,int userId);
    void deleteTicket(int ticketId,int userId);
}
