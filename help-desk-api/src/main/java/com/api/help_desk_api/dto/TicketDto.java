package com.api.help_desk_api.dto;


import java.util.Date;

import com.api.help_desk_api.models.UserEntity;

public class TicketDto {
    private int id;
    private String ticketTitle;
    private String ticketDescription;
    private Date createdAt;
    private boolean isResolved;
    private UserEntity user;

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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isResolved() {
        return isResolved;
    }

    public void setResolved(boolean isResolved) {
        this.isResolved = isResolved;
    }

    @Override
    public String toString() {
        return "TicketDto [id=" + id + ", ticketTitle=" + ticketTitle + ", ticketDescription=" + ticketDescription
                + ", createdAt=" + createdAt + ", isResolved=" + isResolved + ", user=" + user + "]";
    }
 
}
