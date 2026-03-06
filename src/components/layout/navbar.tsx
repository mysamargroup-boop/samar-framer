"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Camera, ArrowRight } from "lucide-react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          y: isScrolled ? 20 : 0,
          scale: isScrolled ? 0.98 : 1,
          backgroundColor: isScrolled ? "rgba(10, 10, 12, 0.98)" : "rgba(10, 10, 12, 0)",
          borderColor: isScrolled ? "rgba(193, 158, 95, 0.3)" : "rgba(193, 158, 95, 0)",
          borderWidth: isScrolled ? "1px" : "0px",
          width: isScrolled ? (window?.innerWidth < 768 ? "96%" : "90%") : "100%",
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
            Samar <span className="text-primary">Framer</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 lg:gap-12 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans text-base uppercase tracking-[0.2em] transition-all duration-300 relative py-2 group",
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
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 uppercase tracking-[0.2em] font-sans font-bold text-[10px] glow-button h-10">
            <Link href="/booking">Reserve Now</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary p-2 shrink-0 pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={32} />
        </button>
      </motion.div>

      {/* Sidewise Cinematic Drawer (Mobile Only) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[55] md:hidden pointer-events-auto"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background border-l border-primary/20 z-[60] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col p-12 md:hidden pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Camera className="w-8 h-8 text-primary" />
                  <span className="font-headline text-xl tracking-widest uppercase">Samar <span className="text-primary">Framer</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary p-2 hover:rotate-90 transition-transform duration-300">
                  <X size={36} />
                </button>
              </div>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center justify-between text-4xl font-headline uppercase tracking-widest transition-colors",
                          isActive ? "text-primary" : "text-foreground/60 hover:text-primary"
                        )}
                      >
                        <span className="font-headline">{link.name}</span>
                        <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="h-px bg-primary/20 my-8" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button asChild onClick={() => setIsMobileMenuOpen(false)} className="w-full py-12 text-2xl font-headline uppercase tracking-[0.3em] rounded-none bg-primary text-primary-foreground shadow-2xl hover:bg-accent transition-colors">
                    <Link href="/booking">Book a Session</Link>
                  </Button>
                </motion.div>
              </nav>

              <div className="mt-auto space-y-8 pt-12 border-t border-primary/20">
                <div className="space-y-4">
                   <p className="text-xs uppercase tracking-[0.5em] text-primary/60 font-bold font-sans">Connect With Us</p>
                   <div className="flex gap-8 text-foreground/60">
                      <a href="#" className="hover:text-primary transition-colors uppercase text-[10px] tracking-[0.3em] font-bold font-sans">Instagram</a>
                      <a href="#" className="hover:text-primary transition-colors uppercase text-[10px] tracking-[0.3em] font-bold font-sans">Vimeo</a>
                   </div>
                </div>
                <p className="text-muted-foreground italic font-body text-lg">Studio 101, Art District, Mumbai</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
