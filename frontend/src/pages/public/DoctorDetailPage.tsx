import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Stethoscope, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { useDoctor, useDoctors } from "../../hooks/useDoctors";
import { useBookingModal } from "../../context/BookingModalContext";

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

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: doctor, isLoading, isError } = useDoctor(id ?? "");
  const { data: allDoctors } = useDoctors();
  const { openModal } = useBookingModal();

  const otherDoctors = allDoctors?.filter((d) => d.id !== id).slice(0, 3) ?? [];

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] light:!bg-white min-h-screen">
        {isLoading && (
          <p className="text-gray-500 light:!text-gray-600 text-sm text-center py-24">Loading doctor profile...</p>
        )}
        {isError && (
          <p className="text-red-400 text-sm text-center py-24">
            Couldn't find that doctor. They may no longer be listed.
          </p>
        )}

        {doctor && (
          <>
            <section className="px-6 pt-14 pb-16">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    to="/doctors"
                    className="inline-flex items-center gap-1.5 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 text-sm mb-8 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to all doctors
                  </Link>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="rounded-2xl overflow-hidden h-72 md:h-full"
                  >
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
                    className="md:col-span-2 flex flex-col justify-center"
                  >
                    <span className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 text-xs font-semibold w-fit px-3 py-1.5 rounded-full mb-4">
                      <Stethoscope className="w-3.5 h-3.5" />
                      {doctor.specialty}
                    </span>

                    <h1 className="text-3xl md:text-4xl font-bold text-white light:!text-gray-900 mb-4">
                      {doctor.name}
                    </h1>

                    {doctor.bio ? (
                      <p className="text-gray-400 light:!text-gray-600 leading-relaxed">{doctor.bio}</p>
                    ) : (
                      <p className="text-gray-500 light:!text-gray-600 text-sm italic">
                        No biography available for this doctor yet.
                      </p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openModal}
                      className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors w-fit shadow-md shadow-blue-600/20"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      Book with {doctor.name.split(" ")[0]}
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </section>

            {otherDoctors.length > 0 && (
              <section className="border-t border-white/10 light:!border-gray-200 px-6 py-16">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-white light:!text-gray-900 font-bold text-2xl mb-8 text-center">
                    Other Specialists
                  </h2>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid md:grid-cols-3 gap-6"
                  >
                    {otherDoctors.map((other) => (
                      <MotionLink
                        key={other.id}
                        to={`/doctors/${other.id}`}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-colors"
                      >
                        <div className="h-40 overflow-hidden">
                          <img
                            src={other.photoUrl}
                            alt={other.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-white light:!text-gray-900 font-semibold text-sm">{other.name}</h3>
                          <p className="text-indigo-400 text-xs mt-0.5">{other.specialty}</p>
                        </div>
                      </MotionLink>
                    ))}
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

export default DoctorDetailPage;
