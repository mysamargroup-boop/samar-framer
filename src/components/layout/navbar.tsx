
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Camera, ArrowRight, Calendar, Loader2, Instagram, Facebook, Twitter, Mail, Phone, Youtube } from "lucide-react";
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

function TwitterXIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
  );
}

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
          backgroundColor: isScrolled ? "rgba(10, 10, 12, 0.95)" : "rgba(10, 10, 12, 0.4)",
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
                  "font-sans text-[13px] uppercase tracking-[0.3em] transition-all duration-300 relative py-2 group whitespace-nowrap font-bold",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
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
            <DialogContent className="sm:max-w-[800px] bg-card border-primary/20 p-0 overflow-hidden">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="p-10"
               >
                  <DialogHeader className="mb-10 text-center">
                    <DialogTitle className="font-headline text-4xl text-primary uppercase tracking-widest">Begin Your Journey</DialogTitle>
                    <p className="text-muted-foreground text-sm font-sans mt-3">Let's craft your eternal visual story together.</p>
                  </DialogHeader>

                  {!isBooked ? (
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Full Name</Label>
                            <Input placeholder="Enter your name" className="bg-background border-border focus:ring-primary h-12" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Email Address</Label>
                            <Input type="email" placeholder="email@example.com" className="bg-background border-border h-12" required />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Contact Number</Label>
                            <Input placeholder="+91" className="bg-background border-border h-12" required />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Type of Shoot</Label>
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
                            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Your Vision</Label>
                            <Textarea placeholder="Tell us about your dream project details..." className="bg-background border-border resize-none" rows={5} />
                          </div>
                        </div>
                      </div>
                      <Button type="submit" disabled={isBookingLoading} className="w-full bg-primary py-7 text-[10px] uppercase tracking-widest font-bold rounded-full mt-6 shadow-[0_10px_30px_rgba(193,158,95,0.3)]">
                        {isBookingLoading ? <Loader2 className="animate-spin" /> : "Request Reservation"}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-16 space-y-6">
                       <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                          <Calendar className="w-12 h-12" />
                       </div>
                       <h3 className="font-headline text-3xl uppercase tracking-widest">Inquiry Received</h3>
                       <p className="text-muted-foreground text-sm font-sans italic max-w-xs mx-auto">Our luxury visual consultant will reach out to you within 24 hours.</p>
                       <Button onClick={() => setIsBooked(false)} variant="outline" className="mt-8 border-primary text-primary px-12 rounded-full h-12 uppercase tracking-widest font-bold">Close</Button>
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
              className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-background border-l border-primary/20 z-[60] flex flex-col p-8 sm:p-10 lg:hidden pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-8 sm:mb-12">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <Camera className="w-7 h-7 text-primary" />
                  <span className="font-headline text-xl tracking-widest uppercase">SAMAR <span className="text-primary">FRAMER</span></span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary p-2">
                  <X size={32} />
                </button>
              </div>

              {/* Top CTA in Sidebar */}
              <div className="mb-8 sm:mb-12">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsMobileMenuOpen(false)} className="w-full h-10 text-[10px] font-sans font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-full shadow-[0_10px_20px_rgba(193,158,95,0.2)]">
                      Book A Session
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>

              <nav className="flex flex-col gap-0">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-2 text-foreground/60 hover:text-primary transition-colors border-b border-primary/5"
                    >
                      <span className="font-sans font-bold text-sm uppercase tracking-[0.3em]">{link.name}</span>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-10 border-t border-primary/10">
                {/* Contact Header with Line */}
                <div className="mb-8">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-3">Contact</h4>
                  <div className="h-[1px] w-full bg-primary/10" />
                </div>

                {/* Contact Info: Sidewise with Divider */}
                <div className="flex items-center justify-between gap-2 mb-10 px-1">
                   <div className="flex items-center gap-3 text-muted-foreground group flex-1">
                      <div className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary/60 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                        <Mail size={16} />
                      </div>
                      <span className="text-[10px] tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">hello@samarframer.com</span>
                   </div>
                   
                   <div className="w-[1px] h-8 bg-primary/20" />

                   <div className="flex items-center gap-3 text-muted-foreground group flex-1 justify-end pr-1">
                      <div className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary/60 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                        <Phone size={16} />
                      </div>
                      <span className="text-[10px] tracking-wider whitespace-nowrap">+91 98765 43210</span>
                   </div>
                </div>

                {/* Social Icons: Below Contact Info */}
                <div className="flex items-center justify-center gap-5 mb-10">
                  <SocialLink icon={<Instagram size={18} />} />
                  <SocialLink icon={<Facebook size={18} />} />
                  <SocialLink icon={<TwitterXIcon />} />
                  <SocialLink icon={<Youtube size={18} />} />
                </div>

                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-primary/40 font-bold mb-4">Location</p>
                    <p className="text-muted-foreground font-signature text-4xl lowercase tracking-normal">Mumbai • Global</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="p-3 rounded-full border border-primary/10 hover:bg-primary hover:text-white transition-all text-primary/60">
      {icon}
    </a>
  );
}
