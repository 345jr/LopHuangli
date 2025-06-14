import type { huangLiData } from "../../types/huangli";
import { Col, Row } from "antd";
import { Descriptions } from "antd";
import { Input } from 'antd';
import type { InputRef } from 'antd';
import { Button } from 'antd';
import { Select } from 'antd';
import { AnimatedMarkdown } from 'flowtoken';
import 'flowtoken/dist/styles.css';

import ShowNowTime from "../ShowNowTime/ShowNowTime";

import { getItemsInfo,getModelList } from "./ItemsInfo";
import { useRef, useState } from "react";

const Home = ({ data }: { data: huangLiData}) => {

  const [text, setText] = useState('');

  const inputRef =useRef<InputRef>(null)
  const selectModelRef =useRef('qwen-plus')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStream = async () => {
    setText('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let buffer =''

    intervalRef.current = setInterval(() => {
      if (buffer.length > 0) {
        setText(prev => prev + buffer);
        buffer = '';
      }
    }, 100);
    try {
        // const Qvalue = inputRef.current?.input?.value;
      const response = await fetch(`http://199.115.229.247:8085/api/aliyunaiStream?q=${encodeURIComponent(inputRef.current?.input?.value || '')}&model=${encodeURIComponent(selectModelRef.current)}`);
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is null");
      }
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        buffer+=chunk
      }
    } catch(error) {
      console.error("Streaming failed:", error);
      setText("请求出错，请检查网络或联系管理员。");
    } finally {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (buffer.length > 0) {
        setText(prev=>prev+buffer)
      }
    }
    
  };

  const handleSeletModels = (value:string)=>{
    selectModelRef.current = value
  }  
  return (
    <div>
      <ShowNowTime />

      <Row className="justify-center">
        <Col span={70}>
          <Descriptions
            bordered
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            items={getItemsInfo(data)}
          />
        </Col>
        <Col span={30}>
          <h1>AI解析</h1>
          <Input placeholder="请输入你的问题?" ref={inputRef} />
          <div className="flex flex-row">
            <p className="flex text-center p-4">模型选择</p>
            <div className="mt-2">
              <Select defaultValue={selectModelRef.current} style={{width:240}} onChange={handleSeletModels} options={getModelList()}/>
            </div>    
          </div>
          <Button onClick={handleStream}>发送</Button>
          <div className="prose lg:prose-md prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent">
            <AnimatedMarkdown
            content={text}
            animation="blurIn"
            animationDuration="0.5s"
            animationTimingFunction="ease-in-out"/>
          </div>          
        </Col>
      </Row>

    </div>
  );
};

export default Home;
