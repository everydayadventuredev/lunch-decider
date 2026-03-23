import { useEffect, useState, useRef } from "react";

const PULL_MESSAGES = [
  "大師正在擲筊中…",
  "食神們正在商議…",
  "殿內香火繚繞…",
  "命運之輪轉動中…",
  "大師翻閱食典中…",
  "午膳殿開壇作法…",
];

const LEGEND_MESSAGES = [
  "天降祥瑞！",
  "百年難遇之兆！",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function PullAnimation({ reading, onComplete }) {
  const [phase, setPhase] = useState(0);
  const isLegend = reading.isLegend;
  const [pullMessage] = useState(() => pick(PULL_MESSAGES));
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(setTimeout(() => setPhase(2), isLegend ? 2000 : 1500));
    timers.push(setTimeout(() => setPhase(3), isLegend ? 3200 : 2600));
    timers.push(setTimeout(() => onCompleteRef.current(), isLegend ? 3800 : 3100));
    return () => timers.forEach(clearTimeout);
  }, [isLegend]);

  const accentColor = isLegend ? "var(--gold)" : "var(--accent)";

  return (
    <div className={`pull-overlay phase-${phase} ${isLegend ? "pull-legend" : ""}`}>
      <div className="pull-burst" />

      {phase >= 1 && (
        <div className="pull-seal" style={{ borderColor: accentColor, color: accentColor }}>
          <span className="pull-seal-char">膳</span>
        </div>
      )}

      {phase >= 1 && phase < 3 && (
        <div className="pull-message">{pullMessage}</div>
      )}

      {phase >= 2 && (
        <div className="pull-master" style={{ color: accentColor }}>
          <span className="pull-master-icon">{reading.masterIcon}</span>
          <span className="pull-master-name">
            {isLegend ? pick(LEGEND_MESSAGES) : `${reading.master}降臨`}
          </span>
        </div>
      )}

      {phase >= 3 && (
        <div className="pull-flash" style={{
          background: isLegend
            ? "radial-gradient(circle, rgba(184,144,48,0.9), rgba(255,248,220,0.95))"
            : "radial-gradient(circle, rgba(245,240,232,0.9), rgba(245,240,232,1))",
        }} />
      )}

      {isLegend && phase >= 1 && (
        <div className="pull-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="pull-particle" style={{
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${1.5 + Math.random()}s`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
