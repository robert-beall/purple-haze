import axios from "axios";

const PurpleClient = axios.create({
    baseURL: 'http://localhost:5000',
});

export default PurpleClient;