import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";

gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BRAND_PRIMARY = "81, 43, 212";
const BRAND_SECONDARY = "124, 58, 237";

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const heroInView = useInView(heroRef, { margin: "-20% 0px -20% 0px", once: true });

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) setContainerHeight(containerRef.current.scrollHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-anim"),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
    }

    const sections = [statsRef.current, skillsRef.current, ctaRef.current].filter(Boolean) as HTMLDivElement[];
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const chartData = useMemo(
    () => ({
      labels: [".NET", "C#", "SQL", "React", "Security"],
      datasets: [
        {
          label: "Skill level",
          data: [90, 88, 82, 80, 75],
          backgroundColor: [
            `rgba(${BRAND_PRIMARY}, 0.85)`,
            `rgba(${BRAND_PRIMARY}, 0.75)`,
            `rgba(${BRAND_SECONDARY}, 0.8)`,
            `rgba(${BRAND_SECONDARY}, 0.7)`,
            `rgba(${BRAND_PRIMARY}, 0.6)`,
          ],
          borderColor: [
            `rgba(${BRAND_PRIMARY}, 1)`,
            `rgba(${BRAND_PRIMARY}, 1)`,
            `rgba(${BRAND_SECONDARY}, 1)`,
            `rgba(${BRAND_SECONDARY}, 1)`,
            `rgba(${BRAND_PRIMARY}, 1)`,
          ],
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    }),
    []
  );

  const chartOptions: ChartOptions<"bar"> = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Core Skills",
          color: "#0f172a",
          font: { size: 16, weight: "bold" },
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(255,255,255,0.98)",
          borderColor: `rgba(${BRAND_PRIMARY}, 0.25)`,
          borderWidth: 1,
          titleColor: "#0f172a",
          bodyColor: "rgba(15,23,42,0.85)",
        },
      },
      scales: {
        x: {
          ticks: { color: "rgba(15,23,42,0.82)" },
          grid: { color: "rgba(15,23,42,0.08)" },
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: "rgba(15,23,42,0.82)" },
          grid: { color: "rgba(15,23,42,0.08)" },
        },
      },
    }),
    []
  );

  return (
    <div className="home-page">
      <Header />

      <div ref={containerRef} className="container-fluid main-background-color px-3 py-4" style={{ minHeight: "100vh" }}>
        <div className="container">
          {/* HERO */}
          <div
            ref={heroRef}
            className="app-card app-card-hover p-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(247,247,251,1) 55%, rgba(81,43,212,0.08) 100%)",
            }}
          >
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <motion.h1
                  className="hero-anim mb-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  style={{ fontWeight: 800 }}
                >
                  Build modern systems with <span className="main-color">.NET</span> & clean architecture
                </motion.h1>

                <p className="hero-anim mb-3" style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                  Backend-focused developer experienced in APIs, security-aware coding, and clean UI delivery.
                </p>

                <div className="hero-anim d-flex gap-2 flex-wrap">
                  <Link to="/contact" className="btn learn-more-button px-4">
                    Contact me
                  </Link>
                  <Link to="/certificates" className="btn btn-outline-brand px-4">
                    View certificates
                  </Link>
                </div>

                {/* Social links */}
                <div className="hero-anim d-flex gap-2 flex-wrap mt-3">
                  <a
                    href="https://www.linkedin.com/in/adham-elbeshbeshy-12ba59371"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-brand px-4"
                    aria-label="LinkedIn profile"
                  >
                    <i className="fab fa-linkedin me-2" />
                    {/* LinkedIn */}
                  </a>
                  <a
                    href="https://github.com/adham-hashem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-brand px-4"
                    aria-label="GitHub profile"
                  >
                    <i className="fab fa-github me-2" />
                    {/* GitHub */}
                  </a>
                </div>
              </div>

              {/* PERSONAL IMAGE */}
              <div className="col-lg-5">
                <div className="hero-anim app-card p-3" style={{ textAlign: "center" }}>
                  <img
                    src="/images/Me.jpg"
                    alt="Adham Hashem"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxWidth: 360,
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: 18,
                      border: `1px solid rgba(${BRAND_PRIMARY}, 0.18)`,
                      boxShadow: "var(--shadow)",
                    }}
                    loading="lazy"
                  />
                  <div style={{ marginTop: 12, color: "var(--muted)", fontWeight: 600 }}>
                    Adham Hashem
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>.NET Backend Developer</div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div ref={statsRef} className="mt-4">
            <div className="row g-3">
              {[
                { title: "Backend", desc: "REST APIs, EF Core, SQL", value: "Strong" },
                { title: "Security", desc: "OWASP mindset & hardening", value: "Aware" },
                { title: "UI", desc: "React + motion/GSAP", value: "Polished" },
              ].map((s, idx) => (
                <div key={idx} className="col-md-4">
                  <div className="app-card app-card-hover p-3 h-100">
                    <div className="d-flex justify-content-between align-items-baseline">
                      <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{s.title}</div>
                      <div className="main-color" style={{ fontWeight: 800 }}>
                        {s.value}
                      </div>
                    </div>
                    <div style={{ color: "var(--muted)", marginTop: 8, lineHeight: 1.7 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS CHART */}
          <div ref={skillsRef} className="mt-4">
            <div className="app-card app-card-hover p-3 p-md-4">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-4">
            <div
              className="app-card app-card-hover p-4 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(81,43,212,0.10) 0%, rgba(124,58,237,0.06) 45%, rgba(255,255,255,1) 100%)",
              }}
            >
              <h2 style={{ fontWeight: 800, marginBottom: 10 }}>Let’s build something reliable</h2>
              <p style={{ color: "var(--muted)", marginBottom: 18 }}>
                Need a backend service, a clean UI, or a full-stack delivery? Get in touch and start the conversation.
              </p>
              <Link to="/contact" className="btn learn-more-button px-4">
                Start a project
              </Link>
            </div>
          </div>

          <ScrollButtons containerHeight={containerHeight} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
