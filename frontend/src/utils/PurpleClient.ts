import axios from "axios";

const PurpleClient = axios.create({
    baseURL: `http://${import.meta.env.VITE_BACKEND_URL}`,
});

export default PurpleClient;