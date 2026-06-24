import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PromptBox from "../components/session/PromptBox";
import Transcript from "../components/session/Transcript";
import MicButton from "../components/session/MicButton";
import Timer from "../components/session/Timer";

import {
  generateFirstQuestion,
  generateNextQuestion,
  generateFeedback,
} from "../services/api";

import { speakText, stopSpeaking, createRecognition } from "../utils/Speech";
import { saveReport } from "../utils/Storage";

const MAX_QUESTIONS = 20;

export default function Session() {
  const navigate = useNavigate();
  const location = useLocation();
  const config = location.state?.config;

  const [question, setQuestion] = useState("");
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [questionNum, setQuestionNum] = useState(1);
  const [conversation, setConversation] = useState([]);
  const [phase, setPhase] = useState("loading");
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const speakLockRef = useRef(false);
  const hasLoadedRef = useRef(false);


  useEffect(() => {
    if (!config) return navigate("/new-interview");

    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    loadFirstQuestion();

    return () => {
      stopSpeaking();
      recognitionRef.current?.stop();
    };
  }, []);


  async function loadFirstQuestion() {
    try {
      setPhase("loading");
      const q = await generateFirstQuestion(config);

      setQuestion(q);
      setTimeout(() => speak(q), 300);
    } catch {
      setError("Failed to load question");
    }
  }


  function speak(text) {
    if (!text || speakLockRef.current) return;

    speakLockRef.current = true;
    stopSpeaking();

    setIsSpeaking(true);
    setPhase("speaking");

    speakText(text, () => {
      setIsSpeaking(false);
      setPhase("listening");
      speakLockRef.current = false;
    });
  }


  function startMic() {
    const rec = createRecognition();
    if (!rec) return;

    transcriptRef.current = "";
    setTranscript("");
    setIsListening(true);

    recognitionRef.current = rec;

    rec.onresult = (e) => {
      let text = "";
      for (let i = 0; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      transcriptRef.current = text;
      setTranscript(text);
    };

    rec.onend = () => setIsListening(false);

    rec.start();
  }

  function stopMic() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  
  async function handleNext() {
    const answer = transcriptRef.current.trim();

    if (!answer) {
      setError("Answer required");
      return;
    }

    const updated = [...conversation, { question, answer }];
    setConversation(updated);
    setTranscript("");

    if (questionNum >= MAX_QUESTIONS) {
      return endInterview(updated);
    }

    try {
      setPhase("processing");

      const nextQ = await generateNextQuestion(config, updated);

      setQuestion(nextQ);
      setQuestionNum((p) => p + 1);

      setTimeout(() => speak(nextQ), 300);
    } catch {
      setError("Failed next question");
    }
  }

 
  async function endInterview(finalConversation = conversation) {
    try {
      stopSpeaking();
      recognitionRef.current?.stop();

      setPhase("done");

      let feedback;
      try {
        feedback = await generateFeedback(config, finalConversation, 0);
      } catch {
        feedback = {
          overallScore: 0,
          clarity: 0,
          consistency: 0,
          responseLength: 0,
          confidence: 0,
          technical: 0,
          timeManagement: 0,
          summary: "Report generation failed",
          strengths: [],
          weaknesses: [],
          improvementTips: [],
        };
      }

      const report = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        config,
        conversation: finalConversation,
        feedback,
        duration: 0,
      };

      saveReport(report);

      navigate(`/reports/${report.id}`);
    } catch (err) {
      setError("Failed to end interview");
    }
  }


  if (!config) return null;

  return (
    <div className="min-h-screen bg-white text-white flex flex-col">


      <header className="flex justify-between p-4 border-b border-white/10">
        <div>
          <h1 className="font-bold">{config.role}</h1>
        </div>

        <div className="flex gap-4 items-center">
          <Timer running />

         
          <button
            onClick={() => endInterview()}
            className="text-red-400 hover:text-red-300 font-semibold"
          >
            End Interview
          </button>
        </div>
      </header>


      <div className="flex-1 flex justify-center items-center p-6">
        <div className="w-full max-w-2xl space-y-5">

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-300 p-3 rounded">
              {error}
            </div>
          )}

          <div className="bg-white/5 p-5 rounded-xl">
            <PromptBox question={question} isSpeaking={isSpeaking} />
          </div>

          <div className="bg-white/5 p-5 rounded-xl min-h-[120px]">
            <Transcript text={transcript} isListening={isListening} />
          </div>

          <div className="flex justify-between bg-white/5 p-4 rounded-xl">

            <MicButton
              isListening={isListening}
              onClick={() =>
                isListening ? stopMic() : startMic()
              }
            />

            <button
              onClick={handleNext}
              className="bg-violet-600 px-4 py-2 rounded"
            >
              Next
            </button>

          </div>

          <div className="text-center text-xs text-gray-400">
            {phase}
          </div>

        </div>
      </div>
    </div>
  );
}