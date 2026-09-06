import { Clock, HeartPulse, Brain, Stethoscope, Baby, Bone, ArrowRight } from "lucide-react";
import { useServices } from "../../hooks/useServices";

const iconMap: Record<string, typeof Clock> = {
  clock: Clock,
  heart: HeartPulse,
  brain: Brain,
  stethoscope: Stethoscope,
  baby: Baby,
  bone: Bone,
};

const Services = () => {
  const { data: services, isLoading, isError } = useServices();

  return (
    <section id="services" className="relative bg-[#0a0a0f] px-6 py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-indigo-400 text-xs font-semibold uppercase tracking-wide mb-3">
            ◆ Medical Services
          </span>
          <h2 className="inline-block text-3xl md:text-4xl font-bold text-white leading-tight border border-indigo-500/40 rounded-xl px-6 py-3">
            Comprehensive{" "}
            <span className="text-indigo-400">Healthcare Services</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-5">
            MedDocx offers a broad spectrum of healthcare services designed to meet all
            your needs. Our multi-specialty approach ensures complete care from prevention to treatment.
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-gray-500 text-sm">Loading services...</p>
        )}

        {isError && (
          <p className="text-center text-red-400 text-sm">
            Couldn't load services right now. Please try again later.
          </p>
        )}

        {services && (
          <div className="grid md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => {
              const Icon = iconMap[service.icon] ?? Stethoscope;
              return (
                <div
                  key={service.id}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/20 to-blue-600/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-indigo-400" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  
                 <a   href={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium hover:gap-2.5 transition-all"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-10">
          
          <a  href="/services"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors shadow-md shadow-blue-600/20"
          >
            View All Services ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;