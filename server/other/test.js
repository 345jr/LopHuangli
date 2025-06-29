"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tyme4ts_1 = require("tyme4ts");
const dayjs_1 = __importDefault(require("dayjs"));
const now = (0, dayjs_1.default)();
const solar = tyme4ts_1.SolarDay.fromYmd(now.year(), now.month() + 1, now.date());
const solarTime = tyme4ts_1.SolarTime.fromYmdHms(now.year(), // 年
now.month() + 1, // 月（注意 dayjs 的月份是从 0 开始）
now.date(), // 日
now.hour(), // 时
now.minute(), // 分
now.second() // 秒
);
//公立日传农历日
const lunar = solar.getLunarDay();
//干支
const sixtyCycle = lunar.getSixtyCycle();
//基础农历
const lunarDay = solar.getLunarDay().toString();
const lunarYear = tyme4ts_1.LunarYear.fromYear(now.year()).toString();
const lunarMonth = lunar.getLunarMonth().toString();
//干支年 ,月 ,日
const ganZhiYear = tyme4ts_1.SixtyCycleYear.fromYear(now.year()).toString();
const ganZhiMonth = lunar.getLunarMonth().getSixtyCycle().toString();
const ganZhiDay = solar.getSixtyCycleDay();
//农历时辰
const lunarHour = solarTime.getSixtyCycleHour();
// console.log(`农历月 :${lunarMonth}`)
console.log(`农历日 :${lunarDay}`);
console.log(`干支年 :${ganZhiYear}`);
console.log(`干支月 :${ganZhiMonth}`);
console.log(`干支日 :${ganZhiDay.toString()}`);
console.log(`农历时辰 :${lunarHour.getSixtyCycle().toString()}`);
//逐日胎神
const fetus = lunar.getFetusDay().toString();
console.log(`逐日胎神 :${fetus}`);
//九星
const nineStar = lunar.getNineStar().toString();
console.log(`九星 :${nineStar}`);
//星宿
const twentyEightStar = lunar.getTwentyEightStar().toString();
const luckStar = lunar.getTwentyEightStar().getLuck().toString();
const Zone = lunar.getTwentyEightStar().getZone().toString();
const animal = lunar.getTwentyEightStar().getAnimal().toString();
const SevenStar = lunar.getTwentyEightStar().getSevenStar().toString();
console.log(`宫 :${Zone} |星宿 :${twentyEightStar} |七曜 :${SevenStar} |动物 :${animal} |凶吉 :${luckStar}`);
console.log(`${Zone}方${twentyEightStar}${SevenStar}${animal}-${luckStar}`);
//彭祖百忌
const pengZu = sixtyCycle.getPengZu().toString();
console.log(`彭祖百忌 :${pengZu}`);
//五行
const sound = sixtyCycle.getSound().toString();
const duty = lunar.getDuty().toString();
console.log(`五行 :${sound} |十二值神 :${duty}执位`);
//冲煞
const heavenStem = sixtyCycle.getHeavenStem().toString();
const earthBranch = sixtyCycle.getEarthBranch();
//冲，煞
const shaDirection = earthBranch.getOminous().toString();
const oppositeEarthBranch = earthBranch.getOpposite().toString();
const zodiac = earthBranch.getZodiac().toString();
const chongToAnimal = {
    子: "鼠",
    丑: "牛",
    寅: "虎",
    卯: "兔",
    辰: "龙",
    巳: "蛇",
    午: "马",
    未: "羊",
    申: "猴",
    酉: "鸡",
    戌: "狗",
    亥: "猪",
};
// console.log(
//   `干支 :${sixtyCycle.toString()} |天干 :${heavenStem} |地支 :${earthBranch.toString()} 冲煞 :煞${shaDirection} 六冲 :${chongToAnimal[oppositeEarthBranch as DiZhi]} 生肖 :${zodiac}`
// );
console.log(`冲煞 :${zodiac}日冲${chongToAnimal[oppositeEarthBranch]} 煞${shaDirection}`);
//每日宜忌
const taboosGood = ganZhiDay.getRecommends().map(t => t.getName());
const taboosBad = ganZhiDay.getAvoids().map(t => t.getName());
console.log(`宜 :${taboosGood}`);
console.log(`忌 :${taboosBad}`);
//黄道黑道十二神
const twelveStar = lunarHour.getTwelveStar();
const jiXiong = twelveStar.getEcliptic().getLuck();
console.log(`时辰凶吉 :${jiXiong.toString()}`);
