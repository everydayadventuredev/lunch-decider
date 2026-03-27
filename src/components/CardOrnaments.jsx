/**
 * Tarot-style card ornamental elements — vine corners, dividers, food glow, star field
 */

// Vine/leaf corner ornament (tarot-inspired)
function VineCorner({ position, color = "var(--gold)" }) {
  const flip = {
    "top-left": "",
    "top-right": "scale(-1,1)",
    "bottom-left": "scale(1,-1)",
    "bottom-right": "scale(-1,-1)",
  };
  return (
    <div className="card-corner" style={{
      [position.includes("top") ? "top" : "bottom"]: 6,
      [position.includes("left") ? "left" : "right"]: 6,
      width: 32,
      height: 32,
    }}>
      <svg viewBox="0 0 32 32" fill="none" style={{ transform: flip[position] }}>
        {/* Main vine curve */}
        <path
          d="M4 28 Q4 16 10 10 Q16 4 28 4"
          stroke={color}
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        {/* Inner parallel vine */}
        <path
          d="M4 24 Q6 14 12 10 Q18 6 24 4"
          stroke={color}
          strokeWidth="0.6"
          fill="none"
          opacity="0.3"
        />
        {/* Leaf 1 */}
        <path
          d="M8 18 Q6 15 9 14 Q12 13 10 16 Z"
          fill={color}
          opacity="0.35"
        />
        {/* Leaf 2 */}
        <path
          d="M16 10 Q14 7 17 7 Q20 7 17 9 Z"
          fill={color}
          opacity="0.35"
        />
        {/* Small dot accent */}
        <circle cx="6" cy="22" r="1" fill={color} opacity="0.4" />
        <circle cx="22" cy="6" r="1" fill={color} opacity="0.4" />
      </svg>
    </div>
  );
}

// Four corners wrapper
export function CardCorners({ color }) {
  return (
    <>
      <VineCorner position="top-left" color={color} />
      <VineCorner position="top-right" color={color} />
      <VineCorner position="bottom-left" color={color} />
      <VineCorner position="bottom-right" color={color} />
    </>
  );
}

// Ornamental divider with center motif
export function OrnamentDivider({ color = "var(--gold)", symbol = "✦" }) {
  return (
    <div className="ornament-divider">
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(90deg, transparent, ${color})`,
        opacity: 0.4,
      }} />
      <span className="ornament-center" style={{ color, opacity: 0.6, fontSize: 8 }}>
        {symbol}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        opacity: 0.4,
      }} />
    </div>
  );
}

// Food name with radial glow behind it
export function FoodNameGlow({ children, isLegend = false }) {
  return (
    <div className={`food-name-glow ${isLegend ? "legend" : ""}`}>
      {children}
    </div>
  );
}

// Top crest/banner for fortune name
export function FortuneCrest({ text, color = "var(--gold)" }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, marginBottom: 6,
    }}>
      <svg width="20" height="12" viewBox="0 0 20 12" style={{ opacity: 0.4 }}>
        <path d="M20 6 L12 6 Q10 6 8 4 L4 0" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M20 6 L12 6 Q10 6 8 8 L4 12" stroke={color} strokeWidth="0.8" fill="none" />
      </svg>
      <span style={{
        fontFamily: "'Noto Serif TC', serif",
        fontSize: 12,
        color,
        letterSpacing: 3,
        opacity: 0.7,
      }}>{text}</span>
      <svg width="20" height="12" viewBox="0 0 20 12" style={{ opacity: 0.4, transform: "scaleX(-1)" }}>
        <path d="M20 6 L12 6 Q10 6 8 4 L4 0" stroke={color} strokeWidth="0.8" fill="none" />
        <path d="M20 6 L12 6 Q10 6 8 8 L4 12" stroke={color} strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  );
}

// Star field background for dark cards
export function StarField() {
  // Fixed positions for consistent render
  const stars = [
    { x: 12, y: 8, r: 0.8 }, { x: 85, y: 15, r: 0.6 },
    { x: 45, y: 5, r: 0.5 }, { x: 72, y: 22, r: 0.7 },
    { x: 25, y: 18, r: 0.4 }, { x: 58, y: 10, r: 0.6 },
    { x: 92, y: 6, r: 0.5 }, { x: 35, y: 25, r: 0.3 },
    { x: 8, y: 30, r: 0.4 }, { x: 78, y: 28, r: 0.5 },
    { x: 50, y: 32, r: 0.3 }, { x: 18, y: 40, r: 0.4 },
    { x: 65, y: 38, r: 0.6 }, { x: 40, y: 45, r: 0.3 },
    { x: 88, y: 42, r: 0.5 },
  ];
  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden",
      pointerEvents: "none", zIndex: 0, borderRadius: 12,
    }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
            fill="var(--gold)"
            opacity={0.15 + (i % 3) * 0.08}
          />
        ))}
        {/* Crescent moon at top-center */}
        <g transform="translate(50%, 3%)" opacity="0.12">
          <circle cx="50%" cy="16" r="6" fill="var(--gold)" />
          <circle cx="52%" cy="14" r="5" fill="var(--tarot-bg, #1a1612)" />
        </g>
      </svg>
    </div>
  );
}
