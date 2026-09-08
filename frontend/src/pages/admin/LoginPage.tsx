import { useState, type FormEvent } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, ArrowLeft, ShieldCheck, Stethoscope, CalendarCheck, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo.svg";
import { login } from "../../api/users.api";
import axiosClient from "../../api/axiosClient";

const highlights = [
  { icon: Stethoscope, text: "Manage doctors, services, and content in one place" },
  { icon: CalendarCheck, text: "Review and confirm patient appointments instantly" },
  { icon: ShieldCheck, text: "Secure, session-based access for authorized staff only" },
];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { theme, toggleTheme } = useTheme();

  const redirectTo = (location.state as { from?: string })?.from ?? "/admin/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      const { data: user } = await axiosClient.get("/user/me");
      queryClient.setQueryData(["auth", "me"], user);
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] light:!bg-white flex">
      {/* Left branded panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-[#0a0a0f]">
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="MedDocX" className="h-9 w-auto brightness-0 invert" />
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white text-3xl xl:text-4xl font-bold leading-tight mb-4"
            >
              Run your clinic's<br />online presence,<br />all in one place.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-blue-100/80 text-sm max-w-sm"
            >
              The MedDocX admin dashboard gives you full control over your public site
              and patient bookings.
            </motion.p>

            <div className="mt-10 space-y-4">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.75} />
                    </div>
                    <p className="text-blue-50 text-sm">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-blue-200/50 text-xs"
          >
            © {new Date().getFullYear()} MedDocX. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <Link
          to="/"
          className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-gray-500 light:!text-gray-600 hover:text-gray-300 light:hover:!text-gray-900 text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 light:!border-gray-200 bg-white/5 light:!bg-gray-100 text-gray-300 light:!text-gray-600 hover:text-white light:hover:!text-gray-900 transition-colors flex items-center justify-center"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8 lg:hidden">
            <img src={logo} alt="MedDocX" className="h-10 w-auto mx-auto mb-5" />
          </div>

          <h2 className="text-white light:!text-gray-900 text-2xl font-bold">Welcome back</h2>
          <p className="text-gray-500 light:!text-gray-600 text-sm mt-1.5 mb-8">
            Sign in to manage your site and appointments
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-2.5"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="login-email" className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
                className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] light:focus:!bg-white transition-colors"
                placeholder="you@meddocx.com"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-gray-400 light:!text-gray-600 text-xs font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/5 light:!bg-gray-100 border border-white/10 light:!border-gray-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white light:!text-gray-900 placeholder-gray-600 light:placeholder-gray-400 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] light:focus:!bg-white transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 light:!text-gray-600 hover:text-gray-300 light:hover:!text-gray-900 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 mt-2"
            >
              <LogIn className="w-4 h-4" />
              {isSubmitting ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          <p className="text-center text-gray-600 light:!text-gray-500 text-xs mt-8 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Restricted access  for authorized staff only.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;