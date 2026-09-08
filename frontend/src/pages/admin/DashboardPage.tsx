import { Link } from "react-router-dom";
import {
  Stethoscope, CalendarClock, CalendarCheck, ListTree, Mail, Newspaper, ArrowRight,
} from "lucide-react";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { data: stats, isLoading, isError } = useDashboardStats();
  const { user } = useAuth();

  const cards = [
    {
      label: "Pending Appointments",
      value: stats?.pendingAppointments,
      icon: CalendarClock,
      to: "/admin/appointments",
      highlight: true,
    },
    {
      label: "Total Appointments",
      value: stats?.totalAppointments,
      icon: CalendarCheck,
      to: "/admin/appointments",
    },
    {
      label: "Unread Messages",
      value: stats?.unreadMessages,
      icon: Mail,
      to: "/admin/contact-messages",
      highlight: true,
    },
    {
      label: "Doctors",
      value: stats?.totalDoctors,
      icon: Stethoscope,
      to: "/admin/doctors",
    },
    {
      label: "Services",
      value: stats?.totalServices,
      icon: ListTree,
      to: "/admin/services",
    },
    {
      label: "Published Articles",
      value: stats?.publishedPosts,
      icon: Newspaper,
      to: "/admin/blog",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white light:!text-gray-900 text-2xl font-bold">
          Welcome back{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-gray-500 light:!text-gray-600 text-sm mt-1">
          Here's what's happening with MedDocX today.
        </p>
      </div>

      {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm">Loading dashboard...</p>}
      {isError && (
        <p className="text-red-400 text-sm">Couldn't load dashboard data right now.</p>
      )}

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.to}
                className={`group bg-white/[0.03] light:!bg-gray-100 border rounded-2xl p-6 transition-colors ${
                  card.highlight && (card.value ?? 0) > 0
                    ? "border-indigo-500/30 hover:border-indigo-500/60"
                    : "border-white/10 light:!border-gray-200 hover:border-white/20 light:hover:!border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-400" strokeWidth={1.75} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 light:!text-gray-400 group-hover:text-gray-400 light:group-hover:!text-gray-600 transition-colors" />
                </div>
                <div className="text-white light:!text-gray-900 font-bold text-3xl">{card.value ?? 0}</div>
                <div className="text-gray-400 light:!text-gray-600 text-sm mt-1">{card.label}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;