// utils/Speech.js

let voicesLoaded = false;
let cachedVoices = [];

function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
      cachedVoices = voices;
      voicesLoaded = true;
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      voicesLoaded = true;
      resolve(cachedVoices);
    };
  });
}


export async function speakText(text, onEnd) {
  if (!window.speechSynthesis || !text) return;


  window.speechSynthesis.cancel();

  if (!voicesLoaded) {
    await loadVoices();
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = cachedVoices.length
    ? cachedVoices
    : window.speechSynthesis.getVoices();

  const voice =
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang?.includes("en")) ||
    voices[0];

  if (voice) utterance.voice = voice;

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 120);
}


export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}


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