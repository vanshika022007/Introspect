
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { ROLES, LEVELS, STYLES } from "../utils/Prompts";

export default function NewInterview() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(ROLES[0].value);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0].value);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[1].value);

  function handleStart() {
    const config = {
      role: selectedRole,
      level: selectedLevel,
      levelDesc: LEVELS.find((l) => l.value === selectedLevel)?.desc || "",
      style: selectedStyle,
      styleDesc: STYLES.find((s) => s.value === selectedStyle)?.desc || "",
    };
  
    navigate("/session", { state: { config } });
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
     
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              Create New Interview
            </h1>
            <p className="text-gray-400 text-sm">Set up your interview experience</p>
          </div>
        </div>

        
        <div className="mb-8">
          <p className="font-semibold text-gray-800 mb-3">
            1. Choose Category / Role
          </p>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
              {ROLES.find((r) => r.value === selectedRole)?.icon}
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 text-gray-800 font-medium bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-violet-400 shadow-sm"
            >
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.value}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▾
            </div>
          </div>
        </div>

       
        <div className="mb-8">
          <p className="font-semibold text-gray-800 mb-3">2. Interview Level</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => setSelectedLevel(level.value)}
                className={`border rounded-xl py-3 px-2 text-center transition-all duration-150 ${
                  selectedLevel === level.value
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 hover:border-violet-300 text-gray-600"
                }`}
              >
                <p className="font-semibold text-sm">{level.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{level.desc}</p>
              </button>
            ))}
          </div>
        </div>

      
        <div className="mb-8">
          <p className="font-semibold text-gray-800 mb-3">3. Interviewer Style</p>
          <div className="grid grid-cols-3 gap-3">
            {STYLES.map((style) => (
              <button
                key={style.value}
                onClick={() => setSelectedStyle(style.value)}
                className={`border rounded-2xl py-4 px-3 text-center transition-all duration-150 ${
                  selectedStyle === style.value
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 hover:border-violet-300 text-gray-600"
                }`}
              >
                <div className="text-2xl mb-2">{style.icon}</div>
                <p className={`font-semibold text-sm ${selectedStyle === style.value ? "text-violet-700" : "text-gray-800"}`}>
                  {style.value}
                </p>
                <p className="text-xs text-gray-400 mt-1 leading-tight">{style.desc}</p>
              </button>
            ))}
          </div>
        </div>

     
        <div className="flex items-center gap-2 bg-violet-50 rounded-xl px-4 py-3 mb-6 text-violet-600 text-sm">
          <span>ℹ️</span>
          <span>You will be asked questions based on your selections.</span>
        </div>

      
        <button
          onClick={handleStart}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-base shadow-md transition-colors"
        >
          ▶ Start Interview
        </button>
      </div>
    </Layout>
  );
}