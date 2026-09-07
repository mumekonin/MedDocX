import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { doctorSchema, type DoctorFormValues } from "../../../schemas/doctor.schema";
import { useCreateDoctor, useUpdateDoctor } from "../../../hooks/useDoctors";
import type { Doctor } from "../../../api/doctors.api";

interface DoctorFormProps {
  doctor: Doctor | null; // null = creating, Doctor = editing
  onClose: () => void;
}

const DoctorForm = ({ doctor, onClose }: DoctorFormProps) => {
  const isEditing = !!doctor;
  const { mutate: create, isPending: isCreating, isError: createError } = useCreateDoctor();
  const { mutate: update, isPending: isUpdating, isError: updateError } = useUpdateDoctor();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: doctor?.name ?? "",
      specialty: doctor?.specialty ?? "",
      bio: doctor?.bio ?? "",
      isActive: doctor?.isActive ?? true,
    },
  });

  useEffect(() => {
    reset({
      name: doctor?.name ?? "",
      specialty: doctor?.specialty ?? "",
      bio: doctor?.bio ?? "",
      isActive: doctor?.isActive ?? true,
    });
  }, [doctor, reset]);

  const isPending = isCreating || isUpdating;
  const isError = createError || updateError;

  const onSubmit = (values: DoctorFormValues) => {
    if (isEditing) {
      update({ id: doctor.id, input: values }, { onSuccess: onClose });
    } else {
      create(values, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7">
          <h3 className="text-white font-bold text-lg mb-6">
            {isEditing ? "Edit Doctor" : "Add New Doctor"}
          </h3>

          {isError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
              Something went wrong. Please check the form and try again.
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Name</label>
              <input
                {...register("name")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
                placeholder="Dr. Olivia Laurent"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Specialty</label>
              <input
                {...register("specialty")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
                placeholder="Neurologist"
              />
              {errors.specialty && (
                <p className="text-red-400 text-xs mt-1">{errors.specialty.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">
                Bio (optional)
              </label>
              <textarea
                {...register("bio")}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none"
                placeholder="Short professional bio..."
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">
                Photo {isEditing ? "(leave empty to keep current)" : ""}
              </label>
              {isEditing && doctor.photoUrl && (
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-lg object-cover mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500/10 file:text-indigo-400 file:text-sm hover:file:bg-indigo-500/20 file:cursor-pointer cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 rounded accent-indigo-500"
              />
              <span className="text-gray-300 text-sm">Visible on public site</span>
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Doctor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorForm;