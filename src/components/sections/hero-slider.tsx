"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: PlaceHolderImages.find(img => img.id === "hero-1")?.imageUrl || "",
    title: "Eternalizing Emotions",
    subtitle: "Luxury Wedding Photography",
    description: "Witness the union of souls through our cinematic lens.",
    hint: "Indian wedding"
  },
  {
    image: PlaceHolderImages.find(img => img.id === "hero-2")?.imageUrl || "",
    title: "The Art of Fashion",
    subtitle: "Editorial & Commercial",
    description: "Pushing the boundaries of visual storytelling in fashion.",
    hint: "fashion photography"
  },
  {
    image: PlaceHolderImages.find(img => img.id === "hero-3")?.imageUrl || "",
    title: "Exquisite Details",
    subtitle: "Product & Still Life",
    description: "Capturing the elegance of luxury products.",
    hint: "product luxury"
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            data-ai-hint={slide.hint}
          />
          <div className="absolute inset-0 cinematic-overlay" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="font-headline text-accent uppercase tracking-[0.4em] text-sm md:text-lg mb-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
              {slide.subtitle}
            </span>
            <h1 className="font-headline text-5xl md:text-8xl mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {slide.title}
            </h1>
            <p className="max-w-2xl text-muted-foreground text-lg mb-10 font-body animate-in fade-in slide-in-from-bottom-12 duration-1200">
              {slide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-14 duration-1500">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-12 tracking-widest py-8 text-lg">
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black rounded-none px-12 tracking-widest py-8 text-lg">
                <Link href="/booking">Book a Session</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

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
          <div
            key={i}
            className={`h-[2px] w-12 transition-all duration-300 ${
              i === current ? "bg-primary w-20" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
