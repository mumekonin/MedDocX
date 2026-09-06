import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import ServicesListPage from "../pages/public/ServicesListPage";
import ServiceDetailPage from "../pages/public/ServiceDetailPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesListPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
    </Routes>
  );
};

export default AppRouter;