import { useState, useEffect } from "react";
import { useBookingModal } from "../../context/BookingModalContext";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { ArrowUpRight, Moon, Sun } from "lucide-react";

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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 pt-4">
      <div
        className={`max-w-6xl mx-auto rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-[#12121a]/95 light:!bg-white/95 backdrop-blur-md border-white/15 light:!border-gray-200 shadow-lg shadow-black/30 light:!shadow-gray-300/50"
            : "bg-[#12121a]/90 light:!bg-white backdrop-blur-sm border-white/10 light:!border-gray-200 shadow-md shadow-black/20 light:!shadow-gray-200/40"
        }`}
      >
        <div className="relative flex items-center justify-between pl-5 pr-2 sm:pr-2 py-2">
          <Link to="/" className="flex items-center shrink-0 z-10">
            <img src={logo} alt="MedDocX" className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300 light:!text-gray-700 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="relative hover:text-white light:hover:!text-gray-900 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-indigo-400 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 rounded-full border border-white/10 light:!border-gray-200 bg-white/5 light:!bg-gray-100 text-gray-300 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 hover:border-indigo-500/40 transition-colors flex items-center justify-center shrink-0"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={openModal}
              className="hidden md:inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold pl-5 pr-1.5 py-1.5 rounded-full transition-colors"
            >
              Book Appointment
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-blue-600" />
              </span>
            </button>

            <button
              className="md:hidden w-9 h-9 rounded-full text-white light:!text-gray-900 text-xl flex items-center justify-center"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-2 rounded-2xl bg-[#12121a]/98 light:!bg-white/98 backdrop-blur-md border border-white/10 light:!border-gray-200 px-6 py-6 flex flex-col gap-5 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMenuOpen(false);
              openModal();
            }}
            className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold pl-5 pr-1.5 py-1.5 rounded-full transition-colors w-full"
          >
            Book Appointment
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-blue-600" />
            </span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
