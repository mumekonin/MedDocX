import { useRef } from "react";
import { ArrowLeft, ArrowRight, Plus, Quote } from "lucide-react";
import { useTestimonials } from "../../hooks/useTestimonials";

const Testimonials = () => {
  const { data: testimonials, isLoading, isError } = useTestimonials();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" className="bg-[#0a0a0f] px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Patient Stories
        </span>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          <span className="text-white">Trusted by Patients,</span>
          <br />
          <span className="text-indigo-400">Proven by Care</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mt-4">
          Hear from patients who have experienced compassionate care, expert treatment,
          and positive health outcomes.
        </p>

        {isLoading && <p className="text-gray-500 text-sm mt-12">Loading testimonials...</p>}
        {isError && (
          <p className="text-red-400 text-sm mt-12">Couldn't load testimonials right now.</p>
        )}

        {testimonials && testimonials.length > 0 && (
          <>
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto mt-12 pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="group relative shrink-0 w-[360px] min-h-[280px] snap-start bg-white/[0.03] border border-white/10 rounded-2xl p-7 text-left flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
                >
                  <Quote
                    className="absolute -top-2 right-4 w-20 h-20 text-indigo-500/[0.07] group-hover:text-indigo-500/[0.12] transition-colors duration-300 pointer-events-none"
                    fill="currentColor"
                    strokeWidth={0}
                  />

                  <p className="relative text-gray-300 text-[15px] leading-relaxed">
                    {testimonial.message}
                  </p>

                  <div className="relative flex items-center gap-3 mt-8">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.patientName}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-transparent group-hover:ring-indigo-500/40 transition-all duration-300"
                    />
                    <div>
                      <p className="text-white font-bold">{testimonial.patientName}</p>
                      <p className="text-indigo-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 hover:scale-110 flex items-center justify-center text-white transition-all duration-200"
                aria-label="Previous testimonials"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 hover:scale-110 flex items-center justify-center text-white transition-all duration-200"
                aria-label="Next testimonials"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {testimonials && testimonials.length === 0 && (
          <p className="text-gray-500 text-sm mt-12">No testimonials yet.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;