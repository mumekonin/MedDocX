import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ServicesListPage from "../pages/public/ServicesListPage";
import ServiceDetailPage from "../pages/public/ServiceDetailPage";
import BlogListPage from "../pages/public/BlogListPage";
import BlogDetailPage from "../pages/public/BlogDetailPage";
import ContactPage from "../pages/public/ContactPage";
import LoginPage from "../pages/admin/LoginPage";
import AdminLayout from "../components/admin/layout/layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesListPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Protected admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin/dashboard"
            element={<div className="text-white">Dashboard (placeholder)</div>}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;