"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";
import { fadeInUp, stagger, viewport } from "@/lib/animations";
import { Send } from "lucide-react";

export default function Contact() {
  const { label, title, subtitle, subtitle2, responseNote, ctaLabel, email } = content.contact;

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
        setStatus({ type: "success", message: "Got it. We'll be in touch within one business day." });
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
    <section id="contact" className="py-24 bg-bg-alt border-t border-divider">
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
              <p className="text-3xl font-extrabold tracking-tight text-charcoal">
                {title}
              </p>
            </div>
            <p className="text-sm text-[#636363] font-medium leading-relaxed">
              {subtitle}
            </p>
            {subtitle2 && (
              <p className="text-sm text-[#636363] font-medium leading-relaxed">
                {subtitle2}
              </p>
            )}
            <div className="pt-4 space-y-3 border-t border-divider">
              <a
                href={`mailto:${email}`}
                className="block text-sm font-semibold text-[#636363] hover:text-burgundy transition-colors duration-200 cursor-pointer"
              >
                {email}
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`p-4 text-xs font-medium border-l-2 ${
                      status.type === "success"
                        ? "bg-burgundy/5 text-charcoal/70 border-burgundy"
                        : "bg-burgundy/8 text-burgundy border-burgundy"
                    }`}
                    role="alert"
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#6D6D6D]">
                    Name <span className="text-burgundy" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white border border-divider text-charcoal text-sm placeholder:text-[#767676] focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="firm" className="text-xs font-bold uppercase tracking-wider text-[#6D6D6D]">
                    Firm Name
                  </label>
                  <input
                    type="text"
                    id="firm"
                    name="firm"
                    value={formData.firm}
                    onChange={handleChange}
                    placeholder="e.g. Loftin Wealth Partners"
                    className="w-full px-4 py-3 bg-white border border-divider text-charcoal text-sm placeholder:text-[#767676] focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#6D6D6D]">
                  Email <span className="text-burgundy" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@firm.com"
                  className="w-full px-4 py-3 bg-white border border-divider text-charcoal text-sm placeholder:text-[#767676] focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[#6D6D6D]">
                  Message <span className="text-burgundy" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your operations and what you want to fix."
                  className="w-full px-4 py-3 bg-white border border-divider text-charcoal text-sm placeholder:text-[#767676] focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full px-8 py-4 text-sm font-semibold text-white bg-burgundy overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-burgundy-dark translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                <Send size={15} aria-hidden="true" className="relative" />
                <span className="relative">{loading ? "Submitting..." : ctaLabel}</span>
              </button>

              <p className="text-xs text-[#636363] text-center">{responseNote}</p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
