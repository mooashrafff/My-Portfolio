"use client";

import React, { useState, useEffect } from "react";
import { Dock } from "@/components/dock/dock";
import ScrollVelocity from "@/components/scroll_velocity";
import { BackgroundLines } from "@/components/hero-background/background-lines";
import Preloader from "@/components/pre-loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
      <BackgroundLines className="w-full flex-col px-4 relative" >
      <ScrollVelocity
        texts={["404 Not Found,"]}
        velocity={210}
        className="custom-scroll-text"
      /></BackgroundLines>
      <Dock />
      </div>
      )}
    </div>
  );
}
