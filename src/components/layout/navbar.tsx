"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 sm:px-10 py-6 sm:py-8",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/10 py-4 sm:py-5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Camera className="w-7 h-7 sm:w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
          <span className="font-headline text-lg sm:text-2xl lg:text-3xl tracking-[0.1em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
            Eternal <span className="text-primary">Frame</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] lg:text-xs uppercase tracking-[0.2em] lg:tracking-[0.3em] hover:text-primary transition-colors font-bold text-foreground/80"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none px-6 lg:px-10 py-4 lg:py-6 uppercase tracking-[0.2em] font-bold text-[10px] lg:text-xs glow-button">
            <Link href="/booking">Reserve Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-primary/20 p-8 sm:p-12 flex flex-col gap-6 sm:gap-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-500">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl sm:text-2xl font-headline uppercase tracking-widest py-3 sm:py-4 border-b border-primary/10 text-center"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild onClick={() => setIsMobileMenuOpen(false)} className="py-8 sm:py-10 text-lg sm:text-xl font-headline uppercase tracking-[0.3em] rounded-none bg-primary text-primary-foreground">
            <Link href="/booking">Book a Session</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}