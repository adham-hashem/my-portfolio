import React, { useEffect } from "react";
import Header from "../../app/layout/Header";
import Footer from "../../app/layout/Footer";

const services = [
  {
    title: ".NET Backend APIs",
    desc: "Clean REST APIs with consistent validation, error handling, and maintainable architecture.",
    icon: "fas fa-cubes",
    tags: ["ASP.NET Core", "REST", "EF Core"],
  },
  {
    title: "Auth & Security",
    desc: "Authentication, authorization, and security-aware coding practices aligned with common best practices.",
    icon: "fas fa-shield-alt",
    tags: ["JWT", "OAuth", "OWASP"],
  },
  {
    title: "React Frontend",
    desc: "Responsive UI with maintainable components, smooth interactions, and consistent branding.",
    icon: "fas fa-layer-group",
    tags: ["React", "TypeScript", "UI/UX"],
  },
];

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="services-page">
      <Header />

      <div className="container-fluid main-background-color py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h1 className="mb-2" style={{ fontWeight: 800 }}>
              Services with a <span className="main-color">professional</span> finish
            </h1>
            <p className="mb-0" style={{ color: "var(--muted)" }}>
              Clean delivery, strong structure, and consistent violet branding.
            </p>
          </div>

          <div className="row g-3">
            {services.map((s, idx) => (
              <div key={idx} className="col-md-4">
                <div className="service-card p-4 h-100">
                  <div className="service-icon">
                    <i className={s.icon} />
                  </div>

                  <h4 className="mt-3" style={{ fontWeight: 800 }}>
                    {s.title}
                  </h4>

                  <p className="service-desc mb-2">{s.desc}</p>

                  <div>
                    {s.tags.map((t) => (
                      <span key={t} className="service-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <a href="/contact" className="btn learn-more-button px-4 py-2">
              Contact for details
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
