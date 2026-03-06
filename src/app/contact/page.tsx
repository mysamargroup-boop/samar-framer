"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, MessageSquare } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-6">
          <h1 className="text-6xl md:text-8xl font-headline">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Whether you have a question or are ready to start your project, we're here to talk light and frames.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary uppercase tracking-[0.2em] text-xs font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </div>
                <p className="text-xl font-body">+91 98765 43210</p>
                <p className="text-muted-foreground text-sm">Mon - Sat: 10AM - 8PM</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary uppercase tracking-[0.2em] text-xs font-bold">
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </div>
                <p className="text-xl font-body">hello@eternalframe.in</p>
                <p className="text-muted-foreground text-sm">Response within 24h</p>
              </div>
              <div className="space-y-4 sm:col-span-2">
                <div className="flex items-center gap-3 text-primary uppercase tracking-[0.2em] text-xs font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Visit Studio</span>
                </div>
                <p className="text-xl font-body leading-relaxed">
                  Studio 101, Art District, Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>

            <div className="space-y-8 pt-12 border-t border-border/50">
              <h4 className="font-headline text-2xl uppercase tracking-widest">Social Media</h4>
              <div className="flex gap-8">
                <LinkWithLabel icon={<Instagram />} label="Instagram" href="#" />
                <LinkWithLabel icon={<Facebook />} label="Facebook" href="#" />
                <LinkWithLabel icon={<Twitter />} label="Twitter" href="#" />
              </div>
            </div>

            <div className="pt-12">
              <Button className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white py-6 px-10 rounded-full tracking-widest uppercase">
                <MessageSquare className="mr-2 w-5 h-5" />
                WhatsApp Consultation
              </Button>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-card p-10 rounded-[2rem] border border-border shadow-2xl">
              <h3 className="font-headline text-3xl mb-8">Send an Enquiry</h3>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label>Your Name</Label>
                  <Input className="bg-background" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input className="bg-background" type="email" placeholder="email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input className="bg-background" placeholder="Wedding Inquiry / Collaboration / Prints" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea className="bg-background min-h-[150px]" placeholder="How can we help you?" />
                </div>
                <Button className="w-full bg-primary py-8 rounded-none tracking-widest uppercase">Send Message</Button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-24 w-full h-[450px] bg-card rounded-[3rem] border border-border overflow-hidden relative group">
          <div className="absolute inset-0 flex items-center justify-center bg-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-80" style={{ backgroundImage: `url(${PlaceHolderImages.find(i => i.id === 'mumbai-map')?.imageUrl || ""})` }} />
          <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center bg-background/40 backdrop-blur-sm h-full w-full">
            <MapPin className="w-16 h-16 text-primary mb-6 animate-bounce" />
            <h3 className="text-3xl font-headline tracking-widest mb-4">MUMBAI HQ</h3>
            <p className="text-muted-foreground font-body max-w-sm mx-auto">Click to view our exact location on Google Maps and get directions to our luxury studio space.</p>
            <Button variant="outline" asChild className="mt-8 border-primary text-primary hover:bg-primary hover:text-white rounded-none">
              <a href="https://maps.google.com/?q=Studio+101,+Art+District,+Mumbai,+Maharashtra+400001" target="_blank" rel="noopener noreferrer">View Full Map</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkWithLabel({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <a href={href} className="group flex flex-col items-center gap-2">
      <div className="p-3 border border-border rounded-full group-hover:bg-primary group-hover:border-primary transition-all duration-300 group-hover:text-white text-muted-foreground">
        {icon}
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-primary transition-colors">{label}</span>
    </a>
  );
}
