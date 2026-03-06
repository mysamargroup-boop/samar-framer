"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Star, Zap } from "lucide-react";

export function WhyChooseUs() {
    const whyChooseUs = [
        { title: 'Award Winning', desc: 'Recognized globally for our editorial vision', icon: <Award className="w-8 h-8 lg:w-12 lg:h-12 text-primary" /> },
        { title: 'Premium Gear', desc: 'Shooting exclusively on cinema-grade equipment', icon: <Zap className="w-8 h-8 lg:w-12 lg:h-12 text-primary" /> },
        { title: 'Global Coverage', desc: 'Available for luxury destinations worldwide', icon: <Star className="w-8 h-8 lg:w-12 lg:h-12 text-primary" /> },
        { title: 'Discrete Service', desc: 'White-glove experience for high-profile clients', icon: <ShieldCheck className="w-8 h-8 lg:w-12 lg:h-12 text-primary" /> },
    ];

    return (
        <section className="py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 lg:gap-20">
                {whyChooseUs.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                        className="text-center space-y-10 group"
                    >
                        <div className="mx-auto w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-primary/20 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
                            <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                                {feature.icon}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-headline text-lg lg:text-xl uppercase tracking-[0.4em] text-primary whitespace-nowrap">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground text-[10px] lg:text-xs leading-relaxed font-body uppercase tracking-[0.1em] max-w-[200px] mx-auto">
                                {feature.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
