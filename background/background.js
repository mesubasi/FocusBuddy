chrome.alarms.create("focusFlow", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "focusFlow") {
    
  }
});
