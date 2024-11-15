import { observerMixin } from './mixin.js';

export class TodoItem {
  constructor(text) {
    this.text = text;
  }

  equals(other) {
    return this.text === other.text;
  }
}

export class TodoList {
  // Data
  #data = new Set();
  get items() {
    return this.#data;
  }
  constructor() {
    if (TodoList.instance) {
      throw new Error(
        'Use TodoList.getInstance() instead of creating a new TodoList()'
      );
    }
  }
  // Singleton
  static instance = null;
  static {
    this.instance = new TodoList();
  }
  static getInstance() {
    return this.instance;
  }

  // List Behavior
  add(item) {
    const array = Array.from(this.#data);
    const todoExists = array.filter((t) => t.equals(item)).length > 0;
    if (!todoExists) {
      this.#data.add(item);
      this.notify();
    }
  }

  delete(todo_text) {
    const array = Array.from(this.#data);
    // TODO: check for errors
    const todoToDelete = array.filter((t) => t.text === todo_text)[0];
    this.#data.delete(todoToDelete);
    this.notify();
  }

  find(todo_text) {
    const array = Array.from(this.#data);
    return array.find((i) => i.text === todo_text);
  }

  replaceList(list) {
    this.#data = list;
    this.notify();
  }
}

Object.assign(TodoList.prototype, observerMixin);
