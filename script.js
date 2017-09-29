'use strict()';

var todoList = {
    todos: [],
    addTodo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function(index, todoText) {
        this.todos[index].todoText = todoText;
    },
    deleteTodo: function(index) {
        this.todos.splice(index, 1);
    },
    toggleCompleted: function(index) {
        var todo = this.todos[index];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        var totalTodos = this.todos.length;
        var completedTodos = 0;
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function(todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};

var handler = {
    addTodo: function() {
        var addTodoTextInput = document.querySelector('#add-todo-text');
        todoList.addTodo(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        var changeTodoIndexInput = document.querySelector('#change-todo-index-input');
        var changeTodoTextInput = document.querySelector('#change-todo-text-input');
        todoList.changeTodo(changeTodoIndexInput.valueAsNumber, changeTodoTextInput.value);
        changeTodoIndexInput.value = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodo: function(index) {
        todoList.deleteTodo(index);
        view.displayTodos();
    },
    toggleCompleted: function() {
        var toggleCompletedIndexInput = document.querySelector('#toggle-completed-index-input');
        todoList.toggleCompleted(toggleCompletedIndexInput.valueAsNumber);
        toggleCompletedIndexInput.value = '';
        view.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function() {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        todoList.todos.forEach(function(todo, index) {
            var todoLi = document.createElement('li');
            var todoTextCompleted = '';
            if (todo.completed === true) {
                todoTextCompleted = '(x) ' + todo.todoText;
            } else {
                todoTextCompleted = '( ) ' + todo.todoText;
            }
            todoLi.id = index;
            todoLi.textContent = todoTextCompleted;
            todoLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todoLi);
        }, this);
    },
    createDeleteButton: function() {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        return deleteButton;
    },
    initEventListeners: function() {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function(event) {
            var elementClicked = event.target;
            if (elementClicked.className === 'delete-button') {
                handler.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        }, false);
    }
};

view.initEventListeners();
