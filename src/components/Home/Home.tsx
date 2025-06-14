import { useRef, useState } from "react";

import { Col, Row } from "antd";
import { Descriptions } from "antd";
import { Input } from 'antd';
import type { InputRef } from 'antd';
import { Button } from 'antd';
import { Select } from 'antd';
import { AnimatedMarkdown } from 'flowtoken';

import type { huangLiData } from "../../types/huangli";
import ShowNowTime from "../ShowNowTime/ShowNowTime";
import { getItemsInfo,getModelList } from "./ItemsInfo";

import 'flowtoken/dist/styles.css';

const Home = ({ data }: { data: huangLiData}) => {

  const [text, setText] = useState('');

  const inputRef =useRef<InputRef>(null)
  const selectModelRef =useRef('qwen-plus')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [loadings, setLoadings] = useState<boolean[]>([]);

  //获取AI结果
  const handleStream = (prompt?:string) => {
    return new Promise<void>(async (resolve, reject) => {
      setText('');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      let buffer = '';
      intervalRef.current = setInterval(() => {
        if (buffer.length > 0) {
          setText(prev => prev + buffer);
          buffer = '';
        }
      }, 100);

      try {
        const response = await fetch(`http://199.115.229.247:8085/api/aliyunaiStream?q=
          ${encodeURIComponent(prompt?`这是今日黄历的数据请你更具这个帮我做一个分析 ，并且给我一个今日运势1-100${prompt}`:inputRef.current?.input?.value || '')}
          &model=${encodeURIComponent(selectModelRef.current)}`);
        if (!response.ok) { 
            throw new Error(`请求失败: ${response.statusText}`);
        }
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Response body is null");
        }
        const decoder = new TextDecoder('utf-8');

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          buffer += chunk;
        }
      } catch (error) {
        console.error("Streaming failed:", error);
        setText("请求出错，请检查网络或联系管理员。");
        reject(error); 
      } finally {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (buffer.length > 0) {
          setText(prev => prev + buffer);
        }
        resolve()
      }
    });
  };
  //处理选择的模型
  const handleSeletModels = (value:string)=>{
    selectModelRef.current = value
  }
  //处理开始的加载状态
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    }); 
  };
  //处理结束的加载状态
  const exitLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };
  //处理发送请求-普通聊天
  const handleSend = async () => {
    enterLoading(2);
    try {
      await handleStream(); 
    } catch(error) {
      console.error("存在错误 ", error);
    } finally {
      exitLoading(2); 
    }
  };
  //处理发送请求-解析黄历
  const handleSend2 = async () => {
    try {
      enterLoading(3)
      const huangLiData:string = JSON.stringify(data.data)
      await handleStream(huangLiData); 
    } catch (error) {
      console.log("存在错误 ",error)
    } finally {
      exitLoading(3);
    } 
  }

  return (
    <div>
      <ShowNowTime />

      <Row className="justify-center" gutter={16}>
        <Col span={50}>
          <Descriptions
            bordered
            column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
            items={getItemsInfo(data)}
          />
        </Col>

        <Col span={50}>
          <h1>AI解析</h1>
          <Input placeholder="请输入你的问题?" ref={inputRef} />
          <div className="flex flex-row">
            <p className="flex text-center p-4">模型选择</p>
            <div className="mt-2">
              <Select defaultValue={selectModelRef.current} style={{width:240}} onChange={handleSeletModels} options={getModelList()}/>
            </div>    
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleSend} loading={loadings[2]}  iconPosition="end" >发送 ENTER</Button>
            <Button onClick={handleSend2}>解析黄历</Button>
          </div>
          
          <div
            className="
              min-w-[400px]
              max-w-[400px]
              min-h-[547px]
              max-h-[547px]
              overflow-y-auto
              border
              border-gray-200
              rounded-lg
              p-2
              bg-[#FAFAFA]
              mt-4
              prose lg:prose-md
              prose-pre:p-0
              prose-pre:m-0
              prose-pre:bg-transparent
            "
          >
            <AnimatedMarkdown
              content={text}
              animation="blurIn"
              animationDuration="0.5s"
              animationTimingFunction="ease-in-out"
            />
          </div>                   
        </Col>
      </Row>
    </div>
  );
};

export default Home;
