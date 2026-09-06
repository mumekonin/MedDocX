import Navbar from "../../components/public/Navbar";
import Hero from "../../components/public/Hero";
import About from "../../components/public/About";
import TrustBadges from "../../components/public/TrustBadges";
import Services from "../../components/public/Services";
import Specialists from "../../components/public/Specialists";
import Testimonials from "../../components/public/Testimonials";
import BlogPreview from "../../components/public/BlogPreview";
import Faq from "../../components/public/Faq";
import Footer from "../../components/public/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-[72px]">
        <Hero />
        <About />
        <TrustBadges />
        <Services />
        <Specialists />
        <Testimonials />
        <BlogPreview />
        <Faq />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;