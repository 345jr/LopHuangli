import { SolarDay, LunarYear, SixtyCycleYear, SolarTime } from "tyme4ts";
import dayjs from "dayjs";

export default function getHuangliMiddleware(req, res, next) {
  try {
    // 获取中国时区（东八区）当前时间
    const now = dayjs().utcOffset(8);
    const solar = SolarDay.fromYmd(now.year(), now.month() + 1, now.date());
    const solarTime = SolarTime.fromYmdHms(
      now.year(), // 年
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
    const lunarYear = LunarYear.fromYear(now.year()).toString();
    const lunarMonth = lunar.getLunarMonth().toString();
    //干支年 ,月 ,日
    const ganZhiYear = SixtyCycleYear.fromYear(now.year()).toString();
    const ganZhiMonth = lunar.getLunarMonth().getSixtyCycle().toString();
    const ganZhiDay = solar.getSixtyCycleDay();
    //农历时辰
    const lunarHour = solarTime.getSixtyCycleHour();
    //逐日胎神
    const fetus = lunar.getFetusDay().toString();
    //九星
    const nineStar = lunar.getNineStar().toString();
    //星宿
    const twentyEightStar = lunar.getTwentyEightStar().toString();
    const luckStar = lunar.getTwentyEightStar().getLuck().toString();
    const Zone = lunar.getTwentyEightStar().getZone().toString();
    const animal = lunar.getTwentyEightStar().getAnimal().toString();
    const SevenStar = lunar.getTwentyEightStar().getSevenStar().toString();
    //彭祖百忌
    const pengZu = sixtyCycle.getPengZu().toString();
    //五行
    const sound = sixtyCycle.getSound().toString();
    const duty = lunar.getDuty().toString();
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
    //每日宜忌
    const taboosGood = ganZhiDay.getRecommends().map((t) => t.getName());
    const taboosBad = ganZhiDay.getAvoids().map((t) => t.getName());
    //黄道黑道十二神
    const twelveStar = lunarHour.getTwelveStar();
    const jiXiong = twelveStar.getEcliptic().getLuck();
    const todayJiXiong = [];
    const pad = (n) => String(n).padStart(2, "0");
    for (let hour = 0; hour < 24; hour += 2) {
      const solarTime = SolarTime.fromYmdHms(
        now.year(),
        now.month() + 1,
        now.date(),
        hour,
        0,
        0
      );
      const lunarHour = solarTime.getSixtyCycleHour();
      const twelveStar = lunarHour.getTwelveStar();
      const jiXiong = twelveStar.getEcliptic().getLuck();
      const start = (hour + 23) % 24;
      const end = (start + 1) % 24;
      todayJiXiong.push({
        siCheng: lunarHour.toString().slice(-2),
        jiXiong: jiXiong.toString(),
        range: `${pad(start)}:00 - ${pad(end)}:59`,
      });
    }
    // 计算所有数据
    const huangliData = {
      lunarDay,
      //   lunarYear,
      //   lunarMonth,
      //   ganZhiYear,
      //   ganZhiMonth,
      ganZhiDay: ganZhiDay.toString(),
      lunarHour: lunarHour.getSixtyCycle().toString(),
      fetus,
      //   nineStar,
      twentyEightStar,
      luckStar,
      Zone,
      animal,
      SevenStar,
      pengZu,
      sound,
      duty,
      heavenStem,
      earthBranch: earthBranch.toString(),
      shaDirection,
      oppositeEarthBranch,
      zodiac,
      chongToAnimal: chongToAnimal[oppositeEarthBranch],
      taboosGood,
      taboosBad,
      twelveStar: twelveStar.toString(),
      jiXiong: jiXiong.toString(),
      todayJiXiong,
    };
    res.locals.huangliData = huangliData;

    // === 打印 ===
    // console.log(`农历日 :${lunarDay}`);
    // // console.log(`干now支年 :${ganZhiYear}`);
    // // console.log(`干支月 :${ganZhiMonth}`);
    // console.log(`干支日 :${ganZhiDay.toString()}`);
    // console.log(`农历时辰 :${lunarHour.getSixtyCycle().toString()}`);
    // console.log(`逐日胎神 :${fetus}`);
    // // console.log(`九星 :${nineStar}`);
    // console.log(
    //   `星宿 :${Zone}方${twentyEightStar}${SevenStar}${animal}-${luckStar}`
    // );
    // console.log(`彭祖百忌 :${pengZu}`);
    // console.log(`五行 :${sound} |十二值神 :${duty}执位`);
    // // console.log(
    // //   `干支 :${sixtyCycle.toString()} |天干 :${heavenStem} |地支 :${earthBranch.toString()} 冲煞 :煞${shaDirection} 六冲 :${chongToAnimal[oppositeEarthBranch as DiZhi]} 生肖 :${zodiac}`
    // // );
    // console.log(
    //   `冲煞 :${zodiac}日冲${chongToAnimal[oppositeEarthBranch]} 煞${shaDirection}`
    // );
    // console.log(`宜 :${taboosGood}`);
    // console.log(`忌 :${taboosBad}`);
    // console.log(`时辰凶吉 :${jiXiong.toString()}`);
    // console.log(todayJiXiong);
    //==========
    next();
  } catch (error) {
    console.log(error);
  }
}
