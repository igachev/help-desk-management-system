import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
            last: false
    },

    error: ""
}

export const fetchTickets:any = createAsyncThunk('ticket/fetchTickets',(pageData:{pageNo:number,pageSize:number}) => {
    return axios.get(`http://localhost:8080/api/tickets?pageNo=${pageData.pageNo}&pageSize=${pageData.pageSize}`)
    .then((res) => res.data)
})

const ticketSlice = createSlice({
    name: 'ticket',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchTickets.pending,(state) => {
            state.loading = true;
        })

        builder.addCase(fetchTickets.fulfilled,(state,action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = '';
        })

        builder.addCase(fetchTickets.rejected,(state,action) => {
            state.loading = false
            state.data = {
                content: [],
                pageNo: 0,
                pageSize: 0,
                totalElements: 0,
                totalPages: 0,
                last: false
            }
            state.error = action.error.message
        })
    }
})

export default ticketSlice.reducer