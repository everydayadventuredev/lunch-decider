export default function SealStamp({ text, color = "#c23a2e", bg = "#1a1612", size = 60, rotate = -12 }) {
  return (
    <div style={{
      display: "inline-block",
      background: bg,
      border: `2px solid ${color}`,
      borderRadius: 6,
      padding: "4px 10px",
      color: color,
      fontFamily: "'Ma Shan Zheng', cursive",
      fontSize: size * 0.4,
      fontWeight: 900,
      transform: `rotate(${rotate}deg)`,
      letterSpacing: 2,
      lineHeight: 1.3,
      whiteSpace: "nowrap",
      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    }}>
      {text}
    </div>
  );
}
