import type { DescriptionsProps } from "antd";
import type { huangLiData } from "../../types/huangli";

export function getItemsInfo(data?: huangLiData): DescriptionsProps["items"] {
  return [
    {
      label: "黄历时间",
      span: "filled",
      children: <p>{data?.data.lunarDay}</p>,
    },
    {
      label: "干支时间",
      span: "filled",
      children: <p>{data?.data.ganZhiDay}</p>,
    },
    {
      label: "时辰",
      span: "filled",
      children: <p>{data?.data.lunarHour}</p>,
    },
    {
      label: "胎神",
      span: "filled",
      children: <p>{data?.data.fetus}</p>,
    },
    {
      label: "星宿",
      span: "filled",
      children: (
        <p>
          {data?.data.Zone}方{data?.data.twentyEightStar}
          {data?.data.SevenStar}
          {data?.data.animal}-{data?.data.luckStar}
        </p>
      ),
    },
    {
      label: "彭祖",
      span: "filled",
      children: <p>{data?.data.pengZu}</p>,
    },
    {
      label: "五行",
      span: "filled",
      children: (
        <p>
          {data?.data.sound}
          {data?.data.duty}执位
        </p>
      ),
    },
    {
      label: "冲煞",
      span: "filled",
      children: (
        <p>
          {data?.data.zodiac}日冲{data?.data.chongToAnimal} 煞
          {data?.data.shaDirection}
        </p>
      ),
    },
    {
      label: "宜事项",
      span: "filled",
      children: (
        <div className="grid grid-cols-4 gap-4">
          {data?.data.taboosGood.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ),
    },
    {
      label: "忌事项",
      span: "filled",
      children: (
        <div className="grid grid-cols-4 gap-4">
          {data?.data.taboosBad.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      ),
    },
  ];
}
// 通义千问系列能力均衡的模型
// 通义千问系列快速模型
// 通义千问系列效果最好的模型
export function getModelList (){
    return [
        {
            value:'qwen-plus-latest',
            label:'qwen-plus-latest   能力均衡'
        },
        {
            value:'qwen-turbo-latest',
            label:'qwen-turbo-latest    快速'
        },
        {
            value:'qwen-max-latest',
            label:'qwen-max-latest   效果最好'
        },
    ]
}