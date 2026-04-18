// Card corner vine ornaments - per-tier visual vocabulary
function CardCorners({ color, tier }) {
  const style = {
    position: "absolute", width: 44, height: 44,
    pointerEvents: "none", opacity: 0.85,
  };
  const basicVine = (c) => (
    <svg viewBox="0 0 32 32" fill="none">
      <path d="M4 28 Q4 16 10 10 Q16 4 28 4" stroke={c} strokeWidth="1" opacity="0.7"/>
      <path d="M8 18 Q6 15 9 14 Q12 13 10 16 Z" fill={c} opacity="0.4"/>
      <path d="M16 10 Q14 7 17 7 Q20 7 17 9 Z" fill={c} opacity="0.4"/>
      <circle cx="6" cy="22" r="1" fill={c} opacity="0.5"/>
    </svg>
  );
  const flameVine = (c) => (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M4 36 Q4 18 12 10 Q20 4 36 4" stroke={c} strokeWidth="1.2" opacity="0.7"/>
      <path d="M10 22 Q7 18 11 16 Q15 14 12 20 Z" fill={c} opacity="0.5"/>
      <path d="M20 12 Q17 8 21 8 Q25 8 21 11 Z" fill={c} opacity="0.5"/>
    </svg>
  );
  const asceticLine = (c) => (
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M2 18 L2 2 L18 2" stroke={c} strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
  const legendVine = (c) => (
    <svg viewBox="0 0 52 52" fill="none">
      <path d="M4 48 Q4 20 14 12 Q24 4 48 4" stroke={c} strokeWidth="1.5" opacity="0.8"/>
      <path d="M10 30 Q6 24 12 20 Q18 16 14 26 Z" fill={c} opacity="0.4"/>
      <path d="M24 14 Q20 8 26 8 Q32 8 26 12 Z" fill={c} opacity="0.45"/>
      <circle cx="8" cy="36" r="1.5" fill={c} opacity="0.6"/>
    </svg>
  );
  const pick = tier === "放縱" ? flameVine : tier === "苦行" ? asceticLine
    : tier === "傳說" ? legendVine : basicVine;
  return (
    <>
      <div style={{ ...style, top: 8, left: 8 }}>{pick(color)}</div>
      <div style={{ ...style, top: 8, right: 8, transform: "scaleX(-1)" }}>{pick(color)}</div>
      <div style={{ ...style, bottom: 8, left: 8, transform: "scaleY(-1)" }}>{pick(color)}</div>
      <div style={{ ...style, bottom: 8, right: 8, transform: "scale(-1)" }}>{pick(color)}</div>
    </>
  );
}

function TierGem({ tier, color }) {
  const gems = {
    "庶民": <circle cx="8" cy="8" r="3" fill={color}/>,
    "小資": <polygon points="8,2 14,8 8,14 2,8" fill={color}/>,
    "放縱": <polygon points="8,1 15,8 8,15 1,8" fill={color}/>,
    "苦行": <circle cx="8" cy="8" r="2.2" fill={color}/>,
    "傳說": <polygon points="8,1 10,6 15,6 11,10 13,15 8,12 3,15 5,10 1,6 6,6" fill={color}/>,
  };
  return (
    <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, marginBottom: 2 }}>
      {gems[tier]}
    </svg>
  );
}

function OrnamentDivider({ color, symbol = "✦" }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      color, opacity: 0.5, margin: "4px 0 8px",
      fontSize: 10, justifyContent: "center",
    }}>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}/>
      <span>{symbol}</span>
      <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}/>
    </div>
  );
}

function FoodNameGlow({ isLegend, children }) {
  if (!isLegend) return children;
  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute", inset: -10, pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(255,215,0,0.18), transparent 70%)",
        filter: "blur(8px)",
      }}/>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

function StarField() {
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `radial-gradient(circle at 20% 30%, rgba(196,164,78,0.1) 1px, transparent 1px),
                        radial-gradient(circle at 70% 60%, rgba(196,164,78,0.08) 1px, transparent 1px),
                        radial-gradient(circle at 40% 80%, rgba(196,164,78,0.06) 1px, transparent 1px)`,
      backgroundSize: "80px 80px, 120px 120px, 100px 100px",
      opacity: 0.5,
    }}/>
  );
}

Object.assign(window, { CardCorners, TierGem, OrnamentDivider, FoodNameGlow, StarField });
