import type { huangLiData } from "../types/huangli"
import { Col, ConfigProvider, Row } from 'antd';
import { Calendar, theme } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

import locale from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';



import ShowNowTime from "./ShowNowTime/ShowNowTime";
const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const Home = ({data}:{data:huangLiData | null}) => {

  dayjs.locale('zh-cn');

  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '✅宜事项',
      children: 
      <ul className="mx-4">
      {data?.data.taboosGood.map((item, index) => (
      <li key={index}>{item}</li>
      ))}
      </ul> 
    },
  ]
  const items2: CollapseProps['items'] = [
    {
      key: '1',
      label: '❌忌事项',
      children: 
      <ul className="mx-4">
      {data?.data.taboosBad.map((item, index) => (
      <li key={index}>{item}</li>
      ))}
      </ul>
    },
  ]
  return (
    <div >
      <ShowNowTime  />
      
      <Row className="justify-center">
        <Col span={10} >
        <div className="flex flex-col text-right pr-8">
          {data ? <h3 className="text-xl font-bold my-2">黄历时间:{data.data.lunarDay}</h3> : <p>加载中...</p>}
          {data ? <h3 className="text-xl font-bold my-2">干支时间:{data.data.ganZhiDay}</h3> : <p>加载中...</p>}
          {data ? <h3 className="text-xl font-bold my-2">时辰:{data.data.lunarHour}</h3> : <p>加载中...</p>}
          {data ? <h3 className="text-xl font-bold my-2">胎神:{data.data.fetus}</h3> : <p>加载中...</p>}
          {data ? <h3 className="text-xl font-bold my-2">星宿:{data.data.Zone}方{data.data.twentyEightStar}{data.data.animal}{data.data.luckStar}-{data.data.twentyEightStar}</h3> : <p>加载中...</p>}
          {data ? <h3 className="text-xl font-bold my-2">彭祖:{data.data.pengZu}</h3> : <p>加载中...</p>}
          {data ? <h3 className="text-xl font-bold my-2">五行:{data.data.sound}{data.data.duty}执位</h3> : <p>加载中...</p>}
          {data ? <h3 className="text-xl font-bold my-2">冲煞:{data.data.zodiac}日冲{data.data.chongToAnimal}  煞{data.data.shaDirection}</h3> : <p>加载中...</p>}
        </div>        
        </Col>
        <Col span={10}>
          <div style={wrapperStyle} className="">
            <ConfigProvider locale={locale}>
              <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </ConfigProvider>;
          </div>
        </Col>
      </Row>

      <Row gutter={24} className="justify-center">
        <Col span={5}>
          <Collapse items={items} defaultActiveKey={['1']}  />        
        </Col>
        <Col span={5}>
          <Collapse items={items2} defaultActiveKey={['1']}  />        
        </Col>                
      </Row>                    
    </div>
  );
};

export default Home