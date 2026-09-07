import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useDoctors, useDeleteDoctor } from "../../../hooks/useDoctors";
import type { Doctor } from "../../../api/doctors.api";
import DoctorForm from "./DoctorForm";

const DoctorTable = () => {
  const { data: doctors, isLoading, isError } = useDoctors();
  const { mutate: deleteDoctor, isPending: isDeleting } = useDeleteDoctor();
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Doctor | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteDoctor(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Doctors</h1>
          <p className="text-gray-500 text-sm mt-1">Manage the specialists shown on your site.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      {isLoading && <p className="text-gray-500 text-sm">Loading doctors...</p>}
      {isError && <p className="text-red-400 text-sm">Couldn't load doctors right now.</p>}

      {doctors && doctors.length === 0 && (
        <p className="text-gray-500 text-sm">No doctors added yet.</p>
      )}

      {doctors && doctors.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-wide">
                  <th className="px-5 py-3.5 font-medium">Doctor</th>
                  <th className="px-5 py-3.5 font-medium">Specialty</th>
                  <th className="px-5 py-3.5 font-medium">Status</th>
                  <th className="px-5 py-3.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b border-white/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={doctor.photoUrl} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className="text-white text-sm font-medium">{doctor.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-sm">{doctor.specialty}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${doctor.isActive ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>
                        {doctor.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditingDoctor(doctor)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(doctor)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors" aria-label="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={doctor.photoUrl} alt={doctor.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{doctor.name}</p>
                    <p className="text-gray-400 text-xs">{doctor.specialty}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${doctor.isActive ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>
                    {doctor.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingDoctor(doctor)} className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium py-2 rounded-lg transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => setDeleteTarget(doctor)} className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-400 text-xs font-medium py-2 rounded-lg transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {(isCreating || editingDoctor) && (
        <DoctorForm
          doctor={editingDoctor}
          onClose={() => {
            setIsCreating(false);
            setEditingDoctor(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-white font-bold mb-2">Delete Doctor</h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to delete <span className="text-white">{deleteTarget.name}</span>?
              This can't be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium py-2.5 rounded-full transition-colors"
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

export default DoctorTable;