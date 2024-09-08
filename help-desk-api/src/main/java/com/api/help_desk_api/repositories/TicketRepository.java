package com.api.help_desk_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.help_desk_api.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Integer> {
    
}
