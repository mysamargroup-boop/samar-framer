"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function CallToAction() {
    return (
        <section className="py-40 px-6 relative overflow-hidden bg-background">
            <div className="absolute inset-0 opacity-10 bg-cover mix-blend-screen" style={{ backgroundImage: `url(${PlaceHolderImages.find(i => i.id === 'texture-gold')?.imageUrl || ""})` }} />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="max-w-5xl mx-auto text-center relative z-10 space-y-8 lg:space-y-12"
            >
                <span className="text-primary font-accent text-4xl lg:text-5xl">Your Story Awaits</span>
                <h2 className="text-2xl lg:text-6xl font-headline leading-tight uppercase">Ready to Create <br /><span className="text-primary italic">Something Eternal?</span></h2>
                <p className="text-muted-foreground text-lg lg:text-xl font-body max-w-2xl mx-auto leading-relaxed italic">
                    Book your session today and let's craft an eternal story together. Limited slots available for the upcoming wedding season.
                </p>
                <div className="pt-8">
                    <Link href="/contact" className="inline-block bg-primary text-primary-foreground hover:bg-accent rounded-full px-12 py-6 text-sm lg:text-base uppercase tracking-widest font-bold shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-primary/20">
                        Request an Invitation
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
