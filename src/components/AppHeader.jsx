import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Layout,
  Drawer,
  Dropdown,
  Menu,
  Button,
  Avatar,
  Skeleton,
  Typography,
  Space,
} from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { AppSidebar } from "./AppSidebar";
import "./header.less";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutClickAction } from "../redux/actions";
import userImage from "../assets/images/user.png";
import { CustomIcon } from ".";

const { Header } = Layout;
const { Title } = Typography;
export const AppHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const selectedUserApplication = useSelector(
    (state) => state.selectedUserApplication.data
  );
  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  const isAuthenticated = localStorage.getItem("token") ? true : false;
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined style={{ fontSize: "14px" }} />}
        onClick={() => {}}
      >
        <Row>
          <Col style={{ marginLeft: "8px", marginTop: "4px" }}>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              {profileLoading ? <Skeleton.Button /> : profile && profile.name}
            </span>
          </Col>
        </Row>
        {/* <Row>
          <Col style={{ marginLeft: "8px", marginTop: "4px" }}>
            <span style={{ fontSize: "12px", fontWeight: "400" }}>
              {profileLoading ? <Skeleton.Button /> : profile.email}
            </span>
          </Col>
        </Row> */}
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<LogoutOutlined style={{ fontSize: "14px" }} />}
        onClick={() => {
          dispatch(logoutClickAction(history));
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Header className="header">
        <Row justify="space-between" className="header-menu">
          <Space>
            <Col>
              <Button
                className="menu"
                type="primary"
                icon={<MenuOutlined />}
                onClick={() => setVisible(true)}
              />
            </Col>
            {selectedUserApplication && (
              <Col>
                {/* <CustomIcon
                  type={selectedUserApplication.antd_icon_name}
                  style={{ fontSize: "40px", color: "#1DA57A" }}
                /> */}
                <Title level={4} style={{ marginBottom: "0px" }}>
                  {selectedUserApplication.title}
                </Title>
              </Col>
            )}
          </Space>
          <Col>
            <Dropdown overlay={menu}>
              <Row>
                <Col>
                  <Avatar shape="circle">{userImage}</Avatar>
                </Col>
                <Col>
                  <DownOutlined style={{ marginLeft: "4px", fontSize: "14" }} />
                </Col>
              </Row>
            </Dropdown>
          </Col>
        </Row>

        <Drawer
          title="QHSSE Portal"
          placement="left"
          onClick={() => setVisible(false)}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <AppSidebar />
        </Drawer>
      </Header>
    </>
  );
};

export default AppHeader;
