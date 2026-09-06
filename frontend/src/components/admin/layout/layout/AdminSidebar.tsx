import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Stethoscope, CalendarCheck, ListTree,
  Newspaper, Quote, HelpCircle, Mail, Settings, LogOut,
} from "lucide-react";
import { useLogout } from "../../../../context/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Doctors", to: "/admin/doctors", icon: Stethoscope },
  { label: "Appointments", to: "/admin/appointments", icon: CalendarCheck },
  { label: "Services", to: "/admin/services", icon: ListTree },
  { label: "Blog", to: "/admin/blog", icon: Newspaper },
  { label: "Testimonials", to: "/admin/testimonials", icon: Quote },
  { label: "FAQs", to: "/admin/faqs", icon: HelpCircle },
  { label: "Messages", to: "/admin/contact-messages", icon: Mail },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 shrink-0 bg-[#0a0a0f] border-r border-white/10 h-screen sticky top-0 flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <img src="/logo.png" alt="MedDocX" className="h-8 w-auto" />
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;