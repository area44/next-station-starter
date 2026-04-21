import type { SVGProps } from "react";

export function HanoiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20 5L24 10H16L20 5Z" fill="currentColor" />
      <rect x="15" y="10" width="10" height="2" fill="currentColor" />
      <rect x="12" y="12" width="16" height="4" fill="currentColor" />
      <rect
        x="14"
        y="16"
        width="12"
        height="12"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
      <circle
        cx="20"
        cy="22"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M14 22H17" stroke="currentColor" strokeWidth="2" />
      <path d="M23 22H26" stroke="currentColor" strokeWidth="2" />
      <path d="M20 19V25" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="28" width="16" height="2" fill="currentColor" />
      <rect x="10" y="30" width="20" height="5" fill="currentColor" />
    </svg>
  );
}
