import { useEffect, useState } from "react";

const ACCEPT_MESSAGES = [
  "已記入食曆，祝用餐愉快",
  "食曆已更新，大師祝你吃好喝好",
  "認命成功，胃已收到通知",
  "已記錄，今天就交給命運了",
  "食曆 +1，大師欣慰地點了點頭",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Toast({ message, duration = 2000, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDone]);

  return (
    <div style={{
      position: "fixed",
      bottom: 40,
      left: "50%",
      transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      background: "var(--ink)",
      color: "var(--card-bg)",
      borderRadius: 12,
      padding: "14px 24px",
      fontFamily: "'Noto Serif TC', serif",
      fontSize: 14,
      letterSpacing: 1,
      zIndex: 100,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      opacity: visible ? 1 : 0,
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
    }}>
      {message}
    </div>
  );
}

export function getAcceptMessage() {
  return pick(ACCEPT_MESSAGES);
}
