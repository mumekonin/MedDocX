import { useState } from "react";
import { Trash2, Mail, Phone, Calendar, Clock } from "lucide-react";
import {
  useAppointments, useUpdateAppointmentStatus, useDeleteAppointment,
} from "../../../hooks/useAppointments";
import type { Appointment } from "../../../api/appointments.api";

const statusFilters = [
  { label: "All", value: undefined },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Cancelled", value: "cancelled" },
] as const;

const statusStyles: Record<Appointment["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-400",
  confirmed: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const AppointmentTable = () => {
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
  const { data: appointments, isLoading, isError } = useAppointments(activeFilter);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateAppointmentStatus();
  const { mutate: deleteAppointment, isPending: isDeleting } = useDeleteAppointment();
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteAppointment(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white light:!text-gray-900 text-2xl font-bold">Appointments</h1>
        <p className="text-gray-500 light:!text-gray-600 text-sm mt-1">Review and manage patient booking requests.</p>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {statusFilters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.value)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.value
                ? "bg-blue-600 text-white"
                : "bg-white/5 light:!bg-gray-100 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 hover:bg-white/10 light:hover:!bg-gray-200"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm">Loading appointments...</p>}
      {isError && <p className="text-red-400 text-sm">Couldn't load appointments right now.</p>}
      {appointments && appointments.length === 0 && (
        <p className="text-gray-500 light:!text-gray-600 text-sm">No appointments found for this filter.</p>
      )}

      {appointments && appointments.length > 0 && (
        <div className="space-y-3">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-white light:!text-gray-900 font-semibold">{appt.patientName}</p>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-gray-400 light:!text-gray-600 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {appt.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> {appt.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(appt.preferredDate)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {appt.preferredTime}
                  </span>
                </div>
                {appt.reason && (
                  <p className="text-gray-500 light:!text-gray-600 text-xs mt-2 italic">"{appt.reason}"</p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={appt.status}
                  disabled={isUpdating}
                  onChange={(e) =>
                    updateStatus({
                      id: appt.id,
                      status: e.target.value as Appointment["status"],
                    })
                  }
                  className="bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3 py-2 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => setDeleteTarget(appt)}
                  className="w-9 h-9 rounded-lg bg-white/5 light:!bg-white hover:bg-red-500/10 flex items-center justify-center text-gray-400 light:!text-gray-600 hover:text-red-400 transition-colors shrink-0"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-[#0d0d14] light:!bg-white border border-white/10 light:!border-gray-200 rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-white light:!text-gray-900 font-bold mb-2">Delete Appointment</h3>
            <p className="text-gray-400 light:!text-gray-600 text-sm mb-6">
              Are you sure you want to delete the appointment for{" "}
              <span className="text-white light:!text-gray-900">{deleteTarget.patientName}</span>? This can't be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-white/5 light:!bg-gray-100 hover:bg-white/10 light:hover:!bg-gray-200 text-gray-300 light:!text-gray-600 text-sm font-medium py-2.5 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-full transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;