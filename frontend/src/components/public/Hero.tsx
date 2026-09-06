import doctorImage from "../../assets/doctor.avif";
import { Users } from "lucide-react";
import { useSiteStats } from "../../hooks/useSiteStats";
import { useDoctors } from "../../hooks/useDoctors";
import { useBookingModal } from "../../context/BookingModalContext";

const Hero = () => {
  const { data: stats } = useSiteStats();
  const { data: doctors } = useDoctors();
  const { openModal } = useBookingModal();

  const avatarPreview = doctors?.slice(0, 4) ?? [];

  return (
    <section className="relative bg-[#0a0a0f] overflow-hidden min-h-[600px] flex items-center">

      {/* ── Large "MedDocx" watermark spanning full width ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span
          style={{
            fontSize: "clamp(6rem, 22vw, 20rem)",
            letterSpacing: "-0.02em",
          }}
          className="font-black text-white/[0.07] leading-none whitespace-nowrap"
        >
          MedDocx
        </span>
      </div>

      {/* ── Doctor image: absolutely centered in the section ── */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10">
        <img
          src={doctorImage}
          alt="Doctor"
          className="h-[90%] max-h-[540px] w-auto object-contain object-bottom"
        />
      </div>

      {/* ── Content grid laid on top ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 items-center" style={{ minHeight: "520px" }}>

          {/* LEFT: heading, sub-text, button */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="text-white">Your Trusted</span>
              <br />
              <span className="text-blue-500">Healthcare</span>
              <br />
              <span className="text-blue-500">Partner</span>
            </h1>

            <p className="text-gray-400 mt-5 max-w-xs text-sm leading-relaxed">
              Connecting patients with trusted doctors, hospitals, and personalized healthcare.
            </p>

            <button onClick={openModal} className="mt-8 w-fit inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium pl-6 pr-3 py-2.5 rounded-full transition-all duration-200 shadow-lg shadow-blue-600/30">
              Book Appointment
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                ↗
              </span>
            </button>
          </div>

          {/* RIGHT: floating badges */}
          <div className="relative flex flex-col justify-between py-6" style={{ minHeight: "480px" }}>

            {/* Top-right: Patients badge (white card) */}
            <div className="flex justify-end">
              <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-600" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-gray-900 font-extrabold text-lg leading-none">
                    {stats?.patientsCount ?? "3,000+"}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">Satisfied Patients</div>
                </div>
              </div>
            </div>

            {/* Bottom-right: overlapping avatars + stars + "24/7 Medical Support" */}
            <div className="flex flex-col items-end gap-2 pb-2">
              {/* Overlapping doctor avatars */}
              <div className="flex -space-x-3">
                {avatarPreview.length > 0 ? (
                  avatarPreview.map((doctor) => (
                    <img
                      key={doctor.id}
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full border-2 border-[#0a0a0f] object-cover"
                    />
                  ))
                ) : (
                  /* Placeholder colored circles while data loads */
                  ["bg-blue-400", "bg-indigo-400", "bg-purple-400", "bg-pink-400"].map((color, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-full border-2 border-[#0a0a0f] ${color}`}
                    />
                  ))
                )}
              </div>

              {/* Gold stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-xl leading-none">★</span>
                ))}
              </div>

              {/* 24/7 Medical Support label */}
              <p className="text-white font-bold text-sm tracking-wide">
                24/7 <span className="text-blue-500">Medical</span> Support
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;