"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2, Calendar } from "lucide-react";
import { aiPackageRecommendation, type AIPackageRecommendationOutput } from "@/ai/flows/ai-package-recommendation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import packagesData from "@/lib/packages.json";

const standardPackages = packagesData;


export default function PackagesPage() {
  const [shootType, setShootType] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [advisorResult, setAdvisorResult] = useState<AIPackageRecommendationOutput | null>(null);

  const handleAIAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shootType || !budget) return;
    setLoading(true);
    try {
      const res = await aiPackageRecommendation({
        shootType,
        budget: parseInt(budget)
      });
      setAdvisorResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-40 sm:pt-48 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline uppercase tracking-tight">Packages</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent pricing for timeless memories. Every package is crafted with the same commitment to excellence.
          </p>
        </div>

        {/* Standard Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {standardPackages.map((pkg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={i}
              className={cn(
                "flex flex-col rounded-3xl border transition-all duration-500",
                pkg.popular
                  ? "relative bg-gradient-to-br from-primary via-[#a38042] to-accent backdrop-blur-md p-10 border-primary-foreground/20 md:scale-105 z-10 shadow-2xl overflow-hidden"
                  : "bg-card p-10 border-border"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="flex flex-col h-full space-y-8">
                <div>
                  <h3 className="font-headline text-2xl uppercase tracking-widest mb-4">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-headline">{pkg.price}</span>
                  </div>
                  <p className={cn(
                    "mt-4 text-sm leading-relaxed",
                    pkg.popular ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {pkg.desc}
                  </p>
                </div>

                <div className={cn(
                  "space-y-4 pt-8 border-t flex-grow",
                  pkg.popular ? "border-white/20" : "border-border"
                )}>
                  {pkg.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3">
                      <Check className={cn(
                        "w-4 h-4 mt-0.5 shrink-0",
                        pkg.popular ? "text-white" : "text-primary"
                      )} />
                      <span className="text-sm font-medium tracking-wide">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className={cn(
                        "w-full h-14 rounded-full uppercase tracking-[0.2em] font-bold text-[11px] border-2 transition-all duration-300",
                        pkg.popular
                          ? "bg-white text-primary border-white hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          : "bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      )}>
                        Choose {pkg.name}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] bg-card border-primary/20 p-0 overflow-hidden">
                      <div className="p-10">
                        <DialogHeader className="mb-10 text-center">
                          <DialogTitle className="font-headline text-4xl text-primary uppercase tracking-widest">Reserve {pkg.name}</DialogTitle>
                          <p className="text-muted-foreground text-sm font-sans mt-3">Let's craft your eternal visual story together.</p>
                        </DialogHeader>
                        <BookingForm selectedPackage={pkg.name} />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Advisor Tool */}
        <section className="bg-card/30 backdrop-blur-xl border border-border p-8 sm:p-12 rounded-[3rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent uppercase tracking-widest text-sm font-bold">
                  <Sparkles className="w-5 h-5" />
                  <span>AI Package Advisor</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-headline uppercase">Unsure which package fits you?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Let our intelligence guide you. Provide your preferences and budget, and we'll recommend the ideal setup for your special day.
                </p>
              </div>

              <form onSubmit={handleAIAdvisor} className="space-y-6 p-8 bg-background/50 rounded-3xl border border-border">
                <div className="space-y-2">
                  <Label>Photo Shoot Type</Label>
                  <Select onValueChange={setShootType}>
                    <SelectTrigger className="bg-background h-12">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
                      <SelectItem value="Fashion Photography">Fashion Photography</SelectItem>
                      <SelectItem value="Maternity & Baby Shoots">Maternity & Baby Shoots</SelectItem>
                      <SelectItem value="Pre-Wedding Shoots">Pre-Wedding Shoots</SelectItem>
                      <SelectItem value="Product Photography">Product Photography</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget (INR ₹)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 50000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="bg-background h-12"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 h-14 rounded-full uppercase tracking-widest font-bold">
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 w-4 h-4" />}
                  Get Recommendation
                </Button>
              </form>
            </div>

            <div className="space-y-8 h-full flex flex-col justify-center min-h-[400px]">
              {!advisorResult && !loading && (
                <div className="text-center p-12 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center space-y-4">
                  <Sparkles className="w-10 h-10 text-muted-foreground/30" />
                  <p className="text-muted-foreground italic max-w-xs mx-auto">Fill out the form on the left to see our luxury AI recommendations.</p>
                </div>
              )}
              {loading && (
                <div className="flex flex-col items-center justify-center gap-6 text-center p-12">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                    <Sparkles className="w-6 h-6 text-accent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <p className="text-muted-foreground animate-pulse uppercase tracking-[0.3em] text-[10px] font-bold">Analyzing your vision...</p>
                </div>
              )}
              {advisorResult && !loading && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                  <Card className="bg-primary/5 border-primary/20 rounded-[2rem] overflow-hidden">
                    <CardHeader className="p-8 border-b border-primary/10">
                      <CardTitle className="font-headline text-2xl text-primary uppercase tracking-widest">Our Selection</CardTitle>
                      <CardDescription className="italic text-primary/60">Tailored for your {shootType} inquiry</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                      {advisorResult.suggestedPackages.map((pkg, idx) => (
                        <div key={idx} className="space-y-3">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <h4 className="font-bold text-lg uppercase tracking-wider">{pkg.name}</h4>
                            <span className="text-accent font-headline text-2xl">₹{pkg.priceINR.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {pkg.description}
                          </p>
                          <div className="bg-primary/10 p-4 rounded-xl border border-primary/10">
                            <p className="text-xs text-primary leading-relaxed">
                              <span className="font-bold uppercase tracking-widest mr-2">Rationale:</span> {pkg.reason}
                            </p>
                          </div>
                        </div>
                      ))}

                      {advisorResult.suggestedAddOns.length > 0 && (
                        <div className="pt-8 border-t border-primary/10">
                          <h5 className="font-headline text-lg mb-6 text-primary uppercase tracking-widest">Luxury Enhancements</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {advisorResult.suggestedAddOns.map((addon, i) => (
                              <div key={i} className="text-[10px] bg-card/80 p-4 rounded-xl border border-border">
                                <div className="font-bold mb-1 text-primary uppercase tracking-wider">{addon.name}</div>
                                <div className="text-muted-foreground leading-relaxed">{addon.reason}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-8 border-t border-primary/10">
                        <p className="text-xs leading-relaxed text-muted-foreground italic bg-background/30 p-4 rounded-lg">
                          {advisorResult.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function BookingForm({ selectedPackage }: { selectedPackage?: string }) {
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingLoading(true);
    setTimeout(() => {
      setIsBookingLoading(false);
      setIsBooked(true);
    }, 2000);
  };

  if (isBooked) {
    return (
      <div className="text-center py-16 space-y-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
          <Calendar className="w-12 h-12" />
        </div>
        <h3 className="font-headline text-3xl uppercase tracking-widest">Inquiry Received</h3>
        <p className="text-muted-foreground text-sm font-sans italic max-w-xs mx-auto">Our luxury visual consultant will reach out to you within 24 hours.</p>
      </div>
    );
  }

  return (
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
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Event Address / Location</Label>
            <Input placeholder="City, Venue Details" className="bg-background border-border h-12" required />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Selected Package</Label>
            <Input value={selectedPackage || ""} readOnly className="bg-background/50 border-border h-12 text-primary font-bold" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Your Vision</Label>
            <Textarea placeholder="Tell us about your dream project details..." className="bg-background border-border resize-none" rows={3} />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60">Specific Requirements</Label>
            <Textarea placeholder="Any particular needs?" className="bg-background border-border resize-none" rows={2} />
          </div>
        </div>
      </div>
      <Button type="submit" disabled={isBookingLoading} className="w-full bg-primary hover:bg-accent py-7 text-[10px] uppercase tracking-widest font-bold rounded-full mt-6 shadow-[0_10px_30px_rgba(193,158,95,0.3)] transition-all">
        {isBookingLoading ? <Loader2 className="animate-spin" /> : "Request Reservation"}
      </Button>
    </form>
  );
}
