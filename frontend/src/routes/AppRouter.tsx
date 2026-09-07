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
import DashboardPage from "../pages/admin/DashboardPage";
import DoctorsPage from "../pages/admin/DoctorsPage";
import AppointmentsPage from "../pages/admin/AppointmentsPage";
import ServicesPage from "../pages/admin/ServicesPage";
import BlogPage from "../pages/admin/BlogPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesListPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/doctors" element={<DoctorsPage />} />
          <Route path="/admin/appointments" element={<AppointmentsPage />} />
          <Route path="/admin/services" element={<ServicesPage />} />
          <Route path="/admin/blog" element={<BlogPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;