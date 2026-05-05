import { Link } from "react-router-dom";

const reports = [
  { id: 1, title: "Frontend Developer Interview", date: "May 12, 2024", duration: "25 min", score: 72, color: "text-green-600 bg-green-50", icon: "💼" },
  { id: 2, title: "HR Interview", date: "May 10, 2024", duration: "20 min", score: 65, color: "text-orange-500 bg-orange-50", icon: "👤" },
  { id: 3, title: "Product Manager Interview", date: "May 8, 2024", duration: "30 min", score: 81, color: "text-green-600 bg-green-50", icon: "📦" },
  { id: 4, title: "Backend Developer Interview", date: "May 5, 2024", duration: "28 min", score: 68, color: "text-orange-500 bg-orange-50", icon: "⚙️" },
];

export default function Reports() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Past Interview Reports
      </h1>

      <div className="flex flex-col gap-3">
        {reports.map((report) => (
          <Link
            key={report.id}
            to={`/reports/${report.id}`}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-violet-200 hover:bg-violet-50/30 transition-all"
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
  );
}