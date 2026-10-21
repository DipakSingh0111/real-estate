"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export const GsapEffects: React.FC = () => {
  useEffect(() => {
    // Wait for GSAP script to be available on window
    const initGsap = () => {
      if (typeof window === "undefined" || !window.gsap) {
        setTimeout(initGsap, 100);
        return;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      // 1. Hero Content Entrance Animation
      gsap.fromTo(
        ".gsap-hero-title",
        { opacity: 0, y: 40, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.2 }
      );

      const heroFilter = document.querySelector(".gsap-hero-filter");
      if (heroFilter) {
        gsap.fromTo(
          heroFilter,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.4 }
        );
      }

      // 2. Featured Listing Cards Stagger Reveal
      const listingCards = document.querySelectorAll(".gsap-listing-card");
      if (listingCards.length > 0) {
        gsap.fromTo(
          listingCards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#listings",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Prime Indian Cities Slider Cards Entrance
      const cityCards = document.querySelectorAll(".gsap-city-card");
      if (cityCards.length > 0) {
        gsap.fromTo(
          cityCards,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#cities",
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Latest Projects Stagger
      const projectCards = document.querySelectorAll(".gsap-project-card");
      if (projectCards.length > 0) {
        gsap.fromTo(
          projectCards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#developments",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 5. Section Headers Fade Up
      const sectionHeaders = document.querySelectorAll(".gsap-header");
      sectionHeaders.forEach((header) => {
        gsap.fromTo(
          header,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    };

    initGsap();
  }, []);

  return null;
};
