import { useState, useCallback } from "react";
import CardBack from "./components/CardBack";
import ResultCard from "./components/ResultCard";
import DevilResultCard from "./components/DevilResultCard";
import HistoryPage from "./components/HistoryPage";
import PullAnimation from "./components/PullAnimation";
import DevilAnimation from "./components/DevilAnimation";
import ShopClosed from "./components/ShopClosed";
import Toast, { getAcceptMessage } from "./components/Toast";
import { generateReading, generateDevilReading, SUBTITLES } from "./utils/generateReading";
import { ACHIEVEMENTS } from "./data/achievements";
import { OVERTIME_SUBTITLES, STREAK_SUBTITLES, EASTER_EGG_MESSAGES } from "./data/darkCommentary";
import { calculateStreak } from "./utils/streak";
import { useHistory } from "./hooks/useHistory";
import "./styles/global.css";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REROLLS = 10;

function getSavedCooldown() {
  try {
    const end = Number(localStorage.getItem("lunch-cooldown-end"));
    if (end && end > Date.now()) return end;
  } catch { /* empty */ }
  return null;
}

export default function App() {
  const [page, setPage] = useState(() => getSavedCooldown() ? "closed" : "home");
  const [reading, setReading] = useState(null);
  const [rerollCount, setRerollCount] = useState(0);
  const [isDevilMode, setIsDevilMode] = useState(false);
  const [subtitle, setSubtitle] = useState(() => {
    const hour = new Date().getHours();
    return hour >= 18 ? pick(OVERTIME_SUBTITLES) : pick(SUBTITLES);
  });
  const [lateNightMsg, setLateNightMsg] = useState(null);
  const [newAchievement, setNewAchievement] = useState(null);
  const [toast, setToast] = useState(null);
  const [pageKey, setPageKey] = useState(0);
  const [cooldownEnd, setCooldownEnd] = useState(() => getSavedCooldown());

  const { history, achievements, addEntry, updateAchievements } = useHistory();

  // Phase 7: Update subtitle based on streak after history loads
  useState(() => {
    // Read history directly from localStorage for initial streak calculation
    try {
      const saved = JSON.parse(localStorage.getItem("lunch-tarot-history") || "[]");
      const streak = calculateStreak(saved);
      if (streak >= 20 && STREAK_SUBTITLES[20]) {
        setSubtitle(pick(STREAK_SUBTITLES[20]));
      } else if (streak >= 10 && STREAK_SUBTITLES[10]) {
        setSubtitle(pick(STREAK_SUBTITLES[10]));
      } else if (streak >= 5 && STREAK_SUBTITLES[5]) {
        setSubtitle(pick(STREAK_SUBTITLES[5]));
      }
    } catch { /* empty */ }
  });

  const checkAchievements = useCallback((h, currentAchievements) => {
    const newUnlocked = [];
    ACHIEVEMENTS.forEach(a => {
      if (!currentAchievements.includes(a.id) && a.check(h)) {
        newUnlocked.push(a.id);
      }
    });
    if (newUnlocked.length > 0) {
      updateAchievements(newUnlocked);
      const first = ACHIEVEMENTS.find(a => a.id === newUnlocked[0]);
      setNewAchievement(first);
      setTimeout(() => setNewAchievement(null), 3000);
    }
  }, [updateAchievements]);

  const handleFlip = () => {
    // Phase 8: 2AM-5AM easter egg
    const hour = new Date().getHours();
    if (hour >= 2 && hour < 5 && !lateNightMsg) {
      setLateNightMsg(pick(EASTER_EGG_MESSAGES.lateNight));
      setTimeout(() => {
        setLateNightMsg(null);
        const r = generateReading();
        setReading(r);
        setRerollCount(0);
        setPage("pulling");
      }, 2500);
      return;
    }
    const r = generateReading();
    setReading(r);
    setRerollCount(0);
    setPage("pulling");
  };

  const handlePullComplete = () => {
    setPageKey(k => k + 1);
    setPage("result");
  };

  const handleDevilPullComplete = () => {
    setPageKey(k => k + 1);
    setPage("devil-result");
  };

  const handleReroll = () => {
    const newCount = rerollCount + 1;
    if (newCount >= MAX_REROLLS) {
      // Devil mode: 魔王接手！
      const r = generateDevilReading();
      setReading(r);
      setRerollCount(newCount);
      setIsDevilMode(true);
      setPage("devil-pulling");
      return;
    }
    const r = generateReading();
    r.rerolls = newCount;
    setReading(r);
    setRerollCount(newCount);
  };

  const handleAccept = () => {
    const entry = { ...reading, rerolls: rerollCount, isDevil: isDevilMode };
    const newHistory = [...history, entry];
    addEntry(entry);
    checkAchievements(newHistory, achievements);

    if (isDevilMode) {
      // Devil mode accept → cooldown
      const end = Date.now() + COOLDOWN_MS;
      setCooldownEnd(end);
      try { localStorage.setItem("lunch-cooldown-end", String(end)); } catch { /* empty */ }
      setIsDevilMode(false);
      setReading(null);
      setRerollCount(0);
      setPageKey(k => k + 1);
      setPage("closed");
      return;
    }

    // P2: Show toast before going home (with context-aware messages)
    setToast(getAcceptMessage(rerollCount, false));
    setReading(null);
    setRerollCount(0);
  };

  const handleToastDone = () => {
    setToast(null);
    setPageKey(k => k + 1);
    setPage("home");
  };

  const handleCooldownDone = () => {
    try { localStorage.removeItem("lunch-cooldown-end"); } catch { /* empty */ }
    setCooldownEnd(null);
    setPageKey(k => k + 1);
    setPage("home");
  };

  const navigateTo = (p) => {
    setPageKey(k => k + 1);
    setPage(p);
  };

  return (
    <div id="app-root" style={{
      minHeight: "100vh",
      background: "var(--bg)",
      position: "relative",
    }}>
      {/* Navigation - history button */}
      {page !== "history" && page !== "pulling" && page !== "closed" && page !== "devil-pulling" && page !== "devil-result" && (
        <button onClick={() => navigateTo("history")} style={{
          position: "fixed",
          top: 16, right: 16,
          background: "var(--card-bg)",
          border: "1px solid var(--ink-lighter)",
          borderRadius: 8,
          padding: "10px 14px",
          minHeight: 44,
          fontFamily: "'Noto Serif TC', serif",
          fontSize: 13,
          color: "var(--ink-light)",
          cursor: "pointer",
          letterSpacing: 2,
          zIndex: 10,
          transition: "all 0.2s",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}>
          食曆 {history.length > 0 && `(${history.length})`}
        </button>
      )}

      {/* Pages with transition animation */}
      <div key={pageKey} className={page !== "pulling" && page !== "devil-pulling" ? "page-enter" : undefined}>
        {page === "home" && !toast && (
          <CardBack onFlip={handleFlip} subtitle={subtitle} />
        )}
        {page === "result" && reading && !toast && (
          <ResultCard
            reading={reading}
            onReroll={handleReroll}
            onAccept={handleAccept}
            rerollCount={rerollCount}
          />
        )}
        {page === "devil-result" && reading && !toast && (
          <DevilResultCard
            reading={reading}
            onAccept={handleAccept}
          />
        )}
        {page === "history" && (
          <HistoryPage
            history={history}
            achievements={achievements}
            onBack={() => navigateTo("home")}
          />
        )}
        {page === "closed" && cooldownEnd && (
          <ShopClosed cooldownEnd={cooldownEnd} onCooldownDone={handleCooldownDone} />
        )}
      </div>

      {/* Gacha pull animation */}
      {page === "pulling" && reading && (
        <PullAnimation reading={reading} onComplete={handlePullComplete} />
      )}

      {/* Devil pull animation */}
      {page === "devil-pulling" && reading && (
        <DevilAnimation reading={reading} onComplete={handleDevilPullComplete} />
      )}

      {/* Phase 8: Late night easter egg message */}
      {lateNightMsg && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 60,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(44, 36, 22, 0.9)",
          animation: "fadeIn 0.5s ease",
        }}>
          <div style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 16, color: "var(--ink-lighter)",
            letterSpacing: 2, textAlign: "center",
            padding: "0 32px", lineHeight: 2,
          }}>
            {lateNightMsg}
          </div>
        </div>
      )}

      {/* P2: Accept toast */}
      {toast && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          minHeight: "100vh",
        }}>
          <Toast message={toast} duration={1800} onDone={handleToastDone} />
        </div>
      )}

      {/* Achievement toast */}
      {newAchievement && (
        <div className="achievement-toast" style={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          background: "var(--ink)",
          color: "var(--card-bg)",
          borderRadius: 12,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 100,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}>
          <span style={{ fontSize: 28 }}>{newAchievement.icon}</span>
          <div>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 11, opacity: 0.7, letterSpacing: 2,
            }}>成就解鎖</div>
            <div style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: 15, fontWeight: 700, letterSpacing: 1,
            }}>{newAchievement.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
