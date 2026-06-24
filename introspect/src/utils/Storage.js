
const REPORTS_KEY = "introspect_reports";


export function saveReport(report) {
  const reports = getAllReports();
  reports.unshift(report); 
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}


export function getAllReports() {
  try {
    const data = localStorage.getItem(REPORTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}


export function getReportById(id) {
  const reports = getAllReports();
  return reports.find((r) => r.id === id) || null;
}


export function clearReports() {
  localStorage.removeItem(REPORTS_KEY);
}