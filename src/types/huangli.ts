export interface huangLiData {
    into :string,
    time :string,
    data:{
        lunarDay: string;
        ganZhiDay: string;
        lunarHour:string;
        fetus:string;
        Zone:string;
        twentyEightStar:string;
        animal:string;
        luckStar:string;
        pengZu:string;
        sound:string;
        duty:string;
        zodiac:string;
        chongToAnimal:string;
        shaDirection:string;
        jiXiong:string;
        taboosGood:string[];
        taboosBad:string[];
        todayJiXiong:todayJiXiong[];
    } 
  }
  export interface todayJiXiong {
    siCheng: string;
    jiXiong: string;
    range: string;
  };