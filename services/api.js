import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const handleError = (error) => {
  console.error('API call error:', error);
  throw error;
};

export default {
  async getTodos() {
    try {
      const response = await apiClient.get('/todos');
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  async addTodo(todo) {
    try {
      const response = await apiClient.post('/todos', todo);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  async deleteTodo(id) {
    try {
      await apiClient.delete(`/todos/${id}`);
    } catch (error) {
      handleError(error);
    }
  },
  async updateTodo(id, updates) {
    try {
      const response = await apiClient.patch(`/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};
