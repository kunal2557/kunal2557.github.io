import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MapPin, Star, Zap } from "lucide-react";

interface AppLaunchAnimationProps {
  onComplete: () => void;
}

export default function AppLaunchAnimation({ onComplete }: AppLaunchAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  const steps = [
    { icon: Car, text: "Finding parking spots...", color: "text-blue-500" },
    { icon: MapPin, text: "Locating nearby areas...", color: "text-green-500" },
    { icon: Star, text: "Loading premium spots...", color: "text-yellow-500" },
    { icon: Zap, text: "Ready to park!", color: "text-purple-500" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setTimeout(() => {
          setShowLogo(false);
          setTimeout(onComplete, 500);
        }, 1000);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete]);

  return (
    <AnimatePresence>
      {showLogo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center z-50"
        >
          <div className="text-center space-y-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 1 
              }}
              className="relative"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <Car className="h-12 w-12 text-blue-600" />
              </div>
              
              {/* Pulsing rings */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 border-4 border-white rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute inset-0 border-2 border-white rounded-full"
              />
            </motion.div>

            {/* App Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="text-4xl font-bold text-white">SmartPark</h1>
              <p className="text-blue-100 text-lg">Smart Parking Solutions</p>
            </motion.div>

            {/* Loading Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="space-y-6"
            >
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3, x: -20 }}
                    animate={{ 
                      opacity: isActive ? 1 : isCompleted ? 0.7 : 0.3,
                      x: isActive ? 0 : -20,
                      scale: isActive ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center space-x-3"
                  >
                    <motion.div
                      animate={isActive ? { 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      } : {}}
                      transition={{ 
                        duration: 0.8,
                        ease: "easeInOut"
                      }}
                    >
                      <Icon className={`h-6 w-6 ${isActive ? step.color : 'text-white/50'}`} />
                    </motion.div>
                    <span className={`text-lg ${isActive ? 'text-white font-medium' : 'text-white/70'}`}>
                      {step.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="w-64 mx-auto"
            >
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>0%</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                <span>100%</span>
              </div>
            </motion.div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: window.innerHeight + 50,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -50,
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                  className="absolute w-2 h-2 bg-white rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
