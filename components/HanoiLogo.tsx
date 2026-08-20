export default function HanoiLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      aria-label="Hanoi Logo"
    >
      <rect
        width="32"
        height="32"
        rx="6"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M8 24H24M10 24V16M22 24V16M12 16H20M14 16V10M18 16V10M11 10H21M16 6L22 10H10L16 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
