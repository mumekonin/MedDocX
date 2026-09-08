import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { useDoctors } from "../../hooks/useDoctors";

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

const DoctorsListPage = () => {
  const { data: doctors, isLoading, isError } = useDoctors();

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] light:!bg-white min-h-screen">
        <section className="px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white light:!text-gray-900"
          >
            Meet Our <span className="text-indigo-400">Specialists</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-gray-400 light:!text-gray-600 text-sm max-w-xl mx-auto mt-4"
          >
            Experienced doctors dedicated to providing personalized, quality care.
          </motion.p>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-24">
          {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm text-center">Loading doctors...</p>}
          {isError && (
            <p className="text-red-400 text-sm text-center">Couldn't load doctors right now.</p>
          )}
          {doctors && doctors.length === 0 && (
            <p className="text-gray-500 light:!text-gray-600 text-sm text-center">No doctors listed yet.</p>
          )}

          {doctors && doctors.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {doctors.map((doctor) => (
                <MotionLink
                  key={doctor.id}
                  to={`/doctors/${doctor.id}`}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-colors"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white light:!text-gray-900 font-semibold">{doctor.name}</h3>
                    <p className="text-indigo-400 text-xs mt-0.5 mb-3">{doctor.specialty}</p>
                    {doctor.bio && (
                      <p className="text-gray-400 light:!text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {doctor.bio}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                      View Profile <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </MotionLink>
              ))}
            </motion.div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorsListPage;
