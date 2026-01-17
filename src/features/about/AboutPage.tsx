import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) setContainerHeight(containerRef.current.scrollHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h2");
      const content = section.querySelectorAll("p, ul, li, a");
      const image = section.querySelector("img");

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -30 },
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

      if (image) {
        gsap.fromTo(
          image,
          { y: -18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 80%", end: "bottom 20%", scrub: 1 },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="about-page">
      <Header />

      <div
        ref={containerRef}
        className="container-fluid main-background-color px-3 py-4"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="app-card app-card-hover p-4">
            <section ref={addToSectionRefs} className="mb-4">
              <h2 className="mb-2" style={{ fontWeight: 800 }}>
                <i className="fas fa-user me-2 accent-icon" />
                About Adham Hashem
              </h2>
              <p className="lead mb-0">
                I'm a passionate .NET Backend Developer and Cybersecurity Student based in Damietta, Egypt.
              </p>
            </section>

            <section ref={addToSectionRefs} className="mb-4">
              <div className="row align-items-center g-4">
                <div className="col-md-6">
                  <h2 className="mb-2" style={{ fontWeight: 800 }}>
                    <i className="fas fa-graduation-cap me-2 accent-icon" />
                    Background & Expertise
                  </h2>

                  <p className="mb-3" style={{ color: "var(--muted)" }}>
                    Strong foundation in software engineering and cybersecurity with focus on clean backend delivery.
                  </p>

                  <ul className="list-unstyled ms-2 mb-0" style={{ color: "var(--muted)" }}>
                    <li className="mb-2">
                      <i className="fas fa-code me-2 accent-icon" />
                      <strong>Backend:</strong> .NET Core, C#, SQL, APIs.
                    </li>
                    <li className="mb-2">
                      <i className="fas fa-shield-alt me-2 accent-icon" />
                      <strong>Security:</strong> secure coding & best practices.
                    </li>
                    <li className="mb-0">
                      <i className="fas fa-cloud me-2 accent-icon" />
                      <strong>Cloud:</strong> Azure.
                    </li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80"
                    className="img-fluid"
                    alt="Adham Hashem"
                    style={{
                      borderRadius: 16,
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-soft)",
                    }}
                  />
                </div>
              </div>
            </section>

            <section ref={addToSectionRefs} className="mb-4">
              <h2 className="mb-2" style={{ fontWeight: 800 }}>
                <i className="fas fa-trophy me-2 accent-icon" />
                Competitive Programming
              </h2>

              <p className="mb-2" style={{ color: "var(--muted)" }}>
                Active participation in algorithmic contests to sharpen problem-solving skills.
              </p>

              <ul className="list-unstyled ms-2 mb-0">
                <li className="mb-2">
                  <i className="fas fa-link me-2 accent-icon" />
                  <a href="https://codeforces.com/profile/Adham0" target="_blank" rel="noopener noreferrer">
                    Codeforces Profile Adham0
                  </a>
                </li>
                <li className="mb-0">
                  <i className="fas fa-link me-2 accent-icon" />
                  <a href="https://codeforces.com/profile/AdhamHashem" target="_blank" rel="noopener noreferrer">
                    Codeforces Profile AdhamHashem
                  </a>
                </li>
              </ul>
            </section>

            <section ref={addToSectionRefs} className="text-center">
              <h2 className="mb-2" style={{ fontWeight: 800 }}>
                <i className="fas fa-paper-plane me-2 accent-icon" />
                Let's Connect
              </h2>

              <p className="mb-3" style={{ color: "var(--muted)" }}>
                Reach out to collaborate on backend systems, security, or full-stack projects.
              </p>

              <Link to="/contact" className="btn learn-more-button px-4 py-2">
                Contact Me
              </Link>
            </section>
          </div>

          <ScrollButtons containerHeight={containerHeight} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
