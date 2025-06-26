import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";
import "./AboutPage.css";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const sectionRefs = useRef<HTMLElement[]>([]);

  // Add refs to sections
  const addToSectionRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Measure container height
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.scrollHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // GSAP animations
  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h2");
      const content = section.querySelectorAll("p, ul, li");
      const image = section.querySelector("img");

      // Heading animation
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }

      // Content animation
      if (content.length > 0) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }

      // Image animation
      if (image) {
        gsap.fromTo(
          image,
          { y: -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="about-page">
      <Header />
      <div
        ref={containerRef}
        className="container-fluid text-white main-background-color px-3 py-3"
        style={{ minHeight: "100vh" }}
      >
        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3">
            <i className="fas fa-user mr-2" style={{ color: "#e8b923" }}></i>
            About Adham Hashem
          </h2>
          <p className="lead">
            I'm a passionate .NET Backend Developer and Cybersecurity Student based in Damietta, Egypt.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h2 className="mb-3">
                <i className="fas fa-graduation-cap mr-2" style={{ color: "#e8b923" }}></i>
                Background & Expertise
              </h2>
              <p>
                I developed a strong foundation in software engineering and cybersecurity. My professional journey includes working on enterprise-level backend systems using .NET Core and C#.
              </p>
              <ul className="list-unstyled ms-4">
                <li className="mb-2">
                  <i className="fas fa-code mr-2" style={{ color: "#e8b923" }}></i>
                  <strong>Backend Development:</strong> .NET Core, C#, PHP, SQL databases
                </li>
                <li className="mb-2">
                  <i className="fas fa-shield-alt mr-2" style={{ color: "#e8b923" }}></i>
                  <strong>Cybersecurity:</strong> secure coding
                </li>
                <li className="mb-2">
                  <i className="fas fa-cloud mr-2" style={{ color: "#e8b923" }}></i>
                  <strong>Cloud Technologies:</strong> Azure
                </li>
              </ul>
            </div>
            <div className="col-md-6 mb-4">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"
                className="img-fluid rounded shadow-lg"
                alt="Adham Hashem"
              />
            </div>
          </div>
        </section>

        {/* <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3">
            <i className="fas fa-trophy mr-2" style={{ color: "#e8b923" }}></i>
            Achievements
          </h2>
          <ul className="list-unstyled ms-4">
            <li className="mb-2">
              <i className="fas fa-check-circle mr-2" style={{ color: "#e8b923" }}></i>
              Developed a secure API platform for [Your Company/Project], reducing response times by 30%.
            </li>
            <li className="mb-2">
              <i className="fas fa-check-circle mr-2" style={{ color: "#e8b923" }}></i>
              Conducted penetration testing for [Your Client/Project], identifying and mitigating critical vulnerabilities.
            </li>
            <li className="mb-2">
              <i className="fas fa-check-circle mr-2" style={{ color: "#e8b923" }}></i>
              Contributed to open-source projects, including [Your Project], enhancing community-driven development.
            </li>
          </ul>
        </section> */}

        <section ref={addToSectionRefs} className="mb-5">
          <h2 className="mb-3">
            <i className="fas fa-heart mr-2" style={{ color: "#e8b923" }}></i>
            Personal Interests
          </h2>
          <p>
            Beyond coding and cybersecurity, I enjoy exploring new technologies, and staying active through chess, reading and more. I'm also passionate about mentoring aspiring developers and sharing knowledge through blogs and talks.
          </p>
        </section>

        <section ref={addToSectionRefs} className="mb-5 text-center">
          <h2 className="mb-3">
            <i className="fas fa-paper-plane mr-2" style={{ color: "#e8b923" }}></i>
            Let's Connect
          </h2>
          <p>
            I'm always excited to collaborate on innovative projects or discuss the latest in backend development and cybersecurity. Reach out to start a conversation!
          </p>
          <div className="mt-4">
            <Link to="/contact" className="btn py-2 px-5 learn-more-button">
              Contact Me
            </Link>
          </div>
        </section>

        <ScrollButtons containerHeight={containerHeight} />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;