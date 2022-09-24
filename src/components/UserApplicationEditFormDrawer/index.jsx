import React, { useState } from "react";
import { Row, Col, Form, Button, Select, Drawer, Spin } from "antd";
import { useSelector } from "react-redux";

export const UserApplicationEditFormDrawer = (props) => {
  const [selectedApplication, setSelectedApplication] = useState({});
  const [selectedApplicationMenus, setSelectedApplicationMenus] = useState([]);
  const [selectedApplicationRoles, setSelectedApplicationRoles] = useState([]);

  const profileLoading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.data);

  // const applicationMenuLoading = useSelector(
  //   (state) => state.applicationMenu.loading
  // );
  // const applicationMenu = useSelector((state) => state.applicationMenu.list);
  const {
    drawerVisible,
    setDrawerVisible,
    form,
    applications,
    handleFormSubmit,
  } = props;

  return (
    <>
      <Drawer
        title="Add New Application"
        width={720}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={<Button />}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Application"
                name="application_id"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please select application.",
                  },
                ]}
              >
                <Select
                  placeholder="Select Application"
                  onChange={(value) => {
                    const selectedApplication = applications.find(
                      (application) => application.id === value
                    );
                    form.resetFields([
                      "application_role_id",
                      "application_menu_ids",
                    ]);
                    setSelectedApplication(selectedApplication);
                    setSelectedApplicationRoles(selectedApplication.roles);
                    setSelectedApplicationMenus(selectedApplication.menus);
                  }}
                >
                  {applications.map((application) => {
                    return (
                      <Select.Option value={application.id}>
                        {application.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Application Role"
                name="application_role_id"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please select application role.",
                  },
                ]}
              >
                <Select
                  placeholder="Select Application Role"
                  onChange={(value) => {}}
                >
                  {selectedApplicationRoles.map((selectedApplicationRole) => {
                    return (
                      <Select.Option value={selectedApplicationRole.id}>
                        {selectedApplicationRole.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Application Menu"
                name="application_menu_ids"
                type="text"
                rules={[
                  {
                    required: true,
                    message: "Please select application Menu.",
                  },
                ]}
              >
                <Select
                  placeholder="Select Application Menus"
                  allowClear={true}
                  mode="multiple"
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    return (
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }}
                >
                  {selectedApplicationMenus.map((menuItem) => {
                    return (
                      <Select.Option value={menuItem.id}>
                        {menuItem.title}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end" gutter={16}>
            <Col>
              <Button
                type="primary"
                // htmlType="submit"
                onClick={() => {
                  form.submit();
                  setSelectedApplication({});
                  setSelectedApplicationMenus([]);
                  setSelectedApplicationRoles([]);
                  // form.resetFields();
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
