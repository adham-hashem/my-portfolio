import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import gsap from "gsap";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const BRAND_RGB = "81, 43, 212";

const Footer: React.FC = () => {
  const logoRef = useRef<HTMLHeadingElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 24;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.6 + 0.6,
        color: `rgba(${Math.floor(Math.random() * 50 + 80)}, ${Math.floor(
          Math.random() * 40 + 80
        )}, ${Math.floor(Math.random() * 80 + 150)}, 0.30)`,
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
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out" }
      );
    }

    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll("a");
      gsap.fromTo(
        links,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 }
      );
    }

    if (socialsRef.current) {
      const icons = socialsRef.current.querySelectorAll("svg");
      gsap.fromTo(
        icons,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }
      );
    }
  }, []);

  return (
    <div className="container-fluid text-center p-4 footer-container" aria-label="Footer">
      <canvas ref={canvasRef} className="particle-canvas" />

      <h4 ref={logoRef} className="mt-4 mb-4">
        <b className="footer-logo-text">ADHAM HASHEM</b>
      </h4>

      <div ref={linksRef} className="links mb-4">
        <Link className="footer-link" to="/" aria-label="Home Page">
          Home
        </Link>
        <Link className="footer-link" to="/about" aria-label="About Page">
          About
        </Link>
        <Link className="footer-link" to="/contact" aria-label="Contact Page">
          Contact
        </Link>
      </div>

      <div ref={socialsRef} className="mb-4 social-icons d-flex justify-content-center gap-4">
        <a
          href="https://github.com/adham-hashem"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="footer-icon" />
        </a>

        <a
          href="https://www.linkedin.com/in/adham-hashem-12ba59371/?originalSubdomain=eg"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="footer-icon" />
        </a>

        <a
          href="https://wa.me/201013989517"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="footer-icon" />
        </a>

        <a
          href="https://www.facebook.com/adham4040"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
        </a>
      </div>

      <hr className="footer-sep" style={{ border: "1px solid" }} />

      <div style={{ color: "rgba(15,23,42,0.72)", padding: "10px" }}>
        {new Date().getFullYear()} ADHAM HASHEM. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
