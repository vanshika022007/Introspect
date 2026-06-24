import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Product Manager",
  "HR Interview",
  "Data Analyst",
];

const levels = [
  { label: "Entry Level", sub: "0 – 2 years" },
  { label: "Mid Level", sub: "2 – 5 years" },
  { label: "Senior Level", sub: "5+ years" },
  { label: "Expert Level", sub: "Deep Expertise" },
];

const styles = [
  { label: "Friendly", sub: "Conversational and supportive", icon: "😊" },
  { label: "Professional", sub: "Formal and to the point", icon: "👔" },
  { label: "Strict", sub: "Challenging and rigorous", icon: "😐" },
];

export default function NewInterview() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Frontend Developer");
  const [selectedLevel, setSelectedLevel] = useState("Entry Level");
  const [selectedStyle, setSelectedStyle] = useState("Professional");

  return (
    <div className="max-w-2xl mx-auto">

      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ←
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Interview
          </h1>
          <p className="text-gray-400 text-sm">
            Set up your interview experience
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8">

        <div>
          <p className="text-gray-700 font-semibold mb-3">
            1. Choose Category / Role
          </p>
          <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-white">
            <span className="text-violet-500 text-xl">🖥️</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 text-gray-700 text-sm font-medium bg-transparent outline-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>


        <div>
          <p className="text-gray-700 font-semibold mb-3">2. Interview Level</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {levels.map((level) => (
              <button
                key={level.label}
                onClick={() => setSelectedLevel(level.label)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedLevel === level.label
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 bg-white hover:border-violet-300"
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    selectedLevel === level.label
                      ? "text-violet-600"
                      : "text-gray-700"
                  }`}
                >
                  {level.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{level.sub}</p>
              </button>
            ))}
          </div>
        </div>

     
        <div>
          <p className="text-gray-700 font-semibold mb-3">
            3. Interviewer Style
          </p>
          <div className="grid grid-cols-3 gap-3">
            {styles.map((style) => (
              <button
                key={style.label}
                onClick={() => setSelectedStyle(style.label)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedStyle === style.label
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 bg-white hover:border-violet-300"
                }`}
              >
                <span className="text-2xl">{style.icon}</span>
                <p
                  className={`text-sm font-semibold mt-2 ${
                    selectedStyle === style.label
                      ? "text-violet-600"
                      : "text-gray-700"
                  }`}
                >
                  {style.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{style.sub}</p>
              </button>
            ))}
          </div>
        </div>

       
        <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
          <span>ℹ️</span>
          <span>You will be asked questions based on your selections.</span>
        </div>


        <button
          onClick={() => navigate("/session")}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base transition-all shadow-md"
        >
          ▶️ Start Interview
        </button>
      </div>
    </div>
  );
}