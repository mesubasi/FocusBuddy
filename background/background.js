// Create an alarm named "focusFlow" that triggers every second (1/60 minutes).
chrome.alarms.create("focusFlow", {
  periodInMinutes: 1 / 60,
});

// Add a listener for the alarm event.
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusFlow") {
    // Check if the triggered alarm is "focusFlow".
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      // Get the current timer and running status from local storage.
      if (res.isRunning) {
        // If the timer is running.
        let timer = res.timer + 1; // Increment the timer by 1 second.
        let isRunning = true;

        if (timer >= 60 * 25) {
          // Check if 25 minutes (1500 seconds) have passed.
          self.registration.showNotification("Focus Flow", {
            // Show a notification.
            body: "25 minutes has passed!",
            icon: "icon.png",
          });
          timer = 0; // Reset the timer.
          isRunning = false; // Stop the timer.
        }

        // Update the local storage with the new timer and running status.
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

// Initialize the timer and running status in local storage if they are not already set.
chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0, // Set timer to 0 if not already set.
    isRunning: "isRunning" in res ? res.isRunning : false, // Set isRunning to false if not already set.
  });
});
