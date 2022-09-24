import React, { useState } from "react";
import { Row, Col, Form, Button, Select, Drawer, Input } from "antd";
import { useSelector } from "react-redux";

export const SurveyUsersFormDrawer = (props) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState("");

  const usersLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.list);
  const companiesLoading = useSelector((state) => state.companies.loading);
  const companies = useSelector((state) => state.companies.list);

  const { drawerVisible, setDrawerVisible, form, handleFormSubmit } = props;

  return (
    <>
      <Drawer
        title="Add New User"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          layout="vertical"
          fields={[
            {
              name: ["company_id"],
              value: selectedCompanyId,
            },
          ]}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="user_id"
                label="User"
                rules={[
                  {
                    required: true,
                    message: "Please select User",
                  },
                ]}
              >
                <Select
                  placeholder="Select User"
                  onChange={(value) => {
                    const user = users.find((user) => user.id === value);
                    const company = companies.find(
                      (company) => company.code === user.company_code
                    );
                    if (company) {
                      setSelectedCompanyId(company ? company.id : 0);
                    } else {
                      form.resetFields(["company_id"]);
                    }
                  }}
                >
                  {users.map((user) => {
                    return (
                      <Select.Option value={user.id}>{user.name}</Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="company_id"
                label="Company"
                rules={[
                  {
                    required: true,
                    message: "Please select Company",
                  },
                ]}
              >
                <Select placeholder="Select Company">
                  {companies.map((company) => {
                    return (
                      <Select.Option value={company.id}>
                        {company.name}
                      </Select.Option>
                    );
                  })}
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
