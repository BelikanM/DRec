import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const fetchClients = () => axios.get(`${API_URL}/clients`);
export const addClient = (data) => axios.post(`${API_URL}/clients`, data);
export const fetchJuristes = () => axios.get(`${API_URL}/juristes`);
