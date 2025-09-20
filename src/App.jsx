
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/MainPage/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Applicants from "./pages/ApplicantsFromGPT"
import Settings from "./pages/Settings";
import LoginPage from "./pages/loginPage";
import TeachersSection from "./pages/TeachersSection";
import BaadMai from "./pages/Applicants/BaadMai";

export default function App() {
  return (
    <>
     
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/teachers" element={<TeachersSection />} />
          <Route path="/applicants/:uid" element={<BaadMai />} />
        </Routes>
       
    </>
  );
}
