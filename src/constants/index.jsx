import React from "react";
import {
  HomeOutlined,
  UserAddOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

export const pgRoutes = (isAdmin) => {
  const routes = [{ name: "Home", path: "/", icon: <HomeOutlined /> }];
  const adminRoutes = [
    { name: "Home", path: "/", icon: <HomeOutlined /> },
    { name: "Users", path: "/users", icon: <UserAddOutlined /> },
    {
      name: "Locations",
      path: "/locations",
      icon: <EnvironmentOutlined />,
    },
  ];

  return isAdmin ? adminRoutes : routes;
};
