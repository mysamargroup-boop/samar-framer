import { HeroSlider } from "@/components/sections/hero-slider";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Star, Users, Award, ShieldCheck, Zap } from "lucide-react";
import { AIPortfolioHelper } from "@/components/ai/ai-portfolio-helper";

export default function Home() {
  const featuredPortfolio = [
    { id: 'pwed1', title: 'Wedding Photography', image: PlaceHolderImages.find(i => i.id === 'portfolio-wedding-1')?.imageUrl, hint: 'wedding couple' },
    { id: 'pfash1', title: 'Fashion Photography', image: PlaceHolderImages.find(i => i.id === 'portfolio-fashion-1')?.imageUrl, hint: 'fashion model' },
    { id: 'pprod1', title: 'Product Photography', image: PlaceHolderImages.find(i => i.id === 'portfolio-product-1')?.imageUrl, hint: 'luxury watch' },
    { id: 'pmat1', title: 'Maternity & Baby', image: PlaceHolderImages.find(i => i.id === 'portfolio-maternity-1')?.imageUrl, hint: 'maternity portrait' },
  ];

  const whyChooseUs = [
    { icon: <Award className="w-8 h-8 text-primary" />, title: "Award Winning", desc: "Recognized nationally for excellence in visual storytelling." },
    { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: "Premium Gear", desc: "Using industry-standard 8K cameras and high-end lenses." },
    { icon: <Users className="w-8 h-8 text-primary" />, title: "Expert Crew", desc: "A dedicated team of professionals focused on your vision." },
    { icon: <Zap className="w-8 h-8 text-primary" />, title: "Fast Delivery", desc: "Receive your professionally edited memories within 14 days." },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSlider />

      {/* About Section */}
      <section className="py-24 px-6 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-2xl">
              <Image
                src={PlaceHolderImages.find(i => i.id === 'photographer-1')?.imageUrl || ""}
                alt="Our Founder"
                fill
                className="object-cover"
                data-ai-hint="portrait photographer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl hidden md:block animate-float">
              <span className="font-headline text-5xl block text-white">12+</span>
              <span className="text-white/80 text-sm uppercase tracking-widest">Years of Experience</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold">Our Story</span>
              <h2 className="text-5xl md:text-6xl font-headline leading-tight">Capturing Life's Eternal Frames</h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed font-body">
              Founded on the belief that every moment holds an eternal secret, Eternal Frame Studio has spent over a decade perfecting the art of cinematic storytelling. Based in Mumbai, we blend traditional craftsmanship with contemporary aesthetics to create visuals that don't just show—but feel.
            </p>
            <div className="space-y-4">
              {['Cinematic Storytelling', 'High-End Editorial Post-Processing', 'Bespoke Client Experience'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm uppercase tracking-widest font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-4">
          <span className="text-accent uppercase tracking-[0.3em] text-sm font-semibold">Portfolio</span>
          <h2 className="text-5xl md:text-6xl font-headline">Explore Our Universe</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {featuredPortfolio.map((item) => (
            <Link key={item.id} href={`/portfolio?category=${item.id}`} className="group relative aspect-[3/4] overflow-hidden">
              <Image
                src={item.image || ""}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={item.hint}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-white font-headline text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                <span className="text-white/70 text-sm uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">View Gallery</span>
              </div>
              <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-white font-headline text-xl tracking-wide drop-shadow-lg">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Discovery Tool */}
      <section className="py-24 bg-background">
        <AIPortfolioHelper />
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {whyChooseUs.map((feature, i) => (
            <div key={i} className="text-center space-y-6 group">
              <div className="mx-auto w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                <div className="group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline text-xl uppercase tracking-widest">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
             <Star className="w-8 h-8 text-primary mx-auto animate-pulse" />
             <h2 className="text-4xl md:text-5xl font-headline">The Word on the Streets</h2>
          </div>
          <div className="relative p-12 bg-card rounded-[3rem] border border-border shadow-2xl">
            <p className="text-2xl md:text-3xl font-body italic leading-relaxed text-foreground/90 mb-8">
              "Working with Eternal Frame was the best decision we made for our wedding. They didn't just take photos; they captured the emotions we felt in every moment. The final cinematic film left us in tears."
            </p>
            <div>
               <h4 className="font-headline text-xl uppercase tracking-widest text-primary">Ananya & Rohit</h4>
               <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] mt-2">Wedding Clients - Jaipur</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/bg-texture/1920/1080')] bg-cover mix-blend-overlay" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-10">
          <h2 className="text-5xl md:text-7xl font-headline text-white leading-tight">Ready to create something <span className="italic">extraordinary?</span></h2>
          <p className="text-white/80 text-lg md:text-xl font-body max-w-2xl mx-auto">
            Book your session today and let's craft an eternal story together. Limited slots available for the upcoming season.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 px-12 py-8 text-lg rounded-none tracking-widest">
                <Link href="/booking">Book Now</Link>
             </Button>
             <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-12 py-8 text-lg rounded-none tracking-widest">
                <Link href="/contact">Inquire More</Link>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
