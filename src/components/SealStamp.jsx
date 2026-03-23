export default function SealStamp({ text, color = "#c23a2e", size = 60, rotate = -12 }) {
  return (
    <div style={{
      display: "inline-block",
      border: `3px solid ${color}`,
      borderRadius: 6,
      padding: "4px 10px",
      color: color,
      fontFamily: "'Ma Shan Zheng', cursive",
      fontSize: size * 0.4,
      fontWeight: 900,
      transform: `rotate(${rotate}deg)`,
      opacity: 0.85,
      letterSpacing: 2,
      lineHeight: 1.3,
      whiteSpace: "nowrap",
    }}>
      {text}
    </div>
  );
}
