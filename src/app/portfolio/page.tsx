"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Image as ImageIcon, Sparkles, Heart, Baby, ShoppingBag, Youtube, Play, X } from "lucide-react";
import portfolioData from "@/lib/portfolio.json";

const categories = [
  { name: "All", icon: <ImageIcon size={18} /> },
  { name: "Wedding", icon: <Heart size={18} /> },
  { name: "Fashion", icon: <Sparkles size={18} /> },
  { name: "Product", icon: <ShoppingBag size={18} /> },
  { name: "Maternity", icon: <Camera size={18} /> },
  { name: "Baby", icon: <Baby size={18} /> },
  { name: "Videos", icon: <Youtube size={18} /> }
];

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=)([^&?]+)/);
  return match ? match[1] : null;
}

const galleryItems = portfolioData.map(item => {
  let imgUrl = item.placeholderId
    ? PlaceHolderImages.find(i => i.id === item.placeholderId)?.imageUrl
    : undefined;

  if (!imgUrl && item.videoUrl) {
    const videoId = getYouTubeId(item.videoUrl);
    if (videoId) {
      imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  }

  return {
    ...item,
    img: imgUrl
  };
});

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeTab, setActiveTab] = useState(initialCategory);
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  useEffect(() => {
    setActiveTab(initialCategory);
  }, [initialCategory]);

  const filteredItems = activeTab === "All"
    ? galleryItems
    : galleryItems.filter(item => item.cat.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="pt-32 pb-40 md:pb-24 px-6 bg-background">
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

        {/* Desktop Filters */}
        <div className="hidden md:flex flex-wrap justify-center gap-4">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveTab(cat.name)}
              className={cn(
                "px-8 py-3 uppercase tracking-widest text-xs font-bold border transition-all duration-300 relative overflow-hidden group rounded-full",
                activeTab.toLowerCase() === cat.name.toLowerCase()
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              )}
            >
              <span className="relative z-10">{cat.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Masonry Grid with Animations */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                layoutId={`gallery-item-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl bg-card transition-all duration-500 hover:shadow-2xl cursor-pointer",
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                  {item.videoUrl && (
                    <div className="w-16 h-16 bg-primary/90 text-white rounded-full flex items-center justify-center translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 p-4 md:p-12 cursor-pointer pt-20"
              onClick={() => setSelectedItem(null)}
            >
              <button
                className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white bg-white/10 p-3 rounded-full hover:bg-primary transition-colors z-50"
                onClick={() => setSelectedItem(null)}
              >
                <X size={24} />
              </button>
              <motion.div
                layoutId={`gallery-item-${selectedItem.id}`}
                className={cn(
                  "relative w-full rounded-2xl overflow-hidden bg-black/50 shadow-2xl flex items-center justify-center",
                  selectedItem.videoUrl ? "max-w-6xl aspect-video" : "max-w-4xl h-[80vh]"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {selectedItem.videoUrl ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedItem.videoUrl + "?autoplay=1"}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <Image
                    src={selectedItem.img || ""}
                    alt={selectedItem.cat}
                    fill
                    className="object-contain"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Nav Footer (Gallery Only) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-[100]">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-card/80 backdrop-blur-2xl border border-primary/20 rounded-full py-4 px-6 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                activeTab.toLowerCase() === cat.name.toLowerCase()
                  ? "text-primary scale-110"
                  : "text-muted-foreground opacity-50"
              )}
            >
              <div className={cn(
                "p-2 rounded-full transition-colors",
                activeTab.toLowerCase() === cat.name.toLowerCase() && "bg-primary/10"
              )}>
                {cat.icon}
              </div>
              <span className="text-[8px] uppercase font-bold tracking-tighter">{cat.name}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 flex justify-center text-primary font-headline text-2xl">Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
