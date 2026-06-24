
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ScoreCircle from "../components/report/ScoreCircle";
import { getReportById } from "../utils/Storage";
import { getScoreColor, getScoreLabel, getScoreLabelColor, formatDate } from "../utils/ReportLogic";

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = getReportById(id);
  const [activeTab, setActiveTab] = useState("overview");

  if (!report) {
    return (
      <Layout>
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 mb-4">Report not found.</p>
          <button onClick={() => navigate("/reports")} className="text-violet-600 font-semibold">
            ← Back to Reports
          </button>
        </div>
      </Layout>
    );
  }

  const { config, feedback, conversation, date, duration } = report;

  const tabs = ["overview", "answers", "feedback"];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/reports")}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors text-gray-600"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {config?.role} Interview
            </h1>
            <p className="text-xs text-gray-400">
              {formatDate(date)} · {duration} min
            </p>
          </div>
        </div>

      
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-violet-600 text-violet-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div>
   
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col items-center">
                  <ScoreCircle score={feedback?.overallScore || 0} size={140} />
                  <p className={`font-semibold text-sm mt-2 ${getScoreLabelColor(feedback?.overallScore)}`}>
                    {getScoreLabel(feedback?.overallScore)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Overall Score</p>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-4">
                  {[
                    { label: "Clarity", val: feedback?.clarity },
                    { label: "Consistency", val: feedback?.consistency },
                    { label: "Response Length", val: feedback?.responseLength },
                    { label: "Confidence", val: feedback?.confidence },
                    { label: "Technical", val: feedback?.technicalClarity },
                  ].map(({ label, val }) => (
                    <div key={label} className="text-center">
                      <p className={`text-2xl font-extrabold ${getScoreColor(val || 0)}`}>
                        {val || 0}%
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                      <p className={`text-xs font-semibold ${getScoreLabelColor(val || 0)}`}>
                        {val >= 70 ? "Good" : val >= 50 ? "Average" : "Low"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

      
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Summary</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feedback?.summary}</p>
            </div>

        
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-2xl border border-green-100 p-4">
                <h3 className="font-bold text-green-700 mb-2 text-sm">✅ Strengths</h3>
                <ul className="flex flex-col gap-1.5">
                  {(feedback?.strengths || []).map((s, i) => (
                    <li key={i} className="text-xs text-green-800">• {s}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl border border-red-100 p-4">
                <h3 className="font-bold text-red-700 mb-2 text-sm">❌ Weaknesses</h3>
                <ul className="flex flex-col gap-1.5">
                  {(feedback?.weaknesses || []).map((w, i) => (
                    <li key={i} className="text-xs text-red-800">• {w}</li>
                  ))}
                </ul>
              </div>
            </div>

 
            <div className="bg-violet-50 rounded-2xl border border-violet-100 p-5">
              <h3 className="font-bold text-violet-800 mb-3 text-sm">💡 Improvement Tips</h3>
              <ul className="flex flex-col gap-2">
                {(feedback?.improvementTips || []).map((tip, i) => (
                  <li key={i} className="text-xs text-violet-700">
                    {i + 1}. {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

  
        {activeTab === "answers" && (
          <div className="flex flex-col gap-4">
            {(conversation || []).map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-sm font-bold text-violet-600 shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-800 font-semibold text-sm">{item.question}</p>
                </div>
                <div className="ml-11">
                  <p className="text-gray-500 text-xs font-medium mb-1">Your Answer:</p>
                  <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 rounded-xl p-3">
                    {item.answer || <em className="text-gray-400">No answer recorded</em>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}


        {activeTab === "feedback" && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3">Overall Feedback</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feedback?.summary}</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-3">Score Breakdown</h3>
              {[
                { label: "Clarity", val: feedback?.clarity },
                { label: "Consistency", val: feedback?.consistency },
                { label: "Confidence", val: feedback?.confidence },
                { label: "Technical Clarity", val: feedback?.technicalClarity },
                { label: "Response Length", val: feedback?.responseLength },
              ].map(({ label, val }) => (
                <div key={label} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">{label}</span>
                    <span className={`font-bold ${getScoreColor(val || 0)}`}>{val || 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-700"
                      style={{ width: `${val || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}