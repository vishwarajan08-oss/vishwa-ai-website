"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";

export default function Contact() {
  const { label, title, subtitle, responseNote, ctaLabel, email, linkedin } = content.contact;

  const [formData, setFormData] = useState({ name: "", firm: "", email: "", message: "" });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus({ type: "success", message: "Got it — we'll be in touch within 24 hours." });
        setFormData({ name: "", firm: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || `Something went wrong. Email us at ${email}`,
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: `Something went wrong. Email us at ${email}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#111111] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#C41A1A] mb-3">
                {label}
              </h2>
              <p className="text-3xl font-extrabold tracking-tight text-white">
                {title}
              </p>
            </div>
            <p className="text-sm text-white/50 font-medium leading-relaxed">
              {subtitle}
            </p>
            <div className="pt-4 space-y-3 border-t border-white/5">
              <a
                href={`mailto:${email}`}
                className="block text-sm font-semibold text-white/70 hover:text-[#FF2D2D] transition-colors duration-200"
              >
                {email}
              </a>
              <a
                href={`https://${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold text-white/70 hover:text-[#FF2D2D] transition-colors duration-200"
              >
                {linkedin}
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`p-4 text-xs font-medium border-l-2 ${
                      status.type === "success"
                        ? "bg-white/5 text-white/80 border-[#C41A1A]"
                        : "bg-[#C41A1A]/10 text-[#FF2D2D] border-[#C41A1A]"
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-white/40">
                    Name <span className="text-[#C41A1A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C41A1A] focus:ring-1 focus:ring-[#C41A1A] transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="firm" className="text-xs font-bold uppercase tracking-wider text-white/40">
                    Firm Name
                  </label>
                  <input
                    type="text"
                    id="firm"
                    name="firm"
                    value={formData.firm}
                    onChange={handleChange}
                    placeholder="e.g. Loftin Wealth Partners"
                    className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C41A1A] focus:ring-1 focus:ring-[#C41A1A] transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Email <span className="text-[#C41A1A]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@firm.com"
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C41A1A] focus:ring-1 focus:ring-[#C41A1A] transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-white/40">
                  Message <span className="text-[#C41A1A]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your operations and AI objectives..."
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C41A1A] focus:ring-1 focus:ring-[#C41A1A] transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 text-sm font-semibold text-white bg-[#C41A1A] hover:bg-[#FF2D2D] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Submitting..." : ctaLabel}
              </button>

              <p className="text-xs text-white/30 text-center">{responseNote}</p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
