import { Award, Layers, HeartPulse, Clock } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "Trusted Expertise",
    description: "Experienced doctors delivering trusted care.",
  },
  {
    icon: Layers,
    title: "Comprehensive Care",
    description: "Complete care for every stage.",
  },
  {
    icon: HeartPulse,
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
    <section className="bg-[#0a0a0f] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-indigo-400 text-xs font-semibold uppercase tracking-wide mb-3">
            ◆ Why Patients Trust Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Trusted Care, Every{" "}
            <span className="text-indigo-400">Step of the Way</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" strokeWidth={1.75} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{badge.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;