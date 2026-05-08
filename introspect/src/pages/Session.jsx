// pages/Session.jsx
// The live interview session — NO sidebar, fully immersive
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PromptBox from "../components/session/PromptBox";
import Transcript from "../components/session/Transcript";
import MicButton from "../components/session/MicButton";
import Timer from "../components/session/Timer";
import { generateFirstQuestion, generateNextQuestion, generateFeedback } from "../services/api";
import { speakText, stopSpeaking, createRecognition } from "../utils/Speech";
import { saveReport } from "../utils/Storage";

const MAX_QUESTIONS = 8;

export default function Session() {
  const navigate = useNavigate();
  const location = useLocation();
  const config = location.state?.config;

  const [question, setQuestion] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [questionNum, setQuestionNum] = useState(1);
  const [conversation, setConversation] = useState([]);
  const [phase, setPhase] = useState("speaking"); // 'speaking' | 'listening' | 'processing' | 'done'
  const [error, setError] = useState("");
  const [isEnding, setIsEnding] = useState(false);
  const [startTime] = useState(Date.now());

  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  // Redirect if no config passed
  useEffect(() => {
    if (!config) {
      navigate("/new-interview");
    } else {
      loadFirstQuestion();
    }
    return () => {
      stopSpeaking();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  async function loadFirstQuestion() {
    try {
      setIsLoading(true);
      setError("");
      const q = await generateFirstQuestion(config);
      setQuestion(q);
      setQuestionNum(1);
      setPhase("speaking");
      speakQuestion(q);
    } catch (err) {
      setError("Failed to load question. Check your API connection.");
      setIsLoading(false);
    }
  }

  function speakQuestion(text) {
    setIsSpeaking(true);
    setPhase("speaking");
    speakText(text, () => {
      setIsSpeaking(false);
      setPhase("listening");
    });
  }

  function startListening() {
    const recognition = createRecognition();
    if (!recognition) {
      setError("Speech recognition not supported in this browser. Please use Chrome.");
      return;
    }

    transcriptRef.current = "";
    setTranscript("");
    setIsListening(true);
    recognitionRef.current = recognition;

    recognition.onresult = (e) => {
      let fullTranscript = "";
      for (let i = 0; i < e.results.length; i++) {
        fullTranscript += e.results[i][0].transcript;
      }
      transcriptRef.current = fullTranscript;
      setTranscript(fullTranscript);
    };

    recognition.onerror = (e) => {
      if (e.error !== "no-speech") {
        setError("Microphone error: " + e.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }

  function handleMicClick() {
    if (phase === "listening") {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    }
  }

  async function handleNextQuestion() {
    const answer = transcriptRef.current.trim();
    if (!answer) {
      setError("Please speak an answer before moving to the next question.");
      return;
    }

    setError("");
    const newConversation = [...conversation, { question, answer }];
    setConversation(newConversation);
    setTranscript("");
    transcriptRef.current = "";

    if (questionNum >= MAX_QUESTIONS) {
      endInterview(newConversation);
      return;
    }

    try {
      setPhase("processing");
      setIsLoading(true);
      const nextQ = await generateNextQuestion(config, newConversation);
      setQuestion(nextQ);
      setQuestionNum((n) => n + 1);
      setIsLoading(false);
      speakQuestion(nextQ);
    } catch (err) {
      setError("Failed to generate next question. Please try again.");
      setIsLoading(false);
      setPhase("listening");
    }
  }

  async function endInterview(finalConversation) {
    const convo = finalConversation || conversation;
    if (convo.length === 0) {
      navigate("/");
      return;
    }

    setIsEnding(true);
    setPhase("done");
    stopSpeaking();

    try {
      const feedback = await generateFeedback(config, convo);
      const durationMins = Math.round((Date.now() - startTime) / 60000) || 1;

      const report = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        config,
        conversation: convo,
        feedback,
        duration: durationMins,
      };

      saveReport(report);
      navigate(`/reports/${report.id}`);
    } catch (err) {
      setError("Failed to generate feedback. " + err.message);
      setIsEnding(false);
      setPhase("listening");
    }
  }

  if (!config) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="font-bold text-gray-900">{config.role} Interview</h1>
          <p className="text-xs text-gray-400">{config.level} · {config.style}</p>
        </div>
        <div className="flex items-center gap-6">
          <Timer running={phase !== "done"} />
          <div className="text-sm text-gray-500 font-medium">
            Q {questionNum} of {MAX_QUESTIONS}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200">
        <div
          className="h-full bg-violet-600 transition-all duration-500"
          style={{ width: `${(questionNum / MAX_QUESTIONS) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl flex flex-col gap-5">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Loading */}
          {isLoading && !question && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-500">Generating your question...</span>
            </div>
          )}

          {/* Question box */}
          {question && <PromptBox question={question} isSpeaking={isSpeaking} />}

          {/* Transcript area */}
          <Transcript text={transcript} isListening={isListening} />

          {/* Controls */}
          <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <MicButton
              isListening={isListening}
              onClick={handleMicClick}
              disabled={phase !== "listening" || isEnding}
            />

            <div className="flex flex-col gap-3">
              <button
                onClick={handleNextQuestion}
                disabled={phase !== "listening" || isListening || isEnding || !transcript}
                className="bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                {questionNum >= MAX_QUESTIONS ? "Finish →" : "Next Question →"}
              </button>
              <button
                onClick={() => endInterview()}
                disabled={isEnding}
                className="text-red-500 hover:text-red-600 text-sm font-medium text-center disabled:opacity-40"
              >
                {isEnding ? "Generating report..." : "End Interview"}
              </button>
            </div>
          </div>

          {/* Phase indicator */}
          <div className="text-center text-xs text-gray-400">
            {phase === "speaking" && "AI is asking the question..."}
            {phase === "listening" && !isListening && "Click the mic to start speaking"}
            {phase === "listening" && isListening && "Recording your answer..."}
            {phase === "processing" && "Generating next question..."}
            {phase === "done" && "Generating your feedback report..."}
          </div>
        </div>
      </div>

      {/* Wave animation style */}
      <style>{`
        @keyframes wave {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(2.5); }
        }
      `}</style>
    </div>
  );
}