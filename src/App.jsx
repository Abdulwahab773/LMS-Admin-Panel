import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage";
import AdminPanel from "./pages/Admin";
import ApplicantsPage from "./pages/Applicants";
import AuthRoute from "./Routes/AuthRoute";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <Routes>
<Route  element={<AuthRoute />}>

      <Route path="/" element={<LoginPage />} />

</Route>


<Route element={<PrivateRoute />} >

      <Route path="/admin" element={<AdminPanel />} />

      <Route path="/admin/applicants/:uid" element={<ApplicantsPage />} />

</Route>
    </Routes>
  );
}

export default App;
