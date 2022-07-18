import create from "zustand";
import { StoreState } from "../types/store";
import { getTodosInLocalStorage, setTodosInLocalStorage } from "./localStorage";

const useStore = create<StoreState>((set) => ({
    todos: getTodosInLocalStorage(),
    add(todo) {
        set((state) => {
            const { todos } = state;
            const newTodos = [todo, ...todos];

            setTodosInLocalStorage(newTodos);

            return {
                ...state,
                todos: newTodos
            }

        });
    },
    remove(id) {
        set((state) => {
            const { todos } = state;
            const newTodos = todos.filter((curr) => curr.id !== id);

            setTodosInLocalStorage(newTodos);

            return {
                ...state,
                todos: newTodos
            }
        });
    },
    clear() {
        set((state) => {
            setTodosInLocalStorage([]);

            return {
                ...state,
                todos: []
            }
        });
    },
    update(todo) {
        set((state) => {
            const { todos } = state;
            const indexOf = todos.findIndex((curr) => curr.id === todo.id);
            const newTodos = [
                ...todos.slice(0, indexOf),
                todo,
                ...todos.slice(indexOf + 1),
            ];
            setTodosInLocalStorage(newTodos);

            return {
                ...state,
                todos: newTodos
            }
        });
    },
}));

export default useStore;