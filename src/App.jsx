// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import LoginPage from "./pages/loginPage";
// // import AdminPanel from "./pages/Admin";
// import ApplicantsPage from "./pages/Applicants";
// import AuthRoute from "./Routes/AuthRoute";
// import PrivateRoute from "./Routes/PrivateRoute";
// import AdminMain from "./pages/MainPage/AdminMain";
// import CoursesPage from "./pages/CoursesPage";

// function App() {
//   return (
//     <Routes>
//       <Route element={<AuthRoute />}>
//         <Route path="/" element={<LoginPage />} />
//       </Route>

//       <Route element={<PrivateRoute />}>
//         <Route path="/admin" element={<AdminMain />} />
//         <Route path="admin/courses" element={<CoursesPage />} />
//         <Route path="/admin/applicants/:uid" element={<ApplicantsPage />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;


import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer";
import Dashboard from "./pages/MainPage/Dashboard";
import Courses from "./pages/Courses";
import Students from "./pages/Students";
import Applicants from "./pages/ApplicantsFromGPT"
import Settings from "./pages/Settings";
import Navbar from "./components/navbar";
import TeachersSection from "./pages/TeachersSection";

export default function App() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="pt-16 min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/teachers" element={<TeachersSection />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
