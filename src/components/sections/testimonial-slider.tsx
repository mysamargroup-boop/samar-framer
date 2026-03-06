"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialSlider() {
    const testimonials = [
        {
            quote: "Working with Samar Framer was the best decision we made for our wedding. They didn't just take photos; they captured the emotions we felt in every moment.",
            author: "Ananya & Rohit",
            title: "Palace Wedding - Udaipur"
        },
        {
            quote: "The editorial vision is simply unmatched. Their work elevated our entire fashion campaign to an international standard. Absolute perfection.",
            author: "Riya Verma",
            title: "Fashion Designer - Mumbai"
        },
        {
            quote: "A seamless, white-glove experience from start to finish. They were completely unobtrusive yet managed to capture the most breathtaking candids.",
            author: "Sneha & Vikram",
            title: "Destination Wedding - Italy"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="py-32 bg-card relative overflow-hidden">
            <div className="absolute inset-0 shimmer-effect opacity-30" />
            <div className="max-w-5xl mx-auto px-6 text-center space-y-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                >
                    <span className="text-primary font-accent text-3xl lg:text-4xl">Client Diaries</span>
                    <h2 className="text-4xl lg:text-7xl font-headline uppercase">Voices of Love</h2>
                </motion.div>

                <div className="relative h-[250px] lg:h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.8 }}
                            className="p-8 lg:p-16 border border-primary/20 bg-background/40 backdrop-blur-xl rounded-sm shadow-2xl relative group h-full flex flex-col justify-center"
                        >
                            <Star className="w-8 h-8 lg:w-10 lg:h-10 text-primary/30 absolute -top-4 lg:-top-5 left-1/2 -translate-x-1/2" />
                            <p className="text-xl lg:text-4xl font-body italic leading-relaxed text-foreground/90 mb-8 lg:mb-12">
                                "{testimonials[currentIndex].quote}"
                            </p>
                            <div>
                                <h4 className="font-headline text-xl lg:text-2xl uppercase tracking-[0.3em] text-primary">{testimonials[currentIndex].author}</h4>
                                <p className="text-primary/50 text-[10px] lg:text-xs uppercase tracking-[0.5em] mt-3 font-bold font-body">{testimonials[currentIndex].title}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentIndex ? 'bg-primary w-8' : 'bg-primary/20 w-3 hover:bg-primary/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
