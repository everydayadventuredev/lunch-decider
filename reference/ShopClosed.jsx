import { useState, useEffect } from "react";
import { SHOP_CLOSED_QUIPS } from "../data/darkCommentary";

function formatTime(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function ShopClosed({ cooldownEnd, onCooldownDone }) {
  const [remaining, setRemaining] = useState(() => cooldownEnd - Date.now());
  const [quipIndex, setQuipIndex] = useState(() => Math.floor(Math.random() * SHOP_CLOSED_QUIPS.length));

  useEffect(() => {
    const rotate = setInterval(() => {
      setQuipIndex(i => (i + 1) % SHOP_CLOSED_QUIPS.length);
    }, 6000);
    return () => clearInterval(rotate);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = cooldownEnd - Date.now();
      setRemaining(left);
      if (left <= 0) {
        clearInterval(interval);
        onCooldownDone();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownEnd, onCooldownDone]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", padding: 20,
      textAlign: "center",
    }}>
      {/* Closed sign */}
      <div style={{
        width: "min(320px, 85vw)",
        background: "var(--card-bg)",
        borderRadius: 12,
        border: "3px solid var(--ink)",
        padding: "40px 28px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🚪</div>

        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: "clamp(28px, 7vw, 40px)",
          color: "var(--ink)",
          letterSpacing: 6,
          marginBottom: 12,
        }}>午膳殿暫停營業</h2>

        <div style={{
          fontFamily: "'LXGW WenKai TC', serif",
          fontSize: 14,
          color: "var(--ink-light)",
          lineHeight: 1.8,
          marginBottom: 24,
        }}>
          大師們被你問到集體崩潰，
          <br />
          已拉下鐵門去吃自己的午餐了。
        </div>

        <div style={{
          fontFamily: "'LXGW WenKai TC', serif",
          fontSize: 12,
          color: "var(--ink-lighter)",
          marginTop: 12,
          lineHeight: 1.8,
          minHeight: 40,
          transition: "opacity 0.5s",
        }}>
          {SHOP_CLOSED_QUIPS[quipIndex]}
        </div>

        {/* Countdown */}
        <div style={{
          background: "var(--bg-alt)",
          borderRadius: 8,
          padding: "16px 20px",
          marginBottom: 16,
        }}>
          <div style={{
            fontFamily: "'LXGW WenKai TC', serif",
            fontSize: 12,
            color: "var(--ink-lighter)",
            letterSpacing: 2,
            marginBottom: 8,
          }}>預計重新開張</div>
          <div style={{
            fontFamily: "'Ma Shan Zheng', cursive",
            fontSize: 36,
            color: "var(--accent)",
            letterSpacing: 4,
          }}>{formatTime(remaining)}</div>
        </div>

        <div style={{
          fontFamily: "'LXGW WenKai TC', serif",
          fontSize: 12,
          color: "var(--ink-lighter)",
          fontStyle: "italic",
          lineHeight: 1.8,
        }}>
          「選擇困難不是病，但大師們需要休息。」
          <br />
          — 飽德大師臨走前留言
        </div>
      </div>
    </div>
  );
}
