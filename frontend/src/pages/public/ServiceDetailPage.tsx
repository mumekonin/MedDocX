import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Clock, HeartPulse, Brain,
  Stethoscope, Baby, Bone, CheckCircle2, CalendarCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { useService, useServices } from "../../hooks/useServices";

const iconMap: Record<string, typeof Clock> = {
  clock: Clock,
  heart: HeartPulse,
  brain: Brain,
  stethoscope: Stethoscope,
  baby: Baby,
  bone: Bone,
};

const highlights = [
  "Board-certified specialists",
  "Modern diagnostic equipment",
  "Personalized treatment plans",
  "Ongoing follow-up care",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const MotionLink = motion.create(Link);

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, isError } = useService(id ?? "");
  const { data: allServices } = useServices();

  const Icon = service ? iconMap[service.icon] ?? Stethoscope : Stethoscope;
  const relatedServices = allServices?.filter((s) => s.id !== id).slice(0, 3) ?? [];

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] light:!bg-white min-h-screen">
        {isLoading && (
          <p className="text-gray-500 light:!text-gray-600 text-sm text-center py-24">Loading service...</p>
        )}

        {isError && (
          <p className="text-red-400 text-sm text-center py-24">
            Couldn't find that service. It may have been removed.
          </p>
        )}

        {service && (
          <>
            {/* Hero banner */}
            <section className="relative px-6 pt-14 pb-20 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 text-sm mb-8 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to all services
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
                  className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Icon className="w-8 h-8 text-indigo-400" strokeWidth={1.5} />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
                  className="text-3xl md:text-5xl font-bold text-white light:!text-gray-900 leading-tight"
                >
                  {service.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
                  className="text-gray-400 light:!text-gray-600 text-sm md:text-base max-w-xl mx-auto mt-5 leading-relaxed"
                >
                  {service.shortDescription}
                </motion.p>
              </div>
            </section>

            {/* Main content */}
            <section className="px-6 pb-20">
              <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                  className="md:col-span-2"
                >
                  <h2 className="text-white light:!text-gray-900 font-bold text-xl mb-4">Overview</h2>
                  <p className="text-gray-400 light:!text-gray-600 leading-relaxed">{service.fullDescription}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.4 }}
                  className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 h-fit"
                >
                  <h3 className="text-white light:!text-gray-900 font-semibold text-sm mb-4">What's Included</h3>
                  <ul className="space-y-3 mb-6">
                    {highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-gray-400 light:!text-gray-600 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/#contact"
                      className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors shadow-md shadow-blue-600/20"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Book Appointment
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Related services */}
            {relatedServices.length > 0 && (
              <section className="px-6 pb-24 border-t border-white/10 light:!border-gray-200 pt-16">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-white light:!text-gray-900 font-bold text-2xl mb-8 text-center">
                    Related Services
                  </h2>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-3 gap-6"
                  >
                    {relatedServices.map((related) => {
                      const RelatedIcon = iconMap[related.icon] ?? Stethoscope;
                      return (
                        <MotionLink
                          key={related.id}
                          to={`/services/${related.id}`}
                          variants={cardVariants}
                          whileHover={{ y: -8 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 hover:border-indigo-500/40 transition-colors group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                            <RelatedIcon className="w-6 h-6 text-indigo-400" strokeWidth={1.5} />
                          </div>
                          <h3 className="text-white light:!text-gray-900 font-semibold mb-2">{related.title}</h3>
                          <p className="text-gray-400 light:!text-gray-600 text-sm leading-relaxed mb-4">
                            {related.shortDescription}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                            Read More <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </MotionLink>
                      );
                    })}
                  </motion.div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
