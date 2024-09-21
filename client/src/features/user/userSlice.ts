import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { setCookie } from "../../cookie";


interface User {
    email: string;
    accessToken: string;
    userId: string;
}

interface InitialState {
    loading: boolean;
    data: User;
    error: string;
}

const initialState: InitialState = {
    loading: false,
    data: {
        email: "",
        accessToken: "",
        userId: ""
    },
    error: ""
}

export const loginUser: any = createAsyncThunk('user/loginUser',(user:{email:string,password:string,navigation:NavigateFunction}) => {
    return axiosInstance.post(`/api/auth/login`,{email:user.email,password:user.password})
    .then((res) => {
        user.navigation('/')
        setCookie("accessToken",res.data.accessToken)
        return res.data
    })
    .catch((err) => {
        if(err.response.data) {
            throw new Error("Invalid email or password")
        }
        else {
            throw new Error(err.message)
        }
    })
})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        // perform login
        builder.addCase(loginUser.pending,(state) => {
            state.loading = true;
        })

        builder.addCase(loginUser.fulfilled,(state,action) => {
            state.loading = false;
            state.data = action.payload
            state.error = ''
        })

        builder.addCase(loginUser.rejected,(state,action) => {
            state.loading = false;
            state.data = {
                email: "",
                accessToken: "",
                userId: ""
            }
            state.error = action.error.message
        })

    }
})

export default userSlice.reducer