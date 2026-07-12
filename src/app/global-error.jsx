"use client";

import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <head>
        <title>Error | {process.env.NEXT_PUBLIC_SITE_NAME}</title>

        <meta name="robots" content="noindex, follow" />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/error`}
        />
      </head>

      <body>
        <main className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="max-w-xl text-center">
            <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>

            <p className="text-gray-600 mb-6">A critical error occurred.</p>

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
      </body>
    </html>
  );
}
