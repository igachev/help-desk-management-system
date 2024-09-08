package com.api.help_desk_api.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class TicketDto {
    private int id;
    private String ticketTitle;
    private String ticketDescription;
    private Date localDateTime;

    public TicketDto() { }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTicketTitle() {
        return ticketTitle;
    }

    public void setTicketTitle(String ticketTitle) {
        this.ticketTitle = ticketTitle;
    }

    public String getTicketDescription() {
        return ticketDescription;
    }

    public void setTicketDescription(String ticketDescription) {
        this.ticketDescription = ticketDescription;
    }

    public Date getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(Date localDateTime) {
        this.localDateTime = localDateTime;
    }

    @Override
    public String toString() {
        return "TicketDto [id=" + id + ", ticketTitle=" + ticketTitle + ", ticketDescription=" + ticketDescription
                + ", localDateTime=" + localDateTime + "]";
    }

    
}
