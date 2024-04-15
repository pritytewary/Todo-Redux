import { configureStore, createReducer, createAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: number;
  completedAt: number | null;
};

export type TodoState = {
  todos: Todo[];
};

const LC_KEY = "todos+redux";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LC_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: TodoState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LC_KEY, serializedState);
  } catch (_) {}
};

const initialState: TodoState = loadState() || { todos: [] };

const addTodo = createAction<{ text: string }>("todos/add");
const updateTodo = createAction<{
  id: string;
  updated: Partial<Omit<Todo, "id">>;
}>("todos/update");
const deleteTodo = createAction<{ id: string }>("todos/delete");

const todoReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTodo, (state, action) => {
    state.todos.push({
      id: crypto.randomUUID(),
      text: action.payload.text,
      isCompleted: false,
      createdAt: new Date().getTime(),
      completedAt: null,
    });
  });

  builder.addCase(updateTodo, (state, action) => {
    const updated = state.todos.map((todo) => {
      if (todo.id === action.payload.id) {
        return { ...todo, ...action.payload.updated };
      }
      return todo;
    });
    state.todos = updated;
  });

  builder.addCase(deleteTodo, (state, action) => {
    state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
  });
});

export const store = configureStore({
  reducer: todoReducer,
});

// Subscribe to store changes and save the state to local storage
store.subscribe(() => {
  saveState(store.getState());
});
