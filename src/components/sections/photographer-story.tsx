"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function PhotographerStory() {
    const photographerImage = PlaceHolderImages.find(i => i.id === 'about-hero')?.imageUrl || "";

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Circular Portrait Image */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center"
                >
                    <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] rounded-full overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/10">
                        <Image
                            src={photographerImage}
                            alt="Samar - Lead Photographer"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>
                </motion.div>

                {/* Story Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-10"
                >
                    <div className="space-y-4">
                        <span className="text-primary font-accent text-3xl lg:text-4xl block">The Artist Behind the Lens</span>
                        <h2 className="text-4xl lg:text-5xl font-headline leading-tight pr-4">Crafting <br /><span className="text-primary italic">Soulful Frames</span></h2>
                    </div>

                    <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-body italic">
                        <p>
                            Founded on the vibrant streets of Mumbai, Samar Framer is more than a studio—it's a sanctuary for cinematic preservation. I am Samar, the visionary behind these captures.
                        </p>
                        <p>
                            With over a decade of experience, my goal is to document the silent whispers, the raw emotions, and the grand tapestries of Indian heritage through a luxury lens. Every project is an intimate collaboration to tell your unique story.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        {[
                            { title: 'Cinematic Visuals', desc: 'Editorial grade storytelling' },
                            { title: 'Luxury Post-Pro', desc: 'Expert retouching & grading' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border">
                                <div className="w-10 h-10 rounded-full border border-primary/40 flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">{item.title}</h4>
                                    <p className="text-[10px] text-muted-foreground mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row items-center gap-8 justify-between border-t border-border">
                        <button className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-12 py-6 text-sm uppercase tracking-widest font-bold shadow-xl transition-all duration-500 hover:scale-105 w-full sm:w-auto">
                            <Link href="/about">Discover The Legacy</Link>
                        </button>
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2 font-bold">Creative Director</p>
                            <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3rem', lineHeight: '1' }} className="text-primary">
                                Samar
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
