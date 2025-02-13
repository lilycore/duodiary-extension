// Function to check for mistakes that need review
function checkForDueMistakes() {
    chrome.storage.local.get("mistakes", (data) => {
        if (!data.mistakes) return;
        
        let now = new Date().toISOString();
        let dueMistakes = data.mistakes.filter(m => m.nextReview <= now);

        if (dueMistakes.length > 0) {
            notifyUser(dueMistakes.length);
        }
    });
}

// Function to send a Chrome notification for review
function notifyUser(dueCount) {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Time to Review!",
        message: `You have ${dueCount} mistakes to review. Click to start.`,
        priority: 2
    });
}

// Runs check every hour
chrome.alarms.create("reviewAlarm", { periodInMinutes: 60 });

// When alarm triggers, check for due mistakes
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reviewAlarm") {
        checkForDueMistakes();
    }
});

// Open the review page when user clicks the notification
chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({ url: "popup.html" });
});
