document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save-mistake").addEventListener("click", saveMistake);
  document.getElementById("start-review").addEventListener("click", startReview);
  document.getElementById("export-anki").addEventListener("click", exportAnki);
  loadMistakes();
});

function saveMistake() {
  let text = document.getElementById("mistake-text").value.trim();
  let meaning = document.getElementById("mistake-meaning").value.trim();

  if (!text || !meaning) {
      alert("Please enter both mistake and meaning.");
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
          document.getElementById("mistake-text").value = "";
          document.getElementById("mistake-meaning").value = "";
          loadMistakes();
      });
  });
}

function loadMistakes() {
  chrome.storage.local.get("mistakes", (data) => {
      let mistakes = data.mistakes || [];
      let list = document.getElementById("mistake-list");
      list.innerHTML = "";

      mistakes.forEach((m, index) => {
          let item = document.createElement("div");
          item.className = "mistake-item";
          item.innerHTML = `
              <p><strong>${m.text}</strong></p>
              <p>${m.meaning}</p>
              <button onclick="deleteMistake(${index})">Delete</button>
          `;
          list.appendChild(item);
      });
  });
}

function deleteMistake(index) {
  chrome.storage.local.get("mistakes", (data) => {
      let mistakes = data.mistakes || [];
      mistakes.splice(index, 1);
      chrome.storage.local.set({ mistakes }, loadMistakes);
  });
}

function startReview() {
  window.open("diary.html");
}

function exportAnki() {
  chrome.storage.local.get("mistakes", (data) => {
      let mistakes = data.mistakes || [];
      if (mistakes.length === 0) {
          alert("No mistakes to export.");
          return;
      }

      let csvContent = "text,meaning\n" + mistakes.map(m => `"${m.text}","${m.meaning}"`).join("\n");
      let blob = new Blob([csvContent], { type: "text/csv" });
      let url = URL.createObjectURL(blob);
      
      let a = document.createElement("a");
      a.href = url;
      a.download = "duolingo_mistakes.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  });
}

function getNextReviewDate(days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}
