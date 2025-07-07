"use client";
import { toast as sonnerToast } from "sonner";



export function toast({ title, description }: { title: string; description: string }) {
  sonnerToast(title, {
    description,
    className: "bg-card text-card-foreground border border-border rounded-lg shadow-md p-4",
  });
}