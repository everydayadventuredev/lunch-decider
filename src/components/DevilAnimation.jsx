import { useEffect, useState, useRef } from "react";

const DEVIL_MESSAGES = [
  "大師們已經離開了…",
  "黑暗降臨…",
  "有什麼東西來了…",
  "殿內的香火突然熄滅…",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function DevilAnimation({ reading, onComplete }) {
  const [phase, setPhase] = useState(0);
  const [msg] = useState(() => pick(DEVIL_MESSAGES));
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 500));    // darken + message
    timers.push(setTimeout(() => setPhase(2), 2200));    // devil appears
    timers.push(setTimeout(() => setPhase(3), 3800));    // flash to result
    timers.push(setTimeout(() => onCompleteRef.current(), 4400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`devil-overlay phase-${phase}`}>
      {/* Flickering embers */}
      {phase >= 1 && (
        <div className="devil-embers">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="devil-ember" style={{
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random() * 1.5}s`,
            }} />
          ))}
        </div>
      )}

      {/* Phase 1: ominous message */}
      {phase >= 1 && phase < 3 && (
        <div className="devil-message">{msg}</div>
      )}

      {/* Phase 2: devil master reveal */}
      {phase >= 2 && (
        <div className="devil-master-reveal">
          <span className="devil-icon">{reading.masterIcon}</span>
          <span className="devil-name">{reading.master}駕到</span>
        </div>
      )}

      {/* Phase 3: red flash */}
      {phase >= 3 && (
        <div className="devil-flash" />
      )}
    </div>
  );
}
