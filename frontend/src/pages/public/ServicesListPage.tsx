import { Link } from "react-router-dom";
import { ArrowLeft, Clock, HeartPulse, Brain, Stethoscope, Baby, Bone, ArrowRight } from "lucide-react";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { useServices } from "../../hooks/useServices";

const iconMap: Record<string, typeof Clock> = {
  clock: Clock,
  heart: HeartPulse,
  brain: Brain,
  stethoscope: Stethoscope,
  baby: Baby,
  bone: Bone,
};

const ServicesListPage = () => {
  const { data: services, isLoading, isError } = useServices();

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] min-h-screen">
        <section className="px-6 py-16 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            All <span className="text-indigo-400">Healthcare Services</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-4">
            Explore the full range of specialties and care programs MedDocx offers.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20">
          {isLoading && <p className="text-gray-500 text-sm text-center">Loading services...</p>}
          {isError && (
            <p className="text-red-400 text-sm text-center">
              Couldn't load services right now. Please try again later.
            </p>
          )}

          {services && (
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = iconMap[service.icon] ?? Stethoscope;
                return (
                  <div
                    key={service.id}
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 flex flex-col h-full hover:border-indigo-500/40 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-indigo-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                      {service.shortDescription}
                    </p>
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-semibold hover:gap-2.5 transition-all w-fit"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesListPage;