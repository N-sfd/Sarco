/**
 * Minimal brand glyphs for Facebook / Instagram / YouTube.
 *
 * lucide-react (this project's icon set) doesn't ship brand/logo icons, so
 * these are small hand-drawn stand-ins styled to match lucide's stroke
 * conventions (24x24 viewBox, currentColor) rather than a full icon library.
 */
type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M15 8.5h-1.5c-.55 0-1 .45-1 1V11h2.4l-.35 2.5H12.5V21h-3v-7.5H8V11h1.5V9.2C9.5 7 10.9 5.5 13 5.5h2v3Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect
        x="2.5"
        y="6"
        width="19"
        height="12"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path d="M10.3 9.6v4.8l4.4-2.4-4.4-2.4Z" fill="currentColor" />
    </svg>
  );
}
