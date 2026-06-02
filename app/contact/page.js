import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact | Core Consulting",
  description: "Book a consultation with Core Consulting. We partner with a limited number of wealth management firms each quarter.",
};

export default function ContactPage() {
  return (
    <>
      <div style={{ paddingTop: "var(--navbar-height)" }} />
      <Contact />
    </>
  );
}
