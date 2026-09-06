import { Plus, Sparkles, Layers, BedDouble, Clock } from "lucide-react";

const badges = [
  {
    icon: Sparkles,
    title: "Trusted Expertise",
    description: "Experienced doctors delivering trusted care.",
  },
  {
    icon: Layers,
    title: "Comprehensive Care",
    description: "Complete care for every stage.",
  },
  {
    icon: BedDouble,
    title: "Patient-Centered",
    description: "Personalized care focused on you.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Medical support whenever you need.",
  },
];

const TrustBadges = () => {
  return (
    <section className="bg-[#0a0a0f] px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Why Patients Trust Us
        </span>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-12">
          <span className="text-white">Trusted Care, Every</span>
          <br />
          <span className="text-indigo-400">Step of the Way</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-8 flex flex-col items-center hover:border-indigo-500/40 hover:bg-white/[0.05] transition-colors"
              >
                <Icon className="w-8 h-8 text-indigo-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-white font-semibold text-sm">{badge.title}</h3>
                <span className="block w-6 h-[2px] bg-indigo-500 rounded-full my-2.5" />
                <p className="text-gray-400 text-xs leading-relaxed text-center">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;