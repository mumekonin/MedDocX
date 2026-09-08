import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useFaqs, useDeleteFaq } from "../../../hooks/useFaqs";
import type { Faq } from "../../../api/faqs.api";
import FaqForm from "./FaqForm";

const FaqTable = () => {
  const { data: faqs, isLoading, isError } = useFaqs();
  const { mutate: deleteFaq, isPending: isDeleting } = useDeleteFaq();
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteFaq(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white light:!text-gray-900 text-2xl font-bold">FAQs</h1>
          <p className="text-gray-500 light:!text-gray-600 text-sm mt-1">Manage frequently asked questions.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors w-fit"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm">Loading FAQs...</p>}
      {isError && <p className="text-red-400 text-sm">Couldn't load FAQs right now.</p>}
      {faqs && faqs.length === 0 && <p className="text-gray-500 light:!text-gray-600 text-sm">No FAQs added yet.</p>}

      {faqs && faqs.length > 0 && (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <p className="text-white light:!text-gray-900 text-sm font-semibold">{faq.question}</p>
                  <span
                    className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                      faq.isActive
                        ? "bg-green-500/10 text-green-400"
                        : "bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {faq.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="text-gray-400 light:!text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditingFaq(faq)}
                  className="w-8 h-8 rounded-lg bg-white/5 light:!bg-white hover:bg-white/10 light:hover:!bg-gray-200 flex items-center justify-center text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget(faq)}
                  className="w-8 h-8 rounded-lg bg-white/5 light:!bg-white hover:bg-red-500/10 flex items-center justify-center text-gray-400 light:!text-gray-600 hover:text-red-400 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(isCreating || editingFaq) && (
        <FaqForm
          faq={editingFaq}
          onClose={() => {
            setIsCreating(false);
            setEditingFaq(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-[#0d0d14] light:!bg-white border border-white/10 light:!border-gray-200 rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-white light:!text-gray-900 font-bold mb-2">Delete FAQ</h3>
            <p className="text-gray-400 light:!text-gray-600 text-sm mb-6">
              Are you sure you want to delete this FAQ? This can't be undone.
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

export default FaqTable;