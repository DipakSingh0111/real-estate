"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  direction = "up",
  className = "",
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: -60, y: 0 };
      case "right":
        return { opacity: 0, x: 60, y: 0 };
      case "down":
        return { opacity: 0, x: 0, y: -yOffset };
      case "none":
        return { opacity: 0, x: 0, y: 0 };
      case "up":
      default:
        return { opacity: 0, x: 0, y: yOffset };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealStagger: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.15, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealChild: React.FC<{
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  className?: string;
}> = ({ children, direction = "up", className = "" }) => {
  const getInitial = () => {
    if (direction === "left") return { opacity: 0, x: -50, y: 0 };
    if (direction === "right") return { opacity: 0, x: 50, y: 0 };
    return { opacity: 0, x: 0, y: 35 };
  };

  return (
    <motion.div
      variants={{
        hidden: getInitial(),
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealCard: React.FC<{
  children: React.ReactNode;
  index: number;
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ children, index, delay = 0, duration = 0.85, className = "" }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -70 : 70, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay: delay + (index % 4) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
