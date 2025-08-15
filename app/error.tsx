"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="flex h-screen flex-col items-center justify-center text-center px-4"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Something went wrong!
      </h2>

      {process.env.NODE_ENV === "development" && (
        <pre className="mb-4 max-w-full overflow-auto text-left text-sm text-red-500">
          {error.message}
        </pre>
      )}

      <Button onClick={reset} variant="default">
        Try again
      </Button>
    </div>
  );
}
