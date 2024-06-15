import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/contacts`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getContacts = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const getContactById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};

export const createContact = async (contact) => {
  const response = await axios.post(API_URL, contact, getAuthHeaders());
  return response.data;
};

export const updateContact = async (id, contact) => {
  const response = await axios.put(`${API_URL}/${id}`, contact, getAuthHeaders());
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
};
