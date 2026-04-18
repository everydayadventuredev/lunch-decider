// ResultCard — after card flip, shows food + reading (flippable)
const TIER_LABELS = {
  "庶民": "庶民之味", "小資": "小資享受", "放縱": "今日放縱",
  "苦行": "苦行修練", "傳說": "百年難遇",
};

const TIER_THEMES = {
  "庶民": { bg: "#1a1612", bgGrad: "linear-gradient(180deg,#1a1612 0%,#221c16 50%,#1a1612 100%)",
    text: "#e8dcc8", textMuted: "#a89880", textDim: "#6b5d4d",
    gold: "#c4a44e", sectionBg: "rgba(196,164,78,0.06)", sectionBorder: "rgba(196,164,78,0.1)", borderWidth: "2px" },
  "小資": { bg: "#1a1612", bgGrad: "linear-gradient(180deg,#1a1612 0%,#221e16 50%,#1a1612 100%)",
    text: "#e8dcc8", textMuted: "#a89880", textDim: "#6b5d4d",
    gold: "#d4b44e", sectionBg: "rgba(212,180,78,0.08)", sectionBorder: "rgba(212,180,78,0.15)", borderWidth: "2px" },
  "放縱": { bg: "#1c1610", bgGrad: "linear-gradient(180deg,#1c1610 0%,#2a1c10 50%,#1c1610 100%)",
    text: "#f0dcc0", textMuted: "#b89060", textDim: "#7a5a3a",
    gold: "#e8943a", sectionBg: "rgba(232,148,58,0.08)", sectionBorder: "rgba(232,148,58,0.18)", borderWidth: "2.5px" },
  "苦行": { bg: "#16171a", bgGrad: "linear-gradient(180deg,#14151a 0%,#1a1b20 50%,#14151a 100%)",
    text: "#b8b4ae", textMuted: "#70707a", textDim: "#4a4a54",
    gold: "#7a8088", sectionBg: "rgba(122,128,136,0.05)", sectionBorder: "rgba(122,128,136,0.1)", borderWidth: "1.5px" },
  "傳說": { bg: "#1a1812", bgGrad: "linear-gradient(180deg,#1a1812 0%,#2c2410 50%,#1a1812 100%)",
    text: "#fff8e0", textMuted: "#c0a850", textDim: "#6b5d4d",
    gold: "#ffd700", sectionBg: "rgba(255,215,0,0.08)", sectionBorder: "rgba(255,215,0,0.18)", borderWidth: "3px" },
};

function ResultCard({ reading, onReroll, onAccept, rerollCount = 0 }) {
  const [flipped, setFlipped] = React.useState(false);
  const isLegend = reading.isLegend;
  const t = isLegend ? TIER_THEMES["傳說"] : (TIER_THEMES[reading.tier] || TIER_THEMES["庶民"]);
  const cardW = "min(340px, 90vw)";
  const REROLL_BUTTONS = ["此指引不準，再來","再給大師一次機會","大師你認真的嗎","不然你自己決定啊","⋯⋯"];
  const ACCEPT_BUTTONS = ["認命了","認命了","好吧認命了","算了隨便啦","⋯⋯認命"];

  const faceBase = {
    width: "100%", height: "100%", background: t.bgGrad,
    borderRadius: 14, border: `${t.borderWidth} solid ${t.gold}`,
    position: "absolute", top: 0, left: 0,
    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
    overflow: "hidden", boxSizing: "border-box",
    display: "flex", flexDirection: "column",
  };
  const sec = { background: t.sectionBg, borderRadius: 8,
    border: `1px solid ${t.sectionBorder}`, position: "relative", zIndex: 1 };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      height: "100dvh", overflow: "hidden", padding: "0 16px 12px",
      background: "linear-gradient(180deg,var(--bg) 0%,#e8e0d4 30%,#ddd5c8 100%)",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: cardW, padding: "6px 0", flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
          color: "var(--ink-lighter)", cursor: "pointer", letterSpacing: 1 }}>📜 食曆</span>
        <span style={{ fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
          color: "var(--ink-lighter)", letterSpacing: 1 }}>📍 找附近</span>
      </div>

      <div onClick={() => setFlipped(f => !f)} style={{
        position: "relative", width: cardW, flex: 1, minHeight: 0, cursor: "pointer",
      }}>
        {/* Peek behind */}
        <div style={{
          position: "absolute", top: 6, left: 4, right: -8, height: "100%",
          background: t.bgGrad, borderRadius: 14,
          border: `2px solid rgba(196,164,78,0.2)`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          transform: "rotate(2deg)", opacity: flipped ? 0 : 0.5,
          transition: "opacity 0.3s", zIndex: 0,
        }}/>
        <div style={{
          position: "relative", width: "100%", height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", zIndex: 1,
        }}>
          {/* FRONT */}
          <div style={{
            ...faceBase, padding: 0,
            boxShadow: isLegend
              ? `0 16px 56px rgba(0,0,0,0.6), 0 0 50px rgba(255,215,0,0.25)`
              : `0 16px 56px rgba(0,0,0,0.5)`,
          }}>
            {isLegend && (
              <div style={{
                position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
                background: `linear-gradient(135deg, ${t.gold}, #d4b44e)`,
                color: t.bg, fontFamily: "'LXGW WenKai TC', serif",
                fontSize: 11, fontWeight: 700, padding: "3px 14px",
                borderRadius: 20, letterSpacing: 2, whiteSpace: "nowrap", zIndex: 3,
              }}>百年難遇之祥瑞</div>
            )}
            {reading.seal && !isLegend && (
              <div style={{
                position: "absolute", top: 8, right: 8, zIndex: 3,
                background: "rgba(26,22,18,0.6)", borderRadius: 6, padding: 4,
                border: `2px solid ${t.gold}`,
                fontFamily: "'Ma Shan Zheng', cursive", fontSize: 13,
                color: t.gold, transform: "rotate(-6deg)", lineHeight: 1,
                letterSpacing: 2, opacity: 0.85,
              }}>{reading.seal}</div>
            )}
            <div style={{ flex: 1, position: "relative", overflow: "hidden",
              borderRadius: "12px 12px 0 0" }}>
              {reading.image && (
                <img src={reading.image} alt={reading.food} style={{
                  width: "108%", height: "108%",
                  marginLeft: "-4%", marginTop: "-4%",
                  objectFit: "cover", display: "block",
                }}/>
              )}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 100,
                background: `linear-gradient(transparent, ${t.bg})`,
              }}/>
            </div>
            <div style={{ padding: "0 16px 14px", background: t.bg, textAlign: "center", position: "relative" }}>
              <CardCorners color={t.gold} tier={reading.tier}/>
              {isLegend && (
                <div style={{
                  position: "absolute", top: -8, left: 16,
                  border: "2px solid #c23a2e", borderRadius: 4, padding: "2px 6px",
                  fontFamily: "'Ma Shan Zheng', cursive", fontSize: 12,
                  color: "#c23a2e", opacity: 0.75, transform: "rotate(-8deg)",
                  lineHeight: 1, letterSpacing: 1,
                }}>御膳</div>
              )}
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
                color: t.textMuted, letterSpacing: 3, marginBottom: 2,
              }}>【{reading.fortune}】</div>
              <TierGem tier={reading.tier} color={t.gold}/>
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
                color: t.gold, letterSpacing: 2, opacity: 0.7, marginBottom: 4,
              }}>{TIER_LABELS[reading.tier]}</div>
              <FoodNameGlow isLegend={isLegend}>
                <div style={{
                  fontFamily: "'Ma Shan Zheng', cursive",
                  fontSize: isLegend ? "clamp(30px,9vw,42px)" : "clamp(28px,8vw,38px)",
                  color: t.gold, letterSpacing: 8,
                  textShadow: `0 2px 12px rgba(196,164,78,0.35)`,
                  whiteSpace: "nowrap",
                }}>{reading.food}</div>
              </FoodNameGlow>
            </div>
          </div>

          {/* BACK */}
          <div style={{
            ...faceBase, padding: "16px 18px",
            transform: "rotateY(180deg)",
            boxShadow: "0 16px 56px rgba(0,0,0,0.5)",
          }}>
            <StarField/>
            <CardCorners color={t.gold} tier={reading.tier}/>
            <div style={{
              textAlign: "center", fontFamily: "'Ma Shan Zheng', cursive",
              fontSize: "clamp(24px,6.5vw,32px)", color: t.gold,
              whiteSpace: "nowrap", letterSpacing: 6, marginBottom: 2,
              position: "relative", zIndex: 1, flexShrink: 0,
            }}>{reading.food}</div>
            <OrnamentDivider color={t.gold}/>
            <div style={{
              flex: 1, display: "flex", flexDirection: "column",
              gap: 12, overflowY: "auto", minHeight: 0, paddingTop: 4,
              position: "relative", zIndex: 1,
            }}>
              <div style={{ ...sec, padding: "8px 14px", position: "relative" }}>
                <div style={{
                  position: "absolute", top: 4, right: 8, zIndex: 2,
                  border: `2px solid ${t.gold}`, borderRadius: 4, padding: "3px 6px",
                  fontFamily: "'Ma Shan Zheng', cursive", fontSize: 16,
                  color: t.gold, opacity: 0.7, transform: "rotate(-6deg)", lineHeight: 1,
                }}>宜</div>
                {reading.good.map((g, i) => (
                  <div key={i} style={{
                    fontFamily: "'LXGW WenKai TC', serif", fontSize: 14,
                    color: t.text, marginBottom: 3, lineHeight: 1.6,
                    display: "flex", paddingRight: 36,
                  }}>
                    <span style={{ marginRight: 6, color: t.textDim }}>·</span>
                    <span>{g}</span>
                  </div>
                ))}
              </div>
              <div style={{ ...sec, padding: "8px 14px", position: "relative" }}>
                <div style={{
                  position: "absolute", top: 4, right: 8, zIndex: 2,
                  border: `2px solid ${t.textMuted}`, borderRadius: 4, padding: "3px 6px",
                  fontFamily: "'Ma Shan Zheng', cursive", fontSize: 16,
                  color: t.textMuted, opacity: 0.6, transform: "rotate(-6deg)", lineHeight: 1,
                }}>忌</div>
                {reading.bad.map((b, i) => (
                  <div key={i} style={{
                    fontFamily: "'LXGW WenKai TC', serif", fontSize: 14,
                    color: t.text, marginBottom: 3, lineHeight: 1.6,
                    display: "flex", paddingRight: 36,
                  }}>
                    <span style={{ marginRight: 6, color: t.textDim }}>·</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <div style={{ ...sec, padding: "10px 14px" }}>
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
                  color: t.textMuted, marginBottom: 6, letterSpacing: 2,
                }}>{reading.masterIcon} {reading.master}曰：</div>
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 15,
                  color: t.text, lineHeight: 1.8, fontStyle: "italic", paddingLeft: 4,
                }}>「{reading.quote}」</div>
              </div>
              {reading.darkHumor && (
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
                  color: t.textMuted, textAlign: "center",
                  lineHeight: 1.6, fontStyle: "italic", letterSpacing: 1,
                }}>— {reading.darkHumor}</div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { label: "幸運物", value: reading.luckySide },
                  { label: "幸運方位", value: reading.luckySeat },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    ...sec, fontFamily: "'LXGW WenKai TC', serif",
                    fontSize: 13, borderRadius: 6, padding: "6px 12px",
                    display: "flex", alignItems: "baseline",
                  }}>
                    <span style={{ color: t.gold, fontSize: 12, letterSpacing: 1 }}>{label}</span>
                    <span style={{ color: t.textDim, margin: "0 6px" }}>|</span>
                    <span style={{ color: t.text }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div onClick={() => setFlipped(f => !f)} style={{
        marginTop: 6, display: "flex", alignItems: "center", gap: 4,
        cursor: "pointer",
      }}>
        <span style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
          color: "#8a8070", letterSpacing: 1,
        }}>{flipped ? "↺ 翻回" : "↺ 查看解讀"}</span>
      </div>

      <div style={{
        padding: "6px 0 4px", display: "flex", gap: 12,
        justifyContent: "center", width: cardW, flexShrink: 0,
      }}>
        <button onClick={(e) => { e.stopPropagation(); onReroll?.(); }} style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 13,
          padding: "8px 20px",
          border: "1.5px solid rgba(196,164,78,0.4)",
          borderRadius: 8, background: "transparent",
          color: "#a89880", cursor: "pointer", letterSpacing: 2,
        }}>{REROLL_BUTTONS[Math.min(rerollCount, REROLL_BUTTONS.length - 1)]}</button>
        <button onClick={(e) => { e.stopPropagation(); onAccept?.(); }} style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 13,
          padding: "8px 20px", border: "none", borderRadius: 8,
          background: `linear-gradient(135deg, #c4a44e, #d4b44e)`,
          color: "#1a1612", cursor: "pointer",
          letterSpacing: 2, fontWeight: 700,
          boxShadow: "0 4px 16px rgba(196,164,78,0.3)",
        }}>{ACCEPT_BUTTONS[Math.min(rerollCount, ACCEPT_BUTTONS.length - 1)]}</button>
      </div>
    </div>
  );
}

window.ResultCard = ResultCard;
window.TIER_LABELS = TIER_LABELS;
window.TIER_THEMES = TIER_THEMES;
