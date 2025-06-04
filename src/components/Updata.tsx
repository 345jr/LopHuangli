import TopBar from "./TopBar";
import Footer from "./Footer";
import { Avatar, List } from "antd";
import { Col, Row } from "antd";

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
    title: "Ant Design Title 3",
    description: "niaho",
  },
  {
    title: "Ant Design Title 4",
    description: "niaho",
  },
];
const nextData = [
  {
    title: "响应式",
    description: "适应不同的分辨率",
  },
  {
    title: "相关知识页初步完成",
    description: "补完页面",
  },
  {
    title: "部署",
    description: "部署到服务器",
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
