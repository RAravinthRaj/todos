window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => renderTask(task.text, task.completed));
};

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return alert("Please enter a task");
  renderTask(text, false);
  saveTasks();
  input.value = "";
}

function renderTask(text, completed) {
  const list = document.getElementById("taskList");

  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  const left = document.createElement("div");
  left.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.onchange = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const span = document.createElement("span");
  span.textContent = text;

  left.appendChild(checkbox);
  left.appendChild(span);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "✏️";
  editBtn.onclick = () => {
    const editInput = document.createElement("input");
    editInput.className = "edit-input";
    editInput.value = span.textContent;

    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "💾";
    saveBtn.onclick = () => {
      span.textContent = editInput.value.trim();
      li.replaceChild(left, editInput);
      saveTasks();
    };

    left.innerHTML = "";
    left.appendChild(checkbox);
    left.appendChild(editInput);
    actions.innerHTML = "";
    actions.appendChild(saveBtn);
    actions.appendChild(deleteBtn);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(left);
  li.appendChild(actions);
  list.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach((item) => {
    const text = item.querySelector("span")?.textContent || "";
    const completed = item.classList.contains("completed");
    if (text) tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
