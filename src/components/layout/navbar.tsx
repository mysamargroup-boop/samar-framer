"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          y: isScrolled ? 20 : 0,
          scale: isScrolled ? 0.95 : 1,
          backgroundColor: isScrolled ? "rgba(10, 10, 12, 0.95)" : "rgba(10, 10, 12, 0)",
          borderColor: isScrolled ? "rgba(193, 158, 95, 0.2)" : "rgba(193, 158, 95, 0)",
          borderWidth: isScrolled ? "1px" : "0px",
          width: isScrolled ? "90%" : "100%",
          borderRadius: isScrolled ? "100px" : "0px",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className={cn(
          "mx-auto pointer-events-auto transition-all duration-500 backdrop-blur-xl flex items-center justify-between px-6 sm:px-12 py-5 sm:py-6"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
          <span className="font-headline text-lg sm:text-2xl tracking-[0.1em] uppercase whitespace-nowrap">
            Eternal <span className="text-primary">Frame</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative py-2 group",
                  isActive ? "text-primary font-bold" : "text-foreground/70 hover:text-primary"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  />
                )}
                {!isActive && (
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-primary/50 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block shrink-0">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 lg:px-8 uppercase tracking-[0.2em] font-sans font-bold text-[10px] glow-button h-10">
            <Link href="/booking">Reserve Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary p-2 shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.div>

      {/* Sub Menu Drawer (Mobile/Tablet) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-background/95 backdrop-blur-2xl border-l border-primary/20 z-[60] shadow-2xl flex flex-col p-12 md:hidden pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-20">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <Camera className="w-8 h-8 text-primary" />
                <span className="font-headline text-xl tracking-widest uppercase">Eternal <span className="text-primary">Frame</span></span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary p-2">
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-3xl font-headline uppercase tracking-widest transition-colors",
                      isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="h-px bg-primary/10 my-4" />
              <Button asChild onClick={() => setIsMobileMenuOpen(false)} className="py-10 text-xl font-headline uppercase tracking-[0.3em] rounded-full bg-primary text-primary-foreground shadow-xl">
                <Link href="/booking">Book a Session</Link>
              </Button>
            </nav>

            <div className="mt-auto space-y-6 pt-12 border-t border-primary/10">
              <p className="text-xs uppercase tracking-[0.4em] text-primary/50 font-bold font-sans">Studio HQ</p>
              <p className="text-muted-foreground italic font-body text-lg">Studio 101, Art District, Mumbai</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Overlay for Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[55] md:hidden pointer-events-auto"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
