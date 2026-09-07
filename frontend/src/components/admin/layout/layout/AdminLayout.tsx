import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-[#0a0a0f] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-5 md:p-8 pt-20 md:pt-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;