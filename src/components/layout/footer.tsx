import Link from "next/link";
import { Camera } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-primary/20 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-1 space-y-8 text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-3 group">
              <Camera className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-headline text-2xl tracking-[0.2em] uppercase">
                Eternal <span className="text-primary">Frame</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed font-body italic max-w-sm mx-auto md:mx-0">
              Capturing the soul of moments through a luxury cinematic lens. Based in India, serving globally with a focus on high-end weddings and fashion editorials.
            </p>
          </div>

          {/* Desktop Links Grid */}
          <div className="hidden md:grid col-span-3 grid-cols-2 lg:grid-cols-2 gap-24">
            <div className="space-y-8">
              <h4 className="font-headline text-sm uppercase tracking-[0.3em] text-primary border-b border-primary/10 pb-4">Curated Links</h4>
              <ul className="space-y-4 font-sans text-xs uppercase tracking-widest font-bold">
                <FooterLink href="/portfolio">PORTFOLIOS</FooterLink>
                <FooterLink href="/packages">INVESTMENTS</FooterLink>
                <FooterLink href="/about">THE LEGACY</FooterLink>
                <FooterLink href="/contact">INQUIRIES</FooterLink>
                <FooterLink href="/booking">RESERVATIONS</FooterLink>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="font-headline text-sm uppercase tracking-[0.3em] text-primary border-b border-primary/10 pb-4">The Galleries</h4>
              <ul className="space-y-4 font-sans text-xs uppercase tracking-widest font-bold">
                <FooterLink href="/portfolio?category=Wedding">ROYAL WEDDINGS</FooterLink>
                <FooterLink href="/portfolio?category=Fashion">FASHION EDITORIALS</FooterLink>
                <FooterLink href="/portfolio?category=Product">LUXURY PRODUCTS</FooterLink>
                <FooterLink href="/portfolio?category=Maternity">MOTHERHOOD</FooterLink>
                <FooterLink href="/portfolio?category=Baby">INFANT SERIES</FooterLink>
              </ul>
            </div>
          </div>

          {/* Mobile Accordion Links */}
          <div className="md:hidden col-span-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="links" className="border-primary/10">
                <AccordionTrigger className="font-headline text-sm uppercase tracking-[0.2em] text-primary">Curated Links</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-2 font-sans text-xs uppercase tracking-widest font-bold">
                    <FooterLink href="/portfolio">PORTFOLIOS</FooterLink>
                    <FooterLink href="/packages">INVESTMENTS</FooterLink>
                    <FooterLink href="/about">THE LEGACY</FooterLink>
                    <FooterLink href="/contact">INQUIRIES</FooterLink>
                    <FooterLink href="/booking">RESERVATIONS</FooterLink>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="galleries" className="border-primary/10">
                <AccordionTrigger className="font-headline text-sm uppercase tracking-[0.2em] text-primary">The Galleries</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pt-2 font-sans text-xs uppercase tracking-widest font-bold">
                    <FooterLink href="/portfolio?category=Wedding">ROYAL WEDDINGS</FooterLink>
                    <FooterLink href="/portfolio?category=Fashion">FASHION EDITORIALS</FooterLink>
                    <FooterLink href="/portfolio?category=Product">LUXURY PRODUCTS</FooterLink>
                    <FooterLink href="/portfolio?category=Maternity">MOTHERHOOD</FooterLink>
                    <FooterLink href="/portfolio?category=Baby">INFANT SERIES</FooterLink>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-primary/40 tracking-[0.4em] uppercase font-bold font-sans">
            © {currentYear} Eternal Frame Photography Studio. All Rights Reserved.
          </div>
          <div className="text-[10px] text-primary/60 tracking-[0.5em] uppercase flex items-center gap-3 font-bold font-sans group">
            Designed By 
            <a 
              href="https://instagram.com/shubham__nema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-signature text-2xl lowercase tracking-normal group-hover:text-accent transition-colors"
            >
              Samar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-muted-foreground hover:text-primary transition-colors block py-1"
      >
        {children}
      </Link>
    </li>
  );
}
