import Link from "next/link";
import { Camera, MapPin, Phone, Mail, Instagram, Facebook, Twitter, Heart } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-primary/20 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <Camera className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-headline text-2xl tracking-[0.2em] uppercase">
                Samar <span className="text-primary">Framer</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed font-body italic">
              Capturing the soul of moments through a luxury cinematic lens. Based in India, serving globally with a focus on high-end weddings and fashion editorials.
            </p>
            <div className="flex gap-6">
               <Link href="https://instagram.com" className="text-primary/60 hover:text-primary transition-colors">
                  <span className="sr-only">Instagram</span>
                  <Instagram className="w-6 h-6" />
               </Link>
               <Link href="https://facebook.com" className="text-primary/60 hover:text-primary transition-colors">
                  <span className="sr-only">Facebook</span>
                  <Facebook className="w-6 h-6" />
               </Link>
               <Link href="https://twitter.com" className="text-primary/60 hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="w-6 h-6" />
               </Link>
            </div>
          </div>

          {/* Links Section - Desktop Grid */}
          <div className="hidden md:block">
            <h4 className="font-headline uppercase tracking-[0.3em] text-primary text-sm mb-10">Curated Links</h4>
            <ul className="space-y-5 text-xs uppercase tracking-widest text-muted-foreground font-bold font-sans">
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolios</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors">Investments</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">The Legacy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Inquiries</Link></li>
              <li><Link href="/booking" className="hover:text-primary transition-colors">Reservations</Link></li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-headline uppercase tracking-[0.3em] text-primary text-sm mb-10">The Galleries</h4>
            <ul className="space-y-5 text-xs uppercase tracking-widest text-muted-foreground font-bold font-sans">
              <li><Link href="/portfolio?category=Wedding" className="hover:text-primary transition-colors">Royal Weddings</Link></li>
              <li><Link href="/portfolio?category=Fashion" className="hover:text-primary transition-colors">Fashion Editorials</Link></li>
              <li><Link href="/portfolio?category=Product" className="hover:text-primary transition-colors">Luxury Products</Link></li>
              <li><Link href="/portfolio?category=Maternity" className="hover:text-primary transition-colors">Motherhood</Link></li>
              <li><Link href="/portfolio?category=Baby" className="hover:text-primary transition-colors">Infant Series</Link></li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-headline uppercase tracking-[0.3em] text-primary text-sm mb-10">Studio HQ</h4>
            <ul className="space-y-6 text-sm text-muted-foreground font-body">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="leading-relaxed italic">Studio 101, Art District, Mumbai, Maharashtra 400001, India</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@eternalframe.in</span>
              </li>
            </ul>
          </div>

          {/* Links Section - Mobile Accordion */}
          <div className="md:hidden space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="links">
                <AccordionTrigger className="font-headline uppercase tracking-widest text-primary">Curated Links</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-2 text-xs uppercase tracking-widest text-muted-foreground font-bold font-sans">
                    <li><Link href="/portfolio">Portfolios</Link></li>
                    <li><Link href="/packages">Investments</Link></li>
                    <li><Link href="/about">The Legacy</Link></li>
                    <li><Link href="/contact">Inquiries</Link></li>
                    <li><Link href="/booking">Reservations</Link></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="galleries">
                <AccordionTrigger className="font-headline uppercase tracking-widest text-primary">The Galleries</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-2 text-xs uppercase tracking-widest text-muted-foreground font-bold font-sans">
                    <li><Link href="/portfolio?category=Wedding">Royal Weddings</Link></li>
                    <li><Link href="/portfolio?category=Fashion">Fashion Editorials</Link></li>
                    <li><Link href="/portfolio?category=Product">Luxury Products</Link></li>
                    <li><Link href="/portfolio?category=Maternity">Motherhood</Link></li>
                    <li><Link href="/portfolio?category=Baby">Infant Series</Link></li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-primary/40 tracking-[0.4em] uppercase font-bold">
            © {currentYear} Samar Framer Photography Studio. All Rights Reserved.
          </div>
          <div className="text-[10px] text-primary/60 tracking-[0.5em] uppercase flex items-center gap-3 font-bold group">
            Designed By 
            <Link 
              href="https://instagram.com/shubham__nema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-signature text-3xl lowercase tracking-normal group-hover:text-accent transition-colors"
            >
              Samar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
