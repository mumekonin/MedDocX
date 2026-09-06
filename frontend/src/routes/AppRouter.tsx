import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ServicesListPage from "../pages/public/ServicesListPage";
import ServiceDetailPage from "../pages/public/ServiceDetailPage";
import BlogListPage from "../pages/public/BlogListPage";
import BlogDetailPage from "../pages/public/BlogDetailPage";
import ContactPage from "../pages/public/ContactPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesListPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRouter;