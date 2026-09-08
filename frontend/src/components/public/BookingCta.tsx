import { Plus, ArrowUpRight, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { useBookingModal } from "../../context/BookingModalContext";

const BookingCta = () => {
  const { openModal } = useBookingModal();
  return (
    <section className="bg-[#0a0a0f] light:!bg-white px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-9 text-center"
      >
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#0a0a0f] light:!bg-white text-indigo-300 light:!text-indigo-600 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-4">
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            Book Now
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Ready to Schedule Your Visit?
          </h2>
          <p className="text-blue-100 text-sm max-w-lg mx-auto mt-2.5 leading-relaxed">
            Schedule your appointment today and receive compassionate care from
            experienced healthcare professionals.
          </p>

          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-px w-16 bg-white/25" />
            <HeartPulse className="w-4 h-4 text-white/70" strokeWidth={1.5} />
            <span className="h-px w-16 bg-white/25" />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="inline-flex items-center gap-3 bg-[#0a0a0f] light:!bg-white light:!text-gray-900 hover:bg-[#15151f] light:hover:!bg-gray-100 text-white text-sm font-medium pl-5 pr-1.5 py-1.5 rounded-full transition-colors"
          >
            Book Appointment
            <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default BookingCta;
