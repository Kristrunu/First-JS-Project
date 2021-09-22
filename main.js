// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
//TO MAKE THE FILTER OPTION WORK WITH CHROME I HAD TO CHANGE THE "CLICK" TO "CHANGE" FOR THAT FUNCTION.

// FUNCTIONS

function addTodo(event) {
  //PREVENT FORM FROM SUBMITTING:
  event.preventDefault();
  //TODO DIV:
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //CREATE LI:
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCAL STORAGE:
  saveLocalTodos(todoInput.value);
  //CHECK COMPLETED BUTTON:
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //CHECK TRASH BUTTON:
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //APPEND TO LIST:
  todoList.appendChild(todoDiv);
  //CLEAR TODO INPUT VALUE:
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //DELETE TODO:
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //DELETE ANIMATION:
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECKED TODO:
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    filterTodo();
  }
}
//FILTER LIST:
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (filterOption.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
//PREVENT LIST FROM DISAPPEARING ON REFRESH:
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //TODO DIV:
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //CREATE LI:
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON:
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON:
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST:
    todoList.appendChild(todoDiv);
  });
}

//REMOVE FROM STORAGE WHEN DELETED:
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//POP-UP GREETING ON SITE:
let myGreeting = setTimeout(function () {
  alert("Enjoying the To Do list? Please give me a pass then! :)");
}, 3000);

//CLOCK FUNCTION:
function displayTime() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.querySelector(".clock").textContent = time;
}

displayTime();
const createClock = setInterval(displayTime, 1000);
