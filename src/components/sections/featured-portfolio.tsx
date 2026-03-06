"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const featuredPortfolio = [
    { id: 'Weddings', title: 'Royal Unions', image: PlaceHolderImages.find(i => i.id === 'portfolio-wedding-1')?.imageUrl, hint: "Cinematic Indian Wedding" },
    { id: 'Fashion', title: 'Haute Couture', image: PlaceHolderImages.find(i => i.id === 'portfolio-fashion-1')?.imageUrl, hint: "High-end Fashion Editorial" },
    { id: 'Products', title: 'Luxury Goods', image: PlaceHolderImages.find(i => i.id === 'portfolio-product-1')?.imageUrl, hint: "Premium Product Photography" },
];

export function FeaturedPortfolio() {
    return (
        <section className="py-24 bg-card/50">
            <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-4">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-primary font-accent text-3xl lg:text-4xl"
                >
                    The Collection
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl lg:text-7xl font-headline uppercase tracking-tight"
                >
                    Explore Our Universe
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {featuredPortfolio.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                        className="relative aspect-[3/4] overflow-hidden group border-r border-primary/10 last:border-0"
                    >
                        <Link href={`/portfolio?category=${item.id}`} className="block h-full w-full">
                            <Image
                                src={item.image || ""}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                data-ai-hint={item.hint}
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center text-center p-8 lg:p-12 backdrop-blur-sm">
                                <span className="text-primary font-accent text-2xl lg:text-3xl mb-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">{item.title}</span>
                                <div className="w-16 h-px bg-primary/50 mb-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100" />
                                <span className="text-white text-[10px] lg:text-xs uppercase tracking-[0.5em] font-bold translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-200">Enter Gallery</span>
                            </div>
                            <div className="absolute bottom-12 left-12 group-hover:opacity-0 transition-opacity duration-500">
                                <h3 className="text-white font-headline text-2xl lg:text-3xl tracking-widest drop-shadow-2xl">{item.title}</h3>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
