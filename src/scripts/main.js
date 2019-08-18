class TodoList {
  constructor() {
    this.todos = [];
    this.toggleAll = this.toggleAll.bind(this);
    this.constructor.toggleCompleted = this.constructor.toggleCompleted.bind(this);
    this.constructor.deleteTodo = this.constructor.deleteTodo.bind(this);
  }

  updateList() {
    const todosUl = document.querySelector('ul.todos');
    todosUl.innerHTML = '';

    this.todos.forEach((todo, i) => {
      const todoLi = document.createElement('li');

      todoLi.id = i;
      todoLi.textContent = todo.completed ? `(x) ${todo.text}` : `( ) ${todo.text}`;
      todoLi.appendChild(this.constructor.createToggleButton());
      todoLi.appendChild(this.constructor.createDeleteButton());
      todosUl.appendChild(todoLi);
    });
  }

  addTodo(text) {
    this.todos.push({
      text,
      completed: false,
    });

    this.updateList();
  }

  changeTodo(position, text) {
    this.todos[position].text = text;
    this.updateList();
  }

  toggleAll() {
    let completedTodos = 0;

    this.todos.forEach((todo) => {
      completedTodos = todo.completed ? completedTodos += 1 : completedTodos;
    });

    this.todos.forEach((todoElement) => {
      const todo = todoElement;
      todo.completed = completedTodos !== this.todos.length;
    });

    this.updateList();
  }

  static toggleCompleted(position) {
    this.todos[position].completed = !this.todos[position].completed;
    this.updateList();
  }

  static deleteTodo(position) {
    this.todos.splice(position, 1);
    this.updateList();
  }

  static createToggleButton() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle';
    toggleButton.className = 'button-toggle';
    return toggleButton;
  }

  static createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'button-delete';
    return deleteButton;
  }

  setUpEventListeners() {
    const buttonToggleAll = document.querySelector('#button-toggle-all');
    buttonToggleAll.addEventListener('click', this.toggleAll);

    const buttonAddTodo = document.querySelector('#button-add-todo');
    const addTodoText = document.querySelector('#input-add-todo-text');
    buttonAddTodo.addEventListener('click', () => {
      this.addTodo(addTodoText.value);
    });

    const buttonChangeTodo = document.querySelector('#button-change-todo');
    const changeTodoPosition = document.querySelector('#input-change-todo-position');
    const changeTodoText = document.querySelector('#input-change-todo-text');
    buttonChangeTodo.addEventListener('click', () => {
      this.changeTodo(changeTodoPosition.value, changeTodoText.value);
    });

    const todosUl = document.querySelector('ul.todos');
    todosUl.addEventListener('click', (e) => {
      if (e.target.className === 'button-toggle') {
        this.constructor.toggleCompleted(e.target.parentNode.id);
      } else if (e.target.className === 'button-delete') {
        this.constructor.deleteTodo(e.target.parentNode.id);
      }
    });
  }
}

const todoList = new TodoList();
todoList.setUpEventListeners();
