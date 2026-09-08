import { Plus, ArrowUpRight, ShieldCheck, Stethoscope, Brain, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteStats } from "../../hooks/useSiteStats";
import nurseImage from "../../assets/secondDoctor.avif";
import { Link } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const About = () => {
  const { data: stats } = useSiteStats();

  const statCards = [
    {
      icon: Stethoscope,
      value: stats?.patientsCount,
      label: "Patients Served",
      style: "bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-white light:!text-gray-900",
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
      style: "bg-[#0d1428] light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-white light:!text-gray-900",
    },
  ];

  return (
    <section id="about" className="bg-[#0a0a0f] light:!bg-white px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
        {/* Image column */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative h-full min-h-[520px] rounded-2xl overflow-hidden"
          >
            <img
              src={nurseImage}
              alt="Healthcare professional"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          {/* Floating caption card - overlaps bottom edge of the image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="absolute -bottom-6 left-6 right-10 bg-[#12121a] light:!bg-white border border-white/10 light:!border-gray-200 rounded-xl p-4 flex items-start gap-3 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-indigo-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-white light:!text-gray-900 text-sm font-semibold">Trusted care, always.</p>
              <p className="text-gray-400 light:!text-gray-600 text-xs mt-1 leading-relaxed">
                Compassionate care you can trust, every step of the way.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content column */}
        <div className="flex flex-col justify-center pt-6 md:pt-0">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 w-fit bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            About Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold leading-tight"
          >
            <span className="text-white light:!text-gray-900">Compassionate Care.</span>
            <br />
            <span className="text-indigo-400">Trusted Experts.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-gray-400 light:!text-gray-600 mt-4 text-sm max-w-md"
          >
            At MedDocx, we deliver expert healthcare services with advanced technology
            and compassionate patient care.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-3 gap-4 mt-8"
          >
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-2xl p-5 h-44 flex flex-col justify-between ${card.style}`}
                >
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                  <div>
                    <div className="font-bold text-2xl">{card.value ?? "—"}</div>
                    <div className="text-xs opacity-80 mt-1">{card.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} className="w-fit">
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-medium pl-6 pr-2 py-2 rounded-full transition-colors w-fit shadow-md shadow-blue-600/20"
          >
            Learn More
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
          </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;