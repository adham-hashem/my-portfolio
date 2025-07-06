// HomePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./HomePage.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";

gsap.registerPlugin(ScrollTrigger);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Framer Motion controls for text
  const textControls = useAnimation();
  const isInView = useInView(textRef, { once: false });

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

  // Update container height on resize
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

  // Framer Motion animation for text
  useEffect(() => {
    if (isInView) {
      textControls.start({
        y: [-10, 10, -10],
        scale: [1, 1.05, 1],
        transition: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 0.1,
        },
      });
    }
  }, [isInView, textControls]);

  // Particle background with connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const particleCount = 60;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (mainContentRef.current) {
        mainContentRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.random() * 50 + 200}, ${Math.random() * 50 + 150}, 35, 0.7)`,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(232, 185, 35, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // GSAP animations for main content and sections
  useEffect(() => {
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainContentRef.current,
            start: "top 80%",
          },
        }
      );
    }

    sectionRefs.current.forEach((section) => {
      const heading = section.querySelector("h2");
      const content = section.querySelectorAll("p, .learn-more-button");
      const image = section.querySelector("img");
      const chart = section.querySelector(".skills-chart");

      // Heading animation
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, x: -50, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
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
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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
          { y: -50, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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

      // Chart animation
      if (chart) {
        gsap.fromTo(
          chart,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Chart data for skills
  const skillsData = {
    labels: ["C++", "Python", "PHP", "C#", "SQL", "Cybersecurity"],
    datasets: [
      {
        label: "Proficiency (%)",
        data: [85, 90, 75, 80, 85, 70],
        backgroundColor: [
          "rgba(232, 185, 35, 0.8)",
          "rgba(10, 61, 98, 0.8)",
          "rgba(75, 0, 130, 0.8)",
          "rgba(232, 185, 35, 0.8)",
          "rgba(10, 61, 98, 0.8)",
          "rgba(75, 0, 130, 0.8)",
        ],
        borderColor: [
          "rgba(232, 185, 35, 1)",
          "rgba(10, 61, 98, 1)",
          "rgba(75, 0, 130, 1)",
          "rgba(232, 185, 35, 1)",
          "rgba(10, 61, 98, 1)",
          "rgba(75, 0, 130, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "My Skills Proficiency",
        color: "#ffffff",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <>
      <Header />
      <div ref={containerRef} className="main-background-color">
        <div className="main-content" ref={mainContentRef}>
          <canvas ref={canvasRef} className="particle-canvas"></canvas>
          <div className="overlay"></div>
          <div className="main-content-h1-container" ref={textRef}>
            <motion.h1
              className="main-content-h1"
              animate={textControls}
              initial={{ y: 0, scale: 1 }}
            >
              ADHAM HASHEM
            </motion.h1>
          </div>
          <p className="main-content-p">
            .NET Backend Developer & Cybersecurity Enthusiast
          </p>
          <div className="social-icons">
            <a
              href="https://github.com/adham-hashem"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/adham-hashem"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <div className="button-container">
            <a href="mailto:adhamhashem2025@gmail.com" className="btn-grad pulse">
              Contact Me
            </a>
          </div>
        </div>

        <div className="container-fluid main-background-color">
          <section
            ref={addToSectionRefs}
            className="div-background-color about-section rounded-div"
            style={{ paddingBottom: "40px" }}
          >
            <div className="row">
              <div className="col-md-6 mb-5">
                <h2 className="text-white mb-5">
                  About <span className="main-color">Me</span>
                </h2>
                <p className="text-white mb-5">
                  I'm Adham Hashem, a passionate Backend Developer and Cybersecurity Student. With expertise in building robust server-side applications and securing digital infrastructures, I strive to create efficient and secure solutions that drive innovation.
                </p>
                <Link to="/about" className="btn py-2 px-5 learn-more-button">
                  Learn More
                </Link>
              </div>
              <div className="col-md-6">
                <img
                  src="images/Me.jpg"
                  className="img-fluid rounded shadow-lg"
                  alt="Adham Hashem"
                  style={{ maxWidth: "80%", height: "auto" }}
                />
              </div>
            </div>
          </section>

          <section ref={addToSectionRefs} style={{ paddingBottom: "20px" }} className="desktop-only">
            <div className="row">
              <div className="col-md-6">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"
                  className="img-fluid rounded shadow-lg"
                  alt="Skills"
                />
              </div>
              <div className="col-md-6 mb-2">
                <h2 className="text-white mb-3 mt-3">My Skills</h2>
                <p className="text-white mb-2">
                  Proficient in C++, Python, PHP, C#, SQL database management and more. Experienced in cybersecurity practices, including secure coding.
                </p>
              </div>
            </div>
          </section>

          <section ref={addToSectionRefs} style={{ paddingBottom: "20px" }} className="mobile-only">
            <div className="row">
              <div className="col-md-6 mb-2">
                <h2 className="text-white mb-3 mt-3">My Skills</h2>
                <p className="text-white mb-2">
                  Proficient in C++, Python, PHP, C#, SQL database management and more. Experienced in cybersecurity practices, including secure coding.
                </p>
              </div>
              <div className="col-md-6">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"
                  className="img-fluid rounded shadow-lg"
                  alt="Skills"
                />
              </div>
            </div>
          </section>

          <ScrollButtons containerHeight={containerHeight} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;