import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Send, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useSubscribeNewsletter } from "../../hooks/useNewsletter";

const socialIcons = [
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaLinkedinIn, label: "LinkedIn" },
  { Icon: FaXTwitter, label: "X (Twitter)" },
];

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "Contact Us", to: "/contact" },
];

const serviceLinks = [
  "Emergency Care",
  "Cardiology",
  "Neurology",
  "Pediatric",
  "General Care",
  "Orthopedics",
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const { mutate: subscribe, isPending } = useSubscribeNewsletter();

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    subscribe(email, {
      onSuccess: (data) => {
        setFeedback(data.message);
        setEmail("");
      },
      onError: () => {
        setFeedback("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <footer className="bg-[#0a0a0f] border-t border-white/10 px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Brand + newsletter */}
        <div>
          <img src={logo} alt="MedDocX" className="h-9 w-auto mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Compassionate healthcare, trusted specialists, and modern medical care
            for every stage of life.
          </p>

          <form onSubmit={handleSubscribe} className="relative">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Id"
              required
              className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-11 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={isPending}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Subscribe to newsletter"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
          {feedback && <p className="text-xs text-indigo-400 mt-2">{feedback}</p>}

          <div className="flex items-center gap-3 mt-5">
            {socialIcons.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/40 hover:bg-white/10 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Links</h4>
          <ul className="space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Our Services</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((service) => (
              <li key={service}>
                <Link to="/services" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
              <span>+1 (800) 555-1234</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
              <span>info@meddocx.com</span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
              <span>245 Healthcare Avenue, Medical District, New York, NY 10001, United States</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-gray-500 text-xs">
          Copyright © {new Date().getFullYear()} MedDocX. All rights reserved.
        </p>

        <Link
          to="/admin/login"
          className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-400 text-xs transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Staff Login
        </Link>
      </div>
    </footer>
  );
};

export default Footer;