class Todo {
	constructor() {
		this.todos = [];
	}

	setTodos(todos) {
		this.todos = todos;
	}

	addTodo(value) {
		this.todos.push({ id: Date.now().toString(), value: value });
	}

	updateTodo(todoId, updatedValue) {
		this.todos = this.todos.map((todo) => {
			if (todo.id === todoId) return { id: todoId, value: updatedValue };
			return todo;
		});
	}

	deleteTodo(id) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}

	isEmpty() {
		return this.todos.length === 0;
	}
}
