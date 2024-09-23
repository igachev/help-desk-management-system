import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../axiosInstance";
import { NavigateFunction } from "react-router-dom";

interface Ticket {
    id: number;
    ticketTitle: string;
    ticketDescription: string;
    createdAt: Date;
    resolved: boolean;
}

interface Content {
    content: Ticket[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    last: false;
    ticket: Ticket;
}

interface InitialState {
    loading: boolean;
    data: Content;
    error: string;
}

const initialState: InitialState = {
    loading: false,

    data: {
        content: [],
        pageNo: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
        last: false,
        ticket: {
            id: 0,
            ticketTitle: "",
            ticketDescription: "",
            createdAt: new Date(),
            resolved: false
        }
    },

    error: ""
}

export const fetchTickets: any = createAsyncThunk('ticket/fetchTickets', (pageData: { pageNo: number, pageSize: number }) => {
    return axiosInstance.get(`/api/tickets?pageNo=${pageData.pageNo}&pageSize=${pageData.pageSize}`)
        .then((res) => res.data)
})

export const fetchTicket: any = createAsyncThunk('ticket/fetchTicket', (obj: { ticketId: number }) => {
    return axiosInstance.get(`/api/tickets/${obj.ticketId}`)
        .then((res) => res.data)
        .catch((err) => {
            if (err.response.data) {
                throw new Error(err.response.data.message)
            }
            else {
                throw new Error(err.message)
            }
        })
})

export const createTicket: any = createAsyncThunk('ticket/createTicket', (data: { userId: string, ticketTitle: string, ticketDescription: string, navigation: NavigateFunction }) => {
    return axiosInstance.post(`/api/tickets/create/${data.userId}`, { ticketTitle: data.ticketTitle, ticketDescription: data.ticketDescription })
        .then((res) => {
            data.navigation("/")
            return res.data
        })
        .catch((err) => {
            if (err.response.data) {
                throw new Error(err.response.data.message)
            }
            else {
                throw new Error(err.message)
            }
        })
})

export const editTicket: any = createAsyncThunk('ticket/editTicket', (data: { userId: string, ticketId: string, ticketTitle: string, ticketDescription: string, navigation: NavigateFunction }) => {
    return axiosInstance.put(`/api/tickets/edit/${data.ticketId}/${data.userId}`, { ticketTitle: data.ticketTitle, ticketDescription: data.ticketDescription })
        .then((res) => {
            data.navigation(`/tickets/${data.ticketId}`)
            return res.data
        })
        .catch((err) => {
            if (err.response.data) {
                throw new Error(err.response.data.message)
            }
            else {
                throw new Error(err.message)
            }
        })
})

export const deleteTicket: any = createAsyncThunk('ticket/deleteTicket', (data: { userId: string, ticketId: string, navigation: NavigateFunction }) => {
    return axiosInstance.delete(`/api/tickets/delete/${data.ticketId}/${data.userId}`)
        .then((res) => {
            data.navigation(`/`)
            return res.data
        })
        .catch((err) => {
            if (err.response.data) {
                throw new Error(err.response.data.message)
            }
            else {
                throw new Error(err.message)
            }
        })
})

const ticketSlice = createSlice({
    name: 'ticket',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // get all tickets
        builder.addCase(fetchTickets.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        })

        builder.addCase(fetchTickets.rejected, (state, action) => {
            state.loading = false
            state.data = {
                content: [],
                pageNo: 0,
                pageSize: 0,
                totalElements: 0,
                totalPages: 0,
                last: false,
                ticket: {
                    id: 0,
                    ticketTitle: "",
                    ticketDescription: "",
                    createdAt: new Date(),
                    resolved: false
                }
            }
            state.error = action.error.message
        })

        // get particular ticket
        builder.addCase(fetchTicket.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(fetchTicket.fulfilled, (state, action) => {
            state.loading = false;
            state.data = { ...state.data, ticket: action.payload };
            state.error = ''
        })

        builder.addCase(fetchTicket.rejected, (state, action) => {
            state.loading = false;
            state.data = {
                ...state.data, ticket: {
                    id: 0,
                    ticketTitle: "",
                    ticketDescription: "",
                    createdAt: new Date(),
                    resolved: false
                }
            }
            state.error = action.error.message
        })

        // create ticket
        builder.addCase(createTicket.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(createTicket.fulfilled, (state, action) => {
            state.loading = false;
            state.data.content = [
                ...state.data.content,
                action.payload
            ]
            state.error = ''
        })

        builder.addCase(createTicket.rejected, (state, action) => {
            state.loading = false
            state.data = { ...state.data }
            state.error = action.error.message
        })

        // edit ticket
        builder.addCase(editTicket.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(editTicket.fulfilled, (state, action) => {
            state.loading = false;
            const ticketId = action.payload.id;
            const selectedTicket = state.data.content.findIndex((ticket) => ticket.id == ticketId)
            state.data.content.splice(selectedTicket, 1, action.payload)
            state.error = ''
        })

        builder.addCase(editTicket.rejected, (state, action) => {
            state.loading = false
            state.data = { ...state.data }
            state.error = action.error.message
        })

        // delete ticket
        builder.addCase(deleteTicket.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(deleteTicket.fulfilled, (state) => {
            state.loading = false;
            state.data = { ...state.data }
            state.error = ''
        })

        builder.addCase(deleteTicket.rejected, (state, action) => {
            state.loading = false
            state.data = { ...state.data }
            state.error = action.error.message
        })
    }
})

export default ticketSlice.reducer