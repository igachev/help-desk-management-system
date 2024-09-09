package com.api.help_desk_api.services;

import com.api.help_desk_api.dto.TicketDto;
import com.api.help_desk_api.dto.TicketPaginationDto;

public interface TicketService {
    TicketDto createTicket(TicketDto ticketDto);
    TicketPaginationDto getAllTickets(int pageNo, int pageSize);
    TicketDto getTicket(int ticketId);
}
