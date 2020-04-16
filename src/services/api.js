import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3340"
})

export default api;
