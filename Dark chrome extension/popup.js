document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("toggle-dark-mode");

    // Load saved dark mode state
    chrome.storage.sync.get("darkMode", function (data) {
        if (data.darkMode) {
            toggle.checked = true;
        }
    });

    // Toggle dark mode when switch is clicked
    toggle.addEventListener("change", function () {
        const isDark = toggle.checked;
        chrome.storage.sync.set({ darkMode: isDark });
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: applyDarkMode,
                args: [isDark]
            });
        });
    });
});

// Function to apply dark mode styles
function applyDarkMode(isDark) {
    if (isDark) {
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
    } else {
        document.documentElement.style.filter = "none";
    }
}
