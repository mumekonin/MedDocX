import { Clock, HeartPulse, Brain, Stethoscope, Baby, Bone, ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useServices } from "../../hooks/useServices";
import world from "../../assets/neuralpony.png";
import { Link } from "react-router-dom";
const iconMap: Record<string, typeof Clock> = {
  clock: Clock,
  heart: HeartPulse,
  brain: Brain,
  stethoscope: Stethoscope,
  baby: Baby,
  bone: Bone,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const Services = () => {
  const { data: services, isLoading, isError } = useServices();

  return (
    <section id="services" className="relative bg-[#0a0a0f] light:!bg-white px-6 py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: `url('${world}')` }}
      />


      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Medical Services
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight"
        >
          <span className="text-white light:!text-gray-900">Comprehensive</span>
          <br />
          <span className="text-indigo-400">Healthcare Services</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="text-gray-400 light:!text-gray-600 text-sm max-w-xl mx-auto mt-5 leading-relaxed"
        >
          MedDocx offers a broad spectrum of healthcare services designed to meet all
          your medical needs. Our multi-specialty approach ensures seamless, coordinated
          care from trusted doctors and hospital experts.
        </motion.p>

        {isLoading && (
          <p className="text-gray-500 light:!text-gray-600 text-sm mt-12">Loading services...</p>
        )}

        {isError && (
          <p className="text-red-400 text-sm mt-12">
            Couldn't load services right now. Please try again later.
          </p>
        )}

        {services && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-12 text-left"
          >
            {services.slice(0, 3).map((service) => {
              const Icon = iconMap[service.icon] ?? Stethoscope;
              return (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-7 flex flex-col h-full hover:border-indigo-500/40 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-indigo-400" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-white light:!text-gray-900 font-bold text-xl mb-3">{service.title}</h3>

                  <p className="text-gray-400 light:!text-gray-600 text-sm leading-relaxed mb-8 flex-1">
                    {service.shortDescription}
                  </p>


                  <Link to={`/services/${service.id}`} className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-semibold hover:gap-2.5 transition-all w-fit"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} className="inline-flex">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold pl-6 pr-2 py-2 rounded-full transition-colors shadow-md shadow-blue-600/20"
          >
            View All Services
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
