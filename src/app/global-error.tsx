"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "48px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a" }}>Something went wrong</h1>
        <p style={{ marginTop: "12px", color: "#475569" }}>
          Sarco Appliances hit an unexpected error. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "20px",
            padding: "10px 24px",
            background: "#0f172a",
            color: "#fff",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
