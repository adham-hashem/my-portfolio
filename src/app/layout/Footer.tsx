// Footer.tsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter, faWhatsapp, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { gsap } from "gsap";
import "./Footer.css";

const Footer: React.FC = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const particleCount = 30;

    // Set canvas size
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
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
    // Animate logo
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    // Animate links
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll("a");
      if (links.length > 0) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
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
    }

    // Animate social icons
    if (socialsRef.current) {
      const icons = socialsRef.current.querySelectorAll("svg");
      if (icons.length > 0) {
        gsap.fromTo(
          icons,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.7)",
            delay: 0.4,
          }
        );
      }
    }
  }, []);

  return (
    <div className="container-fluid text-white text-center p-4 footer-container" aria-label="Footer">
      <canvas ref={canvasRef} className="particle-canvas"></canvas>
      <h4 ref={logoRef} className="mt-4 mb-4">
        <b style={{ background: "linear-gradient(45deg, #e8b923, #0a3d62)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ADHAM HASHEM
        </b>
      </h4>
      <div ref={linksRef} className="links mb-4">
        <Link className="footer-link" to="/" aria-label="Home Page">
          Home
        </Link>
        <Link className="footer-link" to="/about" aria-label="About Page">
          About
        </Link>
        {/* <Link className="footer-link" to="/what-is-compiler" aria-label="Compiler Page">
          Compiler
        </Link> */}
        <Link className="footer-link" to="/contact" aria-label="Contact Page">
          Contact
        </Link>
      </div>
      <div ref={socialsRef} className="mb-4 social-icons">
        {/* <a href="" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} className="footer-icon" />
        </a>
        <a href="" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} className="footer-icon" />
        </a> */}
        <a href="https://wa.me/+201028110927" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <FontAwesomeIcon icon={faWhatsapp} className="footer-icon" />
        </a>
        <a href="https://www.facebook.com/adham4040" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
        </a>
      </div>
      <hr style={{ border: "1px solid #e8b923" }} />
      <div style={{ color: "white", padding: "10px" }}>
        © {new Date().getFullYear()} ADHAM HASHEM. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;