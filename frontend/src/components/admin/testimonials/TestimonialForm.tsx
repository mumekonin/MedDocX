import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { testimonialSchema, type TestimonialFormValues } from "../../../schemas/testimonial.schema";
import { useCreateTestimonial, useUpdateTestimonial } from "../../../hooks/useTestimonials";
import type { Testimonial } from "../../../api/testimonials.api";

interface TestimonialFormProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const TestimonialForm = ({ testimonial, onClose }: TestimonialFormProps) => {
  const isEditing = !!testimonial;
  const { mutate: create, isPending: isCreating, isError: createError } = useCreateTestimonial();
  const { mutate: update, isPending: isUpdating, isError: updateError } = useUpdateTestimonial();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      patientName: testimonial?.patientName ?? "",
      role: testimonial?.role ?? "Patient",
      message: testimonial?.message ?? "",
      isActive: testimonial?.isActive ?? true,
    },
  });

  useEffect(() => {
    reset({
      patientName: testimonial?.patientName ?? "",
      role: testimonial?.role ?? "Patient",
      message: testimonial?.message ?? "",
      isActive: testimonial?.isActive ?? true,
    });
  }, [testimonial, reset]);

  const isPending = isCreating || isUpdating;
  const isError = createError || updateError;

  const onSubmit = (values: TestimonialFormValues) => {
    if (isEditing) {
      update({ id: testimonial.id, input: values }, { onSuccess: onClose });
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
            {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
          </h3>

          {isError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
              Something went wrong. Please check the form and try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Name</label>
                <input
                  {...register("patientName")}
                  className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                  placeholder="Sue Parker"
                />
                {errors.patientName && (
                  <p className="text-red-400 text-xs mt-1">{errors.patientName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Role</label>
                <select
                  {...register("role")}
                  className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                >
                  <option value="Patient">Patient</option>
                  <option value="Visitor">Visitor</option>
                </select>
                {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">Message</label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 resize-none"
                placeholder="What did they say about their experience?"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <div>
              <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                Photo {isEditing ? "(leave empty to keep current)" : ""}
              </label>
              {isEditing && testimonial.avatarUrl && (
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.patientName}
                  className="w-16 h-16 rounded-full object-cover mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                className="w-full text-sm text-gray-400 light:!text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500/10 file:text-indigo-400 file:text-sm hover:file:bg-indigo-500/20 file:cursor-pointer cursor-pointer"
              />
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
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Testimonial"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;