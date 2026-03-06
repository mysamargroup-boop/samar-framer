
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Wedding", "Fashion", "Product", "Maternity", "Baby"];

const galleryItems = [
  { id: 1, cat: "Wedding", img: PlaceHolderImages.find(i => i.id === "portfolio-wedding-1")?.imageUrl, size: "tall", hint: "indian wedding" },
  { id: 2, cat: "Fashion", img: PlaceHolderImages.find(i => i.id === "portfolio-fashion-1")?.imageUrl, size: "short", hint: "fashion model" },
  { id: 3, cat: "Wedding", img: PlaceHolderImages.find(i => i.id === "wedding-ritual-1")?.imageUrl, size: "tall", hint: "indian ritual" },
  { id: 4, cat: "Maternity", img: PlaceHolderImages.find(i => i.id === "portfolio-maternity-1")?.imageUrl, size: "tall", hint: "maternity portrait" },
  { id: 5, cat: "Baby", img: PlaceHolderImages.find(i => i.id === "portfolio-baby-1")?.imageUrl, size: "short", hint: "baby studio" },
  { id: 6, cat: "Wedding", img: PlaceHolderImages.find(i => i.id === "wedding-bride-1")?.imageUrl, size: "medium", hint: "indian bride" },
  { id: 7, cat: "Fashion", img: "https://picsum.photos/seed/fash2/800/1200", size: "tall", hint: "editorial fashion" },
  { id: 8, cat: "Product", img: PlaceHolderImages.find(i => i.id === "portfolio-product-1")?.imageUrl, size: "short", hint: "perfume bottle" },
  { id: 9, cat: "Wedding", img: PlaceHolderImages.find(i => i.id === "wedding-decor-1")?.imageUrl, size: "tall", hint: "indian wedding decor" },
];

export default function PortfolioPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeTab, setActiveTab] = useState(initialCategory);

  useEffect(() => {
    setActiveTab(initialCategory);
  }, [initialCategory]);

  const filteredItems = activeTab === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.cat.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="pt-32 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-headline tracking-tighter"
          >
            Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto font-body"
          >
            A curated selection of our most poignant visual narratives across genres.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-8 py-3 uppercase tracking-widest text-xs font-semibold border transition-all duration-300 relative overflow-hidden group",
                activeTab.toLowerCase() === cat.toLowerCase() 
                  ? "bg-primary border-primary text-white" 
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              )}
            >
              <span className="relative z-10">{cat}</span>
              {activeTab.toLowerCase() === cat.toLowerCase() && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary z-0"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid with Animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "group relative overflow-hidden rounded-xl bg-card transition-all duration-500 hover:shadow-2xl",
                  item.size === "tall" ? "aspect-[3/5]" : item.size === "medium" ? "aspect-[3/4]" : "aspect-[1/1]"
                )}
              >
                <Image
                  src={item.img || ""}
                  alt={item.cat}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint={item.hint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">{item.cat}</span>
                    <h3 className="text-white font-headline text-2xl">Eternal Frame Series</h3>
                    <div className="w-10 h-[2px] bg-primary mt-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
