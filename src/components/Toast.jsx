import { useEffect, useState } from "react";

const GENTLE_MESSAGES = [
  "已記入食曆，祝用餐愉快",
  "食曆已更新，大師祝你吃好喝好",
  "認命成功，胃已收到通知",
  "已記錄，今天就交給命運了",
  "食曆 +1，大師欣慰地點了點頭",
  "好，識時務者為俊傑",
  "明智的選擇，大師表示欣慰",
];

const SARCASTIC_MESSAGES = [
  "終於啊，大師差點辭職",
  "經過漫長的掙扎，你終於屈服了",
  "大師擦了擦汗：「還好你想通了」",
  "食曆記錄：此人猶豫了很久",
  "你的選擇困難已被大師們記錄在案",
  "大師們交換了一個「終於」的眼神",
];

const EXASPERATED_MESSAGES = [
  "大師們已經在寫離職信了，但你終於接受了",
  "食曆備註：差點逼走所有大師",
  "恭喜你在午膳殿關門前做出決定",
  "大師們的血壓終於降下來了",
  "午膳殿差點因為你歇業",
];

const DEVIL_MESSAGES = [
  "魔王滿意地點了點頭",
  "很好，聽話的人類",
  "明智的選擇——好吧，你沒有選擇",
  "魔王已將你的服從記錄在案",
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

export function getAcceptMessage(rerollCount = 0, isDevil = false) {
  if (isDevil) return pick(DEVIL_MESSAGES);
  if (rerollCount >= 7) return pick(EXASPERATED_MESSAGES);
  if (rerollCount >= 3) return pick(SARCASTIC_MESSAGES);
  return pick(GENTLE_MESSAGES);
}
