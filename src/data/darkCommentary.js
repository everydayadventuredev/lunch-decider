// ── 黑色幽默集中管理 ──────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ── 食曆吐槽（基於使用模式）──
export const HISTORY_ROASTS = [
  {
    id: "time_loop",
    check: (h) => {
      if (h.length < 3) return false;
      const last3 = h.slice(-3);
      return last3.every(r => r.food === last3[0].food);
    },
    message: (h) => `連續吃了 3 次${h[h.length - 1].food}，你是不是被困在時間迴圈裡？`,
  },
  {
    id: "ascetic_week",
    check: (h) => {
      const last5 = h.slice(-5);
      return last5.length >= 5 && last5.every(r => r.tier === "苦行");
    },
    message: () => "連續 5 餐苦行修練，你的荷包很安全，但你的靈魂呢？",
  },
  {
    id: "friday_ascetic",
    check: (h) => h.some(r => r.weekday === "五" && r.tier === "苦行"),
    message: () => "週五吃苦行？週五大帝已讀不回。",
  },
  {
    id: "reroll_addict",
    check: (h) => {
      if (h.length < 3) return false;
      const avg = h.reduce((s, r) => s + (r.rerolls || 0), 0) / h.length;
      return avg > 3;
    },
    message: () => "平均重抽超過 3 次，大師們正在考慮申請職災。",
  },
  {
    id: "never_satisfied",
    check: (h) => {
      const recent = h.slice(-10);
      return recent.length >= 5 && recent.every(r => (r.rerolls || 0) >= 1);
    },
    message: () => "最近每次都重抽，大師們懷疑你根本不是來求指引的。",
  },
  {
    id: "indulgence_streak",
    check: (h) => {
      const last5 = h.slice(-5);
      return last5.length >= 5 && last5.every(r => r.tier === "放縱");
    },
    message: () => "連續 5 餐放縱，卡路里仙人已經不敢算了。",
  },
  {
    id: "legend_lucky",
    check: (h) => h.filter(r => r.isLegend).length >= 2,
    message: () => "抽到 2 次高級餐廳？你是不是對系統做了什麼？",
  },
  {
    id: "devil_regular",
    check: (h) => h.filter(r => r.isDevil).length >= 2,
    message: () => "魔王都認識你了，考慮辦個會員卡。",
  },
  {
    id: "same_master",
    check: (h) => {
      if (h.length < 5) return false;
      const last5 = h.slice(-5);
      return last5.every(r => r.master === last5[0].master);
    },
    message: (h) => `${h[h.length - 1].master}已經連續指導你 5 次了，其他大師表示：謝謝。`,
  },
];

// ── 關店碎念 ──
export const SHOP_CLOSED_QUIPS = [
  "大師正在吃自己的午餐，比你的好吃。",
  "魔王在隔壁開了外送，沒點你的份。",
  "飽德大師已讀你的訊息，選擇不回。",
  "卡路里仙人正在計算你浪費的熱量。",
  "外送天尊表示：就算你叫外送也等不到。",
  "便當真人默默把冰箱裡的便當藏起來了。",
  "週五大帝說：就算週五也不想理你。",
  "午膳殿的保全說你被列入黑名單了。",
  "大師們正在群組裡討論你的選擇困難。",
  "隔壁的占卜殿傳來同情的眼神。",
  "你的午餐運勢需要重新投胎。",
  "大師們集體去吃下午茶了，沒叫你。",
];

// ── 加班模式副標題 ──
export const OVERTIME_SUBTITLES = [
  "加班到忘記自己是人類",
  "你還在公司？大師已經下班了",
  "晚餐也要靠命運決定嗎",
  "OT 戰士的續命指南",
  "下班是什麼？可以吃嗎？",
  "你的人生只剩下工作和吃飯",
  "大師們加班費另計",
  "深夜食堂：辦公室版",
];

// ── 連續使用天數副標題 ──
export const STREAK_SUBTITLES = {
  5: [
    "你是不是真的完全不會自己決定",
    "連續 5 天了，大師開始擔心你",
    "午膳殿的忠實信徒（不是褒義）",
  ],
  10: [
    "午膳殿的 VIP（不是褒義）",
    "你的自主決策能力已經歸零了",
    "大師們開始討論你的情況了",
    "恭喜解鎖：完全喪失選擇能力",
  ],
  20: [
    "你確定不是 AI？正常人不會連續 20 天",
    "午膳殿考慮為你開設專屬包廂",
    "大師們已經把你當自己人了（是壞事）",
  ],
};

// ── 午後預言（翻牌背面）──
export const AFTERNOON_PROPHECIES = [
  "飯後會有一股不可抗力的睡意，大師建議不要抵抗。",
  "下午三點你會後悔沒多點一杯飲料。",
  "午覺運勢極佳，但老闆運勢也極佳。",
  "你的下午茶慾望將在 2:30 準時發作。",
  "飯後的會議裡你將展現精湛的假裝清醒技術。",
  "有人會在群組分享下午茶團購連結，你會動搖。",
  "你的午後生產力曲線將呈現完美的 U 型谷底。",
  "大師預見你 3 點會開始搜尋外送 app。",
  "今天下午你將產生「明天開始減肥」的想法。",
  "飯後散步的念頭會在你站起來的瞬間消失。",
  "你的咖啡因需求將在 14:00 達到臨界值。",
  "下午會有同事問你午餐吃什麼，你會開始懷疑人生。",
  "便當盒會在你桌上放到明天早上。",
  "你會在下午的某個時刻忘記自己中午吃了什麼。",
  "大師預言：今天不會是你最後一次打開午膳殿。",
];

// ── 同事反應預測 ──
export const COWORKER_REACTIONS = [
  "同事會用「蛤？」來回應你的午餐選擇。",
  "會有人說「我也要吃這個」然後自己去買別的。",
  "隔壁的人會假裝沒聞到你的午餐味道。",
  "同事會問「好吃嗎」然後不管你回什麼都說「喔」。",
  "有人會用你的午餐來開啟一段沒人想要的對話。",
  "你的午餐照片在群組會得到三個「👍」和一片沉默。",
  "會有一個同事用優越的眼神看著你的便當。",
  "某個正在減肥的同事會恨你。",
  "你的午餐會成為茶水間今天唯一的話題。",
  "有人會說「你每天都吃這個喔」，即使你明明沒有。",
  "同事的健康沙拉和你的午餐形成強烈的道德對比。",
  "會有人說「看起來不錯」但表情說了不。",
];

// ── 彩蛋訊息 ──
export const EASTER_EGG_MESSAGES = {
  lateNight: [
    "凌晨不睡覺在想午餐？你的人生需要的不是指引，是睡眠。",
    "現在連午膳殿都打烊了，你怎麼還醒著？",
    "大師們都睡了，你在幹嘛？",
    "你知道現在不是午餐時間對吧？",
  ],
  titleTap: [
    "你一直戳大師幹嘛？",
    "點再多次也不會掉出隱藏食物的。",
    "大師表示：你很無聊。",
    "系統偵測到無聊的人類。",
    "飽德大師：「你是不是上班很閒？」",
    "魔王路過看了你一眼，搖了搖頭。",
    "你找到了隱藏彩蛋！獎品是……沒有。",
    "午膳殿提醒您：上班時間請認真工作。",
  ],
};
