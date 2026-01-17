import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollButtons: React.FC<{ containerHeight: number; threshold?: number }> = ({
  containerHeight,
  threshold = 800,
}) => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);
  const topButtonRef = useRef<HTMLButtonElement>(null);
  const bottomButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (containerHeight <= threshold) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowTopButton(scrollTop > 0);
      setShowBottomButton(scrollTop + windowHeight < documentHeight - 2);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerHeight, threshold]);

  useEffect(() => {
    if (topButtonRef.current) {
      if (showTopButton) {
        gsap.fromTo(
          topButtonRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(topButtonRef.current, { opacity: 0, scale: 0.85, duration: 0.25 });
      }
    }

    if (bottomButtonRef.current) {
      if (showBottomButton) {
        gsap.fromTo(
          bottomButtonRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.7)" }
        );
      } else {
        gsap.to(bottomButtonRef.current, { opacity: 0, scale: 0.85, duration: 0.25 });
      }
    }
  }, [showTopButton, showBottomButton]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });

  if (containerHeight <= threshold) return null;

  return (
    <div className="scroll-buttons">
      {showTopButton && (
        <button
          ref={topButtonRef}
          className="scroll-button scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          type="button"
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
          type="button"
        >
          ↓
        </button>
      )}
    </div>
  );
};

export default ScrollButtons;
