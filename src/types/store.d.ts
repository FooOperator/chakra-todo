export type ToDo = {
    id: string;
    title: string;
    tags: string[];
    done: boolean;
}

export interface StoreState {
    todos: ToDo[];
    add: (todo: ToDo) => void;
    remove: (id: string) => void;
    clear: () => void;
    update: (todo: ToDo) => void;
}