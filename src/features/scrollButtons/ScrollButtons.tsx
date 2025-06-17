import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ScrollButtons.css";

const ScrollButtons: React.FC<{ containerHeight: number; threshold?: number }> = ({ containerHeight, threshold = 800 }) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);
  const topButtonRef = useRef<HTMLButtonElement>(null);
  const bottomButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Only show buttons if the container height exceeds the threshold
    if (containerHeight <= threshold) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show "Top" button if not at the top
      setShowTopButton(scrollTop > 0);
      // Show "Bottom" button if not at the bottom
      setShowBottomButton(scrollTop + windowHeight < documentHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerHeight, threshold]);

  useEffect(() => {
    // Animate top button
    if (topButtonRef.current) {
      if (showTopButton) {
        gsap.fromTo(
          topButtonRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(topButtonRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });
      }
    }

    // Animate bottom button
    if (bottomButtonRef.current) {
      if (showBottomButton) {
        gsap.fromTo(
          bottomButtonRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(bottomButtonRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });
      }
    }
  }, [showTopButton, showBottomButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  if (containerHeight <= threshold) return null;

  return (
    <div className="scroll-buttons">
      {showTopButton && (
        <button
          ref={topButtonRef}
          className="scroll-button scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
      {showBottomButton && (
        <button
          ref={bottomButtonRef}
          className="scroll-button scroll-to-bottom"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          ↓
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;