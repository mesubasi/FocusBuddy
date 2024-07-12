chrome.alarms.create("focusFlow", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusFlow") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        isRunning = true;
        if (timer === 60 * 24) {
          this.registration.showNotification("Focus Flow", {
            body: "25 minutes",
            icon: "icon.png",
          });
        }
        timer = 0;
        isRunning = false;
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});
