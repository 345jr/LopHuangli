import { Avatar, List } from "antd";
import { Col, Row } from "antd";

import TopBar from "../Global/TopBar";
import Footer from "../Global/Footer";
import {upData , nextData} from './UpItem'
import UpdateBanner from "./UpBanner";


const Updata = () => {
  return (
    <div>
      <TopBar />
      <UpdateBanner productName="LopCalendar" launchDate="2025-05-28" updateDate="2025-06-19"/>
      <Row gutter={{xs:0,sm:4,md:16}}  justify={'space-evenly'} >
        <Col span={6}>        
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
        <Col span={6}>
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
