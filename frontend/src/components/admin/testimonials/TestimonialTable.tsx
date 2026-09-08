import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useTestimonials, useDeleteTestimonial } from "../../../hooks/useTestimonials";
import type { Testimonial } from "../../../api/testimonials.api";
import TestimonialForm from "./TestimonialForm";

const TestimonialTable = () => {
  const { data: testimonials, isLoading, isError } = useTestimonials();
  const { mutate: deleteTestimonial, isPending: isDeleting } = useDeleteTestimonial();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteTestimonial(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white light:!text-gray-900 text-2xl font-bold">Testimonials</h1>
          <p className="text-gray-500 light:!text-gray-600 text-sm mt-1">Manage patient stories shown on your site.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors w-fit"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm">Loading testimonials...</p>}
      {isError && <p className="text-red-400 text-sm">Couldn't load testimonials right now.</p>}
      {testimonials && testimonials.length === 0 && (
        <p className="text-gray-500 light:!text-gray-600 text-sm">No testimonials added yet.</p>
      )}

      {testimonials && testimonials.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatarUrl}
                    alt={testimonial.patientName}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white light:!text-gray-900 text-sm font-semibold">{testimonial.patientName}</p>
                    <p className="text-indigo-400 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                    testimonial.isActive
                      ? "bg-green-500/10 text-green-400"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {testimonial.isActive ? "Active" : "Hidden"}
                </span>
              </div>

              <p className="text-gray-400 light:!text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {testimonial.message}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingTestimonial(testimonial)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 light:!bg-white hover:bg-white/10 light:hover:!bg-gray-200 text-gray-300 light:!text-gray-600 text-xs font-medium py-2 rounded-lg transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(testimonial)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 light:!bg-white hover:bg-red-500/10 text-gray-300 light:!text-gray-600 hover:text-red-400 text-xs font-medium py-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(isCreating || editingTestimonial) && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onClose={() => {
            setIsCreating(false);
            setEditingTestimonial(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-[#0d0d14] light:!bg-white border border-white/10 light:!border-gray-200 rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-white light:!text-gray-900 font-bold mb-2">Delete Testimonial</h3>
            <p className="text-gray-400 light:!text-gray-600 text-sm mb-6">
              Are you sure you want to delete the testimonial from{" "}
              <span className="text-white light:!text-gray-900">{deleteTarget.patientName}</span>? This can't be undone.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-white/5 light:!bg-gray-100 hover:bg-white/10 light:hover:!bg-gray-200 text-gray-300 light:!text-gray-600 text-sm font-medium py-2.5 rounded-full transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteConfirm} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-2.5 rounded-full transition-colors disabled:opacity-50">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialTable;