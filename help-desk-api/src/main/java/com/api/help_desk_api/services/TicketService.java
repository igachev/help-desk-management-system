package com.api.help_desk_api.services;

import com.api.help_desk_api.dto.TicketDto;

public interface TicketService {
    TicketDto createTicket(TicketDto ticketDto);
}
