const startTimerBtn = document.getElementById("start-timer-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");

function updateTime() {
  chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
    const time = document.getElementById("time");
    const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`;
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
  });
}
updateTime();
setInterval(updateTime, 1000);

startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const addTaskBtn = document.getElementById("add-task-btn");

// Add an event listener to the add task button to call the addTask function when clicked
addTaskBtn.addEventListener("click", () => addTask());

let taskList = [];

// Retrieve the task list from Chrome storage
chrome.storage.sync.get(["taskList"], (res) => {
  // If there is a stored task list, use it; otherwise, initialize an empty array
  taskList = res.taskList ? res.taskList : [];
  renderTasks();
});

// Function to save the task list to Chrome storage
function saveTasks() {
  chrome.storage.sync.set({
    taskList,
  });
}

// Function to render a single task
function renderTask(taskNum) {
  const taskRow = document.createElement("div");
  const text = document.createElement("input");
  text.type = "text";
  text.value = taskList[taskNum];
  text.placeholder = "Enter Value";

  // Add an event listener to update the task list when the input value changes
  text.addEventListener("change", () => {
    taskList[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";

  // Add an event listener to delete the task when the delete button is clicked
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  // Append the input and delete button to the task row
  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  // Append the task row to the task container in the DOM
  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

// Function to add a new task
function addTask() {
  const taskNum = taskList.length;
  taskList.push("");
  renderTask(taskNum);
  saveTasks();
}

// Function to delete a task
function deleteTask(taskNum) {
  taskList.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

// Function to render all tasks
function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";

  // Render each task in the task list
  taskList.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
}

resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    updateTime()
  );
});
