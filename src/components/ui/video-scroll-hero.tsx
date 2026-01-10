"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VideoScrollHeroProps {
  videoSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
  title?: string;
  subtitle?: string;
}

export function VideoScrollHero({
  videoSrc = "https://videos.pexels.com/video-files/5765191/5765191-uhd_2560_1440_30fps.mp4",
  enableAnimations = true,
  className = "",
  startScale = 0.25,
  title = "Construímos o Seu Futuro",
  subtitle = "Excelência em construção civil e remodelações",
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      
      const newScale = startScale + (progress * (1 - startScale));
      setScrollScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale]);

  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  return (
    <div ref={containerRef} className={`relative h-[300vh] ${className}`}>
      {/* Hero Section with Video */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Fixed Video Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            style={{
              width: shouldAnimate ? `${scrollScale * 100}%` : '100%',
              height: shouldAnimate ? `${scrollScale * 100}%` : '100%',
            }}
            initial={{ scale: startScale }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay Content */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-center px-4"
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-montserrat mb-4">
                  {title}
                </h1>
                <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                  {subtitle}
                </p>
                
                {/* Scroll Indicator */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mt-12"
                >
                  <div className="w-8 h-12 border-2 border-white/50 rounded-full mx-auto flex items-start justify-center p-2">
                    <motion.div
                      animate={{ y: [0, 16, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-3 bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default VideoScrollHero;
