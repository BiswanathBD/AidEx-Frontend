import { useEffect, useRef } from "react";

const useScrollAnimation = (className = "scroll-animate-card") => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove any existing animation classes
            entry.target.classList.remove("animate-out");
            // Add animate class
            entry.target.classList.add("animate");
          } else {
            // Remove animate class and add animate-out class
            entry.target.classList.remove("animate");
            entry.target.classList.add("animate-out");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const currentCards = cardsRef.current;
    currentCards.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentCards.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return cardsRef;
};

export default useScrollAnimation;
