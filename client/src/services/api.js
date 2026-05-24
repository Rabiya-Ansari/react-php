import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/rehmat-mangoes/server/api/"
});

export default API;