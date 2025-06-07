import type { huangLiData } from "../../types/huangli";
import { Col, Row } from "antd";
import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { Input } from 'antd';
import type { InputRef } from 'antd';
import { Button } from 'antd';

import dayjs from "dayjs";

import "dayjs/locale/zh-cn";

import ShowNowTime from "../ShowNowTime/ShowNowTime";
import { useRef, useState } from "react";

const Home = ({ data }: { data: huangLiData | null }) => {
  dayjs.locale("zh-cn");


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
  const [text, setText] = useState('');
  const handleStream = async () => {
    setText('');
    const value = inputRef.current?.input?.value;
    const response = await fetch(`http://localhost:3000/api/aliyunai?q=${encodeURIComponent(value || '')}`);
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Response body is null");
    }
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      setText(prev => prev + chunk);
    }
  };

  const inputRef =useRef<InputRef>(null)
  const { TextArea } = Input;
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
          <h1>AI解析</h1>
          <Input placeholder="请输入你的问题?" ref={inputRef} />
          <Button onClick={handleStream}>发送</Button>
          <TextArea showCount={true} allowClear={true} value={text}/>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
