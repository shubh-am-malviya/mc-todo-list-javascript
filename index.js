const todoList = new Todo();

const todoListContainer = document.querySelector("#todoListContainer");
const inputBoxTodo = document.querySelector("#inputBoxTodo");
const noTodoBox = document.querySelector("#no-todo-message-box");

const todoStorageKey = "todoStorage";

//IIFE to load todos from local storage
(function () {
	const localTodos = localStorage.getItem(todoStorageKey);
	if (localTodos) {
		todoList.setTodos(JSON.parse(localTodos).todos);
		renderTodoList();
	}
})();

function updateTodoStorage(todos) {
	localStorage.setItem(todoStorageKey, JSON.stringify(todos));
}

function emptyTodoInput() {
	inputBoxTodo.value = "";
}

function emptyNode(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

function renderTodoList() {
	emptyNode(todoListContainer);
	updateTodoStorage(todoList);

	if (todoList.isEmpty()) noTodoBox.classList.remove("hide-no-todo-message");
	else noTodoBox.classList.add("hide-no-todo-message");

	todoList.todos.forEach((todo) => {
		const LI = document.createElement("li");
		const DIV = document.createElement("div");
		const INPUT = document.createElement("input");
		INPUT.setAttribute("id", `input-${todo.id}`);
		INPUT.setAttribute("onkeyup", "finishTodoEditing(event)");
		INPUT.setAttribute("disabled", "");
		const SPAN = document.createElement("span");

		DIV.classList.add("inputBox");
		INPUT.type = "text";
		INPUT.value = todo.value;
		SPAN.classList.add("crossIcon");
		SPAN.innerText = "X";
		SPAN.setAttribute("id", todo.id);

		DIV.appendChild(INPUT);
		DIV.appendChild(SPAN);
		LI.appendChild(DIV);

		todoListContainer.appendChild(LI);
	});
}

function addTodo() {
	const todoValue = inputBoxTodo.value;

	if (todoValue === "") {
		alert("Enter valid Todo");
		return;
	}

	todoList.addTodo(todoValue);
	emptyTodoInput();
	renderTodoList();
}

function handleClick(event) {
	if (
		event &&
		event.target &&
		event.target.id &&
		event.target.nodeName === "SPAN"
	) {
		todoList.deleteTodo(event.target.id);
		renderTodoList();
	}
}

function handleEnableEdit(event) {
	if (event?.target?.id) {
		const inputBox = document.getElementById(event.target.id);
		inputBox.removeAttribute("disabled");
	}
}

function finishTodoEditing(event) {
	if (event.key === "Enter" && event.target.value && event.target.id) {
		const id = event.target.id.slice(6);
		todoList.updateTodo(id, event.target.value);
		renderTodoList();
	}
}
