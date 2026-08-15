import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import ChangePassword from "./pages/ChangePassword";
import ExpertServices from "./pages/ExpertServices";
import Customers from "./pages/Customers";
import ServiceCategories from "./pages/ServiceCategories";
import ServiceSubcategories from "./pages/ServiceSubcategories";
import IntegratedServices from "./pages/IntegratedServices";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import RequireAuth from "./components/auth/RequireAuth";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<RequireAuth><Home /></RequireAuth>} />

            {/* Others Page */}
            <Route path="/change-password" element={<RequireAuth><ChangePassword /></RequireAuth>} />
            <Route path="/expert-services" element={<RequireAuth><ExpertServices /></RequireAuth>} />
            <Route path="/customers" element={<RequireAuth><Customers /></RequireAuth>} />
            <Route path="/service-categories" element={<RequireAuth><ServiceCategories /></RequireAuth>} />
            <Route path="/service-subcategories" element={<RequireAuth><ServiceSubcategories /></RequireAuth>} />
            <Route path="/integrated-services" element={<RequireAuth><IntegratedServices /></RequireAuth>} />

          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

        </Routes>
      </Router>
    </>
  );
}
