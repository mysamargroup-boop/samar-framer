"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Camera, ArrowRight, Calendar, Phone, Mail, User, Loader2 } from "lucide-react";
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          y: isScrolled ? 0 : 0,
          scale: isScrolled ? 0.95 : 1,
          width: isScrolled ? "min(1200px, 92%)" : "min(1400px, 100%)",
          backgroundColor: isScrolled ? "rgba(10, 10, 12, 0.95)" : "rgba(10, 10, 12, 0)",
          borderColor: isScrolled ? "rgba(193, 158, 95, 0.3)" : "rgba(193, 158, 95, 0)",
          borderWidth: isScrolled ? "1px" : "0px",
          borderRadius: isScrolled ? "50px" : "0px",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className={cn(
          "mx-auto pointer-events-auto backdrop-blur-md flex items-center justify-between px-6 sm:px-10 py-4 transition-all duration-500"
        )}
      >
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
          <span className="font-headline text-lg sm:text-2xl tracking-[0.1em] uppercase whitespace-nowrap">
            Samar <span className="text-primary">Framer</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-sans text-sm uppercase tracking-[0.2em] transition-all duration-300 relative py-2 group",
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

        <div className="hidden md:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-accent rounded-full px-8 uppercase tracking-[0.2em] font-sans font-bold text-[10px] glow-button h-10">
                Reserve Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card border-primary/20 p-0 overflow-hidden">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-8"
               >
                  <DialogHeader className="mb-8">
                    <DialogTitle className="font-headline text-3xl text-primary text-center">Begin Your Journey</DialogTitle>
                    <p className="text-center text-muted-foreground text-sm font-sans mt-2">Let's craft your eternal visual story together.</p>
                  </DialogHeader>

                  {!isBooked ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-widest font-sans">Name</Label>
                            <Input placeholder="Your Name" className="bg-background border-border focus:ring-primary" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs uppercase tracking-widest font-sans">Contact</Label>
                            <Input placeholder="+91" className="bg-background border-border" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs uppercase tracking-widest font-sans">Email</Label>
                          <Input type="email" placeholder="email@example.com" className="bg-background border-border" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs uppercase tracking-widest font-sans">Shoot Type</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
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
                          <Label className="text-xs uppercase tracking-widest font-sans">Vision Details</Label>
                          <Textarea placeholder="Tell us about your dream project..." className="bg-background border-border resize-none" rows={3} />
                        </div>
                      </div>
                      <Button type="submit" disabled={isBookingLoading} className="w-full bg-primary py-6 text-xs uppercase tracking-widest font-bold">
                        {isBookingLoading ? <Loader2 className="animate-spin" /> : "Request Reservation"}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-10 space-y-4">
                       <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                          <Calendar className="w-8 h-8" />
                       </div>
                       <h3 className="font-headline text-2xl">Inquiry Sent</h3>
                       <p className="text-muted-foreground text-sm font-sans italic">Our luxury consultant will reach out within 24 hours.</p>
                       <Button onClick={() => setIsBooked(false)} variant="outline" className="mt-4 border-primary text-primary">Done</Button>
                    </div>
                  )}
               </motion.div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary p-2 pointer-events-auto"
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
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[55] md:hidden pointer-events-auto"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-background border-l border-primary/20 z-[60] flex flex-col p-10 md:hidden pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-16">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Camera className="w-8 h-8 text-primary" />
                  <span className="font-headline text-xl tracking-widest uppercase">Samar <span className="text-primary">Framer</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary p-2">
                  <X size={32} />
                </button>
              </div>

              <nav className="flex flex-col gap-8">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between text-3xl font-headline uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                ))}
                
                <div className="h-px bg-primary/20 my-8" />
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsMobileMenuOpen(false)} className="w-full py-10 text-xl font-headline uppercase tracking-widest bg-primary text-primary-foreground">
                      Book A Session
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </nav>

              <div className="mt-auto pt-10 border-t border-primary/10">
                 <p className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-sans font-bold mb-4">Studio Location</p>
                 <p className="text-muted-foreground italic font-body text-lg">Mumbai • Rajasthan • Global</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
