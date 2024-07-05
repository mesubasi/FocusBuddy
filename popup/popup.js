const startTimerBtn = document.getElementById("start-timer-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");
const addTaskBtn = document.getElementById("add-task-btn");

addTaskBtn.addEventListener("click", () => addTask());

function addTask() {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter Value";

  const deleteBtn = document.createElement("input");
  text.type = "button";
  text.placeholder = "X";

  taskRow.appendChild(text);
  taskRow.deleteBtn(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer = appendChild(taskRow);
}
