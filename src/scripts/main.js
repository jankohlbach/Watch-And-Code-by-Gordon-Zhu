const todoList = {
  todos: [],
  displayTodos() {
    if (this.todos.length === 0) {
      console.log('Your todo list is empty!');
    } else {
      console.log('My Todos:');

      for (let i = 0; i < this.todos.length; i += 1) {
        if (this.todos[i].completed === true) {
          console.log(`(x) ${this.todos[i].todoText}`);
        } else {
          console.log(`( ) ${this.todos[i].todoText}`);
        }
      }
    }
  },
  addTodo(todoText) {
    this.todos.push({
      todoText,
      completed: false,
    });
    this.displayTodos();
  },
  changeTodo(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted(position) {
    this.todos[position].completed = !this.todos[position].completed;
    this.displayTodos();
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

    this.displayTodos();
  },
};

const handlers = {
  displayTodos() {
    todoList.displayTodos();
  },
  addTodo() {
    const addTodoTextInput = document.querySelector('#addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  changeTodo() {
    const changeTodoPositionInput = document.querySelector('#changeTodoPositionInput');
    const changeTodoTextInput = document.querySelector('#changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  },
  deleteTodo() {
    const deleteTodoPositionInput = document.querySelector('#deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = '';
  },
  toggleCompleted() {
    const toggleCompletedPositionInput = document.querySelector('#toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
  },
  toggleAll() {
    todoList.toggleAll();
  },
};
