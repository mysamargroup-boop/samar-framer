"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: PlaceHolderImages.find(img => img.id === "hero-1")?.imageUrl || "",
    title: "Eternalizing Emotions",
    subtitle: "Luxury Wedding",
    description: "Witness the union of souls through our cinematic lens.",
    hint: "Indian wedding"
  },
  {
    image: PlaceHolderImages.find(img => img.id === "wedding-ritual-1")?.imageUrl || "",
    title: "Sacred Rituals",
    subtitle: "Cultural Elegance",
    description: "Capturing the intricate beauty of traditional ceremonies.",
    hint: "Indian ritual"
  },
  {
    image: PlaceHolderImages.find(img => img.id === "wedding-bride-1")?.imageUrl || "",
    title: "Timeless Portraits",
    subtitle: "Bespoke Bridal",
    description: "Every frame crafted with high-end editorial precision.",
    hint: "Indian bride"
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
            data-ai-hint={slides[current].hint}
          />
          <div className="absolute inset-0 cinematic-overlay" />
          
          {/* Content Container - Improved padding for tablet/mobile safe area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-10 pt-[15vh] sm:pt-[20vh] md:pt-[25vh]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-primary font-accent text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4"
            >
              {slides[current].subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2 }}
              className="font-headline text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 sm:mb-10 tracking-wider leading-tight uppercase max-w-[95%] sm:max-w-4xl"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.2 }}
              className="max-w-xs sm:max-w-xl md:max-w-3xl text-primary/70 text-sm sm:text-lg md:text-2xl mb-10 sm:mb-16 font-body italic"
            >
              {slides[current].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-10 relative z-20"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground rounded-none px-8 sm:px-16 tracking-[0.2em] sm:tracking-[0.3em] py-5 sm:py-8 md:py-10 text-sm sm:text-lg md:text-xl glow-button font-bold uppercase w-full sm:w-auto">
                <Link href="/portfolio">The Portfolio</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 rounded-none px-8 sm:px-16 tracking-[0.2em] sm:tracking-[0.3em] py-5 sm:py-8 md:py-10 text-sm sm:text-lg md:text-xl font-bold uppercase w-full sm:w-auto">
                <Link href="/booking">Book Session</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Scaled down for mobile/tablet */}
      <div className="absolute bottom-6 sm:bottom-12 md:bottom-16 right-6 sm:right-12 md:right-16 flex gap-3 sm:gap-6 z-30">
        <button
          onClick={prevSlide}
          className="p-2.5 sm:p-4 md:p-5 border border-primary/30 hover:bg-primary/20 text-primary transition-all backdrop-blur-md rounded-full group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2.5 sm:p-4 md:p-5 border border-primary/30 hover:bg-primary/20 text-primary transition-all backdrop-blur-md rounded-full group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Progress Bars - Scaled down for mobile */}
      <div className="absolute bottom-6 sm:bottom-12 md:bottom-16 left-6 sm:left-12 md:left-16 flex gap-3 sm:gap-6 z-30">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              width: i === current ? (isMobileScreen ? 40 : 100) : (isMobileScreen ? 15 : 40),
              backgroundColor: i === current ? "hsl(var(--primary))" : "rgba(193,158,95,0.2)"
            }}
            className="h-[2px] sm:h-[3px] cursor-pointer"
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}