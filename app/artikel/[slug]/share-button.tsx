"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleShare}>
      <Share2 className="h-5 w-5" />
    </Button>
  );
}
