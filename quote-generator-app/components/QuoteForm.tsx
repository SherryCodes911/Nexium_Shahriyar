"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import quotes from "@/data/quotes.json";
import { Loader2, Copy, Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LocalQuote {
  text: string;
  author: string;
  topic: string;
}

interface DisplayQuote {
  text: string;
  author?: string;
  topic?: string;
}

export default function QuoteForm() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<DisplayQuote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomQuotes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Failed to fetch quote from DummyJSON");
      const data = await response.json();
      return [{ text: data.quote, author: data.author, topic: undefined }];
    } catch (_) {
      try {
        const response = await fetch("https://zenquotes.io/api/random");
        if (!response.ok) throw new Error("Failed to fetch quote from ZenQuotes");
        const data = await response.json();
        return [{ text: data[0].q, author: data[0].a, topic: undefined }];
      } catch (_) {
        setError("Unable to fetch quotes. Please try again later.");
        return [];
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResults([]);
    setError("");
    if (!topic.trim()) {
      const randomQuotes = await fetchRandomQuotes();
      setResults(randomQuotes);
      return;
    }
    setLoading(true);
    const filtered = (quotes as LocalQuote[]).filter((q) =>
      q.topic.toLowerCase().includes(topic.toLowerCase())
    );
    if (filtered.length > 0) {
      setResults(filtered.slice(0, 3));
    } else {
      const randomQuotes = await fetchRandomQuotes();
      setResults([
        { text: `🤷‍♂️ No quote found for "${topic}". Here's a random one:`, author: undefined, topic: undefined },
        ...randomQuotes,
      ]);
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Quote copied to clipboard.",
    });
  };

  const shareQuote = (text: string, author?: string) => {
    const shareText = author ? `${text} — ${author}` : text;
    if (navigator.share) {
      navigator.share({
        title: "Quote Generator",
        text: shareText,
      });
    } else {
      copyToClipboard(shareText);
      toast({
        title: "Copied!",
        description: "Quote copied for sharing.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Enter a topic (e.g., success) or leave blank for random"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-label="Search quotes by topic"
            className="pr-10"
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-5 animate-spin text-muted-foreground" />
          )}
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Loading..." : "Get Quotes"}
        </Button>
      </form>
      {error && (
        <p className="mt-4 text-destructive font-medium animate-slide-in">{error}</p>
      )}
      <div className="mt-6 space-y-4">
        {results.map((quote, i) => (
          <div key={i} className="quote-card animate-slide-in">
            <p
              className={
                i === 0 && quote.text.startsWith("🤷‍♂️")
                  ? "text-yellow-500 font-medium"
                  : "italic text-foreground"
              }
            >
              {quote.text}
            </p>
            {quote.author && <p className="mt-2 text-sm text-muted-foreground">— {quote.author}</p>}
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(quote.text)}
                aria-label="Copy quote"
              >
                <Copy className="size-4 mr-2" /> Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => shareQuote(quote.text, quote.author)}
                aria-label="Share quote"
              >
                <Share2 className="size-4 mr-2" /> Share
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}