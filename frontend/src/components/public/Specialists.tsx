import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useDoctors } from "../../hooks/useDoctors";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const Specialists = () => {
  const { data: doctors, isLoading, isError } = useDoctors();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#0a0a0f] light:!bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Expert Care You Can Trust
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight"
        >
          <span className="text-white light:!text-gray-900">Our</span>{" "}
          <span className="text-indigo-400">Specialists</span>
        </motion.h2>
        <p className="text-gray-400 light:!text-gray-600 text-sm max-w-xl mx-auto mt-4">
          We bring together talented medical experts focused on providing personalized
          and quality patient care.
        </p>

        {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm mt-12">Loading specialists...</p>}
        {isError && (
          <p className="text-red-400 text-sm mt-12">Couldn't load specialists right now.</p>
        )}

        {doctors && doctors.length > 0 && (
          <>
            <motion.div
              ref={scrollRef}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex gap-5 overflow-x-auto mt-12 pb-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {doctors.map((doctor) => (
                <Link key={doctor.id} to={`/doctors/${doctor.id}`} className="shrink-0 snap-start">
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative w-72 h-80 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-indigo-500/40 rounded-2xl transition-all duration-300" />

                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <h3 className="text-white font-semibold transition-transform duration-300 group-hover:-translate-y-1">
                        {doctor.name}
                      </h3>
                      <p className="text-indigo-300 text-xs mt-0.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        {doctor.specialty}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors"
                aria-label="Previous specialists"
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors"
                aria-label="Next specialists"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="mt-8">
              <Link
                to="/doctors"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold pl-6 pr-2 py-2 rounded-full transition-colors shadow-md shadow-blue-600/20"
              >
                View All Doctors
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </>
        )}

        {doctors && doctors.length === 0 && (
          <p className="text-gray-500 light:!text-gray-600 text-sm mt-12">No specialists listed yet.</p>
        )}
      </div>
    </section>
  );
};

export default Specialists;