import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/users`;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data.accessToken;
};
