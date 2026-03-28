import { useState, useEffect, useMemo } from "react";
import { TIER_LABELS } from "../data/foods";
import { getChineseDateStr } from "../utils/generateReading";
import { getFoodImage } from "../utils/foodImage";
import { AFTERNOON_PROPHECIES, COWORKER_REACTIONS } from "../data/darkCommentary";
import SealStamp from "./SealStamp";
import { CardCorners, TierGem, OrnamentDivider, FoodNameGlow, FortuneCrest, StarField } from "./CardOrnaments";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const REROLL_BUTTONS = [
  "此指引不準，再來", "再給大師一次機會", "大師你認真的嗎",
  "不然你自己決定啊", "⋯⋯", "（瘋狂點擊中）",
  "我就不信", "再一次就好", "最後一次", "真的最後一次",
];
const ACCEPT_BUTTONS = [
  "認命了", "認命了", "好吧認命了", "算了隨便啦", "⋯⋯認命",
  "（投降）", "（投降）", "求你讓我認命", "我錯了", "（跪）",
];
const IMPATIENT_QUOTES = [
  null, null,
  "你很挑欸。大師的建議是不要想太多。",
  "大師覺得你根本不是來求指引的。",
  "……", "（大師已關機）", "（無人接聽）",
  "你還在？", "大師們開始懷疑人生了。", "午膳殿即將暫停營業。",
];
const REROLL_COMMENTS = [
  "（大師微微皺眉）", "（大師們交換了一個眼神）",
  "（殿內大師們已讀不回）", "（大師們正在考慮離職）",
  "（午膳殿傳來關門的聲音）", "（大師已關機，請明日再來）",
  "（保全走過來了）", "（燈一盞一盞關掉）", "（最後的大師嘆了一口氣）",
];

const TAROT = {
  bg: "#1a1612",
  bgGrad: "linear-gradient(180deg, #1a1612 0%, #221c16 50%, #1a1612 100%)",
  text: "#e8dcc8", textMuted: "#a89880", textDim: "#6b5d4d",
  gold: "#c4a44e", goldDim: "rgba(196, 164, 78, 0.15)",
  sectionBg: "rgba(196, 164, 78, 0.06)",
  sectionBorder: "rgba(196, 164, 78, 0.1)",
};
// ── Tier-specific visual themes — strong differentiation ──
const TIER_THEMES = {
  "庶民": { // Classic warm gold
    ...TAROT,
    borderWidth: "2px",
    tierIcon: "",
  },
  "小資": { // Brighter gold, slightly elevated
    ...TAROT,
    gold: "#d4b44e",
    goldDim: "rgba(212, 180, 78, 0.18)",
    bgGrad: "linear-gradient(180deg, #1a1612 0%, #221e16 50%, #1a1612 100%)",
    sectionBg: "rgba(212, 180, 78, 0.08)",
    sectionBorder: "rgba(212, 180, 78, 0.15)",
    borderWidth: "2px",
    tierIcon: "",
  },
  "放縱": { // 🔥 Hot amber-orange — sinful and indulgent
    ...TAROT,
    gold: "#e8943a",
    goldDim: "rgba(232, 148, 58, 0.2)",
    bgGrad: "linear-gradient(180deg, #1c1610 0%, #2a1c10 50%, #1c1610 100%)",
    text: "#f0dcc0",
    textMuted: "#b89060",
    textDim: "#7a5a3a",
    sectionBg: "rgba(232, 148, 58, 0.08)",
    sectionBorder: "rgba(232, 148, 58, 0.18)",
    borderWidth: "2.5px",
    tierIcon: "🔥",
  },
  "苦行": { // 🪨 Cold blue-grey — monastic, withered
    ...TAROT,
    gold: "#7a8088",
    goldDim: "rgba(122, 128, 136, 0.1)",
    bg: "#16171a",
    bgGrad: "linear-gradient(180deg, #14151a 0%, #1a1b20 50%, #14151a 100%)",
    text: "#b8b4ae",
    textMuted: "#70707a",
    textDim: "#4a4a54",
    sectionBg: "rgba(122, 128, 136, 0.05)",
    sectionBorder: "rgba(122, 128, 136, 0.1)",
    borderWidth: "1.5px",
    tierIcon: "",
  },
  "傳說": { // ✦ Pure radiant gold — divine
    ...TAROT,
    gold: "#ffd700",
    goldDim: "rgba(255, 215, 0, 0.25)",
    bgGrad: "linear-gradient(180deg, #1a1812 0%, #2c2410 50%, #1a1812 100%)",
    text: "#fff8e0",
    textMuted: "#c0a850",
    sectionBg: "rgba(255, 215, 0, 0.08)",
    sectionBorder: "rgba(255, 215, 0, 0.18)",
    borderWidth: "3px",
    tierIcon: "✦",
  },
};

function getTheme(tier, isLegend) {
  if (isLegend) return TIER_THEMES["傳說"];
  return TIER_THEMES[tier] || TAROT;
}

export default function ResultCard({ reading, onReroll, onAccept, rerollCount, onHistory }) {
  const [revealed, setRevealed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [foodImg, setFoodImg] = useState(null);

  // Pick one random dark humor line — either prophecy OR coworker, not both
  const darkHumor = useMemo(() => {
    const pool = [...AFTERNOON_PROPHECIES, ...COWORKER_REACTIONS];
    return pick(pool);
  }, [reading.food]);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { setFlipped(false); }, [reading.food]);
  useEffect(() => {
    getFoodImage(reading.food).then(url => { if (url) setFoodImg(url); });
  }, [reading.food]);

  const handleFlip = (e) => {
    e.stopPropagation();
    setFlipped(f => !f);
  };

  const isLegend = reading.isLegend;
  const t = getTheme(reading.tier, isLegend);
  const cardW = "min(340px, 90vw)";

  const faceBase = {
    width: "100%", height: "100%",
    background: t.bgGrad,
    borderRadius: 14,
    border: `${t.borderWidth || "2px"} solid ${t.gold}`,
    position: "absolute",
    top: 0, left: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
    boxSizing: "border-box",
    display: "flex", flexDirection: "column",
  };

  const sec = {
    background: t.sectionBg, borderRadius: 8,
    border: `1px solid ${t.sectionBorder}`,
    position: "relative", zIndex: 1,
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      height: "100dvh", overflow: "hidden",
      padding: "0 16px env(safe-area-inset-bottom, 8px)",
      background: "linear-gradient(180deg, var(--bg) 0%, #e8e0d4 30%, #ddd5c8 100%)",
    }}>
      {/* ═══ Top Bar: 食曆 left, 搜尋 right ═══ */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: cardW, padding: "6px 0", flexShrink: 0,
      }}>
        {onHistory ? (
          <span
            onClick={(e) => { e.stopPropagation(); onHistory(); }}
            style={{
              fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
              color: "var(--ink-lighter)", cursor: "pointer", letterSpacing: 1,
            }}
          >📜 食曆</span>
        ) : <span />}
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(reading.food)}+餐廳`}
          target="_blank" rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
            color: "var(--ink-lighter)", letterSpacing: 1, textDecoration: "none",
          }}
        >📍 找附近</a>
      </div>

      {/* ═══════════ Card Stack — fills remaining space ═══════════ */}
      <div
        onClick={handleFlip}
        style={{
          position: "relative",
          width: cardW, flex: 1, minHeight: 0,
          cursor: "pointer",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "none" : "translateY(-30px) scale(0.95)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        {/* Peek card behind — rotated slightly for visual cue */}
        <div style={{
          position: "absolute",
          top: 6, left: 4, right: -8,
          height: "100%",
          background: t.bgGrad,
          borderRadius: 14,
          border: `2px solid rgba(196,164,78,0.2)`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          transform: "rotate(2deg)",
          opacity: flipped ? 0 : 0.5,
          transition: "opacity 0.3s",
          zIndex: 0,
        }} />

        {/* Flip container */}
        <div style={{
          position: "relative",
          width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          zIndex: 1,
        }}>

          {/* ──── FRONT: Full-bleed Tarot Image ──── */}
          <div style={{
            ...faceBase,
            padding: 0,
            boxShadow: isLegend
              ? `0 16px 56px rgba(0,0,0,0.6), 0 0 50px rgba(255,215,0,0.25), 0 0 100px rgba(255,215,0,0.08)`
              : reading.tier === "放縱"
                ? `0 16px 56px rgba(0,0,0,0.5), 0 0 36px rgba(232,148,58,0.2), 0 0 80px rgba(232,148,58,0.06)`
                : reading.tier === "苦行"
                  ? `0 8px 30px rgba(0,0,0,0.3)`
                  : `0 16px 56px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)`,
          }}>
            {/* Badges — absolute on top of image */}
            {isLegend && (
              <div style={{
                position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${t.gold}, #d4b44e)`,
                color: t.bg, fontFamily: "'LXGW WenKai TC', serif",
                fontSize: 11, fontWeight: 700,
                padding: "3px 14px", borderRadius: 20,
                letterSpacing: 2, whiteSpace: "nowrap", zIndex: 3,
              }}>百年難遇之祥瑞</div>
            )}
            {(reading.isFriday || reading.isMonday) && !isLegend && (
              <div style={{ position: "absolute", top: 4, right: 12, zIndex: 3 }}>
                <SealStamp
                  text={reading.isFriday ? "週五無禁忌" : "週一渡劫中"}
                  color={reading.isFriday ? t.gold : t.textMuted}
                  size={50} rotate={reading.isFriday ? -8 : -6}
                />
              </div>
            )}
            {reading.isWednesday && !reading.isFriday && !reading.isMonday && !isLegend && (
              <div style={{ position: "absolute", top: 4, right: 12, zIndex: 3 }}>
                <SealStamp text="週三症候群" color={t.textMuted} size={50} rotate={-5} />
              </div>
            )}

            {/* ★ Image fills entire top portion ★ */}
            <div style={{
              flex: 1, position: "relative", overflow: "hidden",
              borderRadius: "12px 12px 0 0",
            }}>
              {foodImg && (
                <img src={foodImg} alt={reading.food} style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                }} />
              )}
              {/* Gradient overlay at bottom of image for text readability */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: 100,
                background: `linear-gradient(transparent, ${t.bg})`,
              }} />
              {/* StarField behind image area */}
              {!foodImg && <StarField />}
            </div>

            {/* Bottom text cluster */}
            <div style={{
              padding: "0 16px 14px",
              background: t.bg,
              textAlign: "center",
              position: "relative",
            }}>
              <CardCorners color={t.gold} tier={reading.tier} />

              {/* Fortune name — small elegant */}
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif",
                fontSize: 12, color: t.textMuted,
                letterSpacing: 3, marginBottom: 2,
              }}>【{reading.fortune}】</div>

              {/* Tier gem + label */}
              <TierGem tier={reading.tier} color={t.gold} />
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif",
                fontSize: 12, color: t.gold, letterSpacing: 2,
                opacity: 0.7, marginBottom: 4,
              }}>{TIER_LABELS[reading.tier]}</div>

              {/* FOOD NAME — adaptive size to prevent wrapping */}
              <FoodNameGlow isLegend={isLegend}>
                <div style={{
                  fontFamily: "'Ma Shan Zheng', cursive",
                  fontSize: reading.food.length > 7
                    ? `clamp(18px, 5.5vw, 26px)`
                    : reading.food.length > 5
                      ? `clamp(22px, 6.5vw, 30px)`
                      : isLegend ? "clamp(30px, 9vw, 42px)" : "clamp(28px, 8vw, 38px)",
                  color: t.gold,
                  letterSpacing: reading.food.length > 7 ? 4 : 8,
                  textShadow: `0 2px 12px rgba(196,164,78,0.3), 0 0 40px rgba(196,164,78,0.1)`,
                  whiteSpace: "nowrap",
                }}>{reading.food}</div>
              </FoodNameGlow>
            </div>
          </div>

          {/* ──── BACK: Reading Details ──── */}
          <div style={{
            ...faceBase,
            padding: "20px clamp(14px, 4vw, 20px)",
            transform: "rotateY(180deg)",
            boxShadow: "0 16px 56px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
            justifyContent: "space-between",
          }}>
            <StarField />
            <CardCorners color={t.gold} tier={reading.tier} />

            {/* Back header */}
            <div style={{
              textAlign: "center", fontFamily: "'Ma Shan Zheng', cursive",
              fontSize: reading.food.length > 7
                ? "clamp(18px, 5vw, 24px)"
                : "clamp(24px, 6.5vw, 32px)",
              color: t.gold, whiteSpace: "nowrap",
              letterSpacing: reading.food.length > 7 ? 3 : 6,
              marginBottom: 4, position: "relative", zIndex: 1,
            }}>{reading.food}</div>

            <OrnamentDivider color={t.gold} symbol="✦" />

            {/* Main content — fills space, scrolls if needed */}
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              justifyContent: "space-evenly", gap: 8,
              position: "relative", zIndex: 1,
              overflowY: "auto", minHeight: 0,
            }}>

              {/* ★ 宜 — seal stamp on right ★ */}
              <div style={{ ...sec, padding: "8px 14px", position: "relative" }}>
                <div style={{
                  position: "absolute", top: 6, right: 10, zIndex: 2,
                  border: `2px solid ${t.gold}`,
                  borderRadius: 4, padding: "2px 8px",
                  fontFamily: "'Ma Shan Zheng', cursive",
                  fontSize: 14, color: t.gold, opacity: 0.7,
                  transform: "rotate(-6deg)", letterSpacing: 3,
                }}>宜</div>
                {reading.good.map((g, i) => (
                  <div key={`g${i}`} style={{
                    fontFamily: "'LXGW WenKai TC', serif", fontSize: 14, color: t.text,
                    marginBottom: 3, lineHeight: 1.6, display: "flex",
                    paddingRight: 36,
                  }}>
                    <span style={{ flexShrink: 0, marginRight: 6, color: t.textDim }}>·</span>
                    <span>{g}</span>
                  </div>
                ))}
              </div>

              {/* ★ 忌 — seal stamp on right ★ */}
              <div style={{ ...sec, padding: "8px 14px", position: "relative" }}>
                <div style={{
                  position: "absolute", top: 6, right: 10, zIndex: 2,
                  border: `2px solid ${t.textMuted}`,
                  borderRadius: 4, padding: "2px 8px",
                  fontFamily: "'Ma Shan Zheng', cursive",
                  fontSize: 14, color: t.textMuted, opacity: 0.6,
                  transform: "rotate(-6deg)", letterSpacing: 3,
                }}>忌</div>
                {reading.bad.map((b, i) => (
                  <div key={`b${i}`} style={{
                    fontFamily: "'LXGW WenKai TC', serif", fontSize: 14, color: t.text,
                    marginBottom: 3, lineHeight: 1.6, display: "flex",
                    paddingRight: 36,
                  }}>
                    <span style={{ flexShrink: 0, marginRight: 6, color: t.textDim }}>·</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Master quote — medium */}
              <div style={{ ...sec, padding: "10px 14px" }}>
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
                  color: t.textMuted, marginBottom: 6, letterSpacing: 2,
                }}>{reading.masterIcon} {reading.master}曰：</div>
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 15,
                  color: t.text, lineHeight: 1.8, fontStyle: "italic", paddingLeft: 4,
                }}>「{IMPATIENT_QUOTES[Math.min(rerollCount, IMPATIENT_QUOTES.length - 1)] || reading.quote}」</div>
              </div>

              {/* Dark humor — italic accent */}
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
                color: t.textMuted, textAlign: "center",
                lineHeight: 1.6, position: "relative", zIndex: 1,
                fontStyle: "italic", letterSpacing: 1,
              }}>— {darkHumor}</div>

              {/* Lucky items — stacked */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4, position: "relative", zIndex: 1 }}>
                {[
                  { label: "幸運物", value: reading.luckySide },
                  { label: "幸運方位", value: reading.luckySeat },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    ...sec, fontFamily: "'LXGW WenKai TC', serif",
                    fontSize: 13, lineHeight: 1.5, borderRadius: 6, padding: "6px 12px",
                    display: "flex", alignItems: "baseline",
                  }}>
                    <span style={{ color: t.gold, fontSize: 12, letterSpacing: 1, flexShrink: 0 }}>{label}</span>
                    <span style={{ color: t.textDim, margin: "0 6px", flexShrink: 0 }}>|</span>
                    <span style={{ color: t.text }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ═══ Flip Hint — small icon below card ═══ */}
      <div
        onClick={handleFlip}
        style={{
          marginTop: 6,
          display: "flex", alignItems: "center", gap: 4,
          cursor: "pointer",
          animation: "pulse-hint 2s ease-in-out infinite",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1-.25 1.94-.7 2.76l1.46 1.46C19.54 14.9 20 13.5 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1 .25-1.94.7-2.76L5.24 7.78C4.46 9.1 4 10.5 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="#8a8070" />
        </svg>
        <span style={{
          fontFamily: "'LXGW WenKai TC', serif",
          fontSize: 11, color: "#8a8070",
          letterSpacing: 1,
        }}>{flipped ? "翻回" : "查看解讀"}</span>
      </div>

      {/* ═══ Action Buttons ═══ */}
      <div style={{
        padding: "6px 0 4px", display: "flex", gap: 12,
        justifyContent: "center", width: cardW, flexShrink: 0,
      }}>
        <button onClick={(e) => { e.stopPropagation(); onReroll(); }} className="btn-secondary" style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 13,
          padding: "8px 20px",
          border: `1.5px solid rgba(196,164,78,0.4)`,
          borderRadius: 8, background: "transparent",
          color: TAROT.textMuted, cursor: "pointer",
          letterSpacing: 2, transition: "all 0.2s",
        }}>
          {REROLL_BUTTONS[Math.min(rerollCount, REROLL_BUTTONS.length - 1)]}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onAccept(); }} className="btn-primary" style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 13,
          padding: "8px 20px", border: "none",
          borderRadius: 8,
          background: `linear-gradient(135deg, ${TAROT.gold}, #d4b44e)`,
          color: TAROT.bg, cursor: "pointer",
          letterSpacing: 2, fontWeight: 700,
          transition: "all 0.2s",
          boxShadow: "0 4px 16px rgba(196,164,78,0.3)",
        }}>{ACCEPT_BUTTONS[Math.min(rerollCount, ACCEPT_BUTTONS.length - 1)]}</button>
      </div>
    </div>
  );
}
