import { Link } from "react-router-dom";

const stats = [
  { label: "Total Interviews", value: "8", icon: "📅" },
  { label: "Average Score", value: "72%", icon: "📈" },
  { label: "Best Score", value: "86%", icon: "🏆" },
];

const recentReports = [
  { id: 1, title: "Frontend Developer Interview", date: "May 11, 2024", duration: "30 mins", score: 76, color: "text-green-600 bg-green-50", icon: "💼" },
  { id: 2, title: "HR Interview - Freshers", date: "May 8, 2024", duration: "25 mins", score: 62, color: "text-orange-500 bg-orange-50", icon: "👤" },
  { id: 3, title: "Product Manager Interview", date: "May 5, 2024", duration: "40 mins", score: 81, color: "text-green-600 bg-green-50", icon: "📦" },
];

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">

      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-gray-600 text-base font-medium">Welcome back,</p>
          <h1 className="text-4xl font-bold text-violet-600 mt-1">
            Candidate 👋
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Practice smart. Speak better. Get better.
          </p>
        </div>

        <div className="w-28 h-28 bg-violet-50 rounded-full flex items-center justify-center text-5xl select-none">
          🤖
        </div>
      </div>

     
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-gray-800 font-bold text-base mb-4">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start p-4 bg-gray-50 rounded-xl"
            >
              <p className="text-gray-500 text-xs mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <span className="text-xl mt-1">{stat.icon}</span>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-800 font-bold text-base">
            Recent Interview Reports
          </h2>
          <Link
            to="/reports"
            className="text-violet-600 text-sm font-medium hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {recentReports.map((report) => (
            <Link
              key={report.id}
              to={`/reports/${report.id}`}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-violet-200 hover:bg-violet-50/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-xl">
                  {report.icon}
                </div>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">
                    {report.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {report.date} · {report.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${report.color}`}
                >
                  {report.score}%
                </span>
                <span className="text-gray-400">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}