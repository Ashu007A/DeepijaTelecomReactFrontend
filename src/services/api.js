import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getAllServers = () => axios.get(`${API_URL}/servers`);
export const getServerById = (id) => axios.get(`${API_URL}/servers/${id}`);
export const createServer = (server) => axios.post(`${API_URL}/servers`, server);
export const updateServer = (id, server) => axios.put(`${API_URL}/servers/${id}`, server);
export const deleteServer = (id) => axios.delete(`${API_URL}/servers/${id}`);