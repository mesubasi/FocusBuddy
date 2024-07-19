// Get the DOM element with id "timeOption"
const timeOption = document.getElementById("timeOption");

// Add an event listener to the timeOption element to handle changes
timeOption.addEventListener("change", (event) => {
  // Convert the value of the event target to a number
  const val = Number(event.target.value);
  // Check if the value is not a number or is out of the acceptable range (1-60)
  if (isNaN(val) || val < 1 || val > 60) {
    // Set the default value to 25 if the input is invalid
    timeOption.value = 25;
  }
});

// Get the DOM element with id "save-btn"
const saveBtn = document.getElementById("save-btn");

// Add an event listener to the save button to handle clicks
saveBtn.addEventListener("click", (event) => {
  // Save the current timer settings to Chrome's local storage
  chrome.storage.local.set({
    timer: 0, // Reset the timer to 0
    timeOption: Number(timeOption.value), // Save the current value of timeOption
    isRunning: false, // Set isRunning to false
  });
});

// Retrieve the "timeOption" value from Chrome's local storage
chrome.storage.local.get(["timeOption"], (res) => {
  // Set the value of timeOption to the stored value or default to 25 if not set
  timeOption.value = res.timeOption !== undefined ? res.timeOption : 25;
});
