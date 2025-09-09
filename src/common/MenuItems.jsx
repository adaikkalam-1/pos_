import {
  LogoutOutlined,
  PieChartOutlined,
  ProjectOutlined,
  RiseOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import React from "react";

export const menuItems = [
  {
    label: "Dashboard",
    key: "/",
    icon: React.createElement(PieChartOutlined),
  },
  {
    label: "Sale",
    key: "/sale",
    icon: React.createElement(ProjectOutlined),
  },
  {
    label: "Products",
    key: "/products",
    icon: React.createElement(ShoppingCartOutlined),
  },
  {
    label: "Reports",
    key: "/reports",
    icon: React.createElement(RiseOutlined),
  },

  {
    label: "Log Out",
    key: "/logout",
    icon: React.createElement(LogoutOutlined),
  },
];
