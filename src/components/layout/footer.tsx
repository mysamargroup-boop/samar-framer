import Link from "next/link";
import { Camera, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function TwitterXIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
  );
}

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
              <span className="font-accent text-4xl tracking-normal normal-case text-primary">
                Gistesy
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
                  <span className="sr-only">Twitter (X)</span>
                  <TwitterXIcon />
               </Link>
               <Link href="#" className="text-primary/60 hover:text-primary transition-colors">
                  <span className="sr-only">YouTube</span>
                  <Youtube className="w-6 h-6" />
               </Link>
            </div>
          </div>

          {/* Links Section - Desktop Grid */}
          <div className="hidden md:block">
            <h4 className="font-headline uppercase tracking-[0.3em] text-primary text-sm mb-10 font-sans font-bold">Curated Links</h4>
            <ul className="space-y-5 text-xs uppercase tracking-widest text-muted-foreground font-bold font-sans">
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolios</Link></li>
              <li><Link href="/packages" className="hover:text-primary transition-colors">Investments</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">The Legacy</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Inquiries</Link></li>
              <li><Link href="/booking" className="hover:text-primary transition-colors">Reservations</Link></li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-headline uppercase tracking-[0.3em] text-primary text-sm mb-10 font-sans font-bold">The Galleries</h4>
            <ul className="space-y-5 text-xs uppercase tracking-widest text-muted-foreground font-bold font-sans">
              <li><Link href="/portfolio?category=Wedding" className="hover:text-primary transition-colors">Royal Weddings</Link></li>
              <li><Link href="/portfolio?category=Fashion" className="hover:text-primary transition-colors">Fashion Editorials</Link></li>
              <li><Link href="/portfolio?category=Product" className="hover:text-primary transition-colors">Luxury Products</Link></li>
              <li><Link href="/portfolio?category=Maternity" className="hover:text-primary transition-colors">Motherhood</Link></li>
              <li><Link href="/portfolio?category=Baby" className="hover:text-primary transition-colors">Infant Series</Link></li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-headline uppercase tracking-[0.3em] text-primary text-sm mb-10 font-sans font-bold">Studio HQ</h4>
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
                <span>hello@gistesy.com</span>
              </li>
            </ul>
          </div>

          {/* Links Section - Mobile Accordion */}
          <div className="md:hidden space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="links" className="border-primary/10">
                <AccordionTrigger className="font-headline uppercase tracking-widest text-primary font-sans text-xs font-bold">Curated Links</AccordionTrigger>
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
              <AccordionItem value="galleries" className="border-primary/10">
                <AccordionTrigger className="font-headline uppercase tracking-widest text-primary font-sans text-xs font-bold">The Galleries</AccordionTrigger>
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
          <div className="text-[10px] text-primary/40 tracking-[0.4em] uppercase font-bold font-sans">
            © {currentYear} Gistesy Photography Studio. All Rights Reserved.
          </div>
          <div className="text-[10px] text-primary/60 tracking-[0.5em] uppercase flex items-center gap-3 font-bold font-sans group">
            Designed By 
            <Link 
              href="https://instagram.com/shubham__nema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-signature text-4xl lowercase tracking-normal group-hover:text-accent transition-colors px-2"
            >
              Samar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
