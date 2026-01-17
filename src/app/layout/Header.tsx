import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const BRAND_RGB = "81, 43, 212";

const Header: React.FC = () => {
  const navbarRef = useRef<HTMLElement | null>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const brandRef = useRef<HTMLAnchorElement | null>(null);
  const contactButtonRef = useRef<HTMLAnchorElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const addToNavItemsRef = (el: HTMLLIElement | null) => {
    if (el && !navItemsRef.current.includes(el)) navItemsRef.current.push(el);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const nav = navbarRef.current;
    if (!canvas || !nav) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 26;

    const resizeCanvas = () => {
      canvas.width = nav.offsetWidth;
      canvas.height = nav.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.6,
        color: `rgba(${Math.floor(Math.random() * 50 + 80)}, ${Math.floor(
          Math.random() * 40 + 80
        )}, ${Math.floor(Math.random() * 80 + 150)}, 0.35)`,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 95) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${BRAND_RGB}, ${1 - d / 95})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    if (brandRef.current) {
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, y: -16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    if (navItemsRef.current.length > 0) {
      gsap.fromTo(
        navItemsRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.1 }
      );
    }

    if (contactButtonRef.current) {
      gsap.fromTo(
        contactButtonRef.current,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)", delay: 0.2 }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <nav
      ref={(el) => (navbarRef.current = el)}
      className="navbar navbar-expand-sm navbar-light sticky-top app-navbar"
      aria-label="Main navigation"
    >
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="container-fluid">
        <Link ref={brandRef} className="navbar-brand" to="/" aria-label="Adham Hashem Portfolio Home">
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
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="mynavbar">
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
            {/* <li className="nav-item" ref={addToNavItemsRef}>
              <Link className="nav-link" to="/contact" aria-label="Contact Page">
                Contact
              </Link>
            </li> */}
          </ul>

          <div className="contact-button-container">
            <Link ref={contactButtonRef} className="btn contact-us-button" to="/contact" aria-label="Contact Me">
              <i className="fas fa-envelope me-2" />
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
