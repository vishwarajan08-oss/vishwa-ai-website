"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";

export default function Contact() {
  const { title, subtitle, email, linkedin } = content.contact;

  const [formData, setFormData] = useState({
    name: "",
    firm: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill out all required fields." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Got it — I'll be in touch within 24 hours.",
        });
        setFormData({ name: "", firm: "", email: "", message: "" });
      } else {
        // If rate limit (429) or other API errors
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please email me directly at rajan.vishwa08@gmail.com",
        });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus({
        type: "error",
        message: "Something went wrong. Please email me directly at rajan.vishwa08@gmail.com",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-neutral-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#0A1628]">
            Get In Touch
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-[#0A1628]">
            {title}
          </p>
          <p className="text-sm text-neutral-500 font-medium max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 border border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 text-xs font-medium border-l-2 ${
                    status.type === "success"
                      ? "bg-neutral-50 text-neutral-800 border-[#0A1628]"
                      : "bg-red-50 text-red-600 border-red-500"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm font-sans focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="firm" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Firm Name
                </label>
                <input
                  type="text"
                  id="firm"
                  name="firm"
                  value={formData.firm}
                  onChange={handleChange}
                  placeholder="e.g. Loftin Wealth Partners"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm font-sans focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@firm.com"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm font-sans focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your operations and AI objectives..."
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm font-sans focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-sm font-semibold rounded-none text-white bg-[#0A1628] hover:bg-[#142844] focus:outline-none transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Get in Touch"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 text-center space-y-2">
          <p className="text-sm font-medium text-neutral-500">
            Or contact directly:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm font-semibold text-[#0A1628]">
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <a
              href={`https://${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {linkedin}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
