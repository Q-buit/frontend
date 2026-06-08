import type { CSSProperties } from "react";

type Props = {
  withWordmark?: boolean;
};

export function Logo({ withWordmark = true }: Props) {
  return (
    <div style={wrapperStyle}>
      <svg width="30" height="36" viewBox="8 0 24 36" fill="none" aria-hidden="true" style={{ display: "block" }}>
        <path
          d="M12.6 12.8C13.8 10.9 16 9.8 18.8 9.8C22.7 9.8 25.4 12.3 25.4 15.8C25.4 18.5 23.9 20.1 21 21.7C18.9 22.8 18.2 23.9 18.2 26.1"
          stroke="#1D4ED8"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18.2" cy="30" r="2.1" fill="#1D4ED8" />
        <path d="M17.6 17.2L26.2 26" stroke="#60A5FA" strokeWidth="3.2" strokeLinecap="round" />
      </svg>

      {withWordmark ? (
        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.6 }}>
          Q-ubit
        </span>
      ) : null}
    </div>
  );
}

const wrapperStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
};
