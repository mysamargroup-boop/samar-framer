
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Camera, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Camera className="w-6 h-6 text-primary" />
            <span className="font-headline text-xl tracking-widest uppercase">
              Eternal Frame
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Capturing the soul of moments through a luxury cinematic lens. Based in India, serving globally with a focus on high-end weddings and fashion editorials.
          </p>
          <div className="flex gap-4">
            <Link href="https://instagram.com" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></Link>
            <Link href="https://facebook.com" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></Link>
            <Link href="https://twitter.com" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></Link>
          </div>
        </div>

        <div>
          <h4 className="font-headline uppercase tracking-widest text-sm mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link href="/packages" className="hover:text-primary transition-colors">Packages</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Studio</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/booking" className="hover:text-primary transition-colors">Book a Session</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline uppercase tracking-widest text-sm mb-6">Photography</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/portfolio?category=Wedding" className="hover:text-primary transition-colors">Wedding Photography</Link></li>
            <li><Link href="/portfolio?category=Fashion" className="hover:text-primary transition-colors">Fashion Editorials</Link></li>
            <li><Link href="/portfolio?category=Product" className="hover:text-primary transition-colors">Product Luxury</Link></li>
            <li><Link href="/portfolio?category=Maternity" className="hover:text-primary transition-colors">Maternity & Portraits</Link></li>
            <li><Link href="/portfolio?category=Pre-Wedding" className="hover:text-primary transition-colors">Pre-Wedding Shoots</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline uppercase tracking-widest text-sm mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Studio 101, Art District, Mumbai, Maharashtra 400001, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>hello@eternalframe.in</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-muted-foreground tracking-widest uppercase">
          © {new Date().getFullYear()} Eternal Frame Photography Studio. All Rights Reserved.
        </div>
        <div className="text-xs text-muted-foreground/60 tracking-[0.3em] uppercase flex items-center gap-2">
          Designed By <span className="text-primary font-bold">Samar</span>
          <Heart className="w-3 h-3 text-primary animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
