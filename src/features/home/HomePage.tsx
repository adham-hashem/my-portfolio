import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HomePage.css";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";
import ScrollButtons from "../scrollButtons/ScrollButtons";

gsap.registerPlugin(ScrollTrigger);

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

  // Scroll to top only on initial mount
  useEffect(() => {
    // Set scroll position to top on initial mount
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });

    // Set initial container height
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight);
    }
  }, []);

  // Update container height on resize without affecting scroll position
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

  // Framer Motion animation for text (up and down)
  useEffect(() => {
    if (isInView) {
      textControls.start({
        y: [-10, 10, -10],
        transition: {
          repeat: Infinity,
          duration: 3, // Slower animation
          ease: "easeInOut",
          delay: 0.1, // Small delay to allow layout stabilization
        },
      });
    }
  }, [isInView, textControls]);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 50;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (mainContentRef.current) {
        mainContentRef.current.style.height = `${window.innerHeight}px`; // Sync with viewport
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232, 185, 35, 0.6)";
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    };
    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // GSAP animations for other sections
  useEffect(() => {
    if (mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    sectionRefs.current.forEach((section) => {
      const img = section.querySelector("img");
      const text = section.querySelectorAll("h2, p");
      const button = section.querySelector(".learn-more-button");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      if (img) {
        tl.fromTo(
          img,
          { y: -50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );
      }

      if (text.length > 0) {
        tl.fromTo(
          text,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
          "-=0.5"
        );
      }

      if (button) {
        tl.fromTo(
          button,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4"
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
              initial={{ y: 0 }}
            >
              ADHAM HASHEM
            </motion.h1>
          </div>
          <p className="main-content-p">
            .NET Backend Developer & Cybersecurity Student
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
            {/* <Link to="/projects" className="social-icon">
              <i className="fas fa-briefcase"></i>
            </Link> */}
          </div>
          <div className="button-container">
            {/* <Link to="/projects" className="btn-grad">
              View Projects
            </Link> */}
            <a href="mailto:adhamhashem2025@gmail.com" className="btn-grad">
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