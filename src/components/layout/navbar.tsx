"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Camera, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingLoading(true);
    setTimeout(() => {
      setIsBookingLoading(false);
      setIsBooked(true);
    }, 2000);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-0 px-0 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          scale: isScrolled ? 0.98 : 1,
          backgroundColor: isScrolled ? "rgba(10, 10, 12, 0.95)" : "rgba(10, 10, 12, 0.3)",
          borderColor: isScrolled ? "rgba(193, 158, 95, 0.3)" : "transparent",
          width: isScrolled ? "min(1200px, 95%)" : "100%",
          y: isScrolled ? 24 : 0,
          borderRadius: isScrolled ? "9999px" : "0px",
          paddingLeft: isScrolled ? "2.5rem" : "5%",
          paddingRight: isScrolled ? "2.5rem" : "5%",
          height: isScrolled ? "4.5rem" : "6rem",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={cn(
          "mx-auto pointer-events-auto backdrop-blur-xl flex items-center justify-between border shadow-2xl relative"
        )}
      >
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform duration-500" />
          <div className="font-headline text-lg sm:text-2xl tracking-[0.1em] uppercase whitespace-nowrap">
            SAMAR <span className="text-primary">FRAMER</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans text-[11px] uppercase tracking-[0.3em] transition-all duration-300 relative py-2 group whitespace-nowrap",
                  isActive ? "text-primary font-bold" : "text-foreground/80 hover:text-primary"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8 uppercase tracking-[0.2em] font-sans font-bold text-[11px] h-11 transition-all duration-300 hover:shadow-[0_0_25px_rgba(193,158,95,0.4)]">
                Reserve Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card border-primary/20 p-0 overflow-hidden">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-10"
               >
                  <DialogHeader className="mb-10 text-center">
                    <DialogTitle className="font-headline text-4xl text-primary">Begin Your Journey</DialogTitle>
                    <p className="text-muted-foreground text-sm font-sans mt-3">Let's craft your eternal visual story together.</p>
                  </DialogHeader>

                  {!isBooked ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-sans text-primary/60">Name</Label>
                            <Input placeholder="Your Name" className="bg-background border-border focus:ring-primary h-12" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest font-sans text-primary/60">Contact</Label>
                            <Input placeholder="+91" className="bg-background border-border h-12" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase tracking-widest font-sans text-primary/60">Email</Label>
                          <Input type="email" placeholder="email@example.com" className="bg-background border-border h-12" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase tracking-widest font-sans text-primary/60">Shoot Type</Label>
                          <Select>
                            <SelectTrigger className="bg-background h-12">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wedding">Royal Wedding</SelectItem>
                              <SelectItem value="fashion">Fashion Editorial</SelectItem>
                              <SelectItem value="product">Luxury Product</SelectItem>
                              <SelectItem value="portrait">Creative Portrait</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] uppercase tracking-widest font-sans text-primary/60">Vision Details</Label>
                          <Textarea placeholder="Tell us about your dream project..." className="bg-background border-border resize-none" rows={4} />
                        </div>
                      </div>
                      <Button type="submit" disabled={isBookingLoading} className="w-full bg-primary py-7 text-[10px] uppercase tracking-widest font-bold rounded-full">
                        {isBookingLoading ? <Loader2 className="animate-spin" /> : "Request Reservation"}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12 space-y-5">
                       <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                          <Calendar className="w-10 h-10" />
                       </div>
                       <h3 className="font-headline text-3xl">Inquiry Sent</h3>
                       <p className="text-muted-foreground text-sm font-sans italic">Our luxury consultant will reach out within 24 hours.</p>
                       <Button onClick={() => setIsBooked(false)} variant="outline" className="mt-6 border-primary text-primary px-10 rounded-full">Done</Button>
                    </div>
                  )}
               </motion.div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-primary p-2 pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </motion.div>

      {/* Sidewise Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-[55] lg:hidden pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 250 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background border-l border-primary/20 z-[60] flex flex-col p-12 lg:hidden pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-20">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Camera className="w-7 h-7 text-primary" />
                  <span className="font-headline text-xl tracking-widest uppercase">SAMAR <span className="text-primary">FRAMER</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary p-2">
                  <X size={32} />
                </button>
              </div>

              <nav className="flex flex-col gap-12">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-3xl font-headline uppercase tracking-[0.2em] text-foreground/60 hover:text-primary transition-colors"
                    >
                      <span className="font-sans font-medium text-lg uppercase tracking-[0.3em]">{link.name}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-6 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                ))}
                
                <div className="h-px bg-primary/20 my-10" />
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsMobileMenuOpen(false)} className="w-full py-6 text-[10px] font-sans font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-full max-w-[240px] mx-auto h-auto">
                      Book A Session
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </nav>

              <div className="mt-auto pt-12 border-t border-primary/10">
                 <p className="text-[10px] uppercase tracking-[0.5em] text-primary/60 font-sans font-bold mb-5">Studio Location</p>
                 <p className="text-muted-foreground italic font-body text-2xl">Mumbai • Rajasthan • Global</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
