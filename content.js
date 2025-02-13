function createFloatingButton() {
    let button = document.createElement("div");
    button.id = "duo-mistake-button";
    button.innerText = "📌 Save Mistake";
    
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.background = "#58cc02";
    button.style.color = "white";
    button.style.padding = "10px";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.zIndex = "10000";
    button.style.fontSize = "14px";
    button.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    
    button.addEventListener("click", openMiniPopup);
    
    document.body.appendChild(button);
}

function openMiniPopup() {
    if (document.getElementById("duo-mistake-popup")) return;

    let popup = document.createElement("div");
    popup.id = "duo-mistake-popup";
    
    popup.innerHTML = `
        <div id="duo-popup-header">Save Mistake <span id="close-popup">✖</span></div>
        <input type="text" id="popup-text" placeholder="Word/sentence">
        <input type="text" id="popup-meaning" placeholder="Meaning">
        <button id="popup-save">Save</button>
    `;

    popup.style.position = "fixed";
    popup.style.bottom = "60px";
    popup.style.right = "20px";
    popup.style.background = "white";
    popup.style.padding = "10px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.2)";
    popup.style.width = "200px";
    popup.style.zIndex = "10000";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.gap = "5px";

    document.body.appendChild(popup);

    document.getElementById("popup-save").addEventListener("click", savePopupMistake);
    document.getElementById("close-popup").addEventListener("click", () => popup.remove());
}

function savePopupMistake() {
    let text = document.getElementById("popup-text").value.trim();
    let meaning = document.getElementById("popup-meaning").value.trim();

    if (!text || !meaning) {
        alert("Please enter both a mistake and its meaning.");
        return;
    }

    chrome.storage.local.get("mistakes", (data) => {
        let mistakes = data.mistakes || [];
        mistakes.push({
            text,
            meaning,
            lastReviewed: new Date().toISOString(),
            nextReview: getNextReviewDate(1) // First review after 1 day
        });

        chrome.storage.local.set({ mistakes }, () => {
            document.getElementById("duo-mistake-popup").remove();
            alert("Mistake saved!");
        });
    });
}

function getNextReviewDate(days) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString();
}

// Inject the button when Duolingo loads
if (window.location.hostname.includes("duolingo.com")) {
    createFloatingButton();
}
