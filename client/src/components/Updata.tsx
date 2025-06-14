import { Avatar, List } from "antd";
import { Col, Row } from "antd";

import TopBar from "./Global/TopBar";
import Footer from "./Global/Footer";


const upData = [
  {
    title: "2025.6.1",
    description: "布局优化+组件使用：使用了蚂蚁设计+Reactbit",
  },
  {
    title: "2025.6.4",
    description: "相关知识页的骨架完成完善了初步工作",
  },
  {
    title: "2025.6.5",
    description: "完成了初步的响应式设计",
  },
  {
    title: "2025.6.6",
    description: "添加了AI解析功能初步实现",
  },
  {
    title: "2025.6.15",
    description: "前后端部署,优化请求使用缓存",
  },
];
const nextData = [
  {
    title: "相关知识页初步完成",
    description: "补完页面",
  },
  {
    title: "引入nextJS",
    description: "学习并应用",
  },
  {
    title: "使用更多的Hook",
    description: "优化性能，增加功能",
  },
  {
    title: "做好CI/CD",
    description: "持续集成/持续部署",
  },

];
const Updata = () => {
  return (
    <div>
      <TopBar />

      <Row className="flex justify-center">
        <Col span={10}>
          <List
            itemLayout="horizontal"
            dataSource={upData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://image.lopop.top/LaoHuangLi/hint-updata.png`}
                    />
                  }
                  title={<p>{item.title}</p>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={10}>
          <List
            itemLayout="horizontal"
            dataSource={nextData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://image.lopop.top/LaoHuangLi/plan_template.png`}
                    />
                  }
                  title={<p>{item.title}</p>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default Updata;
