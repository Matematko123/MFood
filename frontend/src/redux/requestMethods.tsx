import axios from "axios";

const BASE_URL = "https://localhost:7167/api/";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
