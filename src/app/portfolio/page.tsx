"use client";

import { useState } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { AIPortfolioHelper } from "@/components/ai/ai-portfolio-helper";

const categories = ["All", "Wedding", "Fashion", "Product", "Maternity", "Baby"];

const galleryItems = [
  { id: 1, cat: "Wedding", img: PlaceHolderImages.find(i => i.id === "portfolio-wedding-1")?.imageUrl, size: "tall", hint: "indian wedding" },
  { id: 2, cat: "Fashion", img: PlaceHolderImages.find(i => i.id === "portfolio-fashion-1")?.imageUrl, size: "short", hint: "fashion model" },
  { id: 3, cat: "Product", img: PlaceHolderImages.find(i => i.id === "portfolio-product-1")?.imageUrl, size: "medium", hint: "luxury watch" },
  { id: 4, cat: "Maternity", img: PlaceHolderImages.find(i => i.id === "portfolio-maternity-1")?.imageUrl, size: "tall", hint: "maternity portrait" },
  { id: 5, cat: "Baby", img: PlaceHolderImages.find(i => i.id === "portfolio-baby-1")?.imageUrl, size: "short", hint: "baby studio" },
  { id: 6, cat: "Wedding", img: "https://picsum.photos/seed/wed2/800/1000", size: "medium", hint: "wedding reception" },
  { id: 7, cat: "Fashion", img: "https://picsum.photos/seed/fash2/800/1200", size: "tall", hint: "editorial fashion" },
  { id: 8, cat: "Product", img: "https://picsum.photos/seed/prod2/800/800", size: "short", hint: "perfume bottle" },
  { id: 9, cat: "Wedding", img: "https://picsum.photos/seed/wed3/800/1100", size: "tall", hint: "indian bride" },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = activeTab === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.cat === activeTab);

  return (
    <div className="pt-32 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-headline tracking-tighter">Portfolio</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            A curated selection of our most poignant visual narratives across genres.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-8 py-3 uppercase tracking-widest text-xs font-semibold border transition-all duration-300",
                activeTab === cat 
                  ? "bg-primary border-primary text-white" 
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className={cn(
                "group relative overflow-hidden rounded-xl bg-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-1",
                item.size === "tall" ? "aspect-[3/5]" : item.size === "medium" ? "aspect-[3/4]" : "aspect-[1/1]"
              )}
            >
              <Image
                src={item.img || ""}
                alt={item.cat}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint={item.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">{item.cat}</span>
                  <h3 className="text-white font-headline text-2xl">Eternal Frame Series</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Assistant */}
        <div className="pt-16 border-t border-border/50">
          <AIPortfolioHelper />
        </div>
      </div>
    </div>
  );
}
