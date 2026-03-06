"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Loader2 } from "lucide-react";
import { aiPackageRecommendation, type AIPackageRecommendationOutput } from "@/ai/flows/ai-package-recommendation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline uppercase tracking-tight">Investment</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Transparent pricing for timeless memories. Every package is crafted with the same commitment to excellence.
          </p>
        </div>

        {/* Standard Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {standardPackages.map((pkg, i) => (
            <div 
              key={i} 
              className={pkg.popular 
                ? "relative bg-primary p-8 rounded-3xl border border-primary-foreground/20 md:scale-105 z-10 shadow-2xl" 
                : "bg-card p-8 rounded-3xl border border-border"}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline text-2xl uppercase tracking-widest mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-headline">{pkg.price}</span>
                  </div>
                  <p className={pkg.popular ? "text-white/80 mt-4 text-sm" : "text-muted-foreground mt-4 text-sm"}>
                    {pkg.desc}
                  </p>
                </div>
                <div className="space-y-4 pt-6 border-t border-white/10">
                  {pkg.features.map(feat => (
                    <div key={feat} className="flex items-center gap-3">
                      <Check className={pkg.popular ? "text-white w-4 h-4" : "text-primary w-4 h-4"} />
                      <span className="text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
                <Button className={pkg.popular ? "w-full bg-white text-primary hover:bg-white/90" : "w-full bg-primary"}>
                  Choose {pkg.name}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Advisor Tool */}
        <section className="bg-card/30 backdrop-blur-xl border border-border p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem]">
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
              
              <form onSubmit={handleAIAdvisor} className="space-y-6 p-6 sm:p-8 bg-background/50 rounded-2xl border border-border">
                <div className="space-y-2">
                  <Label>Photo Shoot Type</Label>
                  <Select onValueChange={setShootType}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Wedding Photography">Wedding Photography</SelectItem>
                      <SelectItem value="Fashion Photography">Fashion Photography</SelectItem>
                      <SelectItem value="Maternity & Baby Shoots">Maternity & Baby</SelectItem>
                      <SelectItem value="Pre-Wedding Shoots">Pre-Wedding</SelectItem>
                      <SelectItem value="Product Photography">Product Luxury</SelectItem>
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
                    className="bg-background"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90">
                  {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 w-4 h-4" />}
                  Get Recommendation
                </Button>
              </form>
            </div>

            <div className="space-y-8 h-full flex flex-col justify-center min-h-[300px] sm:min-h-[400px]">
              {!advisorResult && !loading && (
                <div className="text-center p-8 sm:p-12 border-2 border-dashed border-border rounded-3xl">
                  <p className="text-muted-foreground font-body italic">Fill out the form on the left to see our AI recommendations.</p>
                </div>
              )}
              {loading && (
                <div className="flex flex-col items-center justify-center gap-4 text-center p-8 sm:p-12">
                   <Loader2 className="w-12 h-12 animate-spin text-primary" />
                   <p className="text-muted-foreground animate-pulse">Calculating optimal configurations...</p>
                </div>
              )}
              {advisorResult && !loading && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl text-primary uppercase">Our Recommendation</CardTitle>
                      <CardDescription className="italic">Based on your {shootType} request</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {advisorResult.suggestedPackages.map((pkg, idx) => (
                        <div key={idx} className="space-y-2">
                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                              <h4 className="font-bold text-lg">{pkg.name}</h4>
                              <span className="text-accent font-headline text-xl">₹{pkg.priceINR.toLocaleString()}</span>
                           </div>
                           <p className="text-sm text-muted-foreground leading-relaxed">
                              {pkg.description}
                           </p>
                           <p className="text-xs bg-primary/10 p-2 rounded text-primary border border-primary/10">
                              <span className="font-bold">Why:</span> {pkg.reason}
                           </p>
                        </div>
                      ))}
                      
                      {advisorResult.suggestedAddOns.length > 0 && (
                        <div className="pt-6 border-t border-border">
                           <h5 className="font-headline text-lg mb-4 text-primary uppercase">Suggested Add-ons</h5>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {advisorResult.suggestedAddOns.map((addon, i) => (
                                <div key={i} className="text-xs bg-card p-3 rounded border border-border">
                                   <div className="font-bold mb-1">{addon.name}</div>
                                   <div className="text-muted-foreground">{addon.reason}</div>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}
                      
                      <div className="pt-6 border-t border-border">
                         <p className="text-sm leading-relaxed text-muted-foreground italic">
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
