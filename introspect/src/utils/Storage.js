// utils/Storage.js
// Handles saving/loading interview reports from localStorage

const REPORTS_KEY = "introspect_reports";

// Save a completed interview report
export function saveReport(report) {
  const reports = getAllReports();
  reports.unshift(report); // newest first
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

// Get all saved reports
export function getAllReports() {
  try {
    const data = localStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Get a single report by id
export function getReportById(id) {
  const reports = getAllReports();
  return reports.find((r) => r.id === id) || null;
}

// Clear all reports (for testing)
export function clearReports() {
  localStorage.removeItem(REPORTS_KEY);
}