'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Moon, Sun, ClipboardCopy } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

export default function Home() {
  const [url, setUrl] = useState('');
  const [summaryUrdu, setSummaryUrdu] = useState('');
  const [summaryEnglish, setSummaryEnglish] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await result.json();
      if (result.ok) {
        setSummaryUrdu(data.summary); // Urdu
        setSummaryEnglish(data.summary_english); // Assuming backend returns this too
        setShowDialog(true);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        className="absolute top-4 right-4"
        onClick={toggleTheme}
      >
        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </Button>

      <Card className="w-full max-w-xl p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Blog Summariser</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter blog URL"
              disabled={loading}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Summarize
            </Button>
          </form>

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

          {/* Dialog to show summary */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              {summaryUrdu && (
                <Button className="mt-4" variant="outline">
                  View Summary
                </Button>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Blog Summary</DialogTitle>
                <DialogDescription>
                  Summaries in both English and Urdu
                </DialogDescription>
              </DialogHeader>

              {/* English Summary */}
              {summaryEnglish && (
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">English:</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(summaryEnglish, 'English summary')}
                    >
                      <ClipboardCopy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{summaryEnglish}</p>
                </div>
              )}

              {/* Urdu Summary */}
              {summaryUrdu && (
                <div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Urdu:</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(summaryUrdu, 'Urdu summary')}
                    >
                      <ClipboardCopy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm mt-1 whitespace-pre-wrap text-right font-urdu">
                    {summaryUrdu}
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
