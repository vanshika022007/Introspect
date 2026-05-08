// utils/Speech.js
// Wrappers for SpeechSynthesis and SpeechRecognition browser APIs

// Speak text aloud using the browser's TTS
export function speakText(text, onEnd) {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Pick a good voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) => v.lang === "en-US" && v.name.includes("Google")
  ) || voices.find((v) => v.lang === "en-US") || voices[0];

  if (preferred) utterance.voice = preferred;

  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
}

// Stop any ongoing speech
export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// Create a SpeechRecognition instance
export function createRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  return recognition;
}