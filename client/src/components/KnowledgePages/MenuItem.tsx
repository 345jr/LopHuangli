import type { MenuProps } from "antd";
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
  } from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "1",
    icon: <MailOutlined />,
    label: "总览",
    children: [
      { key: "11", label: "概述" },
      { key: "12", label: "背景" },
    ],
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: "传统文化",
    children: [
      { key: "21", label: "农历" },
      { key: "22", label: "公历" },
      {
        key: "23",
        label: "其他",
        children: [
          { key: "231", label: "24节气" },
        ],
      },
    ],
  },
  {
    key: "3",
    icon: <SettingOutlined />,
    label: "黄历信息由来",
    children: [
      { key: "31", label: "宜忌事项" },
      { key: "32", label: "胎神" },
      { key: "33", label: "星宿" },
      { key: "34", label: "彭祖" },
      { key: "35", label: "五行" },
      { key: "36", label: "冲煞" },
      { key: "37", label: "时辰凶吉" },
      { key: "38", label: "干支" },
    ],
  },
];


export default items