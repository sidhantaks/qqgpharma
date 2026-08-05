import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import ChangePassword from "./pages/ChangePassword";
import Services from "./pages/Services";
import Customers from "./pages/Customers";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
  const isAuth = typeof window !== 'undefined' && !!localStorage.getItem('token');

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={isAuth ? <Home /> : <Navigate to="/signin" replace />} />

            {/* Others Page */}
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/services" element={<Services />} />
            <Route path="/customers" element={<Customers />} />

          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

        </Routes>
      </Router>
    </>
  );
}
