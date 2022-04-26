import axios from "axios";

const api = axios.create({
    baseURL: 'https://reqres.in/'
})

export const getUsers = async (params) => {
    return await api.get(`/api/users?${params}`);
}

export const getUser = async (id) => {
    return await api.get(`/api/users/${id}`);
}

export const createUser = async (data) => {
    return await api.post(`/api/users`, data);
}

export const updateUser = async (id, data) => {
    return await api.put(`/api/users/${id}`, data)
}

export const deleteUser = async (id) => {
    return await api.delete(`/api/users/${id}`);
}