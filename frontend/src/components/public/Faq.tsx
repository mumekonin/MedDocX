import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useFaqs } from "../../hooks/useFaqs";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const Faq = () => {
  const { data: faqs, isLoading, isError } = useFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="bg-[#0a0a0f] light:!bg-white px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          FAQ
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight mb-12"
        >
          <span className="text-white light:!text-gray-900">Have Questions?</span>
          <br />
          <span className="text-indigo-400">We Have Answers.</span>
        </motion.h2>

        {isLoading && <p className="text-gray-500 light:!text-gray-600 text-sm">Loading FAQs...</p>}
        {isError && <p className="text-red-400 text-sm">Couldn't load FAQs right now.</p>}

        {faqs && faqs.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="text-left divide-y divide-white/10 light:divide-gray-200 border-t border-white/10 light:!border-gray-200"
          >
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div key={faq.id} variants={itemVariants}>
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-white light:!text-gray-900 font-medium text-sm md:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? "bg-blue-600 text-white" : "bg-white/5 light:!bg-gray-100 text-gray-400 light:!text-gray-600"
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-gray-400 light:!text-gray-600 text-sm leading-relaxed pr-10">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {faqs && faqs.length === 0 && (
          <p className="text-gray-500 light:!text-gray-600 text-sm">No FAQs added yet.</p>
        )}
      </div>
    </section>
  );
};

export default Faq;
