import { useState } from "react";
import type { MenuProps } from "antd";
import { Menu, Layout, theme } from "antd";

import TopBar from "../TopBar";
import Footer from "../Footer";
import ContentPage from "./ContentPage";
import MenuItems from './MenuItem'

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const { Content, Sider } = Layout;

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(MenuItems as LevelKeysProps[]);

const Knowledge = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    background: colorBgContainer,
  };

  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const [selectedKey , setSelectedKey] = useState('231')

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };
  const handleMenuSelect:MenuProps["onSelect"] =({key})=>{
    setSelectedKey(key)
  }

  return (
    <div>
      <TopBar />
      <Layout>
        <Sider width={200} style={siderStyle}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["231"]}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            style={{ width: 200 }}
            items={MenuItems}
            onSelect={handleMenuSelect}
          />
        </Sider>
        <Layout style={{ padding: "24px 24px " }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 680,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            
          >
            <ContentPage selectedKey={selectedKey}/>
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </div>
  );
};

export default Knowledge;
