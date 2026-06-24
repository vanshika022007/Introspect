// utils/ReportLogic.js
// Helper functions for report display logic

// Return a color class based on score
export function getScoreColor(score) {
  if (score >= 75) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

export function getScoreBg(score) {
  if (score >= 75) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export function getScoreLabel(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good Performance";
  if (score >= 50) return "Average";
  return "Needs Improvement";
}

export function getScoreLabelColor(score) {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}


export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m} min${m !== 1 ? "s" : ""}`;
}


export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}