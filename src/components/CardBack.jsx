import { useState, useRef } from "react";
import { getChineseDateStr } from "../utils/generateReading";
import { EASTER_EGG_MESSAGES } from "../data/darkCommentary";
import { CardCorners, StarField } from "./CardOrnaments";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Match the result card's dark tarot palette
const T = {
  bg: "#1a1612",
  bgGrad: "linear-gradient(180deg, #1a1612 0%, #221c16 50%, #1a1612 100%)",
  text: "#e8dcc8",
  textMuted: "#a89880",
  textDim: "#6b5d4d",
  gold: "#c4a44e",
  border: "#c4a44e",
};

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
          background: T.bgGrad,
          borderRadius: 12,
          border: `1.5px solid ${T.gold}`,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 16px 56px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.2)",
          transition: "transform 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Star field */}
        <StarField />

        {/* Vine corner ornaments */}
        <CardCorners color={T.gold} />

        {/* Inner gold border */}
        <div style={{
          position: "absolute",
          inset: 10,
          border: `1px solid rgba(196, 164, 78, 0.15)`,
          borderRadius: 8,
          pointerEvents: "none",
        }} />

        {/* Center content */}
        <div style={{ fontSize: 52, marginBottom: 12, filter: "grayscale(20%)", position: "relative", zIndex: 1 }}>🍽️</div>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 36,
          color: T.gold,
          letterSpacing: 8,
          textShadow: "0 2px 12px rgba(196,164,78,0.3)",
          position: "relative", zIndex: 1,
        }}>{isOvertime ? "續命" : "午膳"}</div>
        <div style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 12,
          color: T.textMuted,
          marginTop: 8,
          letterSpacing: 4,
          position: "relative", zIndex: 1,
        }}>{isOvertime ? "誠心加班" : "誠心翻牌"}</div>

        {/* Decorative gold line */}
        <div style={{
          width: 60, height: 1,
          background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
          margin: "16px 0 8px",
          opacity: 0.5,
          position: "relative", zIndex: 1,
        }} />
        <div style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 11,
          color: T.textDim,
          letterSpacing: 2,
          position: "relative", zIndex: 1,
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
          background: T.bg,
          color: T.gold,
          borderRadius: 12,
          padding: "12px 20px",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 13,
          letterSpacing: 1,
          zIndex: 50,
          border: `1px solid rgba(196,164,78,0.2)`,
          boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
          whiteSpace: "nowrap",
          animation: "fadeIn 0.3s ease",
        }}>
          {easterEgg}
        </div>
      )}
    </div>
  );
}
