const startTimerBtn = document.getElementById("start-timer-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");
const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => addTask());

let taskList = [];

chrome.storage.sync.get(["taskList"], (res) => {
  taskList = res.taskList ? res.taskList : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    taskList,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.value = taskList[taskNum];
  text.placeholder = "Enter Value";
  text.addEventListener("change", () => {
    taskList[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = taskList.length;
  taskList.push("");
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  taskList.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}
function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  taskList.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}
