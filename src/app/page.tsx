"use client";

import { HeroSlider } from "@/components/sections/hero-slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Star, Award, ShieldCheck, Zap, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const featuredPortfolio = [
    { id: 'wedding-couple', title: 'Grand Weddings', image: PlaceHolderImages.find(i => i.id === 'portfolio-wedding-1')?.imageUrl, hint: 'wedding couple' },
    { id: 'wedding-rituals', title: 'Vibrant Rituals', image: PlaceHolderImages.find(i => i.id === 'wedding-ritual-1')?.imageUrl, hint: 'indian ritual' },
    { id: 'wedding-bride', title: 'Bridal Elegance', image: PlaceHolderImages.find(i => i.id === 'wedding-bride-1')?.imageUrl, hint: 'indian bride' },
  ];

  const whyChooseUs = [
    { icon: <Award className="w-8 h-8 text-primary" />, title: "Award Winning", desc: "Recognized nationally for excellence in visual storytelling." },
    { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: "Premium Gear", desc: "Using industry-standard 8K cameras and high-end lenses." },
    { icon: <Camera className="w-8 h-8 text-primary" />, title: "Expert Crew", desc: "A dedicated team of professionals focused on your vision." },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: "Fast Delivery", desc: "Receive your professionally edited memories within 14 days." },
  ];

  return (
    <div className="space-y-0">
      <HeroSlider />

      {/* About Section */}
      <section className="py-24 px-6 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] relative overflow-hidden rounded-sm gold-border">
              <Image
                src={PlaceHolderImages.find(i => i.id === 'photographer-1')?.imageUrl || ""}
                alt="Our Founder"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                data-ai-hint="portrait photographer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-card border border-primary/30 p-10 rounded-sm hidden md:block animate-float shadow-2xl">
              <span className="font-headline text-6xl block text-primary">12+</span>
              <span className="text-primary/70 text-xs uppercase tracking-[0.3em] font-bold">Years of Excellence</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-primary font-accent text-3xl">Our Story</span>
              <h2 className="text-5xl md:text-7xl font-headline leading-tight">Capturing Life's <br/><span className="text-primary italic">Eternal Frames</span></h2>
            </div>
            <p className="text-muted-foreground text-xl leading-relaxed font-body italic">
              Founded on the belief that every moment holds an eternal secret, Eternal Frame Studio has spent over a decade perfecting the art of cinematic storytelling.
            </p>
            <div className="space-y-5">
              {['Cinematic Storytelling', 'High-End Editorial Post-Processing', 'Bespoke Client Experience'].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm uppercase tracking-[0.2em] font-bold text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-10 py-8 text-lg uppercase tracking-widest glow-button">
              <Link href="/about">The Studio Legacy</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories - 3 COLUMN LAYOUT */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-accent text-4xl"
          >
            The Collection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-headline uppercase tracking-tight"
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
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col items-center justify-center text-center p-12 backdrop-blur-sm">
                  <span className="text-primary font-accent text-3xl mb-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">{item.title}</span>
                  <div className="w-16 h-px bg-primary/50 mb-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100" />
                  <span className="text-white text-xs uppercase tracking-[0.5em] font-bold translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-200">Enter Gallery</span>
                </div>
                <div className="absolute bottom-12 left-12 group-hover:opacity-0 transition-opacity duration-500">
                  <h3 className="text-white font-headline text-3xl tracking-widest drop-shadow-2xl">{item.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          {whyChooseUs.map((feature, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-8 group"
            >
              <div className="mx-auto w-28 h-28 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary transition-all duration-700 group-hover:-translate-y-2">
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-headline text-xl uppercase tracking-[0.2em] text-primary">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-card relative overflow-hidden">
        <div className="absolute inset-0 shimmer-effect opacity-30" />
        <div className="max-w-5xl mx-auto px-6 text-center space-y-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
             <span className="text-primary font-accent text-4xl">Client Diaries</span>
             <h2 className="text-5xl md:text-7xl font-headline uppercase">Voices of Love</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="p-16 border border-primary/20 bg-background/40 backdrop-blur-xl rounded-sm shadow-2xl relative group"
          >
            <Star className="w-10 h-10 text-primary/30 absolute -top-5 left-1/2 -translate-x-1/2" />
            <p className="text-2xl md:text-4xl font-body italic leading-relaxed text-foreground/90 mb-12">
              "Working with Eternal Frame was the best decision we made for our wedding. They didn't just take photos; they captured the emotions we felt in every moment. The final cinematic film left us in tears."
            </p>
            <div>
               <h4 className="font-headline text-2xl uppercase tracking-[0.3em] text-primary">Ananya & Rohit</h4>
               <p className="text-primary/50 text-xs uppercase tracking-[0.5em] mt-3 font-bold">Palace Wedding - Udaipur</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6 relative overflow-hidden bg-background">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/texture-gold/1920/1080')] bg-cover mix-blend-screen" />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center relative z-10 space-y-12"
        >
          <span className="text-primary font-accent text-5xl">Your Story Awaits</span>
          <h2 className="text-5xl md:text-8xl font-headline leading-tight uppercase">Ready to Create <br/><span className="text-gold italic">Something Eternal?</span></h2>
          <p className="text-muted-foreground text-xl md:text-2xl font-body max-w-3xl mx-auto leading-relaxed italic">
            Book your session today and let's craft an eternal story together. Limited slots available for the upcoming wedding season.
          </p>
          <div className="flex flex-col sm:flex-row gap-10 justify-center pt-8">
             <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent px-16 py-10 text-xl rounded-none tracking-[0.3em] uppercase glow-button font-bold">
                <Link href="/booking">Reserve Date</Link>
             </Button>
             <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-16 py-10 text-xl rounded-none tracking-[0.3em] uppercase font-bold">
                <Link href="/contact">Discovery Call</Link>
             </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
