chrome.storage.sync.get("darkMode", function (data) {
    if (data.darkMode) {
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
    }
});
