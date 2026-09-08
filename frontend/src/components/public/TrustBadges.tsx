import { Plus, Sparkles, Layers, BedDouble, Clock } from "lucide-react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const TrustBadges = () => {
  return (
    <section className="bg-[#0a0a0f] light:!bg-white px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Why Patients Trust Us
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight mb-12"
        >
          <span className="text-white light:!text-gray-900">Trusted Care, Every</span>
          <br />
          <span className="text-indigo-400">Step of the Way</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl px-6 py-8 flex flex-col items-center hover:border-indigo-500/40 light:hover:!border-indigo-400 light:hover:!bg-gray-200 hover:bg-white/[0.05] transition-colors"
              >
                <Icon className="w-8 h-8 text-indigo-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-white light:!text-gray-900 font-semibold text-sm">{badge.title}</h3>
                <span className="block w-6 h-[2px] bg-indigo-500 rounded-full my-2.5" />
                <p className="text-gray-400 light:!text-gray-600 text-xs leading-relaxed text-center">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
