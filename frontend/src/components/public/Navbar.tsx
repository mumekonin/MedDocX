import { useState, useEffect } from "react";
import { useBookingModal } from "../../context/BookingModalContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Services", to: "/#services" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useBookingModal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled
          ? "bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-[#0a0a0f]/70 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="MedDocX" className="h-9 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.to}
              className="relative hover:text-white transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button onClick={openModal} className="hidden md:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-md shadow-blue-600/20">
          Book Appointment
          <span className="text-xs">↗</span>
        </button>

        <button
          className="md:hidden text-white text-xl"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/98 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-white text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <button onClick={() => { setIsMenuOpen(false); openModal(); }} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors w-full">
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;