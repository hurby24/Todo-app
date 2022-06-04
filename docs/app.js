const todoInput = document.querySelector('.input-field');
const todoButton = document.querySelector('.btn');
const todoList = document.querySelector('.todo-list');


todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
document.addEventListener('DOMContentLoaded', getTodos);

function addTodo(e) {
    e.preventDefault();
    if(todoInput.value === '') {
        Swal.fire({
            title: '-_-',
            text: 'Please enter a todo!',
          })
    } else {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-list-item-content');
    const newTodo = document.createElement('li');
    newTodo.classList.add('scale-up-center-delay');
    newTodo.classList.add('todo-list-item');
    newTodo.appendChild(todoDiv);
    const newTodoText = document.createElement('p');
    newTodoText.classList.add('todo-list-item-text');
    newTodoText.textContent = todoInput.value;
    todoDiv.appendChild(newTodoText);
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('todo-list-item-content-btn');
    todoDiv.appendChild(buttonsDiv);
    const finish = document.createElement('button');
    finish.innerHTML = '<i class="fas fa-check icon"></i>';
    finish.classList.add('finish');
    buttonsDiv.appendChild(finish);
    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fas fa-trash icon"></i>';
    trash.classList.add('delete');
    buttonsDiv.appendChild(trash);
    todoList.appendChild(newTodo);
    saveLocalTodos(newTodoText.textContent);
    todoInput.value = '';
    }
}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] === 'delete') {
        const todo = item.parentElement.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    if(item.classList[0] === 'finish') {
        const todo = item.parentElement.parentElement.parentElement;
        todo.classList.toggle('completed');
        removeLocalTodos(todo);
    }
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-list-item-content');
        const newTodo = document.createElement('li');
        newTodo.classList.add('scale-up-center-delay');
        newTodo.classList.add('todo-list-item');
        newTodo.appendChild(todoDiv);
        const newTodoText = document.createElement('p');
        newTodoText.classList.add('todo-list-item-text');
        newTodoText.textContent = todo;
        todoDiv.appendChild(newTodoText);
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('todo-list-item-content-btn');
        todoDiv.appendChild(buttonsDiv);
        const finish = document.createElement('button');
        finish.innerHTML = '<i class="fas fa-check icon"></i>';
        finish.classList.add('finish');
        buttonsDiv.appendChild(finish);
        const trash = document.createElement('button');
        trash.innerHTML = '<i class="fas fa-trash icon"></i>';
        trash.classList.add('delete');
        buttonsDiv.appendChild(trash);
        todoList.appendChild(newTodo);
    });
}


function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}




if(window.innerWidth <= 500)  {
    todoInput.setAttribute('maxlength', '20');
}
if(window.innerWidth <= 1000)  {
    todoInput.setAttribute('maxlength', '40');
}
