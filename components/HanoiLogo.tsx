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
      {/* Top Roof tier */}
      <path d="M20 4L26 9H14L20 4Z" fill="currentColor" />
      {/* Second Roof tier */}
      <path d="M12 11H28L30 15H10L12 11Z" fill="currentColor" />
      {/* Main Structure Frame */}
      <rect
        x="13"
        y="15"
        width="14"
        height="12"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M13 15H27V27H13V15ZM15 17V25H25V17H15Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
      {/* Circular Window */}
      <circle cx="20" cy="21" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16.5 21H18.5M21.5 21H23.5M20 17.5V19.5M20 22.5V24.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Pillars */}
      <rect x="13" y="27" width="2" height="9" fill="currentColor" />
      <rect x="25" y="27" width="2" height="9" fill="currentColor" />
      {/* Base */}
      <rect x="10" y="34" width="20" height="2" fill="currentColor" />
    </svg>
  );
}
