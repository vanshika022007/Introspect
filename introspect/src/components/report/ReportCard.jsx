// components/report/ReportCard.jsx
import { useNavigate } from "react-router-dom";
import { getScoreBg, formatDate } from "../../utils/ReportLogic";
import { ROLE_ICONS } from "../../utils/Prompts";

export default function ReportCard({ report }) {
  const navigate = useNavigate();
  const icon = ROLE_ICONS[report.config?.role] || "💼";

  return (
    <div
      onClick={() => navigate(`/reports/${report.id}`)}
      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center text-xl">
          {icon}
        </div>
        {/* Info */}
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            {report.config?.role} Interview
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatDate(report.date)} · {report.duration} mins
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${getScoreBg(report.feedback?.overallScore)}`}>
          {report.feedback?.overallScore}%
        </span>
        <span className="text-gray-300">›</span>
      </div>
    </div>
  );
}