import { create } from 'zustand';
import { Todo } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  addTodo: (todo: Omit<Todo, 'id'>) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    })),
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { ...todo, id: Math.max(...state.todos.map((t) => t.id), 0) + 1 },
      ],
    })),
}));