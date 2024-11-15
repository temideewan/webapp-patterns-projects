import { TodoItem, TodoList } from "./classes.js";

const todoList = TodoList.getInstance();

export const LocalStorageWrapper = {
  load() {
    if (localStorage.getItem('todos')) {
      const array = JSON.parse(localStorage.getItem('todos'));
      for (let todo of array) {
        todoList.add(new TodoItem(todo.text));
      }
    }
  },
  save() {
    const array = Array.from(todoList.items);
    localStorage.setItem('todos', JSON.stringify(array));
  },
};

todoList.addObserver(LocalStorageWrapper.save);
