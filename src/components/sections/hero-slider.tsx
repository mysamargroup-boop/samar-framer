
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
    subtitle: "Luxury Wedding Photography",
    description: "Witness the union of souls through our cinematic lens.",
    hint: "Indian wedding"
  },
  {
    image: PlaceHolderImages.find(img => img.id === "wedding-ritual-1")?.imageUrl || "",
    title: "The Sacred Rituals",
    subtitle: "Cultural Excellence",
    description: "Capturing the intricate beauty of traditional ceremonies.",
    hint: "Indian ritual"
  },
  {
    image: PlaceHolderImages.find(img => img.id === "wedding-bride-1")?.imageUrl || "",
    title: "Timeless Portraits",
    subtitle: "Bespoke Bridal Photography",
    description: "Every frame crafted with high-end editorial precision.",
    hint: "Indian bride"
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-headline text-accent uppercase tracking-[0.4em] text-sm md:text-lg mb-4"
            >
              {slides[current].subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="font-headline text-5xl md:text-8xl mb-6 tracking-tight leading-tight"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="max-w-2xl text-muted-foreground text-lg mb-10 font-body"
            >
              {slides[current].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-12 tracking-widest py-8 text-lg glow-button">
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black rounded-none px-12 tracking-widest py-8 text-lg">
                <Link href="/booking">Book a Session</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-20">
        <button
          onClick={prevSlide}
          className="p-3 border border-white/20 hover:bg-white/10 text-white transition-all backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 border border-white/20 hover:bg-white/10 text-white transition-all backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-10 left-10 flex gap-4 z-20">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              width: i === current ? 80 : 48,
              backgroundColor: i === current ? "hsl(var(--primary))" : "rgba(255,255,255,0.2)"
            }}
            className="h-[2px] cursor-pointer"
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
