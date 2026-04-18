// DevilCard — cursed red palette, plays when reroll count >= 10
function DevilCard({ reading, onAccept }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100dvh", padding: 16,
      background: "linear-gradient(180deg,#1a1214 0%,#2a1a1e 50%,#1a1214 100%)",
    }}>
      <div style={{
        width: "min(340px,90vw)", aspectRatio: "3/4.5",
        borderRadius: 14, border: "2.5px solid #8b3a3a",
        background: "linear-gradient(180deg,#1a1214 0%,#2a1618 50%,#1a1214 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between",
        padding: "28px 20px", position: "relative",
        boxShadow: "0 16px 56px rgba(0,0,0,0.7), 0 0 60px rgba(139,58,58,0.3)",
        color: "#e8c4c4",
      }}>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive", fontSize: 14,
          letterSpacing: 4, color: "#c25050", opacity: 0.8,
        }}>魔王降臨</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>👹</div>
          <div style={{
            fontFamily: "'Ma Shan Zheng', cursive",
            fontSize: "clamp(34px,9vw,44px)", color: "#e8c4c4",
            letterSpacing: 6, marginBottom: 10,
            textShadow: "0 2px 20px rgba(194,80,80,0.4)",
          }}>{reading.food}</div>
          <div style={{
            fontFamily: "'LXGW WenKai TC', serif", fontSize: 13,
            color: "#c25050", letterSpacing: 3,
          }}>{reading.masterIcon || "👹"} {reading.master}曰：</div>
          <div style={{
            fontFamily: "'LXGW WenKai TC', serif", fontSize: 15,
            color: "#e8c4c4", lineHeight: 1.8, fontStyle: "italic",
            marginTop: 8, padding: "0 10px",
          }}>「{reading.quote}」</div>
        </div>
        <button onClick={onAccept} style={{
          background: "#8b3a3a", color: "#e8c4c4",
          fontFamily: "'LXGW WenKai TC', serif",
          fontSize: 14, fontWeight: 700,
          padding: "12px 38px", letterSpacing: 4,
          border: "none", borderRadius: 8, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(139,58,58,0.4)",
        }}>遵旨</button>
      </div>
      <p style={{
        fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
        color: "#8a6060", marginTop: 20, letterSpacing: 3,
        textAlign: "center",
      }}>此為魔王之命，不得違抗。<br/>接受後 10 分鐘內不得再求。</p>
    </div>
  );
}

window.DevilCard = DevilCard;
