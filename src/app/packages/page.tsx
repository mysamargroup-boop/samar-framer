"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { aiPackageRecommendation, type AIPackageRecommendationOutput } from "@/ai/flows/ai-package-recommendation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const standardPackages = [
  {
    name: "Basic Shoot",
    price: "₹9,999",
    desc: "Perfect for personal branding or small portrait sessions.",
    features: ["2 Hours Session", "20 High-Res Edited Photos", "Single Location", "Online Private Gallery", "1-Week Delivery"],
    popular: false
  },
  {
    name: "Premium Shoot",
    price: "₹24,999",
    desc: "Comprehensive coverage for pre-wedding or fashion editorials.",
    features: ["5 Hours Session", "50 High-Res Edited Photos", "Multiple Locations", "Makeup Artist Included", "Cinematic Reel (30s)", "Hardbound Photo Book"],
    popular: true
  },
  {
    name: "Wedding Package",
    price: "₹79,999",
    desc: "The complete luxury experience for your grand celebration.",
    features: ["Full Day Coverage (8 Hours)", "300+ Edited Photos", "Cinematic Film (3-5 mins)", "Two Premium Wedding Albums", "Drone Photography", "Lead Photographer + Assistant"],
    popular: false
  }
];

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
            <div 
              key={i} 
              className={cn(
                "flex flex-col rounded-3xl border transition-all duration-500",
                pkg.popular 
                  ? "relative bg-primary p-10 border-primary-foreground/20 md:scale-105 z-10 shadow-2xl" 
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

                <div className="pt-8">
                  <Button className={cn(
                    "w-full h-14 rounded-full uppercase tracking-[0.2em] font-bold text-[11px] border-2 transition-all duration-300",
                    pkg.popular 
                      ? "bg-white text-primary border-white hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                      : "bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  )}>
                    Choose {pkg.name}
                  </Button>
                </div>
              </div>
            </div>
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
