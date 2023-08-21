import { User } from '../types';
import axios from 'axios';

const API_BASE_URL = 'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1';

export const getAllUsers = (): Promise<User[]> => {
  return axios
    .get(`${API_BASE_URL}/users`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching users:', error);
      throw error;
    });
};

export const getUserById = (id: string): Promise<User> => {
  return axios
    .get(`${API_BASE_URL}/users/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    });
};
