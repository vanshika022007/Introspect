// pages/Home.jsx
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getAllReports } from "../utils/Storage";
import { getScoreBg, formatDate } from "../utils/ReportLogic";
import { ROLE_ICONS } from "../utils/Prompts";

export default function Home() {
  const navigate = useNavigate();
  const reports = getAllReports();

  // Compute stats from real data
  const totalInterviews = reports.length;
  const avgScore =
    totalInterviews > 0
      ? Math.round(
          reports.reduce((sum, r) => sum + (r.feedback?.overallScore || 0), 0) /
            totalInterviews
        )
      : null;
  const bestScore =
    totalInterviews > 0
      ? Math.max(...reports.map((r) => r.feedback?.overallScore || 0))
      : null;

  const recentReports = reports.slice(0, 3);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm mb-1">Welcome back,</p>
            <h1 className="text-3xl font-extrabold text-violet-600 mb-1">
              Candidate 👋
            </h1>
            <p className="text-gray-400 text-sm">
              Practice smart. Speak better. Get better.
            </p>
          </div>
          {/* Robot illustration */}
          <div className="hidden sm:flex flex-col items-center">
            <div className="relative">
              <div className="absolute -top-6 -right-4 bg-violet-500 rounded-2xl px-3 py-1.5 text-white text-sm font-bold shadow-lg">
                ···
              </div>
              <div className="text-8xl select-none">🤖</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Quick Stats</h2>
          {totalInterviews === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              No interviews yet. Start your first interview to see stats!
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Total Interviews</p>
                <p className="text-3xl font-extrabold text-gray-800">
                  {totalInterviews}
                </p>
                <span className="text-xl">📅</span>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Average Score</p>
                <p className="text-3xl font-extrabold text-gray-800">
                  {avgScore}%
                </p>
                <span className="text-xl">📈</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-1">Best Score</p>
                <p className="text-3xl font-extrabold text-gray-800">
                  {bestScore}%
                </p>
                <span className="text-xl">🏆</span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">Recent Interview Reports</h2>
            {recentReports.length > 0 && (
              <button
                onClick={() => navigate("/reports")}
                className="text-violet-600 text-sm font-semibold hover:underline"
              >
                View all
              </button>
            )}
          </div>

          {recentReports.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-400 text-sm">
                No reports yet. Complete an interview to see your results here.
              </p>
              <button
                onClick={() => navigate("/new-interview")}
                className="mt-4 bg-violet-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors"
              >
                Start First Interview
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {recentReports.map((report) => {
                const icon = ROLE_ICONS[report.config?.role] || "💼";
                return (
                  <div
                    key={report.id}
                    onClick={() => navigate(`/reports/${report.id}`)}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-lg">
                        {icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {report.config?.role} Interview
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(report.date)} · {report.duration} mins
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full ${getScoreBg(
                          report.feedback?.overallScore
                        )}`}
                      >
                        {report.feedback?.overallScore}%
                      </span>
                      <span className="text-gray-300">›</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}