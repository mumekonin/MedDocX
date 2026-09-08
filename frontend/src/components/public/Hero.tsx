import doctorImage from "../../assets/doctor.avif";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteStats } from "../../hooks/useSiteStats";
import { useDoctors } from "../../hooks/useDoctors";
import { useBookingModal } from "../../context/BookingModalContext";
import {  ArrowRight } from "lucide-react";

const Hero = () => {
  const { data: stats } = useSiteStats();
  const { data: doctors } = useDoctors();
  const { openModal } = useBookingModal();

  const avatarPreview = doctors?.slice(0, 4) ?? [];

  return (
    <section className="relative bg-[#0a0a0f] light:!bg-white overflow-hidden min-h-[600px] flex items-center">
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span
          style={{
            fontSize: "clamp(6rem, 22vw, 20rem)",
            letterSpacing: "-0.02em",
          }}
          className="font-black text-white/[0.07] light:text-gray-900/[0.06] leading-none whitespace-nowrap"
        >
          MedDocx
        </span>
      </motion.div>

      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10">
        <motion.img
          src={doctorImage}
          alt="Doctor"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-[90%] max-h-[540px] w-auto object-contain object-bottom"
        />
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 items-center" style={{ minHeight: "520px" }}>

          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              <span className="text-white light:!text-gray-900">Your Trusted</span>
              <br />
              <span className="text-blue-500">Healthcare</span>
              <br />
              <span className="text-blue-500">Partner</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="text-gray-400 light:!text-gray-600 mt-5 max-w-xs text-sm leading-relaxed"
            >
              Connecting patients with trusted doctors, hospitals, and personalized healthcare.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="mt-8 w-fit inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-medium pl-6 pr-3 py-2.5 rounded-full shadow-lg shadow-blue-600/30"
            >
              Book Appointment
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </span>
            </motion.button>
          </div>

          {/* RIGHT: floating badges */}
          <div className="relative flex flex-col justify-between py-6" style={{ minHeight: "480px" }}>

            {/* Top-right: Patients badge (white card) */}
            <div className="flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-gray-900 font-extrabold text-lg leading-none">
                    {stats?.patientsCount ?? "3,000+"}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">Satisfied Patients</div>
                </div>
              </motion.div>
            </div>

            {/* Bottom-right: overlapping avatars + stars + "24/7 Medical Support" */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }}
              className="flex flex-col items-end gap-2 pb-2"
            >
              {/* Overlapping doctor avatars */}
              <div className="flex -space-x-3">
                {avatarPreview.length > 0 ? (
                  avatarPreview.map((doctor, i) => (
                    <motion.img
                      key={doctor.id}
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.65 + i * 0.08 }}
                      className="w-12 h-12 rounded-full border-2 border-[#0a0a0f] light:!border-white object-cover"
                    />
                  ))
                ) : (
                  /* Placeholder colored circles while data loads */
                  ["bg-blue-400", "bg-indigo-400", "bg-purple-400", "bg-pink-400"].map((color, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-full border-2 border-[#0a0a0f] light:!border-white ${color}`}
                    />
                  ))
                )}
              </div>

              {/* Gold stars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex gap-0.5"
              >
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-xl leading-none">★</span>
                ))}
              </motion.div>

              {/* 24/7 Medical Support label */}
              <p className="text-white light:!text-gray-900 font-bold text-sm tracking-wide">
                24/7 <span className="text-blue-500">Medical</span> Support
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;