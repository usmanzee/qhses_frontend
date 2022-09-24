import React from "react";

import { Layout, Row, Col, Typography, Spin } from "antd";
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const Unauthorized = () => {
  return (
    <>
      <Layout>
        <Header style={{ background: "#fff" }}></Header>
        <Content style={{ margin: "60px" }}>
          <Row>
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 9 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Unauthorized</Title>
              <Title level={5}>You are not authorized.</Title>
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            bottom: "0px",
            position: "fixed",
            width: "100%",
            textAlign: "center",
          }}
        >
          <p> Copyright © 2021</p>
        </Footer>
      </Layout>
    </>
  );
};

export default Unauthorized;
