import React, { useEffect } from "react";
import { Row, Col, Layout, Divider, Typography, Avatar } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProfileAction } from "../../redux/actions";
import { AppSidebar, AppFooter, AppHeader } from "../../components";

import aliSonsLogo from "../../assets/images/ali_sons_plain_logo.png";

const { Title } = Typography;

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfileAction(history));
    }
  }, []);

  return (
    <Layout hasSider>
      <Sider
        className="sidebar"
        breakpoint={"lg"}
        theme="light"
        collapsedWidth={0}
        trigger={null}
      >
        <Row gutter={4} style={{ margin: "10px 0px 0px 10px" }}>
          <Col>
            <Avatar size={50} shape="square" src={aliSonsLogo} />
          </Col>
          <Col>
            <Title level={5} style={{ marginTop: "12px", marginLeft: "5px" }}>
              QHSSE Portal
            </Title>
          </Col>
        </Row>
        <Divider style={{ margin: "16px 0px" }} />
        <AppSidebar />
      </Sider>
      <Layout>
        <AppHeader />
        <Content style={{ margin: "16px 16px 0", overflow: "initial" }}>
          <div
            style={{
              height: "100%",
            }}
          >
            {children}
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
}

export default Main;
