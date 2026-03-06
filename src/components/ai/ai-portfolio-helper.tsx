"use client";

import { useState } from "react";
import { suggestPortfolioCategories } from "@/ai/flows/ai-portfolio-suggestions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AIPortfolioHelper() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    suggestions: string[];
    reasoning: string;
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await suggestPortfolioCategories({ query });
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="bg-card/50 backdrop-blur-md border border-primary/20 p-8 rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24 text-primary" />
        </div>
        
        <div className="relative z-10 text-center mb-8">
          <h3 className="font-headline text-3xl mb-4">Discover Your Style</h3>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Tell our AI what you are looking for—e.g., "I want a dramatic traditional wedding theme" or "Looking for high-end fashion catalog inspiration".
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-10">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your photography mood..."
            className="bg-background/50 border-border h-12 text-lg focus:ring-primary"
          />
          <Button disabled={loading} className="h-12 bg-primary px-8">
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2 w-4 h-4" />}
            Ask AI
          </Button>
        </form>

        {result && (
          <Card className="bg-background/40 border-primary/20 animate-in fade-in slide-in-from-top-4">
            <CardContent className="p-8">
              <div className="mb-6">
                <h4 className="font-headline text-xl mb-3 flex items-center gap-2">
                  <span className="text-primary italic">AI Suggestions:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.suggestions.map((cat) => (
                    <Badge key={cat} variant="secondary" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 cursor-default">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed italic text-lg">
                  "{result.reasoning}"
                </p>
                <div className="flex justify-end">
                  <Button variant="link" className="text-accent hover:text-accent/80 group">
                    Explore these galleries <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
