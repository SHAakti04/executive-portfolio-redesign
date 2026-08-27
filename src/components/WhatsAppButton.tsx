import { useEffect, useState } from "react";

const WA_URL =
  "https://wa.me/919561097388?text=" +
  encodeURIComponent("Hi Gurpreet, I came across your portfolio and would like to connect.");

export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className={`fab-safe group fixed right-5 z-[60] sm:right-7 transition-all duration-500 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* pulse rings */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.55)",
          animation: "wa-pulse 2.4s cubic-bezier(0.66, 0, 0, 1) infinite",
        }}
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.35)",
          animation: "wa-pulse 2.4s cubic-bezier(0.66, 0, 0, 1) 1.1s infinite",
        }}
      />
      {/* tooltip */}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[color:var(--navy)]/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
        Chat on WhatsApp
      </span>
      {/* button */}
      <span
        className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95"
        style={{
          background: "radial-gradient(circle at 30% 25%, #4ade80 0%, #25D366 55%, #128C7E 100%)",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 translate-x-[1px] translate-y-[1px]"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.42c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2-.17-.29-.02-.44.13-.58.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39s1.02 2.77 1.17 2.96c.14.19 2.02 3.09 4.9 4.33.69.3 1.22.47 1.63.6.68.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33zM16.01 4C9.38 4 4 9.38 4 16c0 2.12.55 4.09 1.52 5.82L4 28l6.36-1.5A11.94 11.94 0 0 0 16.01 28C22.63 28 28 22.63 28 16S22.63 4 16.01 4zm0 21.9c-1.86 0-3.6-.5-5.1-1.36l-.36-.22-3.78.89.9-3.68-.24-.38A9.85 9.85 0 0 1 6.11 16c0-5.46 4.44-9.9 9.9-9.9s9.9 4.44 9.9 9.9-4.44 9.9-9.9 9.9z" />
        </svg>
      </span>
      <style>{`
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
          70%  { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
    </a>
  );
}
