"use client";

export default function Footer() {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-white border-t border-neutral-100 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-neutral-400 font-medium">
          &copy; 2026 Vishwa Rajan AI Consulting. All rights reserved.
        </p>
        <div className="flex space-x-6 text-xs text-neutral-400 font-semibold">
          <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-[#0A1628] transition-colors">
            Services
          </a>
          <a href="#track-record" onClick={(e) => handleScrollTo(e, "#track-record")} className="hover:text-[#0A1628] transition-colors">
            Track Record
          </a>
          <a href="#vision" onClick={(e) => handleScrollTo(e, "#vision")} className="hover:text-[#0A1628] transition-colors">
            Vision
          </a>
          <a href="#testimonials" onClick={(e) => handleScrollTo(e, "#testimonials")} className="hover:text-[#0A1628] transition-colors">
            Testimonials
          </a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="hover:text-[#0A1628] transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
