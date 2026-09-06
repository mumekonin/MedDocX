import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useFaqs } from "../../hooks/useFaqs";

const Faq = () => {
  const { data: faqs, isLoading, isError } = useFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="bg-[#0a0a0f] px-6 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          FAQ
        </span>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-12">
          <span className="text-white">Have Questions?</span>
          <br />
          <span className="text-indigo-400">We Have Answers.</span>
        </h2>

        {isLoading && <p className="text-gray-500 text-sm">Loading FAQs...</p>}
        {isError && <p className="text-red-400 text-sm">Couldn't load FAQs right now.</p>}

        {faqs && faqs.length > 0 && (
          <div className="text-left divide-y divide-white/10 border-t border-white/10">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-white font-medium text-sm md:text-base">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isOpen ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400"
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
                      <p className="text-gray-400 text-sm leading-relaxed pr-10">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {faqs && faqs.length === 0 && (
          <p className="text-gray-500 text-sm">No FAQs added yet.</p>
        )}
      </div>
    </section>
  );
};

export default Faq;