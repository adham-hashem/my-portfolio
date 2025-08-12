import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../../app/layout/Header';
import Footer from '../../app/layout/Footer';
import './CertificatesPage.css';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  { name: 'eJPT Certificate', file: 'eJPT-certificate.jpg' },
  { name: 'Web Development Challenger Track Certificate', file: 'Web-Development-Challenger-Track-certificate.jpg' },
  { name: 'Python Programming Basics Certificate', file: 'Course-Certificate-En-python-programming-basics-certificate.png' },
  { name: 'OWASP Top 10 Certificate', file: 'Course-Certificate-En-owasp-certificate.png' },
  { name: 'Introduction To Network Security Certificate', file: 'Attendance-Certificate-Introduction-To-Network-Security-Certificate.png' },
  { name: 'Implementation Of Computer Network Fundamentals Certificate', file: 'Course-Certificate-En-implementation-of-computer-network-fundamentals.png' },
  { name: 'Ethical Hacking Certificate', file: 'Course-Certificate-En-(1).png' },
  { name: 'Computer Network Fundamentals Certificate', file: 'Course-Certificate-En.png' },
  { name: 'C# Basic Certificate', file: 'c-sharp-basic-certificate.png' },
  { name: 'Javascript Intermediate Certificate', file: 'javascript_intermediate certificate.jpg' },
  { name: 'Python Basic Certificate', file: 'python-basic-certificate.png' },
  { name: 'SQL Basic Certificate', file: 'sql-basic-certificate.png' },
  { name: 'SQL Advanced Certificate', file: 'sql-advanced-certificate.png' },
  { name: 'PHP Certificate', file: 'PHP-certificate.jpg' },
  { name: 'ITI Web Development Using .NET - Mansoura Branch', file: 'ITI-Mansoura-summer-training-certificate.jpg' },
  { name: 'ITI .NET Full Stack - Minya Branch', file: 'ITI-Minya-summer-training-cerificate.jpg' },
];

const CertificatesPage: React.FC = () => {

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: 'auto' });

    // GSAP animations for certificate cards
    gsap.fromTo(
      '.certificate-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.certificate-card',
          start: 'top 80%',
          end: 'bottom 20%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid main-background-color py-5">
        <h1 className="text-white text-center mb-5">
          My <span className="main-color">Certificates</span>
        </h1>
        <div className="row">
          {certificates.map((certificate, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-3 bg-dark text-white shadow-lg certificate-card">
                <div className="card-body text-center">
                  <h5 className="card-title text-white">{certificate.name}</h5>
                  <a
                    href={`/images/certificates/${certificate.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/images/certificates/${certificate.file}`}
                      alt={certificate.name}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CertificatesPage;