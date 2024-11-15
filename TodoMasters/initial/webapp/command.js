import { TodoItem, TodoList } from './classes.js';

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: 'ADD',
  DELETE: 'DELETE',
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const itemInList = todoList.find(todoText);
        if (todoText !== '' && !itemInList) {
          todoInput.value = '';
          todoList.add(new TodoItem(todoText));
          console.log('Added todo');
        }
        break;
      case Commands.DELETE:
        const [textToDelete] = command.args;
        todoList.delete(textToDelete);
        break;
      default:
        console.error(`Unknown command: ${command.name}`);
    }
  },
};
