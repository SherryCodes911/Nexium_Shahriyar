"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import quotes from "@/data/quotes.json";

export default function QuoteForm() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);

function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  const filtered = quotes
    .filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()))

  if (filtered.length > 0) {
    const topQuotes = filtered.slice(0, 3).map((q) => q.text)
    setResults(topQuotes)
  } else {
    const random = quotes[Math.floor(Math.random() * quotes.length)]
    setResults([
      `🤷‍♂️ No quote found for "${topic}". But here's one you might like:`,
      `“${random.text}”`
    ])
  }
}
  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter a topic (e.g., success)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Get Quotes</Button>
      </form>
      <div className="mt-6 space-y-2">
        {results.map((quote, i) => (
            <p key={i} className={i === 0 && quote.startsWith("🤷‍♂️") ? "text-yellow-500 font-medium" : "italic"}>
              {quote}
            </p>
        ))}
      </div>
    </div>
  );
}
