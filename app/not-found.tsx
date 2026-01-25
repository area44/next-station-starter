"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-sm font-medium text-muted-foreground">404</p>

      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight sm:text-5xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
        Sorry, we couldn’t find the page you were looking for. It might have
        been moved or deleted.
      </p>

      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-6`}>
        Go Back Home
      </Link>
    </section>
  );
}
