import axios from "axios"
import { verifyTokenAPI } from "../services/apis"
import toast from "react-hot-toast";

export const verifyToken = async () => {
    try {
        const response = await axios.post(verifyTokenAPI, null, {
            withCredentials: true
        });
        return response.data.success;
    } catch (error) {
        // toast.error(error.response.data.message);
        return false;
    }
}