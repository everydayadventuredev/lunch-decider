// CardBack — home screen card
function CardBack({ onFlip, subtitle }) {
  const T = {
    bgGrad: "linear-gradient(180deg, #1a1612 0%, #221c16 50%, #1a1612 100%)",
    gold: "#c4a44e", text: "#e8dcc8", textMuted: "#a89880", textDim: "#6b5d4d",
  };
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", padding: 20,
    }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(36px, 8vw, 56px)",
          color: "var(--ink)", margin: 0, letterSpacing: 6, lineHeight: 1.2,
          userSelect: "none",
        }}>午膳殿</h1>
        <p style={{
          fontFamily: "'LXGW WenKai TC', serif",
          fontSize: "clamp(14px, 3vw, 18px)", color: "var(--ink-light)",
          marginTop: 8, letterSpacing: 3,
        }}>{subtitle || "上班如渡劫，午餐求指引"}</p>
        <p style={{
          fontFamily: "'LXGW WenKai TC', serif",
          fontSize: 12, color: "var(--ink-lighter)", marginTop: 6, letterSpacing: 1,
        }}>翻一張牌，讓午膳殿幫你決定今天中午吃什麼</p>
      </div>

      <div onClick={onFlip} style={{
        width: "min(320px, 85vw)", aspectRatio: "3/4",
        background: T.bgGrad, borderRadius: 12,
        border: `1.5px solid ${T.gold}`, cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        boxShadow: "0 16px 56px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.2)",
        transition: "transform 0.3s",
      }}>
        <StarField/>
        <CardCorners color={T.gold}/>
        <div style={{
          position: "absolute", inset: 10,
          border: `1px solid rgba(196, 164, 78, 0.15)`,
          borderRadius: 8, pointerEvents: "none",
        }}/>
        <div style={{ fontSize: 52, marginBottom: 12, filter: "grayscale(20%)", position: "relative", zIndex: 1 }}>🍽️</div>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive", fontSize: 36,
          color: T.gold, letterSpacing: 8,
          textShadow: "0 2px 12px rgba(196,164,78,0.3)",
          position: "relative", zIndex: 1,
        }}>午膳</div>
        <div style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
          color: T.textMuted, marginTop: 8, letterSpacing: 4,
          position: "relative", zIndex: 1,
        }}>誠心翻牌</div>
        <div style={{
          width: 60, height: 1,
          background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
          margin: "16px 0 8px", opacity: 0.5, position: "relative", zIndex: 1,
        }}/>
        <div style={{
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
          color: T.textDim, letterSpacing: 2, position: "relative", zIndex: 1,
        }}>乙巳年 三月初八</div>
      </div>

      <p style={{
        fontFamily: "'LXGW WenKai TC', serif", fontSize: 13,
        color: "var(--ink-lighter)", marginTop: 24, letterSpacing: 1,
        animation: "pulse 2s ease-in-out infinite",
      }}>— 點擊卡牌，獲取今日指引 —</p>
    </div>
  );
}

window.CardBack = CardBack;
