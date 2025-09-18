import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
  whileHover?: any;
  whileTap?: any;
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  className = "", 
  onClick,
  whileHover = { scale: 1.02, y: -2 },
  whileTap = { scale: 0.98 }
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay,
        ease: "easeOut"
      }}
      whileHover={whileHover}
      whileTap={whileTap}
      className={`cursor-pointer transition-shadow duration-200 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function FadeInUp({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideInLeft({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PulseOnMount({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
