import type { huangLiData } from "../types/huangli";
import { Col, Row } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

import ShowNowTime from "./ShowNowTime/ShowNowTime";

const Home = ({ data }: { data: huangLiData | null }) => {
  dayjs.locale("zh-cn");

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "宜事项",
      children: (
        <ul className="mx-4">
          {data?.data.taboosGood.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ),
    },
  ];
  const items2: CollapseProps["items"] = [
    {
      key: "1",
      label: "忌事项",
      children: (
        <ul className="mx-4">
          {data?.data.taboosBad.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ),
    },
  ];

  const itemsInfo: DescriptionsProps["items"] = [
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
          {data?.data.animal}
          {data?.data.luckStar}-{data?.data.twentyEightStar}
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
  ];

  return (
    <div>
      <ShowNowTime />

      <Row className="justify-center">
        <Col span={70}>
          <Descriptions
            bordered
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            items={itemsInfo}
          />
        </Col>
        <Col span={30}>
          <Row gutter={10}>
            <Col span={50}>
              <Collapse items={items} defaultActiveKey={["1"]} />
            </Col>
            <Col span={50}>
              <Collapse items={items2} defaultActiveKey={["1"]} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
