// Header.tsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Header.css";

gsap.registerPlugin(ScrollTrigger);

const Header: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const contactButtonRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Add refs to nav items
  const addToNavItemsRef = (el: HTMLLIElement | null) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current.push(el);
    }
  };

  // Particle background with connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const particleCount = 30; // Adjusted for header size and performance

    // Set canvas size
    const resizeCanvas = () => {
      if (navbarRef.current) {
        canvas.width = navbarRef.current.offsetWidth;
        canvas.height = navbarRef.current.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(${Math.random() * 50 + 200}, ${Math.random() * 50 + 150}, 35, 0.6)`,
      });
    }

    // Animate particles
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
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
          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(232, 185, 35, ${1 - distance / 80})`;
            ctx.lineWidth = 0.4;
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

  // GSAP animations
  useEffect(() => {
    // Animate navbar on scroll
    if (navbarRef.current) {
      gsap.to(navbarRef.current, {
        boxShadow: "0 4px 20px rgba(232, 185, 35, 0.4)",
        background: "linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(10, 61, 98, 0.9) 50%, rgba(75, 0, 130, 0.9) 100%)",
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "top+=100",
          scrub: 1,
        },
      });
    }

    // Animate navbar brand
    if (brandRef.current) {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    // Animate nav items with stagger
    if (navItemsRef.current.length > 0) {
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }

    // Animate contact button
    if (contactButtonRef.current) {
      gsap.fromTo(
        contactButtonRef.current,
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.4,
        }
      );
    }
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-sm navbar-dark sticky-top"
      aria-label="Main navigation"
    >
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <div className="container-fluid">
        <Link
          ref={brandRef}
          className="navbar-brand"
          to="/"
          aria-label="Adham Hashem Portfolio Home"
        >
          <b>Adham Hashem</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
          aria-controls="mynavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="mynavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/" aria-label="Home Page">
                Home
              </Link>
            </li>
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/about" aria-label="About Page">
                About
              </Link>
            </li>
            {/* <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/projects" aria-label="Projects Page">
                Projects
              </Link>
            </li> */}
            <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/certificates" aria-label="Certificates Page">
                Certificates
              </Link>
            </li>
          </ul>
          <div className="contact-button-container">
            <Link
              ref={contactButtonRef}
              className="btn contact-us-button pulse"
              to="/contact"
              aria-label="Contact Me"
            >
              <i className="fas fa-envelope me-2"></i>Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;