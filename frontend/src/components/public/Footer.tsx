import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { useSubscribeNewsletter } from "../../hooks/useNewsletter";

const socialIcons = [FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter];

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
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-sm">
              M
            </span>
            <span>
              <span className="text-indigo-400">MedDoc</span>X
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Compassionate healthcare, trusted specialists, and modern medical care
            for every stage of life.
          </p>

          <form onSubmit={handleSubscribe} className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Id"
              className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-11 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50"
            />
            <button
              type="submit"
              disabled={isPending}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Subscribe"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
          {feedback && <p className="text-xs text-indigo-400 mt-2">{feedback}</p>}

          <div className="flex items-center gap-3 mt-5">
            {socialIcons.map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/40 transition-colors"
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
              +1 (800) 555-1234
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
              info@meddocx.com
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-indigo-400" />
              245 Healthcare Avenue, Medical District, New York, NY 10001, United States
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 mt-12 pt-6 text-center">
        <p className="text-gray-500 text-xs">
          Copyright © {new Date().getFullYear()} MedDocX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;