import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    const { data } = await axios.get<Todo[]>(API_URL);
    return data.slice(0, 10); // Limit to 10 items for demo
  },
};