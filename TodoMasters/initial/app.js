import { TodoList } from './webapp/classes.js';
import { Command, CommandExecutor, Commands } from './webapp/command.js';
import { LocalStorageWrapper } from './webapp/storage.js';

globalThis.DOM = {};

const DOM = globalThis.DOM;

document.addEventListener('DOMContentLoaded', () => {
  DOM.todoList = document.getElementById('todo-list');
  DOM.addBtn = document.getElementById('add-btn');
  DOM.todoInput = document.getElementById('todo-input');

  DOM.addBtn.addEventListener('click', (event) => {
    const command = new Command(Commands.ADD);
    CommandExecutor.execute(command);
  });
  DOM.todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      // TODO:
      const todo = event.target.parentNode.dataset.text;
      const command = new Command(Commands.DELETE, [todo]);
      CommandExecutor.execute(command);
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  TodoList.getInstance().addObserver(renderList);
  LocalStorageWrapper.load();
});

function renderList() {
  DOM.todoList.innerHTML = ''; // Clear the list before rendering again
  const list = TodoList.getInstance();
  for (let todo of list.items) {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    listItem.innerHTML = `
        ${todo.text} <button class="delete-btn">Delete</button>
        `;
    listItem.dataset.text = todo.text;
    DOM.todoList.appendChild(listItem);
  }
}

document.addEventListener('keydown', (event) => {
  
  if(event.ctrlKey && event.key === 'k'){
    event.preventDefault();
    const command = new Command(Commands.ADD);
    CommandExecutor.execute(command);
  }
  if(event.metaKey && event.key === 'z'){
    event.preventDefault();
    const command = new Command(Commands.UNDO);
    CommandExecutor.execute(command);
  }
})
