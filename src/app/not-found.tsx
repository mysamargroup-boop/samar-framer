
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Camera, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center space-y-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent rounded-full animate-pulse delay-75" />
      </div>
      
      <div className="relative z-10 space-y-4">
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-primary/10 rounded-full">
            <Camera className="w-16 h-16 text-primary" />
          </div>
        </div>
        <h1 className="text-8xl md:text-9xl font-headline tracking-tighter text-primary/20 absolute -top-12 left-1/2 -translate-x-1/2 select-none">
          404
        </h1>
        <h2 className="text-4xl md:text-6xl font-headline relative">Frame Not Found</h2>
        <p className="text-muted-foreground text-lg font-body max-w-md mx-auto">
          The moment you're looking for seems to have slipped out of focus or moved to a different gallery.
        </p>
      </div>

      <div className="relative z-10 flex gap-4">
        <Button asChild className="bg-primary hover:bg-primary/90 rounded-none px-8 py-6">
          <Link href="/">
            <Home className="mr-2 w-4 h-4" />
            Return Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-border hover:bg-card rounded-none px-8 py-6">
          <Link href="/portfolio">Explore Portfolio</Link>
        </Button>
      </div>
    </div>
  );
}
