"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Camera, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BookingPage() {
  const [date, setDate] = useState<Date>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-headline">Inquiry Received</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Thank you for reaching out to Eternal Frame. Our consultants will review your request and get back to you via email or phone within 24 hours.
          </p>
          <Button asChild className="bg-primary w-full py-6 rounded-none">
            <a href="/">Return Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-accent uppercase tracking-[0.3em] text-sm font-bold">Reservation</span>
              <h1 className="text-6xl font-headline tracking-tighter leading-tight">Begin Your Journey</h1>
              <p className="text-muted-foreground text-lg font-body leading-relaxed">
                Fill out the form to request a booking or inquire about custom packages. Let's create visual poetry together.
              </p>
            </div>
            
            <div className="space-y-8 border-l-2 border-primary/20 pl-8">
               <div className="space-y-2">
                  <h3 className="font-headline text-xl text-primary uppercase tracking-widest">What happens next?</h3>
                  <p className="text-sm text-muted-foreground">We'll contact you for a discovery call to understand your vision, discuss themes, and finalize logistics.</p>
               </div>
               <div className="space-y-2">
                  <h3 className="font-headline text-xl text-primary uppercase tracking-widest">Pricing & Deposit</h3>
                  <p className="text-sm text-muted-foreground">A 25% non-refundable deposit is required to secure your date once we finalize the package.</p>
               </div>
            </div>
          </div>

          <div className="bg-card p-10 rounded-[2rem] border border-border shadow-2xl relative">
            <div className="absolute top-0 right-0 p-6 opacity-10">
               <Camera className="w-16 h-16" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" required placeholder="John Doe" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" required placeholder="+91 00000 00000" className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" required type="email" placeholder="john@example.com" className="bg-background" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Shoot Type</Label>
                  <Select required>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding Photography</SelectItem>
                      <SelectItem value="fashion">Fashion Editorial</SelectItem>
                      <SelectItem value="product">Product Luxury</SelectItem>
                      <SelectItem value="maternity">Maternity & Baby</SelectItem>
                      <SelectItem value="pre-wedding">Pre-Wedding Shoot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget (INR)</Label>
                <Input id="budget" type="number" placeholder="₹50,000" className="bg-background" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea id="message" placeholder="Tell us about your vision, location, and specific requirements..." className="bg-background min-h-[120px]" />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 py-8 text-lg rounded-none tracking-widest uppercase">
                {loading ? <Loader2 className="animate-spin mr-2" /> : "Send Inquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
