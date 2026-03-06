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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-primary font-accent text-4xl md:text-6xl mb-6"
            >
              {slides[current].subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2 }}
              className="font-headline text-6xl md:text-9xl mb-10 tracking-wider leading-tight uppercase"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1.2 }}
              className="max-w-3xl text-primary/70 text-xl md:text-2xl mb-16 font-body italic"
            >
              {slides[current].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1.2 }}
              className="flex flex-col sm:flex-row gap-10"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground rounded-none px-16 tracking-[0.3em] py-10 text-xl glow-button font-bold uppercase">
                <Link href="/portfolio">The Portfolio</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 rounded-none px-16 tracking-[0.3em] py-10 text-xl font-bold uppercase">
                <Link href="/booking">Book Session</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-16 right-16 flex gap-6 z-20">
        <button
          onClick={prevSlide}
          className="p-5 border border-primary/30 hover:bg-primary/20 text-primary transition-all backdrop-blur-md rounded-full"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="p-5 border border-primary/30 hover:bg-primary/20 text-primary transition-all backdrop-blur-md rounded-full"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-16 left-16 flex gap-6 z-20">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              width: i === current ? 100 : 40,
              backgroundColor: i === current ? "hsl(var(--primary))" : "rgba(193,158,95,0.2)"
            }}
            className="h-[3px] cursor-pointer"
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
