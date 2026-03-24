import { useState, useRef } from "react";
import { getChineseDateStr } from "../utils/generateReading";
import { EASTER_EGG_MESSAGES } from "../data/darkCommentary";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function CardBack({ onFlip, subtitle }) {
  const isOvertime = new Date().getHours() >= 18;
  const [easterEgg, setEasterEgg] = useState(null);
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef(null);

  const handleTitleTap = (e) => {
    e.stopPropagation();
    tapCountRef.current++;
    clearTimeout(tapTimerRef.current);
    tapTimerRef.current = setTimeout(() => { tapCountRef.current = 0; }, 2000);

    if (tapCountRef.current >= 5) {
      tapCountRef.current = 0;
      setEasterEgg(pick(EASTER_EGG_MESSAGES.titleTap));
      setTimeout(() => setEasterEgg(null), 3000);
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", padding: 20,
    }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 onClick={handleTitleTap} style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(36px, 8vw, 56px)",
          color: "var(--ink)",
          margin: 0,
          letterSpacing: 6,
          lineHeight: 1.2,
          cursor: "default",
          userSelect: "none",
        }}>午膳殿</h1>
        <p style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: "clamp(14px, 3vw, 18px)",
          color: "var(--ink-light)",
          marginTop: 8,
          letterSpacing: 3,
        }}>{subtitle}</p>
        {/* P6: 首頁簡短功能說明 */}
        <p style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 12,
          color: "var(--ink-lighter)",
          marginTop: 6,
          letterSpacing: 1,
        }}>翻一張牌，讓午膳殿幫你決定今天中午吃什麼</p>
      </div>

      <div
        onClick={onFlip}
        className="card-back-hover"
        style={{
          width: "min(320px, 85vw)",
          aspectRatio: "3/4",
          background: "var(--card-bg)",
          borderRadius: 12,
          border: "3px solid var(--ink)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.16), 0 2px 6px rgba(0,0,0,0.1), inset 0 0 60px rgba(139,90,43,0.05)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Corner decorations */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map(pos => (
          <div key={pos} style={{
            position: "absolute",
            [pos.includes("top") ? "top" : "bottom"]: 12,
            [pos.includes("left") ? "left" : "right"]: 12,
            width: 28, height: 28,
            borderTop: pos.includes("top") ? "2px solid var(--accent)" : "none",
            borderBottom: pos.includes("bottom") ? "2px solid var(--accent)" : "none",
            borderLeft: pos.includes("left") ? "2px solid var(--accent)" : "none",
            borderRight: pos.includes("right") ? "2px solid var(--accent)" : "none",
          }} />
        ))}

        {/* Inner border */}
        <div style={{
          position: "absolute",
          inset: 20,
          border: "1px solid var(--ink-lighter)",
          borderRadius: 6,
          pointerEvents: "none",
        }} />

        {/* Center content */}
        <div style={{ fontSize: 52, marginBottom: 12, filter: "grayscale(20%)" }}>🍽️</div>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 36,
          color: "var(--ink)",
          letterSpacing: 8,
        }}>{isOvertime ? "續命" : "午膳"}</div>
        <div style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 12,
          color: "var(--ink-light)",
          marginTop: 8,
          letterSpacing: 4,
        }}>{isOvertime ? "誠心加班" : "誠心翻牌"}</div>

        {/* Decorative line */}
        <div style={{
          width: 60, height: 1,
          background: "var(--accent)",
          margin: "16px 0 8px",
          opacity: 0.6,
        }} />
        <div style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 11,
          color: "var(--ink-lighter)",
          letterSpacing: 2,
        }}>{getChineseDateStr()}</div>
      </div>

      <p style={{
        fontFamily: "'Noto Serif TC', serif",
        fontSize: 13,
        color: "var(--ink-lighter)",
        marginTop: 24,
        letterSpacing: 1,
        animation: "pulse 2s ease-in-out infinite",
      }}>— 點擊卡牌，獲取今日指引 —</p>

      {/* Easter egg: tap title 5 times */}
      {easterEgg && (
        <div style={{
          position: "fixed",
          bottom: 60,
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--ink)",
          color: "var(--card-bg)",
          borderRadius: 12,
          padding: "12px 20px",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 13,
          letterSpacing: 1,
          zIndex: 50,
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
          animation: "fadeIn 0.3s ease",
        }}>
          {easterEgg}
        </div>
      )}
    </div>
  );
}
