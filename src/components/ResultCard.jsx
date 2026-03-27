import { useState, useEffect } from "react";
import { TIER_LABELS } from "../data/foods";
import { getChineseDateStr } from "../utils/generateReading";
import { getFoodImage } from "../utils/foodImage";
import SealStamp from "./SealStamp";
import { CardCorners, OrnamentDivider, FoodNameGlow, FortuneCrest, StarField } from "./CardOrnaments";

// Progressive reroll button text
const REROLL_BUTTONS = [
  "此指引不準，再來",     // 0
  "再給大師一次機會",     // 1
  "大師你認真的嗎",       // 2
  "不然你自己決定啊",     // 3
  "⋯⋯",                  // 4
  "（瘋狂點擊中）",       // 5
  "我就不信",             // 6
  "再一次就好",           // 7
  "最後一次",             // 8
  "真的最後一次",         // 9+
];

// Accept button also changes
const ACCEPT_BUTTONS = [
  "認命了",               // 0
  "認命了",               // 1
  "好吧認命了",           // 2
  "算了隨便啦",           // 3
  "⋯⋯認命",              // 4
  "（投降）",             // 5
  "（投降）",             // 6
  "求你讓我認命",         // 7
  "我錯了",               // 8
  "（跪）",               // 9+
];

// Impatient quotes that replace master quotes on reroll
const IMPATIENT_QUOTES = [
  null,                                          // 0: use original
  null,                                          // 1: still normal
  "你很挑欸。大師的建議是不要想太多。",          // 2
  "大師覺得你根本不是來求指引的。",              // 3
  "……",                                          // 4
  "（大師已關機）",                               // 5
  "（無人接聽）",                                 // 6
  "你還在？",                                     // 7
  "大師們開始懷疑人生了。",                       // 8
  "午膳殿即將暫停營業。",                         // 9+
];

// Bottom comment, shown from 1st reroll onward
const REROLL_COMMENTS = [
  "（大師微微皺眉）",                    // 1
  "（大師們交換了一個眼神）",            // 2
  "（殿內大師們已讀不回）",              // 3
  "（大師們正在考慮離職）",              // 4
  "（午膳殿傳來關門的聲音）",            // 5
  "（大師已關機，請明日再來）",          // 6
  "（保全走過來了）",                    // 7
  "（燈一盞一盞關掉）",                  // 8
  "（最後的大師嘆了一口氣）",            // 9+
];

// Dark tarot color scheme
const TAROT = {
  bg: "#1a1612",
  bgGrad: "linear-gradient(180deg, #1a1612 0%, #221c16 50%, #1a1612 100%)",
  text: "#e8dcc8",
  textMuted: "#a89880",
  textDim: "#6b5d4d",
  gold: "#c4a44e",
  goldDim: "rgba(196, 164, 78, 0.15)",
  accent: "#c4a44e",
  divider: "rgba(196, 164, 78, 0.12)",
  sectionBg: "rgba(196, 164, 78, 0.06)",
  sectionBorder: "rgba(196, 164, 78, 0.1)",
};

const LEGEND_TAROT = {
  ...TAROT,
  bgGrad: "linear-gradient(180deg, #1a1612 0%, #2a2010 50%, #1a1612 100%)",
  gold: "#d4b44e",
  goldDim: "rgba(212, 180, 78, 0.2)",
};

export default function ResultCard({ reading, onReroll, onAccept, rerollCount }) {
  const [revealed, setRevealed] = useState(false);
  const [foodImg, setFoodImg] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Load food image asynchronously
  useEffect(() => {
    getFoodImage(reading.food).then(url => { if (url) setFoodImg(url); });
  }, [reading.food]);

  const isLegend = reading.isLegend;
  const t = isLegend ? LEGEND_TAROT : TAROT;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", minHeight: "100vh",
      padding: "10px 16px 68px",
      background: "linear-gradient(180deg, var(--bg) 0%, #e8e0d4 30%, #ddd5c8 100%)",
    }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 11,
          color: "var(--ink-lighter)",
          letterSpacing: 3,
        }}>{getChineseDateStr()}</div>
        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(20px, 5vw, 26px)",
          color: "var(--ink)",
          margin: "2px 0",
          letterSpacing: 4,
        }}>{reading.isOvertime ? "加班續命指引" : "午膳指引"}</h2>
      </div>

      {/* Main Dark Tarot Card */}
      <div className={`result-card ${revealed ? "revealed" : ""}`} style={{
        "--tarot-bg": t.bg,
        width: "min(340px, 88vw)",
        background: t.bgGrad,
        borderRadius: 12,
        border: `2.5px solid ${t.gold}`,
        padding: "20px clamp(14px, 4vw, 20px)",
        position: "relative",
        boxShadow: isLegend
          ? `0 16px 56px rgba(0,0,0,0.6), 0 0 40px rgba(196,164,78,0.15), inset 0 0 40px rgba(196,164,78,0.03)`
          : "0 16px 56px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(-30px) scale(0.95)",
        transition: "opacity 0.1s",
        overflow: "hidden",
      }}>
        {/* Star field background */}
        <StarField />

        {/* Legend badge */}
        {isLegend && (
          <div style={{
            position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
            background: `linear-gradient(135deg, ${t.gold}, #d4b44e)`,
            color: t.bg,
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 12,
            fontWeight: 700,
            padding: "4px 16px",
            borderRadius: 20,
            letterSpacing: 2,
            whiteSpace: "nowrap",
            zIndex: 2,
          }}>百年難遇之祥瑞</div>
        )}

        {/* Friday / Monday badge */}
        {(reading.isFriday || reading.isMonday) && !isLegend && (
          <div style={{ position: "absolute", top: -12, right: 16, zIndex: 2 }}>
            <SealStamp
              text={reading.isFriday ? "週五無禁忌" : "週一渡劫中"}
              color={reading.isFriday ? t.gold : t.textMuted}
              size={50}
              rotate={reading.isFriday ? -8 : -6}
            />
          </div>
        )}

        {/* Wednesday badge */}
        {reading.isWednesday && !reading.isFriday && !reading.isMonday && !isLegend && (
          <div style={{ position: "absolute", top: -12, right: 16, zIndex: 2 }}>
            <SealStamp text="週三症候群" color={t.textMuted} size={50} rotate={-5} />
          </div>
        )}

        {/* Vine corner ornaments */}
        <CardCorners color={t.gold} />

        {/* Fortune name with decorative crest */}
        <FortuneCrest text={`【${reading.fortune}】`} color={t.textMuted} />

        {/* Tier label */}
        <div style={{
          textAlign: "center",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 10,
          color: t.gold,
          letterSpacing: 2,
          marginBottom: 4,
          opacity: 0.8,
          position: "relative", zIndex: 1,
        }}>{TIER_LABELS[reading.tier]}</div>

        {/* Food illustration */}
        {foodImg && (
          <div style={{
            display: "flex", justifyContent: "center",
            marginBottom: 2,
            position: "relative", zIndex: 1,
          }}>
            <img
              src={foodImg}
              alt={reading.food}
              style={{
                width: "min(130px, 36vw)",
                height: "min(130px, 36vw)",
                objectFit: "cover",
                borderRadius: 8,
                border: `1px solid rgba(196,164,78,0.2)`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            />
          </div>
        )}

        {/* FOOD NAME with glow */}
        <FoodNameGlow isLegend={isLegend}>
          <div style={{
            textAlign: "center",
            fontFamily: "'Ma Shan Zheng', cursive",
            fontSize: isLegend ? "clamp(30px, 8vw, 40px)" : "clamp(26px, 7vw, 36px)",
            color: t.gold,
            margin: foodImg ? "0 0 6px" : "0 0 12px",
            letterSpacing: 6,
            textShadow: `0 2px 12px rgba(196,164,78,0.3), 0 0 40px rgba(196,164,78,0.1)`,
            position: "relative", zIndex: 1,
          }}>{reading.food}</div>
        </FoodNameGlow>

        {/* Ornamental divider */}
        <OrnamentDivider color={t.gold} symbol="✦" />

        {/* 宜忌 section */}
        <div style={{
          display: "flex", gap: 0, marginBottom: 14,
          background: t.sectionBg,
          borderRadius: 8,
          padding: "10px 12px",
          border: `1px solid ${t.sectionBorder}`,
          position: "relative", zIndex: 1,
        }}>
          <div style={{ flex: 1, paddingRight: 10 }}>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 12, fontWeight: 700,
              color: t.gold,
              marginBottom: 6, letterSpacing: 2,
            }}>▸ 宜</div>
            {reading.good.map((g, i) => (
              <div key={i} style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 12, color: t.text,
                marginBottom: 4, lineHeight: 1.7,
                display: "flex",
              }}>
                <span style={{ flexShrink: 0, marginRight: 4, color: t.textDim }}>·</span>
                <span>{g}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 1, background: t.gold, opacity: 0.15, flexShrink: 0, margin: "4px 0" }} />
          <div style={{ flex: 1, paddingLeft: 10 }}>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 12, fontWeight: 700,
              color: t.textMuted,
              marginBottom: 6, letterSpacing: 2,
            }}>▸ 忌</div>
            {reading.bad.map((b, i) => (
              <div key={i} style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 12, color: t.text,
                marginBottom: 4, lineHeight: 1.7,
                display: "flex",
              }}>
                <span style={{ flexShrink: 0, marginRight: 4, color: t.textDim }}>·</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Master quote */}
        <div style={{
          background: t.sectionBg,
          borderRadius: 8,
          padding: "10px 14px",
          marginBottom: 14,
          border: `1px solid ${t.sectionBorder}`,
          position: "relative", zIndex: 1,
        }}>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 10,
            color: t.textDim,
            marginBottom: 6,
            letterSpacing: 2,
          }}>{reading.masterIcon} {reading.master}曰：</div>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 13,
            color: t.text,
            lineHeight: 1.8,
            fontStyle: "italic",
            paddingLeft: 4,
          }}>「{IMPATIENT_QUOTES[Math.min(rerollCount, IMPATIENT_QUOTES.length - 1)] || reading.quote}」</div>
        </div>

        {/* Lucky items — compact single row */}
        <div style={{
          display: "flex", gap: 6,
          marginBottom: 2,
          position: "relative", zIndex: 1,
        }}>
          {[
            { label: "配料", value: reading.luckySide },
            { label: "座位", value: reading.luckySeat },
          ].map(({ label, value }) => (
            <div key={label} style={{
              flex: 1,
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 11, lineHeight: 1.5,
              background: t.sectionBg,
              borderRadius: 6,
              padding: "5px 8px",
              border: `1px solid ${t.sectionBorder}`,
            }}>
              <span style={{ color: t.gold, fontSize: 10, letterSpacing: 1 }}>{label}</span>
              <span style={{ color: t.textDim, margin: "0 4px" }}>|</span>
              <span style={{ color: t.text }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Google Maps link */}
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(reading.food)}+餐廳`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: 6,
            padding: "4px 0",
            textAlign: "center",
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 11,
            color: t.textDim,
            letterSpacing: 2,
            textDecoration: "none",
            transition: "color 0.2s",
            position: "relative", zIndex: 1,
          }}
        >
          📍 找附近的{reading.food}
        </a>
      </div>

      {/* Sticky bottom buttons */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(transparent, #ddd5c8 50%)",
        padding: "8px 16px calc(6px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        gap: 12,
        justifyContent: "center",
        zIndex: 20,
      }}>
        <button onClick={onReroll} className="btn-secondary" style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 14,
          padding: "10px 24px",
          border: `1.5px solid rgba(196,164,78,0.4)`,
          borderRadius: 8,
          background: "transparent",
          color: TAROT.textMuted,
          cursor: "pointer",
          letterSpacing: 2,
          transition: "all 0.2s",
        }}>
          {REROLL_BUTTONS[Math.min(rerollCount, REROLL_BUTTONS.length - 1)]}
        </button>
        <button onClick={onAccept} className="btn-primary" style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 14,
          padding: "10px 24px",
          border: "none",
          borderRadius: 8,
          background: `linear-gradient(135deg, ${TAROT.gold}, #d4b44e)`,
          color: TAROT.bg,
          cursor: "pointer",
          letterSpacing: 2,
          fontWeight: 700,
          transition: "all 0.2s",
          boxShadow: "0 4px 16px rgba(196,164,78,0.3)",
        }}>{ACCEPT_BUTTONS[Math.min(rerollCount, ACCEPT_BUTTONS.length - 1)]}</button>
      </div>

      {rerollCount >= 1 && (
        <p style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 11,
          color: "var(--ink-lighter)",
          marginTop: 8,
          letterSpacing: 1,
          textAlign: "center",
        }}>{REROLL_COMMENTS[Math.min(rerollCount - 1, REROLL_COMMENTS.length - 1)]}</p>
      )}
    </div>
  );
}
