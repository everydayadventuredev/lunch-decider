import { useState, useEffect, useMemo } from "react";
import { TIER_LABELS } from "../data/foods";
import { getChineseDateStr } from "../utils/generateReading";
import { getFoodImage } from "../utils/foodImage";
import { AFTERNOON_PROPHECIES, COWORKER_REACTIONS } from "../data/darkCommentary";
import SealStamp from "./SealStamp";
import { CardCorners, OrnamentDivider, FoodNameGlow, FortuneCrest, StarField } from "./CardOrnaments";

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
const LEGEND_TAROT = {
  ...TAROT,
  bgGrad: "linear-gradient(180deg, #1a1612 0%, #2a2010 50%, #1a1612 100%)",
  gold: "#d4b44e", goldDim: "rgba(212, 180, 78, 0.2)",
};

export default function ResultCard({ reading, onReroll, onAccept, rerollCount }) {
  const [revealed, setRevealed] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [foodImg, setFoodImg] = useState(null);

  const prophecy = useMemo(() => pick(AFTERNOON_PROPHECIES), [reading.food]);
  const coworker = useMemo(() => pick(COWORKER_REACTIONS), [reading.food]);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { setFlipped(false); }, [reading.food]);
  useEffect(() => {
    getFoodImage(reading.food).then(url => { if (url) setFoodImg(url); });
  }, [reading.food]);

  const isLegend = reading.isLegend;
  const t = isLegend ? LEGEND_TAROT : TAROT;

  // Tarot card ratio ~1:1.6
  const cardW = "min(320px, 84vw)";
  const cardH = "min(512px, 134vw)"; // 320 * 1.6 = 512

  const faceBase = {
    width: "100%", height: "100%",
    background: t.bgGrad,
    borderRadius: 14,
    border: `2.5px solid ${t.gold}`,
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
      justifyContent: "flex-start", minHeight: "100dvh",
      padding: "10px 16px 24px",
      background: "linear-gradient(180deg, var(--bg) 0%, #e8e0d4 30%, #ddd5c8 100%)",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{
          fontFamily: "'Noto Serif TC', serif", fontSize: 11,
          color: "var(--ink-lighter)", letterSpacing: 3,
        }}>{getChineseDateStr()}</div>
        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(20px, 5vw, 26px)",
          color: "var(--ink)", margin: "2px 0", letterSpacing: 4,
        }}>{reading.isOvertime ? "加班續命指引" : "午膳指引"}</h2>
      </div>

      {/* ═══════════ Card Stack ═══════════ */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          position: "relative",
          width: cardW, height: cardH,
          cursor: "pointer",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "none" : "translateY(-30px) scale(0.95)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        {/* Back card peeking behind — visible when NOT flipped */}
        <div style={{
          position: "absolute",
          top: 8, left: 6, right: -6,
          height: "100%",
          background: t.bgGrad,
          borderRadius: 14,
          border: `2px solid rgba(196,164,78,0.25)`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          opacity: flipped ? 0 : 0.6,
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

          {/* ──── FRONT: Tarot Image ──── */}
          <div style={{
            ...faceBase,
            padding: "14px 14px 12px",
            boxShadow: isLegend
              ? "0 16px 56px rgba(0,0,0,0.6), 0 0 40px rgba(196,164,78,0.15)"
              : "0 16px 56px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
          }}>
            <StarField />

            {/* Badges */}
            {isLegend && (
              <div style={{
                position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${t.gold}, #d4b44e)`,
                color: t.bg, fontFamily: "'Noto Serif TC', serif",
                fontSize: 12, fontWeight: 700,
                padding: "4px 16px", borderRadius: 20,
                letterSpacing: 2, whiteSpace: "nowrap", zIndex: 2,
              }}>百年難遇之祥瑞</div>
            )}
            {(reading.isFriday || reading.isMonday) && !isLegend && (
              <div style={{ position: "absolute", top: -12, right: 16, zIndex: 2 }}>
                <SealStamp
                  text={reading.isFriday ? "週五無禁忌" : "週一渡劫中"}
                  color={reading.isFriday ? t.gold : t.textMuted}
                  size={50} rotate={reading.isFriday ? -8 : -6}
                />
              </div>
            )}
            {reading.isWednesday && !reading.isFriday && !reading.isMonday && !isLegend && (
              <div style={{ position: "absolute", top: -12, right: 16, zIndex: 2 }}>
                <SealStamp text="週三症候群" color={t.textMuted} size={50} rotate={-5} />
              </div>
            )}

            <CardCorners color={t.gold} />

            {/* Fortune name — compact */}
            <FortuneCrest text={`【${reading.fortune}】`} color={t.textMuted} />
            <div style={{
              textAlign: "center", fontFamily: "'Noto Serif TC', serif",
              fontSize: 10, color: t.gold, letterSpacing: 2,
              marginBottom: 4, opacity: 0.8, position: "relative", zIndex: 1,
            }}>{TIER_LABELS[reading.tier]}</div>

            {/* ★ FULL-WIDTH Food illustration ★ */}
            <div style={{
              flex: 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", zIndex: 1,
              margin: "0 -2px",
            }}>
              {foodImg && (
                <img src={foodImg} alt={reading.food} style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "min(320px, 80vw)",
                  objectFit: "cover",
                  borderRadius: 8,
                  border: `1px solid rgba(196,164,78,0.2)`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }} />
              )}
            </div>

            {/* FOOD NAME — overlaid at bottom */}
            <div style={{ position: "relative", zIndex: 1, marginTop: 8 }}>
              <FoodNameGlow isLegend={isLegend}>
                <div style={{
                  textAlign: "center",
                  fontFamily: "'Ma Shan Zheng', cursive",
                  fontSize: isLegend ? "clamp(28px, 8vw, 38px)" : "clamp(26px, 7vw, 34px)",
                  color: t.gold,
                  letterSpacing: 8,
                  textShadow: `0 2px 12px rgba(196,164,78,0.3), 0 0 40px rgba(196,164,78,0.1)`,
                }}>{reading.food}</div>
              </FoodNameGlow>

              {/* Flip hint */}
              <div style={{
                textAlign: "center", fontFamily: "'Noto Serif TC', serif",
                fontSize: 10, color: t.textDim, letterSpacing: 2,
                marginTop: 4,
                animation: "pulse-hint 2s ease-in-out infinite",
              }}>↻ 輕觸翻面查看解讀</div>
            </div>
          </div>

          {/* ──── BACK: Reading Details ──── */}
          <div style={{
            ...faceBase,
            padding: "16px clamp(12px, 3.5vw, 18px)",
            transform: "rotateY(180deg)",
            boxShadow: "0 16px 56px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)",
          }}>
            <StarField />
            <CardCorners color={t.gold} />

            {/* Back header */}
            <div style={{
              textAlign: "center", fontFamily: "'Ma Shan Zheng', cursive",
              fontSize: "clamp(20px, 5vw, 26px)", color: t.gold,
              letterSpacing: 4, marginBottom: 2, position: "relative", zIndex: 1,
            }}>{reading.food}・解讀</div>

            <OrnamentDivider color={t.gold} symbol="✦" />

            {/* Scrollable content area */}
            <div style={{
              flex: 1, overflowY: "auto",
              position: "relative", zIndex: 1,
              paddingRight: 2,
            }}>
              {/* 宜忌 */}
              <div style={{ ...sec, display: "flex", gap: 0, marginBottom: 10, padding: "10px 12px" }}>
                <div style={{ flex: 1, paddingRight: 8 }}>
                  <div style={{
                    fontFamily: "'Noto Serif TC', serif", fontSize: 11, fontWeight: 700,
                    color: t.gold, marginBottom: 4, letterSpacing: 2,
                  }}>▸ 宜</div>
                  {reading.good.map((g, i) => (
                    <div key={i} style={{
                      fontFamily: "'Noto Serif TC', serif", fontSize: 11, color: t.text,
                      marginBottom: 2, lineHeight: 1.5, display: "flex",
                    }}>
                      <span style={{ flexShrink: 0, marginRight: 4, color: t.textDim }}>·</span>
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
                <div style={{ width: 1, background: t.gold, opacity: 0.15, flexShrink: 0, margin: "4px 0" }} />
                <div style={{ flex: 1, paddingLeft: 8 }}>
                  <div style={{
                    fontFamily: "'Noto Serif TC', serif", fontSize: 11, fontWeight: 700,
                    color: t.textMuted, marginBottom: 4, letterSpacing: 2,
                  }}>▸ 忌</div>
                  {reading.bad.map((b, i) => (
                    <div key={i} style={{
                      fontFamily: "'Noto Serif TC', serif", fontSize: 11, color: t.text,
                      marginBottom: 2, lineHeight: 1.5, display: "flex",
                    }}>
                      <span style={{ flexShrink: 0, marginRight: 4, color: t.textDim }}>·</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master quote */}
              <div style={{ ...sec, padding: "8px 12px", marginBottom: 10 }}>
                <div style={{
                  fontFamily: "'Noto Serif TC', serif", fontSize: 10,
                  color: t.textDim, marginBottom: 4, letterSpacing: 2,
                }}>{reading.masterIcon} {reading.master}曰：</div>
                <div style={{
                  fontFamily: "'Noto Serif TC', serif", fontSize: 12,
                  color: t.text, lineHeight: 1.6, fontStyle: "italic", paddingLeft: 4,
                }}>「{IMPATIENT_QUOTES[Math.min(rerollCount, IMPATIENT_QUOTES.length - 1)] || reading.quote}」</div>
              </div>

              {/* Afternoon prophecy */}
              <div style={{ ...sec, padding: "8px 12px", marginBottom: 10 }}>
                <div style={{
                  fontFamily: "'Noto Serif TC', serif", fontSize: 10,
                  color: t.textDim, marginBottom: 4, letterSpacing: 2,
                }}>🔮 午後預言：</div>
                <div style={{
                  fontFamily: "'Noto Serif TC', serif", fontSize: 11,
                  color: t.text, lineHeight: 1.6, paddingLeft: 4,
                }}>{prophecy}</div>
              </div>

              {/* Coworker reaction */}
              <div style={{ ...sec, padding: "8px 12px", marginBottom: 10 }}>
                <div style={{
                  fontFamily: "'Noto Serif TC', serif", fontSize: 10,
                  color: t.textDim, marginBottom: 4, letterSpacing: 2,
                }}>👥 同事反應預測：</div>
                <div style={{
                  fontFamily: "'Noto Serif TC', serif", fontSize: 11,
                  color: t.text, lineHeight: 1.6, paddingLeft: 4,
                }}>{coworker}</div>
              </div>

              {/* Lucky items */}
              <div style={{ display: "flex", gap: 6, marginBottom: 4, position: "relative", zIndex: 1 }}>
                {[
                  { label: "配料", value: reading.luckySide },
                  { label: "座位", value: reading.luckySeat },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    ...sec, flex: 1, fontFamily: "'Noto Serif TC', serif",
                    fontSize: 11, lineHeight: 1.4, borderRadius: 6, padding: "4px 8px",
                  }}>
                    <span style={{ color: t.gold, fontSize: 10, letterSpacing: 1 }}>{label}</span>
                    <span style={{ color: t.textDim, margin: "0 4px" }}>|</span>
                    <span style={{ color: t.text }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flip back hint */}
            <div style={{
              textAlign: "center", fontFamily: "'Noto Serif TC', serif",
              fontSize: 10, color: t.textDim, letterSpacing: 2,
              marginTop: 6, position: "relative", zIndex: 1, flexShrink: 0,
            }}>↻ 輕觸翻回牌面</div>
          </div>
        </div>
      </div>

      {/* ═══════════ Action Buttons ═══════════ */}
      <div style={{
        marginTop: 16, display: "flex", gap: 12,
        justifyContent: "center", width: cardW,
      }}>
        <button onClick={(e) => { e.stopPropagation(); onReroll(); }} className="btn-secondary" style={{
          fontFamily: "'Noto Serif TC', serif", fontSize: 14,
          padding: "10px 24px",
          border: `1.5px solid rgba(196,164,78,0.4)`,
          borderRadius: 8, background: "transparent",
          color: TAROT.textMuted, cursor: "pointer",
          letterSpacing: 2, transition: "all 0.2s",
        }}>
          {REROLL_BUTTONS[Math.min(rerollCount, REROLL_BUTTONS.length - 1)]}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onAccept(); }} className="btn-primary" style={{
          fontFamily: "'Noto Serif TC', serif", fontSize: 14,
          padding: "10px 24px", border: "none",
          borderRadius: 8,
          background: `linear-gradient(135deg, ${TAROT.gold}, #d4b44e)`,
          color: TAROT.bg, cursor: "pointer",
          letterSpacing: 2, fontWeight: 700,
          transition: "all 0.2s",
          boxShadow: "0 4px 16px rgba(196,164,78,0.3)",
        }}>{ACCEPT_BUTTONS[Math.min(rerollCount, ACCEPT_BUTTONS.length - 1)]}</button>
      </div>

      {rerollCount >= 1 && (
        <p style={{
          fontFamily: "'Noto Serif TC', serif", fontSize: 11,
          color: "var(--ink-lighter)", marginTop: 8,
          letterSpacing: 1, textAlign: "center",
        }}>{REROLL_COMMENTS[Math.min(rerollCount - 1, REROLL_COMMENTS.length - 1)]}</p>
      )}
    </div>
  );
}
