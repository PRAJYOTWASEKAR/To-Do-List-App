// script.js
const todoList = document.getElementById('todo-list');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');

// Load todos from local storage
const todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todo list
function renderTodoList() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(todoItem);

    // Add event listener to delete button
    todoItem.querySelector('.delete-btn').addEventListener('click', () => {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodoList();
    });

    // Add event listener to checkbox
    todoItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      todo.completed = !todo.completed;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodoList();
    });

    // Add event listener to drag and drop
    todoItem.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text', index);
    });

    todoList.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    todoList.addEventListener('drop', (e) => {
      e.preventDefault();
      const newIndex = Array.prototype.indexOf.call(todoList.children, e.target);
      const oldIndex = e.dataTransfer.getData('text');
      todos.splice(newIndex, 0, todos.splice(oldIndex, 1)[0]);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodoList();
    });
  });
}

// Add event listener to add button
addBtn.addEventListener('click', () => {
  addTodoBtn.click();
});

// Add event listener to add todo button
addTodoBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    const todoItem = {
      text: todoText,
      completed: false
    };
    todos.push(todoItem);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList();
    todoInput.value = '';
  }
});

// Initial render
renderTodoList();