import { ToDo } from "../types/store";

export const setTodosInLocalStorage = (data: ToDo[]) => {
    localStorage.setItem('todos', JSON.stringify(data));
}

export const getTodosInLocalStorage = () => {
    const result = localStorage.getItem('todos');
    if (!result) {
        setTodosInLocalStorage([]);
        return [];
    } else {
        return JSON.parse(result) as ToDo[];
    }
}