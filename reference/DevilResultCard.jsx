import { useState, useEffect, useMemo } from "react";
import { TIER_LABELS } from "../data/foods";
import { getChineseDateStr } from "../utils/generateReading";
import { getFoodImage } from "../utils/foodImage";
import { CardCorners, OrnamentDivider, FoodNameGlow, StarField } from "./CardOrnaments";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const DEVIL_TAUNTS = [
  "選擇恐懼症末期患者，由魔王親自裁決。",
  "你的午餐自由已被沒收。",
  "大師們集體請假，魔王代班中。",
  "你的猶豫不決感動了地獄。",
  "恭喜解鎖隱藏結局：魔王親臨。",
];

const D = {
  bg: "#1a1214",
  bgGrad: "linear-gradient(180deg, #1a1214 0%, #2a1a1e 50%, #1a1214 100%)",
  text: "#e8c4c4",
  textMuted: "#8a6060",
  textDim: "#5a3a3a",
  red: "#8b3a3a",
  redBright: "#c25050",
  redGlow: "rgba(139, 58, 58, 0.15)",
  sectionBg: "rgba(139, 58, 58, 0.06)",
  sectionBorder: "rgba(139, 58, 58, 0.12)",
};

export default function DevilResultCard({ reading, onAccept }) {
  const [revealed, setRevealed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [foodImg, setFoodImg] = useState(null);
  const taunt = useMemo(() => pick(DEVIL_TAUNTS), []);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    getFoodImage(reading.food).then(url => { if (url) setFoodImg(url); });
  }, [reading.food]);

  const handleFlip = (e) => { e.stopPropagation(); setFlipped(f => !f); };

  const cardW = "min(320px, 84vw)";
  const cardH = "min(520px, 138vw)";

  const sec = {
    background: D.sectionBg, borderRadius: 8,
    border: `1px solid ${D.sectionBorder}`,
    position: "relative", zIndex: 1,
  };

  const faceBase = {
    width: "100%", height: "100%",
    background: D.bgGrad,
    borderRadius: 14,
    border: `2.5px solid ${D.red}`,
    position: "absolute", top: 0, left: 0,
    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
    overflow: "hidden", boxSizing: "border-box",
    display: "flex", flexDirection: "column",
  };

  return (
    <div className="devil-mode" style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", minHeight: "100dvh",
      padding: "10px 16px 24px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
          color: D.textMuted, letterSpacing: 3,
        }}>{getChineseDateStr()}</div>
        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(20px, 5vw, 26px)",
          color: D.text, margin: "2px 0", letterSpacing: 4,
          textShadow: "0 0 20px rgba(139,58,58,0.4)",
        }}>魔王裁決</h2>
      </div>

      {/* ═══ Card Stack ═══ */}
      <div
        onClick={handleFlip}
        style={{
          position: "relative", width: cardW, height: cardH,
          cursor: "pointer",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "none" : "translateY(-30px) scale(0.95)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        {/* Peek card */}
        <div style={{
          position: "absolute", top: 6, left: 4, right: -8, height: "100%",
          background: D.bgGrad, borderRadius: 14,
          border: `2px solid rgba(139,58,58,0.2)`,
          boxShadow: "0 8px 32px rgba(139,58,58,0.2)",
          transform: "rotate(2deg)",
          opacity: flipped ? 0 : 0.5, transition: "opacity 0.3s", zIndex: 0,
        }} />

        {/* Flip container */}
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          zIndex: 1,
        }}>

          {/* ──── FRONT ──── */}
          <div style={{
            ...faceBase, padding: 0,
            boxShadow: "0 16px 56px rgba(139,58,58,0.4), 0 0 60px rgba(139,58,58,0.1)",
          }}>
            {/* Badge */}
            <div style={{
              position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
              background: D.red, color: D.text,
              fontFamily: "'LXGW WenKai TC', serif",
              fontSize: 11, fontWeight: 700,
              padding: "3px 14px", borderRadius: 20,
              letterSpacing: 2, whiteSpace: "nowrap", zIndex: 3,
            }}>不准再換</div>

            {/* Image — full bleed with red tint overlay */}
            <div style={{
              flex: 1, position: "relative", overflow: "hidden",
              borderRadius: "12px 12px 0 0",
            }}>
              {foodImg && (
                <img src={foodImg} alt={reading.food} style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  filter: "saturate(0.6) brightness(0.8)",
                }} />
              )}
              {/* Red gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(transparent 40%, rgba(139,58,58,0.15) 70%, #1a1214 100%)",
              }} />
              {!foodImg && <StarField />}
            </div>

            {/* Bottom text cluster */}
            <div style={{
              padding: "0 16px 14px", background: D.bg,
              textAlign: "center", position: "relative",
            }}>
              <CardCorners color={D.red} />
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif",
                fontSize: 10, color: D.textMuted, letterSpacing: 3, marginBottom: 2,
              }}>【{reading.fortune}】</div>
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif",
                fontSize: 10, color: D.redBright, letterSpacing: 2,
                opacity: 0.7, marginBottom: 4,
              }}>{TIER_LABELS[reading.tier]}</div>
              <FoodNameGlow>
                <div style={{
                  fontFamily: "'Ma Shan Zheng', cursive",
                  fontSize: "clamp(28px, 8vw, 38px)",
                  color: D.text, letterSpacing: 8,
                  textShadow: "0 2px 12px rgba(139,58,58,0.4), 0 0 40px rgba(139,58,58,0.15)",
                }}>{reading.food}</div>
              </FoodNameGlow>
            </div>
          </div>

          {/* ──── BACK ──── */}
          <div style={{
            ...faceBase,
            padding: "20px clamp(14px, 4vw, 20px)",
            transform: "rotateY(180deg)",
            boxShadow: "0 16px 56px rgba(139,58,58,0.4)",
            justifyContent: "space-between",
          }}>
            <StarField />
            <CardCorners color={D.red} />

            {/* Header */}
            <div style={{
              textAlign: "center", fontFamily: "'Ma Shan Zheng', cursive",
              fontSize: "clamp(26px, 7vw, 34px)", color: D.text,
              letterSpacing: 6, marginBottom: 4,
              position: "relative", zIndex: 1,
              textShadow: "0 0 20px rgba(139,58,58,0.3)",
            }}>{reading.food}</div>

            <OrnamentDivider color={D.red} symbol="◆" />

            {/* Content */}
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              justifyContent: "center", gap: 14,
              position: "relative", zIndex: 1,
            }}>
              {/* 命令 / 禁止 — stacked */}
              <div style={{ ...sec, padding: "14px 16px" }}>
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 13, fontWeight: 700,
                  color: D.redBright, marginBottom: 6, letterSpacing: 2,
                }}>▸ 命令</div>
                {reading.good.map((g, i) => (
                  <div key={`g${i}`} style={{
                    fontFamily: "'LXGW WenKai TC', serif", fontSize: 13, color: D.text,
                    marginBottom: 4, lineHeight: 1.7, display: "flex",
                  }}>
                    <span style={{ flexShrink: 0, marginRight: 6, color: D.textMuted }}>•</span>
                    <span>{g}</span>
                  </div>
                ))}
                <div style={{
                  height: 1, background: D.red, opacity: 0.15, margin: "10px 0",
                }} />
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 13, fontWeight: 700,
                  color: D.textMuted, marginBottom: 6, letterSpacing: 2,
                }}>▸ 禁止</div>
                {reading.bad.map((b, i) => (
                  <div key={`b${i}`} style={{
                    fontFamily: "'LXGW WenKai TC', serif", fontSize: 13, color: D.text,
                    marginBottom: 4, lineHeight: 1.7, display: "flex",
                  }}>
                    <span style={{ flexShrink: 0, marginRight: 6, color: D.textMuted }}>•</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Devil quote */}
              <div style={{ ...sec, padding: "14px 16px" }}>
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
                  color: D.textMuted, marginBottom: 6, letterSpacing: 2,
                }}>{reading.masterIcon} {reading.master}曰：</div>
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 14,
                  color: D.text, lineHeight: 1.8, fontStyle: "italic", paddingLeft: 4,
                }}>「{reading.quote}」</div>
              </div>

              {/* Taunt */}
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
                color: D.textMuted, textAlign: "center",
                lineHeight: 1.6, fontStyle: "italic", letterSpacing: 1,
              }}>— {taunt}</div>

              {/* Cursed lucky items — stacked */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { label: "幸運物", value: reading.luckySide },
                  { label: "幸運方位", value: reading.luckySeat },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    ...sec, fontFamily: "'LXGW WenKai TC', serif",
                    fontSize: 11, lineHeight: 1.5, borderRadius: 6, padding: "5px 12px",
                    display: "flex", alignItems: "baseline",
                  }}>
                    <span style={{ color: D.redBright, fontSize: 10, letterSpacing: 1, flexShrink: 0 }}>{label}</span>
                    <span style={{ color: D.textDim, margin: "0 6px", flexShrink: 0 }}>|</span>
                    <span style={{ color: D.text }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flip hint */}
            <div style={{
              textAlign: "center", fontFamily: "'LXGW WenKai TC', serif",
              fontSize: 10, color: D.textDim, letterSpacing: 2,
              marginTop: 8, position: "relative", zIndex: 1,
              flexShrink: 0, opacity: 0.6,
            }}>↻ 輕觸翻回</div>
          </div>
        </div>
      </div>

      {/* Flip hint — outside card */}
      {!flipped && (
        <div onClick={handleFlip} style={{
          marginTop: 8, fontFamily: "'LXGW WenKai TC', serif",
          fontSize: 11, color: D.textMuted, letterSpacing: 2, cursor: "pointer",
          animation: "pulse-hint 2s ease-in-out infinite",
        }}>↻ 輕觸卡片翻面查看裁決</div>
      )}

      {/* Single obey button — no reroll */}
      <div style={{
        marginTop: flipped ? 16 : 8, display: "flex", gap: 12,
        justifyContent: "center", width: cardW,
      }}>
        <button onClick={(e) => { e.stopPropagation(); onAccept(); }} style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 15,
          padding: "12px 48px", border: "none", borderRadius: 8,
          background: D.red, color: D.text,
          cursor: "pointer", letterSpacing: 4, fontWeight: 700,
          transition: "all 0.2s",
          boxShadow: "0 4px 16px rgba(139,58,58,0.4)",
        }}>遵旨</button>
      </div>

      {/* Maps link — outside card */}
      <a
        href={`https://www.google.com/maps/search/${encodeURIComponent(reading.food)}+餐廳`}
        target="_blank" rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "block", marginTop: 10,
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
          color: D.textMuted, letterSpacing: 2, textDecoration: "none",
        }}
      >📍 去找你的{reading.food}吧</a>

      <p style={{
        fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
        color: D.textDim, marginTop: 6, letterSpacing: 1, textAlign: "center",
      }}>（大師們被嚇跑了，魔王接管了午膳殿）</p>
    </div>
  );
}
