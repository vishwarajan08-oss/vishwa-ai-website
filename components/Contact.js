"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/config/content";

export default function Contact() {
  const { title, subtitle, email, linkedin } = content.contact;

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
        setStatus({ type: "success", message: "Got it — I'll be in touch within 24 hours." });
        setFormData({ name: "", firm: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: data.error || "Something went wrong. Please email me directly at rajan.vishwa08@gmail.com" });
      }
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please email me directly at rajan.vishwa08@gmail.com" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="space-y-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
                Get In Touch
              </h2>
              <p className="text-3xl font-extrabold tracking-tight text-[#0A1628]">
                {title}
              </p>
            </div>
            <p className="text-sm text-neutral-500 font-medium leading-relaxed">
              {subtitle}
            </p>
            <div className="pt-4 space-y-3 border-t border-neutral-100">
              <a href={`mailto:${email}`} className="block text-sm font-semibold text-[#0A1628] hover:opacity-60 transition-opacity">
                {email}
              </a>
              <a
                href={`https://${linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold text-[#0A1628] hover:opacity-60 transition-opacity"
              >
                {linkedin}
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors"
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
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@firm.com"
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your operations and AI objectives..."
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-[#0A1628] focus:ring-1 focus:ring-[#0A1628] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 text-sm font-semibold text-white bg-[#0A1628] hover:bg-[#142844] transition-colors disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Get in Touch"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
