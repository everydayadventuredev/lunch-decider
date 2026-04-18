/**
 * Tarot-style card ornamental elements — tier corners, gems, dividers, star field
 */

// ── Tier-specific corner ornaments ──

// Simple vine corner (庶民, 小資)
function SimpleCorner({ position, color }) {
  const flip = {
    "top-left": "", "top-right": "scale(-1,1)",
    "bottom-left": "scale(1,-1)", "bottom-right": "scale(-1,-1)",
  };
  return (
    <div className="card-corner" style={{
      [position.includes("top") ? "top" : "bottom"]: 6,
      [position.includes("left") ? "left" : "right"]: 6,
      width: 32, height: 32,
    }}>
      <svg viewBox="0 0 32 32" fill="none" style={{ transform: flip[position] }}>
        <path d="M4 28 Q4 16 10 10 Q16 4 28 4" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M4 24 Q6 14 12 10 Q18 6 24 4" stroke={color} strokeWidth="0.6" fill="none" opacity="0.3" />
        <path d="M8 18 Q6 15 9 14 Q12 13 10 16 Z" fill={color} opacity="0.35" />
        <path d="M16 10 Q14 7 17 7 Q20 7 17 9 Z" fill={color} opacity="0.35" />
        <circle cx="6" cy="22" r="1" fill={color} opacity="0.4" />
        <circle cx="22" cy="6" r="1" fill={color} opacity="0.4" />
      </svg>
    </div>
  );
}

// Elaborate corner with extra filigree (放縱)
function OrnateCorner({ position, color }) {
  const flip = {
    "top-left": "", "top-right": "scale(-1,1)",
    "bottom-left": "scale(1,-1)", "bottom-right": "scale(-1,-1)",
  };
  return (
    <div className="card-corner" style={{
      [position.includes("top") ? "top" : "bottom"]: 4,
      [position.includes("left") ? "left" : "right"]: 4,
      width: 40, height: 40,
    }}>
      <svg viewBox="0 0 40 40" fill="none" style={{ transform: flip[position] }}>
        {/* Outer sweep */}
        <path d="M4 36 Q4 18 12 10 Q20 4 36 4" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
        {/* Inner sweep */}
        <path d="M6 32 Q6 16 14 10 Q22 6 32 4" stroke={color} strokeWidth="0.8" fill="none" opacity="0.35" />
        {/* Third sweep */}
        <path d="M8 28 Q8 18 14 14 Q20 10 28 8" stroke={color} strokeWidth="0.5" fill="none" opacity="0.2" />
        {/* Larger leaf */}
        <path d="M10 22 Q7 18 11 16 Q15 14 12 20 Z" fill={color} opacity="0.4" />
        <path d="M20 12 Q17 8 21 8 Q25 8 21 11 Z" fill={color} opacity="0.4" />
        {/* Extra leaf */}
        <path d="M14 16 Q12 13 15 13 Q18 13 15 15 Z" fill={color} opacity="0.3" />
        {/* Dots */}
        <circle cx="7" cy="26" r="1.2" fill={color} opacity="0.45" />
        <circle cx="26" cy="7" r="1.2" fill={color} opacity="0.45" />
        <circle cx="10" cy="30" r="0.6" fill={color} opacity="0.3" />
        <circle cx="30" cy="10" r="0.6" fill={color} opacity="0.3" />
      </svg>
    </div>
  );
}

// Minimal corner (苦行)
function AustereCorner({ position, color }) {
  const flip = {
    "top-left": "", "top-right": "scale(-1,1)",
    "bottom-left": "scale(1,-1)", "bottom-right": "scale(-1,-1)",
  };
  return (
    <div className="card-corner" style={{
      [position.includes("top") ? "top" : "bottom"]: 8,
      [position.includes("left") ? "left" : "right"]: 8,
      width: 20, height: 20,
    }}>
      <svg viewBox="0 0 20 20" fill="none" style={{ transform: flip[position] }}>
        <path d="M2 18 L2 2 L18 2" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
      </svg>
    </div>
  );
}

// Dragon/serpent corner (傳說)
function DragonCorner({ position, color }) {
  const flip = {
    "top-left": "", "top-right": "scale(-1,1)",
    "bottom-left": "scale(1,-1)", "bottom-right": "scale(-1,-1)",
  };
  return (
    <div className="card-corner" style={{
      [position.includes("top") ? "top" : "bottom"]: 2,
      [position.includes("left") ? "left" : "right"]: 2,
      width: 52, height: 52,
    }}>
      <svg viewBox="0 0 52 52" fill="none" style={{ transform: flip[position] }}>
        {/* Dragon body curve */}
        <path d="M4 48 Q4 20 14 12 Q24 4 48 4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
        {/* Scales pattern */}
        <path d="M6 40 Q6 22 16 14 Q26 6 42 4" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M8 34 Q8 20 16 16 Q24 12 36 10" stroke={color} strokeWidth="0.6" fill="none" opacity="0.25" />
        {/* Dragon wing/fin */}
        <path d="M10 30 Q6 24 12 20 Q18 16 14 26 Z" fill={color} opacity="0.3" />
        <path d="M24 14 Q20 8 26 8 Q32 8 26 12 Z" fill={color} opacity="0.35" />
        {/* Dragon head element */}
        <path d="M36 8 Q32 4 38 4 Q44 4 38 7 Z" fill={color} opacity="0.4" />
        {/* Claw marks */}
        <path d="M8 44 Q10 38 12 36" stroke={color} strokeWidth="0.6" fill="none" opacity="0.25" />
        <path d="M12 42 Q14 36 16 34" stroke={color} strokeWidth="0.6" fill="none" opacity="0.2" />
        {/* Jewel dots */}
        <circle cx="8" cy="36" r="1.5" fill={color} opacity="0.5" />
        <circle cx="36" cy="8" r="1.5" fill={color} opacity="0.5" />
        <circle cx="14" cy="28" r="0.8" fill={color} opacity="0.35" />
        <circle cx="28" cy="14" r="0.8" fill={color} opacity="0.35" />
        <circle cx="20" cy="20" r="0.6" fill={color} opacity="0.25" />
      </svg>
    </div>
  );
}

// Four corners wrapper — tier-aware
export function CardCorners({ color, tier }) {
  const Corner = tier === "傳說"
    ? DragonCorner
    : tier === "放縱"
      ? OrnateCorner
      : tier === "苦行"
        ? AustereCorner
        : SimpleCorner;
  return (
    <>
      <Corner position="top-left" color={color} />
      <Corner position="top-right" color={color} />
      <Corner position="bottom-left" color={color} />
      <Corner position="bottom-right" color={color} />
    </>
  );
}

// ── Gem badge — tier indicator ──
export function TierGem({ tier, color }) {
  const gemConfig = {
    "庶民": { shape: "circle", size: 14, opacity: 0.5 },
    "小資": { shape: "diamond", size: 16, opacity: 0.6 },
    "放縱": { shape: "diamond", size: 18, opacity: 0.75 },
    "苦行": { shape: "circle", size: 12, opacity: 0.3 },
    "傳說": { shape: "star", size: 22, opacity: 0.9 },
  };
  const gem = gemConfig[tier] || gemConfig["庶民"];

  return (
    <div style={{
      display: "flex", justifyContent: "center",
      marginBottom: 4, position: "relative", zIndex: 2,
    }}>
      <svg width={gem.size + 8} height={gem.size + 8} viewBox={`0 0 ${gem.size + 8} ${gem.size + 8}`}>
        {gem.shape === "circle" && (
          <>
            <circle cx="50%" cy="50%" r={gem.size / 2.5}
              fill={color} opacity={gem.opacity} />
            <circle cx="50%" cy="50%" r={gem.size / 2.5}
              fill="none" stroke={color} strokeWidth="0.8" opacity={gem.opacity * 0.6} />
          </>
        )}
        {gem.shape === "diamond" && (
          <>
            <polygon
              points={`${(gem.size + 8) / 2},2 ${gem.size + 6},${(gem.size + 8) / 2} ${(gem.size + 8) / 2},${gem.size + 6} 2,${(gem.size + 8) / 2}`}
              fill={color} opacity={gem.opacity * 0.8} />
            <polygon
              points={`${(gem.size + 8) / 2},2 ${gem.size + 6},${(gem.size + 8) / 2} ${(gem.size + 8) / 2},${gem.size + 6} 2,${(gem.size + 8) / 2}`}
              fill="none" stroke={color} strokeWidth="0.8" opacity={gem.opacity * 0.5} />
            {/* Inner gleam */}
            <polygon
              points={`${(gem.size + 8) / 2},5 ${gem.size + 2},${(gem.size + 8) / 2} ${(gem.size + 8) / 2},${gem.size + 2} 6,${(gem.size + 8) / 2}`}
              fill={color} opacity={gem.opacity * 0.3} />
          </>
        )}
        {gem.shape === "star" && (() => {
          const cx = (gem.size + 8) / 2, cy = (gem.size + 8) / 2;
          const outer = gem.size / 2 + 1, inner = gem.size / 4;
          const points = Array.from({ length: 10 }, (_, i) => {
            const angle = (Math.PI * 2 * i) / 10 - Math.PI / 2;
            const r = i % 2 === 0 ? outer : inner;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
          }).join(" ");
          return (
            <>
              <polygon points={points} fill={color} opacity={gem.opacity} />
              <polygon points={points} fill="none" stroke={color} strokeWidth="0.6" opacity={0.4} />
              {/* Center gleam */}
              <circle cx={cx} cy={cy} r={inner * 0.6} fill="white" opacity={0.15} />
            </>
          );
        })()}
      </svg>
    </div>
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
      <span className="ornament-center" style={{ color, opacity: 0.6, fontSize: 10 }}>
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
        fontFamily: "'LXGW WenKai TC', serif", fontSize: 13,
        color, letterSpacing: 4, opacity: 0.8,
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
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
            fill="var(--gold)" opacity={0.15 + (i % 3) * 0.08} />
        ))}
        <g transform="translate(50%, 3%)" opacity="0.12">
          <circle cx="50%" cy="16" r="6" fill="var(--gold)" />
          <circle cx="52%" cy="14" r="5" fill="var(--tarot-bg, #1a1612)" />
        </g>
      </svg>
    </div>
  );
}
