import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { faqSchema, type FaqFormValues } from "../../../schemas/faq.schema";
import { useCreateFaq, useUpdateFaq } from "../../../hooks/useFaqs";
import type { Faq } from "../../../api/faqs.api";

interface FaqFormProps {
  faq: Faq | null;
  onClose: () => void;
}

const FaqForm = ({ faq, onClose }: FaqFormProps) => {
  const isEditing = !!faq;
  const { mutate: create, isPending: isCreating, isError: createError } = useCreateFaq();
  const { mutate: update, isPending: isUpdating, isError: updateError } = useUpdateFaq();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
      isActive: faq?.isActive ?? true,
    },
  });

  useEffect(() => {
    reset({
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
      isActive: faq?.isActive ?? true,
    });
  }, [faq, reset]);

  const isPending = isCreating || isUpdating;
  const isError = createError || updateError;

  const onSubmit = (values: FaqFormValues) => {
    if (isEditing) {
      update({ id: faq.id, input: values }, { onSuccess: onClose });
    } else {
      create(values, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0d0d14] light:!bg-white border border-white/10 light:!border-gray-200 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7">
          <h3 className="text-white light:!text-gray-900 font-bold text-lg mb-6">
            {isEditing ? "Edit FAQ" : "Add New FAQ"}
          </h3>

          {isError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
              Something went wrong. Please check the form and try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Question</label>
              <input
                {...register("question")}
                className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                placeholder="How can I book an appointment?"
              />
              {errors.question && (
                <p className="text-red-400 text-xs mt-1">{errors.question.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Answer</label>
              <textarea
                {...register("answer")}
                rows={4}
                className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 resize-none"
                placeholder="You can easily book an appointment online through our website..."
              />
              {errors.answer && <p className="text-red-400 text-xs mt-1">{errors.answer.message}</p>}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 rounded accent-indigo-500"
              />
              <span className="text-gray-300 light:!text-gray-600 text-sm">Visible on public site</span>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add FAQ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FaqForm;