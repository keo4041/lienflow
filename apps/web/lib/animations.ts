import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const glassmorphismVariants: Variants = {
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const ctaPulse: Variants = {
  initial: { boxShadow: "0 0 0 0 rgba(44, 160, 28, 0.4)" },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(44, 160, 28, 0.4)",
      "0 0 0 15px rgba(44, 160, 28, 0)",
      "0 0 0 0 rgba(44, 160, 28, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const parallaxY = (offset: number = 50): Variants => ({
  initial: { y: 0 },
  animate: {
    y: offset,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
});
