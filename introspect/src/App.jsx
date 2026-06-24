import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewInterview from "./pages/NewInterview";
import Session from "./pages/Session";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-interview" element={<NewInterview />} />
        <Route path="/session" element={<Session />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
 


