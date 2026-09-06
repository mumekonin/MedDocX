import { useRef } from "react";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useDoctors } from "../../hooks/useDoctors";

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
    <section className="bg-[#0a0a0f] px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
          Expert Care You Can Trust
        </span>

        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          <span className="text-white">Our</span>{" "}
          <span className="text-indigo-400">Specialists</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mt-4">
          We bring together talented medical experts focused on providing personalized
          and quality patient care.
        </p>

        {isLoading && <p className="text-gray-500 text-sm mt-12">Loading specialists...</p>}
        {isError && (
          <p className="text-red-400 text-sm mt-12">Couldn't load specialists right now.</p>
        )}

        {doctors && doctors.length > 0 && (
          <>
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto mt-12 pb-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="relative shrink-0 w-72 h-80 rounded-2xl overflow-hidden snap-start"
                >
                  <img
                    src={doctor.photoUrl}
                    alt={doctor.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h3 className="text-white font-semibold">{doctor.name}</h3>
                    <p className="text-indigo-300 text-xs mt-0.5">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-indigo-500/40 transition-colors"
                aria-label="Previous specialists"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors"
                aria-label="Next specialists"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {doctors && doctors.length === 0 && (
          <p className="text-gray-500 text-sm mt-12">No specialists listed yet.</p>
        )}
      </div>
    </section>
  );
};

export default Specialists;