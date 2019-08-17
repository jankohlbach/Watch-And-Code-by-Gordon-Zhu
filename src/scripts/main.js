const todoList = {
  todos: [],
  addTodo(todoText) {
    this.todos.push({
      todoText,
      completed: false,
    });
  },
  changeTodo(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted(position) {
    this.todos[position].completed = !this.todos[position].completed;
  },
  toggleAll() {
    let completedTodos = 0;

    for (let i = 0; i < this.todos.length; i += 1) {
      if (this.todos[i].completed === true) {
        completedTodos += 1;
      }
    }

    if (completedTodos === this.todos.length) {
      for (let i = 0; i < this.todos.length; i += 1) {
        this.todos[i].completed = false;
      }
    } else {
      for (let i = 0; i < this.todos.length; i += 1) {
        this.todos[i].completed = true;
      }
    }
  },
};

const view = {
  displayTodos() {
    const todosUl = document.querySelector('ul.todos');
    todosUl.innerHTML = '';

    for (let i = 0; i < todoList.todos.length; i += 1) {
      const todo = todoList.todos[i];
      const todoLi = document.createElement('li');
      let todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = `(x) ${todo.todoText}`;
      } else {
        todoTextWithCompletion = `( ) ${todo.todoText}`;
      }

      todoLi.id = i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }
  },
  createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    return deleteButton;
  },
  setUpEventListeners() {
    const todosUl = document.querySelector('ul.todos');
    todosUl.addEventListener('click', (e) => {
      const elementClicked = e.target;

      if (elementClicked.className === 'delete-button') {
        handlers.deleteTodo(elementClicked.parentNode.id);
      }
    });
  },
};

const handlers = {
  addTodo() {
    const addTodoTextInput = document.querySelector('#addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo() {
    const changeTodoPositionInput = document.querySelector('#changeTodoPositionInput');
    const changeTodoTextInput = document.querySelector('#changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted() {
    const toggleCompletedPositionInput = document.querySelector('#toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll() {
    todoList.toggleAll();
    view.displayTodos();
  },
};

view.setUpEventListeners();
