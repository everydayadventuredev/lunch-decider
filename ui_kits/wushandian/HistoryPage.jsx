// HistoryPage — 食曆 stats + achievements + entries
function StatLine({ label, value, comment }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      fontFamily: "'LXGW WenKai TC', serif", fontSize: 13, lineHeight: 1.8,
    }}>
      <span style={{ color: "var(--ink-light)" }}>{label}</span>
      <span style={{ color: "var(--ink)", fontWeight: 700 }}>
        {value}
        {comment && <span style={{ fontWeight: 400, fontSize: 11, color: "var(--ink-lighter)", marginLeft: 6 }}>{comment}</span>}
      </span>
    </div>
  );
}

function HistoryPage({ history = [], achievements = [], onBack }) {
  const totalRerolls = history.reduce((s, r) => s + (r.rerolls || 0), 0);
  const foodCounts = {};
  history.forEach(r => { foodCounts[r.food] = (foodCounts[r.food] || 0) + 1; });
  const topFood = Object.entries(foodCounts).sort((a, b) => b[1] - a[1])[0];
  const uniqueFoods = new Set(history.map(r => r.food)).size;

  const ACHS = [
    { id: "first", name: "初登午膳殿", desc: "第一次求指引", icon: "🎯" },
    { id: "10", name: "十次修行", desc: "累計 10 次", icon: "📿" },
    { id: "reroll5", name: "不服從者", desc: "單次重抽 5 次", icon: "🔁" },
    { id: "friday", name: "週五放縱", desc: "週五翻牌", icon: "👑" },
    { id: "devil", name: "魔王認證", desc: "被魔王接管", icon: "👹" },
    { id: "variety", name: "百味嚐遍", desc: "20 種不同料理", icon: "🌈" },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "24px 16px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: "'LXGW WenKai TC', serif", fontSize: 14,
          color: "var(--ink-light)", letterSpacing: 1,
        }}>← 返回</button>
        <h2 style={{
          fontFamily: "'Ma Shan Zheng', cursive", fontSize: 32,
          color: "var(--ink)", margin: "0 auto",
          letterSpacing: 6, paddingRight: 40,
        }}>食曆</h2>
      </div>

      {history.length > 0 && (
        <div style={{
          background: "var(--card-bg)", border: "1.5px solid var(--ink-lighter)",
          borderRadius: 12, padding: 20, marginBottom: 24,
          maxWidth: 420, margin: "0 auto 24px",
        }}>
          <div style={{
            fontFamily: "'Ma Shan Zheng', cursive", fontSize: 20,
            color: "var(--ink)", marginBottom: 16, letterSpacing: 3, textAlign: "center",
          }}>食曆統計</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <StatLine label="累計求指引" value={`${history.length} 次`} comment={history.length > 10 ? "殿內大師都認得你了" : ""}/>
            <StatLine label="不服重抽" value={`${totalRerolls} 次`} comment={totalRerolls > 5 ? "大師表示：你很難伺候" : ""}/>
            <StatLine label="嚐過品項" value={`${uniqueFoods} 種`}/>
            {topFood && <StatLine label="最常出現" value={`${topFood[0]} × ${topFood[1]}`} comment={topFood[1] >= 2 ? "有緣份" : ""}/>}
          </div>
        </div>
      )}

      <div style={{
        background: "var(--card-bg)", border: "1.5px solid var(--ink-lighter)",
        borderRadius: 12, padding: 20, marginBottom: 24,
        maxWidth: 420, margin: "0 auto 24px",
      }}>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive", fontSize: 20,
          color: "var(--ink)", marginBottom: 16, letterSpacing: 3, textAlign: "center",
        }}>功德成就</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ACHS.map(a => {
            const unlocked = achievements.includes(a.id);
            return (
              <div key={a.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                opacity: unlocked ? 1 : 0.5,
                padding: "8px 12px", borderRadius: 8,
                background: unlocked ? "var(--bg-alt)" : "transparent",
              }}>
                <span style={{ fontSize: 24 }}>{unlocked ? a.icon : "🔒"}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'LXGW WenKai TC', serif", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{a.name}</div>
                  <div style={{ fontFamily: "'LXGW WenKai TC', serif", fontSize: 12, color: "var(--ink-light)" }}>{a.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <div style={{
          fontFamily: "'Ma Shan Zheng', cursive", fontSize: 20,
          color: "var(--ink)", marginBottom: 16, letterSpacing: 3, textAlign: "center",
        }}>歷次紀錄</div>
        {history.length === 0 ? (
          <p style={{
            fontFamily: "'LXGW WenKai TC', serif", fontSize: 14,
            color: "var(--ink-lighter)", textAlign: "center", marginTop: 40,
          }}>尚無紀錄，快去求一次指引吧。</p>
        ) : (
          [...history].reverse().map((r, i) => (
            <div key={i} style={{
              background: "var(--card-bg)", border: "1px solid var(--ink-lighter)",
              borderRadius: 10, padding: 16, marginBottom: 12, position: "relative",
            }}>
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
                color: "var(--ink-lighter)", letterSpacing: 1, marginBottom: 6,
              }}>{r.date} 週{r.weekday}{r.time ? ` ${r.time}` : ""}</div>
              <div style={{
                fontFamily: "'Ma Shan Zheng', cursive", fontSize: 24,
                color: "var(--ink)", letterSpacing: 3,
              }}>{r.food}</div>
              <div style={{ fontFamily: "'LXGW WenKai TC', serif", fontSize: 12, color: "var(--ink-light)", marginTop: 4 }}>
                {r.fortune} ・ {r.master}
              </div>
              <div style={{
                fontFamily: "'LXGW WenKai TC', serif", fontSize: 12,
                color: "var(--ink-lighter)", marginTop: 4, fontStyle: "italic",
              }}>「{r.quote}」</div>
              {(r.rerolls || 0) > 0 && (
                <div style={{
                  fontFamily: "'LXGW WenKai TC', serif", fontSize: 11,
                  color: "#c23a2e", marginTop: 6,
                }}>重抽 {r.rerolls} 次才認命</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

window.HistoryPage = HistoryPage;
