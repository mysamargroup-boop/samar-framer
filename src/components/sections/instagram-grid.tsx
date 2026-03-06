"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function InstagramGrid() {
    const instaImages = [
        { id: 1, img: PlaceHolderImages.find(i => i.id === 'portfolio-wedding-1')?.imageUrl },
        { id: 2, img: PlaceHolderImages.find(i => i.id === 'portfolio-fashion-1')?.imageUrl },
        { id: 3, img: PlaceHolderImages.find(i => i.id === 'hero-1')?.imageUrl },
        { id: 4, img: PlaceHolderImages.find(i => i.id === 'portfolio-product-1')?.imageUrl },
        { id: 5, img: PlaceHolderImages.find(i => i.id === 'portfolio-wedding-2')?.imageUrl },
        { id: 6, img: PlaceHolderImages.find(i => i.id === 'about-hero')?.imageUrl },
    ];

    return (
        <section className="py-24 bg-card/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <span className="text-primary font-accent text-3xl lg:text-4xl inline-block">Join our Journey</span>
                    <h2 className="text-4xl lg:text-6xl font-accent lowercase tracking-wider text-primary/90">@samarframer</h2>
                    <p className="text-muted-foreground font-body italic">Follow us on Instagram for daily inspiration and behind-the-scenes magic.</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
                {instaImages.map((post, idx) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="relative aspect-square group overflow-hidden"
                    >
                        <Image
                            src={post.img || ""}
                            alt="Instagram Post"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        {/* Hover overlay with Instagram Icon */}
                        <Link
                            href="https://instagram.com/samarframer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
                        >
                            <Instagram className="text-white w-8 h-8 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
