import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, HeartPulse, Users, Award } from "lucide-react";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";
import { useSiteStats } from "../../hooks/useSiteStats";

const values = [
  {
    icon: HeartPulse,
    title: "Patient-First Care",
    description: "Every decision we make starts with what's best for the people we treat.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Expertise",
    description: "Our specialists bring years of training and hands-on clinical experience.",
  },
  {
    icon: Users,
    title: "Compassionate Team",
    description: "From reception to recovery, our staff is here to support you at every step.",
  },
  {
    icon: Award,
    title: "Modern Standards",
    description: "We invest in up-to-date equipment and evidence-based treatment protocols.",
  },
];

const AboutPage = () => {
  const { data: stats } = useSiteStats();

  return (
    <div>
      <Navbar />
      <main className="pt-[72px] bg-[#0a0a0f] light:!bg-white min-h-screen">
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-gray-400 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>

            <span className="inline-flex items-center gap-1.5 bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 text-indigo-400 text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
              About MedDocX
            </span>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="text-white light:!text-gray-900">Compassionate Care,</span>
              <br />
              <span className="text-indigo-400">Built Around You</span>
            </h1>
            <p className="text-gray-400 light:!text-gray-600 text-sm max-w-xl mx-auto mt-5 leading-relaxed">
              <p className="text-gray-400 light:!text-gray-600 text-sm max-w-2xl mx-auto mt-5 leading-relaxed">
                MedDocX was founded on a simple belief: healthcare should feel personal,
                accessible, and trustworthy. What started as a small practice has grown
                into a multi-specialty network of doctors, nurses, and support staff united
                by one goal — helping people feel better, faster.
              </p>
              <p className="text-gray-400 light:!text-gray-600 text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
                We connect patients with experienced specialists and modern facilities,
                backed by technology that makes booking, diagnosis, and follow-up care
                simpler at every step. Whether it's a routine checkup or an urgent concern,
                our team is here around the clock, so every visit feels like it's in good hands.
              </p>
            </p>
          </div>
        </section>

        {/* Stats strip */}
        {stats && (
          <section className="px-6 pb-16">
            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
              <div className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 text-center">
                <div className="text-white light:!text-gray-900 font-bold text-2xl">{stats.patientsCount}</div>
                <div className="text-gray-400 light:!text-gray-600 text-xs mt-1">Patients Served</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-center">
                <div className="text-white font-bold text-2xl">{stats.doctorsCount}</div>
                <div className="text-blue-100 text-xs mt-1">Skilled Doctors</div>
              </div>
              <div className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 text-center">
                <div className="text-white light:!text-gray-900 font-bold text-2xl">{stats.emergencyCareLabel}</div>
                <div className="text-gray-400 light:!text-gray-600 text-xs mt-1">Emergency Care</div>
              </div>
            </div>
          </section>
        )}

        {/* Values grid */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-white light:!text-gray-900 font-bold text-2xl text-center mb-10">
              What We Stand For
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-white/[0.03] light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center hover:border-indigo-500/40 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-indigo-400 mb-4" strokeWidth={1.5} />
                    <h3 className="text-white light:!text-gray-900 font-semibold text-sm mb-2">{value.title}</h3>
                    <p className="text-gray-400 light:!text-gray-600 text-xs leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;