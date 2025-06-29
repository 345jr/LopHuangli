import {
  SolarDay,
  LunarDay,
  SixtyCycle,
  TwelveStar,
  EarthBranch,
  LunarYear,
  SixtyCycleYear,
  SixtyCycleMonth,
  Taboo,
  SixtyCycleDay,
  God,
  SolarTime
} from "tyme4ts";
import dayjs from "dayjs";
const now = dayjs();
const solar: SolarDay = SolarDay.fromYmd(
  now.year(),
  now.month() + 1,
  now.date()
);
const solarTime = SolarTime.fromYmdHms(
    now.year(),        // 年
    now.month() + 1,   // 月（注意 dayjs 的月份是从 0 开始）
    now.date(),        // 日
    now.hour(),        // 时
    now.minute(),      // 分
    now.second()       // 秒
  );

//公立日传农历日
const lunar: LunarDay = solar.getLunarDay();
//干支
const sixtyCycle: SixtyCycle = lunar.getSixtyCycle();

//基础农历
const lunarDay: String = solar.getLunarDay().toString();
const lunarYear:string = LunarYear.fromYear(now.year()).toString()
const lunarMonth:string =lunar.getLunarMonth().toString()
//干支年 ,月 ,日
const ganZhiYear:string = SixtyCycleYear.fromYear(now.year()).toString()
const ganZhiMonth:string = lunar.getLunarMonth().getSixtyCycle().toString()
const ganZhiDay:SixtyCycleDay = solar.getSixtyCycleDay()
//农历时辰
const lunarHour = solarTime.getSixtyCycleHour()
// console.log(`农历月 :${lunarMonth}`)
console.log(`农历日 :${lunarDay}`)
console.log(`干支年 :${ganZhiYear}`)
console.log(`干支月 :${ganZhiMonth}`)
console.log(`干支日 :${ganZhiDay.toString()}`)
console.log(`农历时辰 :${lunarHour.getSixtyCycle().toString()}`)

//逐日胎神
const fetus: string = lunar.getFetusDay().toString();
console.log(`逐日胎神 :${fetus}`);
//九星
const nineStar: string = lunar.getNineStar().toString();
console.log(`九星 :${nineStar}`);
//星宿
const twentyEightStar: string = lunar.getTwentyEightStar().toString();
const luckStar: string = lunar.getTwentyEightStar().getLuck().toString();
const Zone: string = lunar.getTwentyEightStar().getZone().toString();
const animal: string = lunar.getTwentyEightStar().getAnimal().toString();
const SevenStar: string = lunar.getTwentyEightStar().getSevenStar().toString();
console.log(
  `宫 :${Zone} |星宿 :${twentyEightStar} |七曜 :${SevenStar} |动物 :${animal} |凶吉 :${luckStar}`
);

console.log(`${Zone}方${twentyEightStar}${SevenStar}${animal}-${luckStar}`);
//彭祖百忌
const pengZu: string = sixtyCycle.getPengZu().toString();
console.log(`彭祖百忌 :${pengZu}`);
//五行
const sound: string = sixtyCycle.getSound().toString();
const duty: string = lunar.getDuty().toString();
console.log(`五行 :${sound} |十二值神 :${duty}执位`);
//冲煞
const heavenStem: string = sixtyCycle.getHeavenStem().toString();
const earthBranch: EarthBranch = sixtyCycle.getEarthBranch();
//冲，煞
const shaDirection: string = earthBranch.getOminous().toString();
const oppositeEarthBranch: string = earthBranch.getOpposite().toString();
const zodiac: string = earthBranch.getZodiac().toString();
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
type DiZhi =
  | "子"
  | "丑"
  | "寅"
  | "卯"
  | "辰"
  | "巳"
  | "午"
  | "未"
  | "申"
  | "酉"
  | "戌"
  | "亥";
// console.log(
//   `干支 :${sixtyCycle.toString()} |天干 :${heavenStem} |地支 :${earthBranch.toString()} 冲煞 :煞${shaDirection} 六冲 :${chongToAnimal[oppositeEarthBranch as DiZhi]} 生肖 :${zodiac}`
// );
console.log(
  `冲煞 :${zodiac}日冲${
    chongToAnimal[oppositeEarthBranch as DiZhi]
  } 煞${shaDirection}`
);
//每日宜忌
const taboosGood = ganZhiDay.getRecommends().map(t=>t.getName());
const taboosBad = ganZhiDay.getAvoids().map(t=>t.getName());
console.log(`宜 :${taboosGood}`)
console.log(`忌 :${taboosBad}`)
//黄道黑道十二神
const twelveStar = lunarHour.getTwelveStar()
const jiXiong = twelveStar.getEcliptic().getLuck()
console.log(`时辰凶吉 :${jiXiong.toString()}`);

