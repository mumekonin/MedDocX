import { Plus, ArrowUpRight, ShieldCheck, Stethoscope, Brain, Clock } from "lucide-react";
import { useSiteStats } from "../../hooks/useSiteStats";
import nurseImage from "../../assets/secondDoctor.avif";
const About = () => {
  const { data: stats } = useSiteStats();

  const statCards = [
    {
      icon: Stethoscope,
      value: stats?.patientsCount,
      label: "Patients Served",
      style: "bg-white/5 border border-white/10 text-white",
    },
    {
      icon: Brain,
      value: stats?.doctorsCount,
      label: "Skilled Doctors",
      style: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white",
    },
    {
      icon: Clock,
      value: stats?.emergencyCareLabel,
      label: "Emergency Care",
      style: "bg-[#0d1428] border border-white/10 text-white",
    },
  ];

  return (
    <section id="about" className="bg-[#0a0a0f] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        {/* Image column */}
        <div className="relative">
          <div className="relative h-full min-h-[520px] rounded-2xl overflow-hidden">
            <img
              src={nurseImage}
              alt="Healthcare professional"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Floating caption card - overlaps bottom edge of the image */}
          <div className="absolute -bottom-6 left-6 right-10 bg-[#12121a] border border-white/10 rounded-xl p-4 flex items-start gap-3 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-indigo-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Trusted care, always.</p>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                Compassionate care you can trust, every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col justify-center pt-6 md:pt-0">
          <span className="inline-flex items-center gap-1.5 w-fit bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4">
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            About Us
          </span>

          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            <span className="text-white">Compassionate Care.</span>
            <br />
            <span className="text-indigo-400">Trusted Experts.</span>
          </h2>

          <p className="text-gray-400 mt-4 text-sm max-w-md">
            At MedDocx, we deliver expert healthcare services with advanced technology
            and compassionate patient care.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className={`rounded-2xl p-5 h-44 flex flex-col justify-between ${card.style}`}
                >
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                  <div>
                    <div className="font-bold text-2xl">{card.value ?? "—"}</div>
                    <div className="text-xs opacity-80 mt-1">{card.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-medium pl-6 pr-2 py-2 rounded-full transition-colors w-fit shadow-md shadow-blue-600/20">
            Learn More
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;