import Navbar from "../../components/public/Navbar";
import Hero from "../../components/public/Hero";
import About from "../../components/public/About";
import TrustBadges from "../../components/public/TrustBadges";
import Services from "../../components/public/Services";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-[72px]">
        <Hero />
        <About />
        <TrustBadges />
        <Services />
      </main>
    </div>
  );
};
export default HomePage;