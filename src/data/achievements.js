export const ACHIEVEMENTS = [
  {
    id: "loyal", name: "忠實食客", desc: "連續 5 天求指引", icon: "🏅",
    check: (h) => {
      if (h.length < 5) return false;
      const last5 = h.slice(-5);
      const dates = last5.map(r => r.date);
      for (let i = 1; i < dates.length; i++) {
        const d1 = new Date(dates[i - 1]);
        const d2 = new Date(dates[i]);
        d2.setDate(d2.getDate() - 1);
        if (d1.toDateString() !== d2.toDateString()) return false;
      }
      return true;
    },
    progress: (h) => {
      if (h.length === 0) return { current: 0, target: 5 };
      let streak = 1;
      for (let i = h.length - 1; i > 0; i--) {
        const d1 = new Date(h[i].date);
        const d2 = new Date(h[i - 1].date);
        const diff = (d1 - d2) / (1000 * 60 * 60 * 24);
        if (diff === 1) streak++;
        else break;
      }
      return { current: Math.min(streak, 5), target: 5 };
    },
  },
  {
    id: "reroll", name: "逆天改命者", desc: "單次重抽超過 3 次", icon: "🔄",
    check: (h) => h.some(r => (r.rerolls || 0) >= 3),
    progress: (h) => {
      const max = Math.max(0, ...h.map(r => r.rerolls || 0));
      return { current: Math.min(max, 3), target: 3 };
    },
  },
  {
    id: "variety", name: "百味嚐遍", desc: "集滿 10 種不同指引", icon: "🌈",
    check: (h) => new Set(h.map(r => r.food)).size >= 10,
    progress: (h) => ({ current: new Set(h.map(r => r.food)).size, target: 10 }),
  },
  {
    id: "accept", name: "佛系上班族", desc: "連續 5 次都「認命了」", icon: "☯️",
    check: (h) => {
      if (h.length < 5) return false;
      return h.slice(-5).every(r => (r.rerolls || 0) === 0);
    },
    progress: (h) => {
      if (h.length === 0) return { current: 0, target: 5 };
      let streak = 0;
      for (let i = h.length - 1; i >= 0; i--) {
        if ((h[i].rerolls || 0) === 0) streak++;
        else break;
      }
      return { current: Math.min(streak, 5), target: 5 };
    },
  },
  {
    id: "legend", name: "天選之人", desc: "抽到「高級餐廳」", icon: "✨",
    check: (h) => h.some(r => r.food === "高級餐廳"),
    progress: (h) => ({ current: h.some(r => r.food === "高級餐廳") ? 1 : 0, target: 1 }),
  },
  {
    id: "noodle", name: "泡麵修行者", desc: "累計抽到 3 次苦行類", icon: "🍜",
    check: (h) => h.filter(r => r.tier === "苦行").length >= 3,
    progress: (h) => ({ current: h.filter(r => r.tier === "苦行").length, target: 3 }),
  },
  {
    id: "week", name: "一週全勤", desc: "一週內求指引 5 天", icon: "📅",
    check: (h) => {
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const thisWeek = h.filter(r => new Date(r.date) >= weekAgo);
      const uniqueDays = new Set(thisWeek.map(r => r.date));
      return uniqueDays.size >= 5;
    },
    progress: (h) => {
      const now = new Date();
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      const thisWeek = h.filter(r => new Date(r.date) >= weekAgo);
      const uniqueDays = new Set(thisWeek.map(r => r.date));
      return { current: uniqueDays.size, target: 5 };
    },
  },
];
