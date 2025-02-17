import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../axiosInstance"

export const fetchTickets: any = createAsyncThunk('ticket/fetchTickets', (pageData: { pageNo: number, pageSize: number }) => {
    return axiosInstance.get(`/api/tickets?pageNo=${pageData.pageNo}&pageSize=${pageData.pageSize}`)
        .then((res) => res.data)
})