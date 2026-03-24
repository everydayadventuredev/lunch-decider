import { useState, useEffect } from "react";
import { TIER_LABELS } from "../data/foods";
import { getChineseDateStr } from "../utils/generateReading";

export default function DevilResultCard({ reading, onAccept }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="devil-mode" style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", minHeight: "100vh",
      padding: "24px 16px 56px",
    }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 12,
          color: "#8a6060",
          letterSpacing: 3,
        }}>{getChineseDateStr()}</div>
        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(24px, 6vw, 36px)",
          color: "#e8c4c4",
          margin: "4px 0",
          letterSpacing: 4,
        }}>魔王裁決</h2>
      </div>

      {/* Main Card - dark theme */}
      <div className={`result-card ${revealed ? "revealed" : ""}`} style={{
        width: "min(380px, 90vw)",
        background: "linear-gradient(145deg, #1a1214 0%, #2a1a1e 50%, #1a1214 100%)",
        borderRadius: 12,
        border: "2px solid #8b3a3a",
        padding: "28px 24px",
        position: "relative",
        boxShadow: "0 8px 40px rgba(139, 58, 58, 0.3), inset 0 0 40px rgba(139, 58, 58, 0.05)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0) rotateX(0)" : "translateY(20px) rotateX(-10deg)",
        transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        {/* Devil badge */}
        <div style={{
          position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
          background: "#8b3a3a",
          color: "#e8c4c4",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 12,
          fontWeight: 700,
          padding: "4px 16px",
          borderRadius: 20,
          letterSpacing: 2,
          whiteSpace: "nowrap",
        }}>不准再換</div>

        {/* Fortune name */}
        <div style={{
          textAlign: "center",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 13,
          color: "#8a6060",
          letterSpacing: 3,
          marginBottom: 4,
        }}>【{reading.fortune}】</div>

        {/* Tier */}
        <div style={{
          textAlign: "center",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 11,
          color: "#c25050",
          letterSpacing: 2,
          marginBottom: 16,
        }}>{TIER_LABELS[reading.tier]}</div>

        {/* FOOD NAME */}
        <div style={{
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(36px, 9vw, 48px)",
          color: "#e8c4c4",
          margin: "8px 0 20px",
          letterSpacing: 6,
          textShadow: "0 2px 12px rgba(139, 58, 58, 0.5)",
        }}>{reading.food}</div>

        {/* Divider */}
        <div style={{
          width: "100%", height: 1,
          background: "linear-gradient(90deg, transparent, #8b3a3a, transparent)",
          margin: "0 0 20px",
        }} />

        {/* 宜忌 section */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
          <div style={{ flex: 1, paddingRight: 14 }}>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 14, fontWeight: 700,
              color: "#c25050",
              marginBottom: 8, letterSpacing: 2,
            }}>▸ 命令</div>
            {reading.good.map((g, i) => (
              <div key={i} style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 13, color: "#c0a8a8",
                marginBottom: 4, lineHeight: 1.7,
                display: "flex",
              }}>
                <span style={{ flexShrink: 0, marginRight: 4 }}>•</span>
                <span>{g}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 1, background: "#8b3a3a", opacity: 0.4, flexShrink: 0 }} />
          <div style={{ flex: 1, paddingLeft: 14 }}>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 14, fontWeight: 700,
              color: "#8a6060",
              marginBottom: 8, letterSpacing: 2,
            }}>▸ 禁止</div>
            {reading.bad.map((b, i) => (
              <div key={i} style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 13, color: "#c0a8a8",
                marginBottom: 4, lineHeight: 1.7,
                display: "flex",
              }}>
                <span style={{ flexShrink: 0, marginRight: 4 }}>•</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: "100%", height: 1,
          background: "linear-gradient(90deg, transparent, #8b3a3a, transparent)",
          margin: "0 0 16px",
        }} />

        {/* Devil quote */}
        <div style={{
          background: "rgba(139, 58, 58, 0.1)",
          border: "1px solid rgba(139, 58, 58, 0.2)",
          borderRadius: 8,
          padding: "14px 16px",
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 12,
            color: "#8a6060",
            marginBottom: 6, letterSpacing: 1,
          }}>{reading.masterIcon} {reading.master}曰：</div>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 15,
            color: "#e8c4c4",
            lineHeight: 1.8,
            fontStyle: "italic",
          }}>「{reading.quote}」</div>
        </div>

        {/* Lucky items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 12, color: "#8a6060", lineHeight: 1.8,
            display: "flex",
          }}>
            <span style={{ color: "#c25050", flexShrink: 0 }}>配料：</span>
            <span>{reading.luckySide}</span>
          </div>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 12, color: "#8a6060", lineHeight: 1.8,
            display: "flex",
          }}>
            <span style={{ color: "#c25050", flexShrink: 0 }}>座位：</span>
            <span>{reading.luckySeat}</span>
          </div>
        </div>
      </div>

      {/* Single accept button - no reroll allowed */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        background: "linear-gradient(transparent, #1a1214 50%)",
        padding: "8px 16px calc(6px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        gap: 12,
        justifyContent: "center",
        zIndex: 20,
      }}>
        <button onClick={onAccept} style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 15,
          padding: "14px 48px",
          border: "none",
          borderRadius: 8,
          background: "#8b3a3a",
          color: "#e8c4c4",
          cursor: "pointer",
          letterSpacing: 4,
          transition: "all 0.2s",
          boxShadow: "0 4px 16px rgba(139, 58, 58, 0.4)",
        }}>遵旨</button>
      </div>

      {/* Devil commentary */}
      <p style={{
        fontFamily: "'Noto Serif TC', serif",
        fontSize: 12,
        color: "#8a6060",
        marginTop: 12,
        letterSpacing: 1,
        textAlign: "center",
      }}>（大師們被嚇跑了，魔王接管了午膳殿）</p>
    </div>
  );
}
