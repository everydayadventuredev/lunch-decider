import { ACHIEVEMENTS } from "../data/achievements";
import SealStamp from "./SealStamp";

function StatLine({ label, value, comment }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      fontFamily: "'Noto Serif TC', serif",
      fontSize: 13,
      lineHeight: 1.8,
    }}>
      <span style={{ color: "var(--ink-light)" }}>{label}</span>
      <span style={{ color: "var(--ink)", fontWeight: 700 }}>
        {value}
        {comment && (
          <span style={{ fontWeight: 400, fontSize: 11, color: "var(--ink-lighter)", marginLeft: 6 }}>
            {comment}
          </span>
        )}
      </span>
    </div>
  );
}

export default function HistoryPage({ history, achievements, onBack }) {
  const totalRerolls = history.reduce((sum, r) => sum + (r.rerolls || 0), 0);
  const foodCounts = {};
  history.forEach(r => { foodCounts[r.food] = (foodCounts[r.food] || 0) + 1; });
  const topFood = Object.entries(foodCounts).sort((a, b) => b[1] - a[1])[0];
  const uniqueFoods = new Set(history.map(r => r.food)).size;

  const frequentComments = {
    5: "你們是不是有什麼誓約？",
    3: "是真愛無誤",
    2: "有緣份",
  };
  const topFoodComment = topFood ? (
    topFood[1] >= 5 ? frequentComments[5] :
    topFood[1] >= 3 ? frequentComments[3] :
    topFood[1] >= 2 ? frequentComments[2] : ""
  ) : "";

  return (
    <div style={{ minHeight: "100vh", padding: "24px 16px 40px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'Noto Serif TC', serif", fontSize: 14,
          color: "var(--ink-light)", letterSpacing: 1,
        }}>← 返回</button>
        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 32,
          color: "var(--ink)",
          margin: "0 auto",
          letterSpacing: 6,
          paddingRight: 40,
        }}>食曆</h2>
      </div>

      {/* Stats */}
      {history.length > 0 && (
        <div style={{
          background: "var(--card-bg)",
          border: "1.5px solid var(--ink-lighter)",
          borderRadius: 12,
          padding: "20px",
          marginBottom: 24,
          maxWidth: 420, margin: "0 auto 24px",
        }}>
          <div style={{
            fontFamily: "'Ma Shan Zheng', cursive",
            fontSize: 20, color: "var(--ink)",
            marginBottom: 16, letterSpacing: 3, textAlign: "center",
          }}>食曆統計</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <StatLine label="累計求指引" value={`${history.length} 次`} comment={history.length > 10 ? "殿內大師都認得你了" : ""} />
            <StatLine label="不服重抽" value={`${totalRerolls} 次`} comment={totalRerolls > 5 ? "大師表示：你很難伺候" : ""} />
            <StatLine label="嚐過品項" value={`${uniqueFoods} 種`} comment="" />
            {topFood && (
              <StatLine label="最常出現" value={`${topFood[0]} × ${topFood[1]}`} comment={topFoodComment} />
            )}
          </div>
        </div>
      )}

      {/* Achievements — P5: 加上進度顯示 */}
      <div style={{
        background: "var(--card-bg)",
        border: "1.5px solid var(--ink-lighter)",
        borderRadius: 12,
        padding: "20px",
        marginBottom: 24,
        maxWidth: 420, margin: "0 auto 24px",
      }}>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 20, color: "var(--ink)",
          marginBottom: 16, letterSpacing: 3, textAlign: "center",
        }}>功德成就</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ACHIEVEMENTS.map(a => {
            const unlocked = achievements.includes(a.id);
            const progress = !unlocked && a.progress ? a.progress(history) : null;
            return (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                opacity: unlocked ? 1 : 0.5,
                padding: "8px 12px",
                borderRadius: 8,
                background: unlocked ? "var(--bg-alt)" : "transparent",
                transition: "all 0.3s",
              }}>
                <span style={{ fontSize: 24 }}>{unlocked ? a.icon : "🔒"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontSize: 14, fontWeight: 700,
                    color: "var(--ink)",
                  }}>{a.name}</div>
                  <div style={{
                    fontFamily: "'Noto Serif TC', serif",
                    fontSize: 12,
                    color: "var(--ink-light)",
                  }}>{a.desc}</div>
                  {/* P5: Progress indicator */}
                  {progress && (
                    <div style={{
                      fontFamily: "'Noto Serif TC', serif",
                      fontSize: 11,
                      color: "var(--ink-lighter)",
                      marginTop: 2,
                    }}>目前 {progress.current}/{progress.target}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History entries */}
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 20, color: "var(--ink)",
          marginBottom: 16, letterSpacing: 3, textAlign: "center",
        }}>歷次紀錄</div>
        {history.length === 0 ? (
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: 14,
            color: "var(--ink-lighter)",
            textAlign: "center",
            marginTop: 40,
          }}>尚無紀錄，快去求一次指引吧。</p>
        ) : (
          [...history].reverse().map((r, i) => (
            <div key={i} style={{
              background: "var(--card-bg)",
              border: "1px solid var(--ink-lighter)",
              borderRadius: 10,
              padding: "16px",
              marginBottom: 12,
              position: "relative",
            }}>
              {r.isLegend && (
                <div style={{ position: "absolute", top: 8, right: 12 }}>
                  <SealStamp text="傳說" color="var(--gold)" size={36} rotate={-10} />
                </div>
              )}
              <div style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 11, color: "var(--ink-lighter)",
                letterSpacing: 1, marginBottom: 6,
              }}>{r.date} 週{r.weekday}</div>
              <div style={{
                fontFamily: "'Ma Shan Zheng', cursive",
                fontSize: 24, color: "var(--ink)", letterSpacing: 3,
              }}>{r.food}</div>
              <div style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 12, color: "var(--ink-light)", marginTop: 4,
              }}>
                {r.fortune} ・ {r.master}
              </div>
              <div style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: 12, color: "var(--ink-lighter)",
                marginTop: 4, fontStyle: "italic",
              }}>「{r.quote}」</div>
              {(r.rerolls || 0) > 0 && (
                <div style={{
                  fontFamily: "'Noto Serif TC', serif",
                  fontSize: 11, color: "var(--accent)", marginTop: 6,
                }}>重抽 {r.rerolls} 次才認命</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
