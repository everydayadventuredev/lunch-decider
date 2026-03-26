/**
 * Reusable card ornamental elements — hui-wen corners, dividers, food glow
 */

// Chinese hui-wen (回紋) corner SVG
function HuiWenCorner({ position, color = "var(--ink-lighter)" }) {
  const flip = {
    "top-left": "",
    "top-right": "scale(-1,1)",
    "bottom-left": "scale(1,-1)",
    "bottom-right": "scale(-1,-1)",
  };
  return (
    <div className="card-corner" style={{
      [position.includes("top") ? "top" : "bottom"]: 10,
      [position.includes("left") ? "left" : "right"]: 10,
    }}>
      <svg viewBox="0 0 24 24" fill="none" style={{ transform: flip[position] }}>
        <path
          d="M2 22 L2 8 L6 8 L6 14 L12 14 L12 10 L8 10 L8 2 L22 2"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

// Four corners wrapper
export function CardCorners({ color }) {
  return (
    <>
      <HuiWenCorner position="top-left" color={color} />
      <HuiWenCorner position="top-right" color={color} />
      <HuiWenCorner position="bottom-left" color={color} />
      <HuiWenCorner position="bottom-right" color={color} />
    </>
  );
}

// Ornamental divider with center motif
export function OrnamentDivider({ color = "var(--ink-lighter)", symbol = "◆" }) {
  return (
    <div className="ornament-divider">
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(90deg, transparent, ${color})`,
      }} />
      <span className="ornament-center" style={{ color }}>
        {symbol}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(90deg, ${color}, transparent)`,
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
