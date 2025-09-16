import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage";
import AdminPanel from "./pages/Admin";
import ApplicantsPage from "./pages/Applicants";

function App() {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/applicants/:uid" element={<ApplicantsPage />} />
    </Routes>
  );
}

export default App;
