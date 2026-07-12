"use client";

import { useEffect } from "react";
import { LinkButton } from "@/components/ui/LinkButton";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-red-600">500</h1>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Something went wrong
        </h2>

        <div className="flex gap-4 justify-center">
          <Button variant="secondary" onClick={() => reset()}>
            Try Again
          </Button>

          <LinkButton href="/" variant="primary">
            Go Home
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
