import { FOODS } from "../data/foods";
import { MASTERS, QUOTES, WEDNESDAY_MASTER_QUOTES } from "../data/masters";
import { FOOD_FORTUNES, FRIDAY_FORTUNES, MONDAY_FORTUNES, WEDNESDAY_FORTUNES } from "../data/fortunes";
import { GOOD_THINGS, BAD_THINGS } from "../data/goodBad";
import { LUCKY_SIDES, LUCKY_SEATS } from "../data/lucky";
import {
  DEVIL_MASTER, DEVIL_QUOTES, DEVIL_FORTUNES,
  DEVIL_GOOD, DEVIL_BAD, DEVIL_LUCKY_SIDES, DEVIL_LUCKY_SEATS,
} from "../data/devil";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pick2 = (arr) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

export function generateReading() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const hour = today.getHours();
  const isOvertime = hour >= 18;
  const isFriday = dayOfWeek === 5;
  const isMonday = dayOfWeek === 1;
  const isWednesday = dayOfWeek === 3;

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

  const fortunes = isWednesday ? WEDNESDAY_FORTUNES : isFriday ? FRIDAY_FORTUNES : isMonday ? MONDAY_FORTUNES : FOOD_FORTUNES;

  return {
    food: food.name,
    tier: food.tier,
    fortune: pick(fortunes),
    master: master.name,
    masterIcon: master.icon,
    quote: isWednesday && Math.random() < 0.4 ? pick(WEDNESDAY_MASTER_QUOTES) : pick(QUOTES[master.name]),
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
    isWednesday,
    isOvertime,
    rerolls: 0,
  };
}

export function generateDevilReading() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const hour = today.getHours();
  const isOvertime = hour >= 18;
  const food = pick(FOODS.filter(f => f.name !== "高級餐廳"));

  return {
    food: food.name,
    tier: food.tier,
    fortune: pick(DEVIL_FORTUNES),
    master: DEVIL_MASTER.name,
    masterIcon: DEVIL_MASTER.icon,
    quote: pick(DEVIL_QUOTES),
    good: pick2(DEVIL_GOOD),
    bad: pick2(DEVIL_BAD),
    luckySide: pick(DEVIL_LUCKY_SIDES),
    luckySeat: pick(DEVIL_LUCKY_SEATS),
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
    time: `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`,
    weekday: ["日", "一", "二", "三", "四", "五", "六"][dayOfWeek],
    isLegend: false,
    isFriday: dayOfWeek === 5,
    isMonday: dayOfWeek === 1,
    isOvertime,
    isDevil: true,
    rerolls: 10,
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
