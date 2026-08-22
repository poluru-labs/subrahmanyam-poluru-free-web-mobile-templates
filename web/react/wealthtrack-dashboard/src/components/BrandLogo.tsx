type BrandLogoProps = {
  className?: string;
  title?: string;
};

/** WealthTrack mark — ascending track on blue tile */
export function BrandLogo({ className = '', title }: BrandLogoProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M7 21.5 L12.5 16 L16.5 19 L25 10.5"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="10.5" r="2.1" fill="#fff" />
      <path
        d="M7 24.5 H25"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
