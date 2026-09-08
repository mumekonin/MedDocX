import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {LayoutDashboard, Stethoscope, CalendarCheck, ListTree,Newspaper, Quote, HelpCircle, Mail, Settings, LogOut, Menu,X, Moon, Sun} from "lucide-react";
import logo from "../../../../assets/logo.svg";
import { useLogout } from "../../../../context/AuthContext";
import { useTheme } from "../../../../context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const sidebarContent = (
    <>
      <div className="px-6 py-5 border-b border-white/10 light:!border-gray-200 flex items-center justify-between">
        <img src={logo} alt="MedDocX" className="h-8 w-auto" />
        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 hover:bg-white/5 light:hover:!bg-gray-100"
                }`
              }
            >
              <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 light:!border-gray-200 space-y-1">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 hover:bg-white/5 light:hover:!bg-gray-100 transition-colors"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" strokeWidth={1.75} /> : <Moon className="w-4.5 h-4.5" strokeWidth={1.75} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-400 light:!text-gray-600 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-[#0a0a0f] light:!bg-white border-b border-white/10 light:!border-gray-200 px-4 py-3 flex items-center justify-between">
        <img src={logo} alt="MedDocX" className="h-7 w-auto" />
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-gray-300 light:!text-gray-600 hover:text-white light:hover:!text-gray-900"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 bg-[#0a0a0f] light:!bg-white border-r border-white/10 light:!border-gray-200 h-screen sticky top-0 flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="relative w-72 h-full bg-[#0a0a0f] light:!bg-white border-r border-white/10 light:!border-gray-200 flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;