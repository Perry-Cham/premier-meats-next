"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): React.ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const ErrorSVG = ({ className }: { className: string }) => (
    <div className={className}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full animate-bounce [animation-duration:2s]"
      >
        <g id="SVGRepo_iconCarrier">
          <path
            d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 9V13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 17.0195V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
    </div>
  );

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-brand-gold-tint px-4">
      <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 max-w-lg w-full bg-brand-dark/90 border border-white/10 text-white rounded-2xl shadow-2xl backdrop-blur-xl">
        
        {/* Animated Icon Wrapper */}
        <div className="p-4 bg-amber-500/10 text-amber-400 rounded-full mb-4">
          <ErrorSVG className="h-12 w-12" />
        </div>

        {/* Error Messages */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
          Aww, snap!
        </h1>
        <p className="text-zinc-400 font-medium mb-8 max-w-sm">
          An unexpected error occurred on our end. Don't worry, it's not you, it's us.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
          <Button
            className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 cursor-pointer text-base py-5 px-6 rounded-xl transition-all"
            asChild
          >
            <Link href={"/"}>Go to home</Link>
          </Button>
          <Button
            className="w-full sm:w-auto bg-white hover:bg-zinc-100 text-zinc-950 font-semibold cursor-pointer text-base py-5 px-6 rounded-xl transition-all shadow-md"
            onClick={reset}
          >
            Reload page
          </Button>
        </div>

      </div>
    </section>
  );
}