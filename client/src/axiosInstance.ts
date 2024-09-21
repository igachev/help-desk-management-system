import axios from "axios";
import { getCookie } from "./cookie";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
})

axiosInstance.interceptors.request.use((config) => {
    
    const accessToken = getCookie("accessToken")

    if(accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    
    return config
})



export default axiosInstance