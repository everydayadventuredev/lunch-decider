import { FOODS } from "../data/foods";
import { MASTERS, QUOTES } from "../data/masters";
import { FOOD_FORTUNES, FRIDAY_FORTUNES, MONDAY_FORTUNES } from "../data/fortunes";
import { GOOD_THINGS, BAD_THINGS } from "../data/goodBad";
import { LUCKY_SIDES, LUCKY_SEATS } from "../data/lucky";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pick2 = (arr) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

export function generateReading() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const isFriday = dayOfWeek === 5;
  const isMonday = dayOfWeek === 1;

  let food;
  const roll = Math.random();
  if (isFriday && roll < 0.3) {
    food = pick(FOODS.filter(f => f.tier === "放縱" || f.tier === "小資"));
  } else if (isMonday && roll < 0.3) {
    food = pick(FOODS.filter(f => f.tier === "苦行"));
  } else if (roll < 0.02) {
    food = FOODS.find(f => f.name === "高級餐廳");
  } else {
    food = pick(FOODS.filter(f => f.name !== "高級餐廳"));
  }

  let master;
  if (isFriday) {
    master = MASTERS.find(m => m.name === "週五大帝");
  } else if (food.tier === "苦行") {
    master = Math.random() > 0.5
      ? MASTERS.find(m => m.name === "便當真人")
      : MASTERS.find(m => m.name === "卡路里仙人");
  } else {
    master = pick(MASTERS.filter(m => m.name !== "週五大帝"));
  }

  const fortunes = isFriday ? FRIDAY_FORTUNES : isMonday ? MONDAY_FORTUNES : FOOD_FORTUNES;

  return {
    food: food.name,
    tier: food.tier,
    fortune: pick(fortunes),
    master: master.name,
    masterIcon: master.icon,
    quote: pick(QUOTES[master.name]),
    good: pick2(GOOD_THINGS),
    bad: pick2(BAD_THINGS),
    luckySide: pick(LUCKY_SIDES),
    luckySeat: pick(LUCKY_SEATS),
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
    time: `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`,
    weekday: ["日", "一", "二", "三", "四", "五", "六"][dayOfWeek],
    isLegend: food.name === "高級餐廳",
    isFriday,
    isMonday,
    rerolls: 0,
  };
}

export function getChineseDateStr() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  return `${d.getFullYear()}年${month}月${day}日 週${weekdays[d.getDay()]}`;
}

export const SUBTITLES = [
  "上班如渡劫，午餐求指引",
  "你的 KPI 管不了，但午餐罩你",
  "人生迷惘時，先決定午餐",
  "決策疲勞的終極解方",
  "把人生最難的選擇交出去",
];
