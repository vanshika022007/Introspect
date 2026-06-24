// pages/Reports.jsx
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ReportCard from "../components/report/ReportCard";
import { getAllReports } from "../utils/Storage";

export default function Reports() {
  const navigate = useNavigate();
  const reports = getAllReports();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Past Interview Reports</h1>
          <p className="text-gray-400 text-sm mt-1">Review your past performances</p>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-gray-700 font-semibold text-lg mb-2">No reports yet</h2>
            <p className="text-gray-400 text-sm mb-6">
              Complete an interview to see your performance report here.
            </p>
            <button
              onClick={() => navigate("/new-interview")}
              className="bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors"
            >
              Start Your First Interview
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}