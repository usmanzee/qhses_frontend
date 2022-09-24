import React from "react";
import { Row, Col, Form, Button, Select, Drawer } from "antd";
import { useSelector } from "react-redux";

export const DistributorFormDrawer = (props) => {
  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);
  const {
    drawerVisible,
    setDrawerVisible,
    distrubutionUsers,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        title="Add New distributor"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form
          onFinish={handleFormSubmit}
          layout="vertical"
          hideRequiredMark
          initialValues={{
            ["email_type"]: "to",
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="distribution_user_id"
                label="Distributor"
                rules={[
                  {
                    required: true,
                    message: "Please select Distributor",
                  },
                ]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                >
                  {distrubutionUsers.map((user) => {
                    return profile && profile.id != user.id ? (
                      <Select.Option value={user.id}>{user.name}</Select.Option>
                    ) : (
                      ""
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email_type"
                label="Email Type"
                rules={[
                  {
                    required: true,
                    message: "Please select Email type",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="to">TO</Select.Option>
                  <Select.Option value="cc">CC</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
            <Col>
              <Form.Item label="">
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
