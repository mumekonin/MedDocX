import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CalendarCheck, CheckCircle2 } from "lucide-react";
import { appointmentSchema, type AppointmentFormValues } from "../../schemas/appointment.schema";
import { useCreateAppointment } from "../../hooks/useAppointments";
import { useDoctors } from "../../hooks/useDoctors";
import { useBookingModal } from "../../context/BookingModalContext";
import { useState } from "react";

const BookingModal = () => {
  const { isOpen, closeModal } = useBookingModal();
  const { data: doctors } = useDoctors();
  const { mutate, isPending, isError } = useCreateAppointment();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
  });

  if (!isOpen) return null;

  const onSubmit = (values: AppointmentFormValues) => {
    mutate(values, {
      onSuccess: () => {
        setIsSuccess(true);
        reset();
      },
    });
  };

  const handleClose = () => {
    setIsSuccess(false);
    reset();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-[#0d0d14] light:!bg-white border border-white/10 light:!border-gray-200 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7">
          {isSuccess ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white light:!text-gray-900 font-bold text-lg mb-2">Request Received</h3>
              <p className="text-gray-400 light:!text-gray-600 text-sm">
                We've received your appointment request and will confirm it shortly by email.
              </p>
              <button
                onClick={handleClose}
                className="mt-6 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <CalendarCheck className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white light:!text-gray-900 font-bold text-lg">Book an Appointment</h3>
                  <p className="text-gray-500 light:!text-gray-600 text-xs">We'll confirm by email shortly.</p>
                </div>
              </div>

              {isError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5 mb-4">
                  Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Honeypot field — hidden from real users */}
                <input
                  type="text"
                  {...register("website")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                    Full Name
                  </label>
                  <input
                    {...register("patientName")}
                    className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                    placeholder="John Doe"
                  />
                  {errors.patientName && (
                    <p className="text-red-400 text-xs mt-1">{errors.patientName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                      placeholder="+251912345678"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                    Preferred Doctor (optional)
                  </label>
                  <select
                    {...register("preferredDoctor")}
                    className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                  >
                    <option value="">No preference</option>
                    {doctors?.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} — {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      {...register("preferredDate")}
                      className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                    />
                    {errors.preferredDate && (
                      <p className="text-red-400 text-xs mt-1">{errors.preferredDate.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      {...register("preferredTime")}
                      className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 focus:outline-none focus:border-indigo-500/50"
                    />
                    {errors.preferredTime && (
                      <p className="text-red-400 text-xs mt-1">{errors.preferredTime.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                    Reason for Visit (optional)
                  </label>
                  <textarea
                    {...register("reason")}
                    rows={3}
                    className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 resize-none"
                    placeholder="Briefly describe your concern..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
                >
                  {isPending ? "Submitting..." : "Request Appointment"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;