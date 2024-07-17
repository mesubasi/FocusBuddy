const timeOption = document.getElementById("time-option");

timeOption.addEventListener("change", (event) => {
  const val = Number(event.target.value);
  if (isNaN(val) || val < 1 || val > 60) {
    timeOption.value = 25;
  }
});

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", (event) => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: Number(timeOption.value),
    isRunning: false,
  });
});

chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption !== undefined ? res.timeOption : 25;
});
