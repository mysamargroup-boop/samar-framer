"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function CinematicFilms() {
    // We add 4 videos instead of 2 for a richer grid layout, as requested.
    const videos = [
        { id: 'vid-1', title: 'The Royal Union', thumb: PlaceHolderImages.find(i => i.id === 'hero-1')?.imageUrl, type: 'Wedding Film', size: 'large' },
        { id: 'vid-2', title: 'Fashion Campaign 24', thumb: PlaceHolderImages.find(i => i.id === 'portfolio-fashion-1')?.imageUrl, type: 'Editorial', size: 'regular' },
        { id: 'vid-3', title: 'A Monsoon Romance', thumb: PlaceHolderImages.find(i => i.id === 'portfolio-wedding-2')?.imageUrl, type: 'Pre-Wedding', size: 'regular' },
        { id: 'vid-4', title: 'The Legacy Collection', thumb: PlaceHolderImages.find(i => i.id === 'portfolio-product-1')?.imageUrl, type: 'Brand Film', size: 'regular' },
    ];

    return (
        <section className="pt-32 pb-16 bg-background relative overflow-hidden text-center sm:text-left">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-accent text-3xl lg:text-4xl inline-block"
                        >
                            Motion Artistry
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            // Decreased font size from text-5xl/8xl to text-4xl/6xl as requested
                            className="text-4xl lg:text-6xl font-headline uppercase leading-none"
                        >
                            Cinematic <br /><span className="text-primary">Films</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-sm text-muted-foreground text-sm font-body italic leading-relaxed md:text-right mx-auto md:mx-0"
                    >
                        Beyond still frames lies the rhythm of your story. Our wedding films are crafted with high-end editorial precision and soul.
                    </motion.p>
                </div>

                {/* 2-column grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map((video, idx) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-video"
                        >
                            <Image
                                src={video.thumb || ""}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current translate-x-0.5" />
                                </div>
                            </div>
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 space-y-2 max-w-[80%]">
                                <span className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold">{video.type}</span>
                                <h3 className="text-white font-headline uppercase tracking-wider leading-tight drop-shadow-md text-xl md:text-3xl">{video.title}</h3>
                            </div>
                            <Link href="/portfolio?category=Videos" className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button asChild variant="ghost" className="text-primary hover:text-accent hover:bg-transparent group">
                        <Link href="/portfolio?category=Videos" className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.4em]">
                            View All Cinematic Films
                            <div className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-500" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
