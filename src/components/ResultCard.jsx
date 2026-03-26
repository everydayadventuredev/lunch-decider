import { useState, useEffect } from "react";
import { TIER_LABELS } from "../data/foods";
import { getChineseDateStr } from "../utils/generateReading";
import SealStamp from "./SealStamp";
import { CardCorners, OrnamentDivider, FoodNameGlow } from "./CardOrnaments";

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

export default function ResultCard({ reading, onReroll, onAccept, rerollCount }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const isLegend = reading.isLegend;
  const cardBorder = isLegend ? "var(--gold)" : "var(--ink)";

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", minHeight: "100vh",
      padding: "24px 16px 56px", /* P1: bottom padding for sticky buttons */
    }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 12,
          color: "var(--ink-lighter)",
          letterSpacing: 3,
        }}>{getChineseDateStr()}</div>
        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(24px, 6vw, 36px)",
          color: "var(--ink)",
          margin: "4px 0",
          letterSpacing: 4,
        }}>{reading.isOvertime ? "加班續命指引" : "午膳指引"}</h2>
      </div>

      {/* Main Card */}
      <div className={`result-card ${revealed ? "revealed" : ""}`} style={{
        width: "min(380px, 90vw)",
        background: isLegend
          ? "linear-gradient(135deg, var(--card-bg) 0%, #fdf6e3 50%, #fff8dc 100%)"
          : "var(--card-bg)",
        borderRadius: 12,
        border: `2px solid ${cardBorder}`,
        padding: "28px clamp(18px, 5vw, 24px)",
        position: "relative",
        boxShadow: isLegend
          ? "0 12px 48px rgba(184,144,48,0.3), 0 2px 4px rgba(0,0,0,0.15), inset 0 0 40px rgba(184,144,48,0.05)"
          : "0 10px 36px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.1)",
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(-30px) scale(0.95)",
        transition: "opacity 0.1s",
      }}>
        {/* Legend badge */}
        {isLegend && (
          <div style={{
            position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
            background: "var(--gold)",
            color: "#fff",
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 12,
            fontWeight: 700,
            padding: "4px 16px",
            borderRadius: 20,
            letterSpacing: 2,
            whiteSpace: "nowrap",
          }}>百年難遇之祥瑞</div>
        )}

        {/* Friday / Monday badge */}
        {(reading.isFriday || reading.isMonday) && !isLegend && (
          <div style={{ position: "absolute", top: -12, right: 16 }}>
            <SealStamp
              text={reading.isFriday ? "週五無禁忌" : "週一渡劫中"}
              color={reading.isFriday ? "var(--gold)" : "#666"}
              size={50}
              rotate={reading.isFriday ? -8 : -6}
            />
          </div>
        )}

        {/* Wednesday badge */}
        {reading.isWednesday && !reading.isFriday && !reading.isMonday && !isLegend && (
          <div style={{ position: "absolute", top: -12, right: 16 }}>
            <SealStamp
              text="週三症候群"
              color="#888"
              size={50}
              rotate={-5}
            />
          </div>
        )}

        {/* Hui-wen corner ornaments */}
        <CardCorners color={isLegend ? "var(--gold)" : "var(--ink-lighter)"} />

        {/* Fix 1: Fortune name — more breathing room, stronger hierarchy */}
        <div style={{
          textAlign: "center",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 13,
          color: "var(--ink-light)",
          letterSpacing: 3,
          marginBottom: 10,
        }}>【{reading.fortune}】</div>

        {/* Tier — tighter to food name as a subtitle */}
        <div style={{
          textAlign: "center",
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 11,
          color: isLegend ? "var(--gold)" : "var(--accent)",
          letterSpacing: 2,
          marginBottom: 6,
        }}>{TIER_LABELS[reading.tier]}</div>

        {/* FOOD NAME with glow */}
        <FoodNameGlow isLegend={isLegend}>
          <div style={{
            textAlign: "center",
            fontFamily: "'Ma Shan Zheng', cursive",
            fontSize: isLegend ? "clamp(40px, 10vw, 56px)" : "clamp(36px, 9vw, 48px)",
            color: isLegend ? "var(--gold)" : "var(--ink)",
            margin: "4px 0 24px",
            letterSpacing: 6,
            textShadow: isLegend ? "0 2px 8px rgba(184,144,48,0.3)" : "none",
          }}>{reading.food}</div>
        </FoodNameGlow>

        {/* Ornamental divider */}
        <OrnamentDivider
          color={isLegend ? "var(--gold)" : "var(--ink-lighter)"}
          symbol={isLegend ? "❖" : "◆"}
        />

        {/* Fix 2: 宜忌 section — contained with subtle background */}
        <div style={{
          display: "flex", gap: 0, marginBottom: 24,
          background: "rgba(168, 152, 128, 0.04)",
          borderRadius: 8,
          padding: "14px 16px",
          border: "1px solid rgba(168, 152, 128, 0.1)",
        }}>
          <div style={{ flex: 1, paddingRight: 14 }}>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 13, fontWeight: 700,
              color: "var(--accent)",
              marginBottom: 10, letterSpacing: 2,
            }}>▸ 宜</div>
            {reading.good.map((g, i) => (
              <div key={i} style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 13, color: "var(--ink)",
                marginBottom: 6, lineHeight: 1.8,
                display: "flex",
              }}>
                <span style={{ flexShrink: 0, marginRight: 4, color: "var(--ink-lighter)" }}>·</span>
                <span>{g}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 1, background: "var(--ink-lighter)", opacity: 0.2, flexShrink: 0, margin: "4px 0" }} />
          <div style={{ flex: 1, paddingLeft: 14 }}>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 13, fontWeight: 700,
              color: "var(--ink-light)",
              marginBottom: 10, letterSpacing: 2,
            }}>▸ 忌</div>
            {reading.bad.map((b, i) => (
              <div key={i} style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 13, color: "var(--ink)",
                marginBottom: 6, lineHeight: 1.8,
                display: "flex",
              }}>
                <span style={{ flexShrink: 0, marginRight: 4, color: "var(--ink-lighter)" }}>·</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fix 4: Master quote — stronger hierarchy between label and quote */}
        <div style={{
          background: "var(--bg-alt)",
          borderRadius: 8,
          padding: "16px 18px",
          marginBottom: 24,
        }}>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 11,
            color: "var(--ink-lighter)",
            marginBottom: 10,
            letterSpacing: 2,
          }}>{reading.masterIcon} {reading.master}曰：</div>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 15,
            color: "var(--ink)",
            lineHeight: 1.9,
            fontStyle: "italic",
            paddingLeft: 4,
          }}>「{IMPATIENT_QUOTES[Math.min(rerollCount, IMPATIENT_QUOTES.length - 1)] || reading.quote}」</div>
        </div>

        {/* Lucky items — stacked vertically for long text */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 6,
          marginBottom: 4,
        }}>
          {[
            { label: "幸運配料", value: reading.luckySide },
            { label: "幸運座位", value: reading.luckySeat },
          ].map(({ label, value }) => (
            <div key={label} style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 12, lineHeight: 1.6,
              display: "flex", alignItems: "baseline",
              background: "rgba(194, 58, 46, 0.04)",
              borderRadius: 6,
              padding: "6px 12px",
              border: "1px solid rgba(194, 58, 46, 0.08)",
            }}>
              <span style={{ color: "var(--accent)", flexShrink: 0, fontSize: 11, letterSpacing: 1 }}>{label}</span>
              <span style={{ color: "var(--ink-lighter)", margin: "0 6px", flexShrink: 0 }}>｜</span>
              <span style={{ color: "var(--ink)" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Google Maps link — integrated with lucky items */}
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(reading.food)}+餐廳`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: 10,
            padding: "8px 0 4px",
            textAlign: "center",
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 12,
            color: "var(--ink-lighter)",
            letterSpacing: 2,
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          📍 找附近的{reading.food}
        </a>
      </div>

      {/* P1: Sticky bottom buttons */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(transparent, var(--bg) 50%)",
        padding: "8px 16px calc(6px + env(safe-area-inset-bottom, 0px))",
        display: "flex",
        gap: 12,
        justifyContent: "center",
        zIndex: 20,
      }}>
        <button onClick={onReroll} className="btn-secondary" style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 15,
          padding: "12px 28px",
          border: "1.5px solid var(--ink-lighter)",
          borderRadius: 8,
          background: "var(--card-bg)",
          color: "var(--ink)",
          cursor: "pointer",
          letterSpacing: 2,
          transition: "all 0.2s",
        }}>
          {REROLL_BUTTONS[Math.min(rerollCount, REROLL_BUTTONS.length - 1)]}
        </button>
        <button onClick={onAccept} className="btn-primary" style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 15,
          padding: "12px 28px",
          border: "none",
          borderRadius: 8,
          background: "var(--accent)",
          color: "#fff",
          cursor: "pointer",
          letterSpacing: 2,
          transition: "all 0.2s",
        }}>{ACCEPT_BUTTONS[Math.min(rerollCount, ACCEPT_BUTTONS.length - 1)]}</button>
      </div>

      {rerollCount >= 1 && (
        <p style={{
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 12,
          color: "var(--ink-lighter)",
          marginTop: 12,
          letterSpacing: 1,
          textAlign: "center",
        }}>{REROLL_COMMENTS[Math.min(rerollCount - 1, REROLL_COMMENTS.length - 1)]}</p>
      )}
    </div>
  );
}
