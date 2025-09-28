// Handle manual mood selection
function selectMood(mood) {
  fetch("http://localhost:5000/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood: mood })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        "Recommendation: " + data.recommendation;
    })
    .catch(err => console.error(err));
}

// Handle NLP text input
function submitText() {
  const text = document.getElementById("moodText").value;

  fetch("http://localhost:5000/nlp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        "Detected Mood: " + data.predicted_mood;
    })
    .catch(err => console.error(err));
}
function updateResult(data) {
  document.getElementById("detectedMood").innerText = data.mood || data.predicted_mood;
  document.getElementById("food").innerText = data.food || "No suggestion";
  document.getElementById("playlist").innerText = "Open Playlist 🎶";
  document.getElementById("playlist").href = data.playlist || "#";
}

// Handle manual mood selection
function selectMood(mood) {
  fetch("http://localhost:5000/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood: mood })
  })
    .then(res => res.json())
    .then(data => updateResult(data))
    .catch(err => console.error(err));
}

// Handle NLP text input
function submitText() {
  const text = document.getElementById("moodText").value;

  fetch("http://localhost:5000/nlp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text })
  })
    .then(res => res.json())
    .then(data => updateResult(data))
    .catch(err => console.error(err));
}
// Dummy playlists (Spotify Embed links)
const playlists = {
  happy: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",
  sad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",
  stressed: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ",
  energetic: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8FwnYE6PRvL",
  neutral: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6"
};

// Dummy food suggestions
const foods = {
  happy: "Ice cream 🍦",
  sad: "Chocolate 🍫",
  stressed: "Green tea 🍵",
  energetic: "Protein shake 💪",
  neutral: "Sandwich 🥪"
};

// Handle manual mood selection
function selectMood(mood) {
  document.getElementById("detectedMood").textContent = mood;
  document.getElementById("food").textContent = foods[mood];
  document.getElementById("playlistEmbed").innerHTML =
    `<iframe src="${playlists[mood]}" allow="encrypted-media"></iframe>`;
}

// Handle NLP text input (for Day 1 → dummy rule-based)
function submitText() {
  const text = document.getElementById("moodText").value.toLowerCase();
  let mood = "neutral";

  if (text.includes("happy") || text.includes("excited")) mood = "happy";
  else if (text.includes("sad") || text.includes("down")) mood = "sad";
  else if (text.includes("angry") || text.includes("stressed")) mood = "stressed";
  else if (text.includes("energy") || text.includes("workout")) mood = "energetic";

  selectMood(mood);
}