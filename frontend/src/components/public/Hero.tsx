import doctorImage from "../../assets/doctor.avif";
import { Users, ArrowUpRight } from "lucide-react";
import { useSiteStats } from "../../hooks/useSiteStats";
import { useDoctors } from "../../hooks/useDoctors";

const Hero = () => {
  const { data: stats } = useSiteStats();
  const { data: doctors } = useDoctors();

  const avatarPreview = doctors?.slice(0, 4) ?? [];

  return (
    <section className="relative bg-[#0a0a0f] overflow-hidden min-h-[640px] flex items-center">
      {/* Watermark text, centered behind everything */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[9rem] md:text-[12rem] font-black text-white/[0.04] tracking-wide leading-none whitespace-nowrap">
          MEDDOCX
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 relative w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left column - text content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-white">Your Trusted</span>
            <br />
            <span className="text-blue-500">Healthcare</span>
            <br />
            <span className="text-blue-500">Partner</span>
          </h1>

          <p className="text-gray-400 mt-5 max-w-sm text-sm">
            Connecting patients with trusted doctors, hospitals, and personalized healthcare.
          </p>

          <button className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-medium pl-6 pr-2 py-2 rounded-full transition-colors shadow-md shadow-blue-600/20">
            Book Appointment
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
        <div className="relative z-10 flex items-center justify-center h-[440px] md:h-[480px] w-full">
          <img
            src={doctorImage}
            alt="Doctor"
            className="h-full w-auto max-w-full object-contain mx-auto"
          />

          {/* Patients badge */}
          {stats && (
            <div className="absolute top-2 right-2 md:right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-4.5 h-4.5 text-blue-600" strokeWidth={2} />
              </div>
              <div>
                <div className="text-[#0a0a0f] font-bold text-lg leading-none">
                  {stats.patientsCount}
                </div>
                <div className="text-gray-500 text-xs mt-1">Satisfied Patients</div>
              </div>
            </div>
          )}

          {/* Avatars + rating */}
          <div className="absolute bottom-2 right-2 md:right-6 flex flex-col items-end gap-2">
            {avatarPreview.length > 0 && (
              <div className="flex -space-x-3">
                {avatarPreview.map((doctor) => (
                  <img
                    key={doctor.id}
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="w-11 h-11 rounded-full border-2 border-[#0a0a0f] object-cover"
                  />
                ))}
              </div>
            )}
            <div className="text-yellow-400 text-lg tracking-tight">★★★★★</div>
          </div>
        </div>ፍ
      </div>
    </section>
  );
};

export default Hero;