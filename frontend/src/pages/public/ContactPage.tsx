import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { contactSchema, type ContactFormValues } from "../../schemas/contact.schema";
import { useSubmitContact } from "../../hooks/useContact";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const ContactPage = () => {
  const { mutate, isPending, isError, isSuccess, reset: resetMutation } = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (values: ContactFormValues) => {
    mutate(values, { onSuccess: () => reset() });
  };

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] light:!bg-white min-h-screen px-6 py-16">
        <div className="max-w-5xl mx-auto">
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

          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-white light:!text-gray-900"
            >
              Get in <span className="text-indigo-400">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="text-gray-400 light:!text-gray-600 text-sm max-w-lg mx-auto mt-4"
            >
              Have a question or need help? Send us a message and our team will get
              back to you shortly.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="md:col-span-2 space-y-4"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white light:!text-gray-900 font-semibold text-sm">Phone</p>
                  <p className="text-gray-400 light:!text-gray-600 text-sm mt-0.5">+1 (800) 555-1234</p>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white light:!text-gray-900 font-semibold text-sm">Email</p>
                  <p className="text-gray-400 light:!text-gray-600 text-sm mt-0.5">info@meddocx.com</p>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white light:!text-gray-900 font-semibold text-sm">Address</p>
                  <p className="text-gray-400 light:!text-gray-600 text-sm mt-0.5">
                    245 Healthcare Avenue, Medical District, New York, NY 10001
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
              className="md:col-span-3 bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-7"
            >
              {isSuccess ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white light:!text-gray-900 font-bold text-lg mb-2">Message Sent</h3>
                  <p className="text-gray-400 light:!text-gray-600 text-sm">
                    Thanks for reaching out — we'll get back to you soon.
                  </p>
                  <button
                    onClick={() => resetMutation()}
                    className="mt-6 text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <input
                    type="text"
                    {...register("website")}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {isError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                        Name
                      </label>
                      <input
                        {...register("name")}
                        className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                      Subject
                    </label>
                    <input
                      {...register("subject")}
                      className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full bg-white/5 light:!bg-white border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isPending}
                    whileHover={{ scale: isPending ? 1 : 1.03 }}
                    whileTap={{ scale: isPending ? 1 : 0.95 }}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors disabled:opacity-50"
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
