import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NewInterview from "./pages/NewInterview";
import Session from "./pages/Session";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/session" element={<Session />} />

 
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/new"
          element={
            <Layout>
              <NewInterview />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />
        <Route
          path="/reports/:id"
          element={
            <Layout>
              <ReportDetail />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}