import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";

gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  const sectionRefs = useRef<HTMLElement[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState<string>("");

  const [copiedKey, setCopiedKey] = useState<"" | "email" | "phone">("");

  const EMAIL = "adham.hashem@proton.me";
  const PHONE = "+20 101 398 9517";

  const GITHUB_URL = "https://github.com/adham-hashem";
  const LINKEDIN_URL =
    "https://www.linkedin.com/in/adham-hashem-12ba59371/?originalSubdomain=eg";

  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h6, h2");
      const content = section.querySelectorAll("p, ul, li");

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%" },
          }
        );
      }

      if (content.length > 0) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 80%" },
          }
        );
      }
    });

    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll("input, textarea");
      const button = formRef.current.querySelector(".nextButton");

      gsap.fromTo(
        inputs,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        }
      );

      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: { trigger: formRef.current, start: "top 85%" },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const copyToClipboard = async (text: string, key: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(""), 1500);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);

      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(""), 1500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormStatus("Sending...");

    setTimeout(() => {
      setFormStatus("Message sent successfully!");
      if (formRef.current) formRef.current.reset();
      setTimeout(() => setFormStatus(""), 2500);
    }, 900);
  };

  return (
    <div className="contact-page">
      <Header />

      <div
        className="container-fluid main-background-color px-3 py-4"
        style={{ minHeight: "80vh" }}
      >
        <div className="container">
          <div className="app-card app-card-hover p-4">
            <section ref={addToSectionRefs} className="mb-4">
              <h2 className="mb-2" style={{ fontWeight: 800 }}>
                <i className="fas fa-envelope me-2 accent-icon" />
                Contact Me
              </h2>
              <p className="lead mb-0">
                Whether you have questions, project ideas, or want to discuss
                backend development and cybersecurity—reach out.
              </p>
            </section>

            <section ref={addToSectionRefs} className="mb-4">
              <h6 className="mb-2" style={{ fontWeight: 800 }}>
                <i className="fas fa-phone-alt me-2 accent-icon" />
                Get in Touch
              </h6>

              <ul
                className="list-unstyled ms-2 mb-0"
                style={{ color: "var(--muted)" }}
              >
                {/* Email */}
                <li className="mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <i className="fas fa-envelope me-2 accent-icon" />
                    <strong>Email:</strong>{" "}
                    <a
                      href={`mailto:${EMAIL}`}
                      style={{ textDecoration: "none" }}
                    >
                      {EMAIL}
                    </a>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-brand px-3 py-1"
                    onClick={() => copyToClipboard(EMAIL, "email")}
                    aria-label="Copy email"
                    style={{ fontSize: 14 }}
                  >
                    <i className="fas fa-copy me-2" />
                    {copiedKey === "email" ? "Copied!" : "Copy"}
                  </button>
                </li>

                {/* Phone */}
                <li className="mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <i className="fas fa-phone me-2 accent-icon" />
                    <strong>Phone:</strong>{" "}
                    <a
                      href={`tel:${PHONE.replace(/\s+/g, "")}`}
                      style={{ textDecoration: "none" }}
                    >
                      {PHONE}
                    </a>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-brand px-3 py-1"
                    onClick={() => copyToClipboard(PHONE, "phone")}
                    aria-label="Copy phone number"
                    style={{ fontSize: 14 }}
                  >
                    <i className="fas fa-copy me-2" />
                    {copiedKey === "phone" ? "Copied!" : "Copy"}
                  </button>
                </li>

                {/* Separator line (after phone, before social) */}
                <li className="my-3" style={{ listStyle: "none" }}>
                  <hr
                    style={{
                      margin: 0,
                      border: 0,
                      height: 1,
                      background: "rgba(81,43,212,0.18)",
                    }}
                  />
                </li>

                {/* GitHub */}
                <li className="mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <i className="fab fa-github me-2 accent-icon" />
                    <strong>GitHub:</strong>{" "}
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      adham-hashem
                    </a>
                  </div>

                  <a
                    className="btn btn-outline-brand px-3 py-1"
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open GitHub"
                    style={{ fontSize: 14 }}
                  >
                    <i className="fas fa-external-link-alt me-2" />
                    Open
                  </a>
                </li>

                {/* LinkedIn */}
                <li className="mb-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <i className="fab fa-linkedin me-2 accent-icon" />
                    <strong>LinkedIn:</strong>{" "}
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      Adham Hashem
                    </a>
                  </div>

                  <a
                    className="btn btn-outline-brand px-3 py-1"
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open LinkedIn"
                    style={{ fontSize: 14 }}
                  >
                    <i className="fas fa-external-link-alt me-2" />
                    Open
                  </a>
                </li>

                {/* Separator line (after linkedin, before location) */}
                <li className="my-3" style={{ listStyle: "none" }}>
                  <hr
                    style={{
                      margin: 0,
                      border: 0,
                      height: 1,
                      background: "rgba(81,43,212,0.18)",
                    }}
                  />
                </li>

                {/* Location */}
                <li className="mb-0">
                  <i className="fas fa-map-marker-alt me-2 accent-icon" />
                  <strong>Location:</strong> Damietta, Egypt
                </li>
              </ul>
            </section>

            {/* If you still want the form section, keep it here (unchanged) */}
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "none" }}>
              {/* your form fields */}
            </form>

            {formStatus && (
              <p className="mt-3 text-center" style={{ color: "var(--muted)" }}>
                {formStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;

