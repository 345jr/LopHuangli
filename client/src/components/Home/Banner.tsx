import { Col, Row } from "antd";

const Banner = () => {
  return (
    <div className="hidden md:flex w-full  justify-center py-6">
      <Row gutter={16}>
        <Col span={12}>
          <div className="mr-20 text-center">
            <h1 className=" w-full text-[66px] font-medium font-serif whitespace-nowrap">
              黄历信息
            </h1>
            <h2 className="whitespace-nowrap font-normal text-[16px]">
              获取当天的黄历信息,用于分析,参考,预测
            </h2>
            <h2 className="whitespace-nowrap font-normal text-[16px]">
              做出更有利的决策
            </h2>
            <h2 className="whitespace-nowrap font-normal text-[16px]">
              天时，地利，人合
            </h2>
          </div>
        </Col>
        <Col span={12}>
          <div className="ml-20 text-center">
            <h1 className="text-[66px] font-medium font-serif whitespace-nowrap ">
              AI解析
            </h1>
            <h2 className="whitespace-nowrap font-normal text-[16px]">
              通过人工智能就行分析,得到完美，准确的答案
            </h2>
            <h2 className="whitespace-nowrap font-normal text-[16px]">
              基于大模型知识回答，得到印象深刻的答案
            </h2>
            <h2 className="whitespace-nowrap font-normal text-[16px]">
              简单，快捷，高教
            </h2>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
