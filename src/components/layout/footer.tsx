import Link from "next/link";
import { Camera, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-primary/20 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
          {/* Logo & Info */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <Camera className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-headline text-2xl tracking-[0.2em] uppercase">
                Eternal <span className="text-primary">Frame</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed font-body italic max-w-sm">
              Capturing the soul of moments through a luxury cinematic lens. Based in India, serving globally with a focus on high-end weddings and fashion editorials.
            </p>
          </div>

          {/* Requested Link Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-24">
            {/* Column 1 */}
            <div className="space-y-6">
              <FooterLink href="/portfolio">PORTFOLIOS</FooterLink>
              <FooterLink href="/packages">INVESTMENTS</FooterLink>
              <FooterLink href="/about">THE LEGACY</FooterLink>
              <FooterLink href="/contact">INQUIRIES</FooterLink>
              <FooterLink href="/booking">RESERVATIONS</FooterLink>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <FooterLink href="/portfolio?category=Wedding">ROYAL WEDDINGS</FooterLink>
              <FooterLink href="/portfolio?category=Fashion">FASHION EDITORIALS</FooterLink>
              <FooterLink href="/portfolio?category=Product">LUXURY PRODUCTS</FooterLink>
              <FooterLink href="/portfolio?category=Maternity">MOTHERHOOD</FooterLink>
              <FooterLink href="/portfolio?category=Baby">INFANT SERIES</FooterLink>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-primary/40 tracking-[0.4em] uppercase font-bold">
            © {currentYear} Eternal Frame Photography Studio. All Rights Reserved.
          </div>
          <div className="text-[10px] text-primary/60 tracking-[0.5em] uppercase flex items-center gap-3 font-bold group">
            Designed By <span className="text-primary group-hover:text-accent transition-colors">Samar</span>
            <Heart className="w-3 h-3 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="block font-sans text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}
