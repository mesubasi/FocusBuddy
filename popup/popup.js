const startTimerBtn = document.getElementById("start-timer-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");
const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => addTask());

const taskList = [];

function renderTask(tasknum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter Value";
  text.addEventListener("change", () => {
    taskList[taskNum] = text.value;
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = taskList.length;
  taskList.push("");
  renderTask(taskNum);
}

function deleteTask(taskNum) {
    
}
