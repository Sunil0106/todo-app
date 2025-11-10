const todoTaskInput = document.querySelector(".js-todo-task-input");

const dueDateInput = document.querySelector(".js-due-date-input");

//1.add todo
const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

function addTodo() {
  const todoTask = todoTaskInput.value;
  const dueDate = dueDateInput.value;
  let error;

  if (!todoTask && !dueDate) {
    error =
      "Oops! It looks like all the inputs are empty. Please fill them out and try again.❌";
  } else if (!todoTask) {
    error = "Oops! You forgot to enter a task.❌";
  } else if (!dueDate) {
    error = "Oops! You forgot to pick a date.❌";
  }
  if (error) {
    document.querySelector(".js-show-error-msg").classList.add("error");
    showinfo(error);
    clearInputs();
    return;
  }
  todoList.push({
    task: todoTask,
    date: dueDate,
    isCompleted: false,
  });

  showinfo("Great! Your task is now on the list.✅");
  saveToStorage();
  renderHtml();
  clearInputs();
}
//2.remove todo
function deleteTodo() {
  document.querySelectorAll(".delete-todo-btns").forEach((button) => {
    button.addEventListener("click", (e) => {
      const i = e.target.dataset.id;
      todoList.splice(i, 1);
      showinfo("Todo deleted! ✅");
      saveToStorage();
      renderHtml();
    });
  });
}

//3.mark as completed
function markAsCompleted() {
  document.querySelectorAll(".checkboxes").forEach((checkBox) => {
    checkBox.addEventListener("input", (e) => {
      const i = e.target.dataset.index;
      todoList[i].isCompleted = e.target.checked;
      if (todoList[i].isCompleted) {
        showinfo("Task completed! ✅");
      } else {
        document.querySelector(".js-show-error-msg").classList.add("error");
        showinfo("Task undone!❌");
      }
      saveToStorage();
      renderHtml();
    });
  });
}

//executing add todo Function
document.querySelector(".js-add-todo-btn").addEventListener("click", () => {
  addTodo();
});

//function to render html
function renderHtml() {
  const htmlContainer = document.querySelector(".js-list-container");
  let html = "";
  todoList.forEach((todo, index) => {
    html += `
    <div class="todo-list">
    <p class='task-todo'>${todo.task}</p>
    <p class='date-todo'> ${todo.date}</p>
    <p><input type='checkbox' 
    class="checkboxes"
    data-index=${index}
    ${todo.isCompleted ? "checked" : " "}></p>
    <button class='delete-todo-btns' data.id=${index}>Delete</button>
    </div>
    `;
  });

  htmlContainer.style.display = todoList.length ? "block" : "none";
  htmlContainer.innerHTML = html;
  markAsCompleted();
  deleteTodo();
}

//function to save in local storage
function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

//executing once
window.addEventListener("load", () => {
  renderHtml();
});

//clear inputs
function clearInputs() {
  todoTaskInput.value = "";
  dueDateInput.value = "";
}

//function to show msg
function showinfo(msg) {
  const infoMsg = document.querySelector(".js-show-error-msg");
  infoMsg.innerHTML = msg;
  setTimeout(() => {
    infoMsg.classList.remove("error");
    document.querySelector(".js-show-error-msg").innerHTML = "";
  }, 2000);
}
