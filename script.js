// Enhanced Mood Analyzer Class
class MoodAnalyzer {
  constructor() {
    this.emojiMap = {
      '😊': 'happy', '😄': 'happy', '😂': 'happy', '🥰': 'happy',
      '😢': 'sad', '😭': 'sad', '😔': 'sad', '💔': 'sad',
      '😠': 'angry', '😡': 'angry', '🤬': 'angry',
      '😨': 'stressed', '😰': 'stressed', '😥': 'stressed', '😓': 'stressed',
      '😴': 'tired', '😪': 'tired', '🥱': 'tired',
      '😍': 'romantic', '❤️': 'romantic', '💖': 'romantic',
      '🎉': 'energetic', '💪': 'energetic', '🔥': 'energetic', '🚀': 'energetic'
    };
    
    this.keywordMap = {
      happy: ['happy', 'joy', 'excited', 'great', 'good', 'awesome', 'amazing', 'wonderful', 'fantastic', 'yay'],
      sad: ['sad', 'depressed', 'unhappy', 'miserable', 'heartbroken', 'crying', 'tears', 'down', 'lonely'],
      stressed: ['stressed', 'anxious', 'worried', 'overwhelmed', 'pressure', 'nervous', 'tense', 'burnout'],
      angry: ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'rage', 'hate', 'pissed'],
      tired: ['tired', 'exhausted', 'sleepy', 'fatigued', 'burned out', 'drained', 'worn out'],
      romantic: ['romantic', 'love', 'crush', 'affection', 'dating', 'relationship', 'valentine'],
      energetic: ['energetic', 'pumped', 'motivated', 'active', 'excited', 'energized', 'alive', 'vibrant']
    };
  }

  analyzeFromEmoji(emoji) {
    return this.emojiMap[emoji] || 'neutral';
  }

  analyzeFromText(text) {
    const keywordMood = this.analyzeKeywords(text);
    const sentimentMood = this.analyzeSentiment(text);
    
    // Prioritize keyword matching over general sentiment
    if (keywordMood !== 'neutral') return keywordMood;
    return sentimentMood;
  }

  analyzeKeywords(text) {
    const lowerText = text.toLowerCase();
    let maxMatches = 0;
    let detectedMood = 'neutral';

    for (const [mood, keywords] of Object.entries(this.keywordMap)) {
      const matches = keywords.filter(keyword => 
        lowerText.includes(keyword)
      ).length;
      
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedMood = mood;
      }
    }

    return maxMatches > 0 ? detectedMood : 'neutral';
  }

  analyzeSentiment(text) {
    const positiveWords = ['good', 'great', 'awesome', 'happy', 'love', 'excited', 'wonderful', 'fantastic', 'amazing', 'best'];
    const negativeWords = ['bad', 'terrible', 'sad', 'hate', 'angry', 'stressed', 'awful', 'horrible', 'worst', 'sucks'];
    
    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;

    positiveWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) positiveScore += matches.length;
    });

    negativeWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = lowerText.match(regex);
      if (matches) negativeScore += matches.length;
    });

    if (positiveScore > negativeScore) return 'happy';
    if (negativeScore > positiveScore) return 'sad';
    if (positiveScore === 0 && negativeScore === 0) return 'neutral';
    
    return 'neutral';
  }
}

// Initialize mood analyzer
const moodAnalyzer = new MoodAnalyzer();

// Enhanced playlists with more mood options
const playlists = {
  happy: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",
  sad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",
  stressed: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ",
  energetic: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8FwnYE6PRvL",
  romantic: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WAExTTn6PI",
  angry: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1s9knjP51Oa",
  tired: "https://open.spotify.com/embed/playlist/37i9dQZF1DWYcDQ1hSjOpY",
  neutral: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4SBhb3fqCJd"
};

// Enhanced food suggestions
const foods = {
  happy: "Ice cream 🍦 or Pizza 🍕",
  sad: "Chocolate 🍫 or Mac & Cheese 🧀",
  stressed: "Green tea 🍵 or Dark chocolate 🍫",
  energetic: "Protein shake 💪 or Banana smoothie 🍌",
  romantic: "Strawberries 🍓 or Wine 🍷",
  angry: "Chamomile tea ☕ or Yogurt 🥛",
  tired: "Coffee ☕ or Energy balls 🍫",
  neutral: "Sandwich 🥪 or Salad 🥗"
};

// Update result display
function updateResult(mood, data = null) {
  const detectedMoodElement = document.getElementById("detectedMood");
  const foodElement = document.getElementById("food");
  const playlistEmbedElement = document.getElementById("playlistEmbed");
  
  if (detectedMoodElement) {
    detectedMoodElement.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
  }
  
  if (foodElement) {
    foodElement.textContent = foods[mood] || foods['neutral'];
  }
  
  if (playlistEmbedElement) {
    playlistEmbedElement.innerHTML = `
      <iframe 
        src="${playlists[mood] || playlists['neutral']}" 
        width="100%" 
        height="380" 
        frameborder="0" 
        allowtransparency="true" 
        allow="encrypted-media"
        style="border-radius: 12px;"
      ></iframe>
    `;
  }
  
  // Show results section if hidden
  const resultsSection = document.getElementById("resultsSection");
  if (resultsSection) {
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Handle manual mood selection via emoji
function selectMood(emoji) {
  const mood = moodAnalyzer.analyzeFromEmoji(emoji);
  updateResult(mood);
}

// Handle manual mood selection via mood buttons
function selectMoodDirect(mood) {
  updateResult(mood);
}

// Handle NLP text input with enhanced analysis
function submitText() {
  const text = document.getElementById("moodText").value.trim();
  
  if (!text) {
    alert("Please enter how you're feeling!");
    return;
  }

  const mood = moodAnalyzer.analyzeFromText(text);
  updateResult(mood);
}

// Handle Enter key in text input
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    submitText();
  }
}

// Initialize the app with common emojis
function initializeApp() {
  // You can add any initialization logic here
  console.log("Mood Analyzer initialized");
}

// Call initialization when page loads
document.addEventListener('DOMContentLoaded', initializeApp);